# Stundenplan Card (Home Assistant)

[![HACS Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
![Version](https://img.shields.io/github/v/release/fabel-smith/stundenplan-card)
![Maintenance](https://img.shields.io/maintenance/yes/2026)
![License](https://img.shields.io/github/license/fabel-smith/stundenplan-card)

Eine Lovelace Custom Card zur Darstellung eines Stundenplans als Tabelle – inklusive **visuellem Editor (GUI)**, **Heute-Highlight** und **Hervorhebung des aktuellen Fachs**.

---

## ✨ Features

* Tabellenansicht (Tage × Stunden)
* Visueller Editor (kein YAML-Zwang)
* Heute-Highlight (`highlight_today`)
* Aktuelles Fach hervorheben (`highlight_current`)
* Pausen-Zeilen (`break: true` + `label`)
* Zeilen hinzufügen / löschen
* HACS-kompatibel

---

## 📸 Screenshot

![Screenshot](https://raw.githubusercontent.com/fabel-smith/stundenplan-card/main/screenshot.png)

---

## 🔁 Wechselwochen (A/B) – automatisch nach Kalenderwoche

Diese Funktion richtet sich an Schulen mit **A/B-Wochenmodell**.
Empfohlen ist der Standardfall: **strikt nach Kalenderwoche (KW)**, ohne Ferienunterbrechung.

---

### 1) Dateien anlegen (www-Ordner)

Lege die Dateien in Home Assistant ab:

* `/config/www/stundenplan/stundenplan_a.json`
* `/config/www/stundenplan/stundenplan_b.json`

**Wichtig:** Die JSON-Datei muss ein Objekt mit `plan` enthalten:

```json
{
  "plan": [
    { "Stunde": "1. 07:45 - 08:30", "Mo": "Mathe", "Di": "Deutsch", "Mi": "Englisch", "Do": "Sport", "Fr": "Bio" },
    { "break": true, "Stunde": "09:20 - 09:35", "label": "Pause" }
  ]
}
```

---

### 2) REST-Sensoren in Home Assistant anlegen

Füge in deiner `configuration.yaml` (oder in den bestehenden `rest:` Block) Folgendes hinzu:

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

Danach: **Home Assistant neu starten**.

---

### 3) Card konfigurieren (Visueller Editor)

Im Editor der Card:

1. **Wechselwochen aktivieren**
2. Modus wählen: **„KW gerade/ungerade“**
3. Festlegen:

   * **A-Woche = gerade KW** (oder umgekehrt)
4. Datenquellen setzen:

   * `source_entity_a` → `sensor.stundenplan_a`
   * `source_attribute_a` → `plan`
   * `source_entity_b` → `sensor.stundenplan_b`
   * `source_attribute_b` → `plan`
5. `source_time_key` → `Stunde` (Default)

Fertig: Die Card schaltet automatisch zwischen A/B um.

---

## Optional (Advanced): Eigene KW-Zuordnung per Datei

Wenn die Schule **nicht strikt gerade/ungerade KW** nutzt, kann alternativ eine Mapping-Datei verwendet werden.

### 1) Mapping-Datei anlegen

`/config/www/stundenplan/wechselwochen.json`

Beispiel:

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

---

### 2) REST-Sensor für Mapping hinzufügen

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

---

### 3) Card auf „Mapping-Modus“ stellen

Im Editor:

* Modus: **„Mapping-Datei“**
* `week_map_entity` → `sensor.wechselwochen_map`
* `week_map_attribute` → `2026`

Wenn die aktuelle KW im Mapping steht, wird sie verwendet.
Wenn nicht, kann optional auf gerade/ungerade zurückgefallen werden (je nach Card-Einstellung).

<a href="https://www.buymeacoffee.com/fabelsmith" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="45" alt="Buy Me a Coffee">
</a>

