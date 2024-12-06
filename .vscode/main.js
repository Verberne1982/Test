import * as THREE from 'three';
import * as LocAR from 'locar';

// Basisopstelling
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.001, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const scene = new THREE.Scene();

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", e => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const locar = new LocAR.LocationBased(scene, camera);
const deviceControls = new LocAR.DeviceOrientationControls(camera);
const cam = new LocAR.WebcamRenderer(renderer);

let firstPosition = true;

const indexedObjects = {};
const cube = new THREE.BoxGeometry(20, 20, 20);
const clickHandler = new LocAR.ClickHandler(renderer);

// Configuratie: Kies tussen de API of een handmatige locatie
const useFontysAPI = false; // Zet dit op 'false' om handmatig een locatie te gebruiken
const manualLocation = {
    latitude: 51.39475447263264,  // Voorbeeldlocatie (Fontys Campus Point 1)
    longitude: 5.47269890662182,
};

// Locatie-updates verwerken
locar.on("gpsupdate", async (pos, distMoved) => {
    console.log("GPS update ontvangen:", pos); // Debugging de ontvangen GPS-positie
    if (firstPosition || distMoved > 100) {
        let locations;

        // Haal de locaties op van de API of gebruik handmatige locaties
        if (useFontysAPI) {
            console.log("Fontys API wordt gebruikt..."); // Debugging: API keuze
            try {
                const response = await fetch('https://fontys-geolocation-api.onrender.com/');
                locations = await response.json(); // JSON-structuur van Fontys API
                console.log("Gegevens ontvangen van Fontys API:", locations); // Debugging de API response
            } catch (error) {
                console.error("Fout bij ophalen van Fontys API:", error);
                locations = []; // Als de API faalt, maak een fallback naar handmatige locaties
            }
        } else {
            console.log("Handmatige locatie wordt gebruikt."); // Debugging handmatige locatie keuze
            locations = [{
                _id: 1,
                name: "Handmatige Locatie",
                location: {
                    type: "Point",
                    coordinates: [manualLocation.latitude, manualLocation.longitude]
                }
            }];
        }

        // Voeg de locaties toe aan de LocAR scène
        locations.forEach(poi => {
            console.log("Verwerken locatie:", poi.name, "Coördinaten:", poi.location.coordinates); // Debugging locatieverwerking

            // Als het punt nog niet is toegevoegd, maak het dan een 3D-object
            if (!indexedObjects[poi._id]) {
                const mesh = new THREE.Mesh(
                    cube,
                    new THREE.MeshBasicMaterial({ color: 0xff0000 })
                );

                // Voeg het punt toe aan de LocAR scène op de juiste locatie
                locar.add(
                    mesh,
                    poi.location.coordinates[1], // Longitude
                    poi.location.coordinates[0], // Latitude
                    0, // Altitude (hier kun je een waarde gebruiken als je die hebt)
                    poi // Sla extra eigenschappen op
                );

                // Sla het object op in de index
                indexedObjects[poi._id] = mesh;
                console.log(`Locatie toegevoegd: ${poi.name} met ID: ${poi._id}`); // Debugging: object toegevoegd
            }
        });
        firstPosition = false;
    }
});

// Start GPS en LocAR
locar.startGps();
renderer.setAnimationLoop(animate);

function animate() {
    cam.update();
    deviceControls.update();

    // Raycast voor interactie
    const objects = clickHandler.raycast(camera, scene);
    if (objects.length) {
        console.log(`Object geklikt: ${objects[0].object.name}`); // Debugging raycast click
        alert(`Dit is ${objects[0].object.name}`);
    }

    renderer.render(scene, camera);
}
