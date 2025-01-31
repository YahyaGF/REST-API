# Mitglieder-API Dokumentation

Diese API bietet CRUD-Funktionalitäten für die Verwaltung von Mitgliedern eines Vereins.

## Basis-URL

```
http://<your-server>/api/mitglieder
```

## Endpunkte

### 1. **Alle Mitglieder abrufen**

- **Methode:** `GET`
- **Endpunkt:** `/`
- **Beschreibung:** Ruft alle Mitglieder aus der Datenbank ab.
- **Antwort:**
  ```json
  [
    {
      "_id": "65f5a8e95f1d3c0012ab1234",
      "name": "Max Mustermann",
      "verein": "FC Beispiel",
      "BeitrittsDatum": "2024-01-20T00:00:00.000Z"
    }
  ]
  ```
- **Fehlerantwort:**
  ```json
  { "message": "Fehlerbeschreibung" }
  ```
- **Statuscodes:**
  - `200 OK` – Erfolgreiche Antwort
  - `500 Internal Server Error` – Serverfehler

---

### 2. **Ein einzelnes Mitglied abrufen**

- **Methode:** `GET`
- **Endpunkt:** `/:id`
- **Beschreibung:** Ruft ein einzelnes Mitglied anhand der ID ab.
- **Antwort:**
  ```json
  {
    "_id": "65f5a8e95f1d3c0012ab1234",
    "name": "Max Mustermann",
    "verein": "FC Beispiel",
    "BeitrittsDatum": "2024-01-20T00:00:00.000Z"
  }
  ```
- **Fehlerantwort:**
  ```json
  { "message": "Mitglied konnte nicht gefunden werden" }
  ```
- **Statuscodes:**
  - `200 OK` – Erfolgreiche Antwort
  - `404 Not Found` – Mitglied nicht gefunden
  - `500 Internal Server Error` – Serverfehler

---

### 3. **Neues Mitglied erstellen**

- **Methode:** `POST`
- **Endpunkt:** `/`
- **Beschreibung:** Erstellt ein neues Mitglied.
- **Request-Body:**
  ```json
  {
    "name": "Max Mustermann",
    "verein": "FC Beispiel",
    "BeitrittsDatum": "2024-01-20"
  }
  ```
- **Antwort:**
  ```json
  {
    "_id": "65f5a8e95f1d3c0012ab1234",
    "name": "Max Mustermann",
    "verein": "FC Beispiel",
    "BeitrittsDatum": "2024-01-20T00:00:00.000Z"
  }
  ```
- **Fehlerantwort:**
  ```json
  { "message": "Fehlerbeschreibung" }
  ```
- **Statuscodes:**
  - `201 Created` – Mitglied erfolgreich erstellt
  - `400 Bad Request` – Ungültige Daten

---

### 4. **Mitglied aktualisieren (teilweise)**

- **Methode:** `PATCH`
- **Endpunkt:** `/:id`
- **Beschreibung:** Aktualisiert bestimmte Felder eines Mitglieds.
- **Request-Body:**
  ```json
  {
    "name": "Erik Beispiel"
  }
  ```
- **Antwort:**
  ```json
  {
    "_id": "65f5a8e95f1d3c0012ab1234",
    "name": "Erik Beispiel",
    "verein": "FC Beispiel",
    "BeitrittsDatum": "2024-01-20T00:00:00.000Z"
  }
  ```
- **Fehlerantwort:**
  ```json
  { "message": "Fehlerbeschreibung" }
  ```
- **Statuscodes:**
  - `200 OK` – Mitglied aktualisiert
  - `400 Bad Request` – Ungültige Daten
  - `500 Internal Server Error` – Serverfehler

---

### 5. **Mitglied löschen**

- **Methode:** `DELETE`
- **Endpunkt:** `/:id`
- **Beschreibung:** Löscht ein einzelnes Mitglied.
- **Antwort:**
  ```json
  { "message": "Mitglied wurde erfolgreich gelöscht" }
  ```
- **Fehlerantwort:**
  ```json
  { "message": "Fehlerbeschreibung" }
  ```
- **Statuscodes:**
  - `200 OK` – Mitglied gelöscht
  - `500 Internal Server Error` – Serverfehler

---

### 6. **Alle Mitglieder löschen**

- **Methode:** `DELETE`
- **Endpunkt:** `/`
- **Beschreibung:** Löscht alle Mitglieder nach Bestätigung.
- **Request-Body:**
  ```json
  {
    "confirm": true
  }
  ```
- **Antwort:**
  ```json
  { "message": "10 Mitglieder wurden erfolgreich gelöscht" }
  ```
- **Fehlerantwort:**
  ```json
  { "message": "Bestätigung erforderlich, um alle Mitglieder zu löschen" }
  ```
- **Statuscodes:**
  - `200 OK` – Alle Mitglieder gelöscht
  - `400 Bad Request` – Bestätigung fehlt
  - `500 Internal Server Error` – Serverfehler

---

## Middleware

### `getMitglied` (Middleware)

- Wird für die Endpunkte `GET /:id`, `PATCH /:id`, `DELETE /:id` verwendet.
- Sucht ein Mitglied anhand der ID und speichert es in `res.mitglied`.
- Fehlerbehandlung für nicht gefundene Mitglieder.

---

## Authentifizierung

Derzeit verwendet die API **keine Authentifizierung**. Falls erforderlich, könnte ein JWT- oder API-Key-Mechanismus hinzugefügt werden.

---

## Fehlerbehandlung

Alle Endpunkte geben eine JSON-Fehlermeldung im folgenden Format zurück:

```json
{ "message": "Beschreibung des Fehlers" }
```

---

## Deployment-Details

- **Technologien:** Express.js, MongoDB
- **Installation:**
  ```bash
  npm install
  npm start
  ```
- **Abhängigkeiten:**
  - `express` für die API-Routen
  - `mongoose` für die Datenbankinteraktion


