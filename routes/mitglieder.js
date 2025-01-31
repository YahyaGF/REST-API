const express = require('express')
const router = express.Router()
const Mitglied = require('../models/mitglied');
const mitglied = require('../models/mitglied');






// Alle wiedergeben
router.get('/', async (req, res) => {
    try {
        const mitglieder = await Mitglied.find(); // Holt alle Mitglieder aus der Datenbank
        res.json(mitglieder); // Gibt die Mitglieder als JSON zurück
    } catch (err) {
        res.status(500).json({ message: err.message }); // Fehlerbehandlung
    }
});


// Einen Eintrag wiedergeben
router.get('/:id', getMitglied, (req, res) => { // 'res' ist korrekt definiert
    res.json(res.mitglied)
});


// Einen Eintrag erstellen
router.post('/', async (req, res) => {
   try {
        const newMitglied = new Mitglied({  
            name: req.body.name,
            verein: req.body.verein,
            BeitrittsDatum: new Date(req.body.BeitrittsDatum),  // Datumsformatierung
        });
        const savedMitglied = await newMitglied.save();  // Speichern der Instanz 'newMitglied'
        res.status(201).json(savedMitglied);  // Antwort mit dem neuen Mitglied
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    } 
});

// Einen Eintrag updaten
router.patch('/:id', getMitglied, async (req, res) => {
    // Überprüfen und Aktualisieren von Feldern
    if (req.body.name != null) {
        res.mitglied.name = req.body.name;
    }
    if (req.body.verein != null) {
        res.mitglied.verein = req.body.verein;
    }

    try {
        // Speichern der aktualisierten Daten
        const updatedMitglied = await res.mitglied.save();
        res.json(updatedMitglied); // Erfolgreiche Antwort mit den aktualisierten Daten
    } catch (err) {
        res.status(400).json({ message: err.message }); // Fehler bei der Aktualisierung
    }
});


// Einen Eintrag löschen
router.delete('/:id', getMitglied, async (req, res) => {
    try {
        await res.mitglied.deleteOne(); // Korrekte Methode zum Löschen
        res.json({ message: 'Mitglied wurde erfolgreich gelöscht' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Alle Einträge löschen (Confirm wird benötigt, damit alle einträge gelöscht werden können)
router.delete('/', async (req, res) => {
    if (!req.body.confirm) {
        return res.status(400).json({ message: 'Bestätigung erforderlich, um alle Mitglieder zu löschen' }); // Sicherheitsmaßnahme, damit nicht ausversehen alle Eiträge gelöscht werden
    }

    try {
        const result = await Mitglied.deleteMany();
        res.json({
            message: `${result.deletedCount} Mitglieder wurden erfolgreich gelöscht`
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



async function getMitglied(req, res, next) {
    let mitglied;
    try {
        mitglied = await Mitglied.findById(req.params.id);
        if (!mitglied) {
            return res.status(404).json({ message: 'Mitglied konnte nicht gefunden werden' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.mitglied = mitglied;
    next() 
}



module.exports = router;