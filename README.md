# LocAR Augmented Reality Project

Dit project maakt gebruik van **three.js** en **LocAR** bibliotheken om een augmented reality (AR) ervaring te creëren op basis van GPS-coördinaten. Hieronder volgt een beschrijving van de belangrijkste functionaliteiten:

## Functionaliteiten:
1. **3D-omgeving**:
   - De gebruiker ziet 3D-objecten (rood kubusblok) geplaatst op basis van GPS-coördinaten in een augmented reality omgeving.
   - De objecten worden dynamisch toegevoegd aan de scène en gepositioneerd op basis van de GPS-positie.

2. **Bewegingsupdates**:
   - Wanneer de gebruiker beweegt, worden de 3D-objecten bijgewerkt op basis van de nieuwe GPS-positie van de gebruiker.

3. **Locatiebronnen**:
   - De locaties kunnen worden opgehaald via een externe API (zoals de Fontys API) of handmatig worden ingesteld met een specifieke locatie (bijvoorbeeld de Fontys Campus).
   - De keuze voor het gebruik van de API of handmatige locatie kan eenvoudig worden geconfigureerd.

4. **Interactie met objecten**:
   - Gebruikers kunnen interageren met de 3D-objecten door erop te klikken.
   - Bij het klikken op een object, wordt een **alert** weergegeven met de naam van het object.

5. **Augmented Reality**:
   - Het gebruik van de webcam en apparaatoriëntatie zorgt voor een dynamische AR-ervaring.
   - De 3D-scène wordt gerenderd op de volledige schermgrootte en reageert op de beweging van het apparaat.

## Technologieën:
- **three.js**: Gebruikt voor het creëren van de 3D-scène en rendering.
- **LocAR**: Gebruikt voor het toevoegen van locatiegebaseerde objecten en het verwerken van GPS-updates.
- **Webcam en Device Orientation**: Voor het mogelijk maken van de AR-ervaring en het interactief maken van de scène.
