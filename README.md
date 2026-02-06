# Stundenplan Card (Home Assistant)

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
![Version](https://img.shields.io/github/v/release/fabel-smith/stundenplan-card)
![Maintenance](https://img.shields.io/maintenance/yes/2026)
![License](https://img.shields.io/github/license/fabel-smith/stundenplan-card)

> **TL;DR**
> - **Automatischer Stundenplan aus stundenplan24.de?** → installiere die **stundenplan-suite**
> - **Stundenplan manuell anzeigen?** → nutze die **stundenplan-card**

Eine Lovelace Custom Card zur Darstellung eines Stundenplans als Tabelle – inklusive **visuellem Editor (GUI)**, **Heute-Highlight** und **Hervorhebung des aktuellen Fachs**.

> **Hinweis:**  
> Diese Card ist das **Frontend**.  
> Wenn du deinen Stundenplan automatisch aus *stundenplan24.de* importieren möchtest (Sensoren, A/B-Wochen, Auto-Update), nutze die **stundenplan-suite**:  
> https://github.com/fabel-smith/stundenplan-suite

---

## ✨ Features

- Tabellenansicht (Tage × Stunden)
- Visueller Editor (kein YAML-Zwang)
- Heute-Highlight (`highlight_today`)
- Aktuelles Fach hervorheben (`highlight_current`)
- Pausen-Zeilen (`break: true` + `label`)
- Zeilen hinzufügen / löschen
- HACS-kompatibel

---

## 📸 Screenshot

![Screenshot](https://raw.githubusercontent.com/fabel-smith/stundenplan-card/main/screenshot.png)

---

## 🧩 Installation
### Installation über HACS (empfohlen)

HACS öffnen → Frontend

Stundenplan Card installieren

Home Assistant neu laden (oder Browser-Cache aktualisieren)

Die Lovelace-Resource wird in der Regel automatisch hinzugefügt.

### Manuelle Prüfung der Resource (nur falls nötig)

Falls die Card nicht angezeigt wird, prüfe unter:

Einstellungen → Dashboards → Ressourcen

Ob folgende Resource vorhanden ist:

URL:

/local/stundenplan-card/stundenplan-card.js

Typ:

JavaScript-Modul

Falls sie fehlt, kannst du sie dort manuell hinzufügen.

Hinweis:
Nach Änderungen ggf. Browser-Cache leeren (Strg + F5).

### Wichtig zur Nutzung mit der stundenplan-suite

Wenn du die stundenplan-suite verwendest, musst du keine JSON-Dateien
und keine REST-Sensoren anlegen.

Die Suite stellt den Stundenplan automatisch als Sensor bereit –
diese Card übernimmt ausschließlich die Darstellung.


## 🔁 Wechselwochen (A/B)

Die Card unterstützt Schulen mit **A/B-Wochenmodell**.

Empfohlener Standardfall:
- Umschaltung **rein nach Kalenderwoche (gerade / ungerade KW)**
- keine Ferienlogik erforderlich

---

## Nutzung ohne stundenplan-suite (manuelle Daten)

> Dieser Abschnitt ist **nur relevant**, wenn du **nicht** die stundenplan-suite verwendest  
> und deinen Stundenplan selbst bereitstellst.

Die Daten werden als JSON-Dateien im `www`-Ordner abgelegt und über einen REST-Sensor in Home Assistant eingebunden.

---

### JSON-Dateien im www-Ordner

Lege zwei Dateien für A- und B-Woche an:

- `/config/www/stundenplan/stundenplan_a.json`
- `/config/www/stundenplan/stundenplan_b.json`

Die Datei muss ein Objekt mit dem Schlüssel `plan` enthalten.

**Beispiel:**

```json
{
  "plan": [
    {
      "Stunde": "1. 07:45 - 08:30",
      "Mo": "Mathe",
      "Di": "Deutsch",
      "Mi": "Englisch",
      "Do": "Sport",
      "Fr": "Bio"
    },
    {
      "break": true,
      "Stunde": "09:20 - 09:35",
      "label": "Pause"
    }
  ]
}
```

---

### REST-Sensor in Home Assistant

Die JSON-Dateien werden über einen REST-Sensor als Entity verfügbar gemacht:

```yaml
rest:
  - resource: http://localhost:8123/local/stundenplan/stundenplan_a.json
    scan_interval: 3600
    sensor:
      - name: stundenplan_a
        value_template: "OK"
        json_attributes:
          - plan

  - resource: http://localhost:8123/local/stundenplan/stundenplan_b.json
    scan_interval: 3600
    sensor:
      - name: stundenplan_b
        value_template: "OK"
        json_attributes:
          - plan
```

Danach **Home Assistant neu starten**.

---

### Card konfigurieren (Visueller Editor)

Im Editor der Card:

- **Wechselwochen aktivieren**
- Modus **„KW gerade / ungerade“** wählen
- festlegen, ob **A-Woche = gerade** oder **ungerade**
- Datenquelle setzen:
  - `source_entity_a` → `sensor.stundenplan_a`
  - `source_attribute_a` → `plan`
  - `source_entity_b` → `sensor.stundenplan_b`
  - `source_attribute_b` → `plan`
- `source_time_key` → `Stunde` (Standard)

Die Card schaltet nun automatisch zwischen A- und B-Woche.

---

## Optional: Abweichende A/B-Zuordnung per Mapping-Datei

Falls die Schule **nicht strikt gerade/ungerade Kalenderwochen** nutzt, kann die Umschaltung über eine Mapping-Datei erfolgen.

### Mapping-Datei

`/config/www/stundenplan/wechselwochen.json`

```json
{
  "2026": {
    "1": "A",
    "2": "B",
    "3": "A",
    "4": "B"
  }
}
```

### REST-Sensor für Mapping

```yaml
rest:
  - resource: http://localhost:8123/local/stundenplan/wechselwochen.json
    scan_interval: 3600
    sensor:
      - name: wechselwochen_map
        value_template: "OK"
        json_attributes:
          - "2026"
```

### Mapping in der Card aktivieren

Im Editor:

- Modus **„Mapping-Datei“**
- `week_map_entity` → `sensor.wechselwochen_map`
- `week_map_attribute` → `2026`

Ist die aktuelle KW im Mapping enthalten, wird sie verwendet.  
Andernfalls kann optional auf gerade/ungerade KW zurückgefallen werden.

---

## 🔄 Migration zur stundenplan-suite (optional)

Du nutzt aktuell die **stundenplan-card** mit manuellen JSON-Dateien  
und möchtest auf eine **automatische Lösung** umsteigen?

Dann ist die **stundenplan-suite** der empfohlene Weg.

### Was ändert sich?
- ❌ keine manuellen JSON-Dateien mehr
- ❌ keine REST-Sensoren mehr
- ✅ Stundenplan kommt automatisch von **stundenplan24.de**
- ✅ Sensoren werden von Home Assistant bereitgestellt
- ✅ Darstellung in der Card bleibt gleich

### Vorgehen (kurz & sicher)
1. **stundenplan-suite** über HACS installieren  
2. Home Assistant neu starten  
3. Integration einrichten (Dialog folgen)  
4. In der **stundenplan-card** statt eigener Sensoren  
   den von der Suite erzeugten Sensor auswählen

### Was kannst du danach löschen?
- `/config/www/stundenplan/*.json`
- REST-Sensoren aus der `configuration.yaml` (optional)

> **Hinweis:**  
> Die Card selbst bleibt unverändert –  
> sie zeigt weiterhin nur an, woher die Daten kommen, ist egal.

<a href="https://www.buymeacoffee.com/fabelsmith" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="45" alt="Buy Me a Coffee">
</a>
