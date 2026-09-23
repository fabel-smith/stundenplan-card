# Stundenplan Card (Home Assistant)

[![HACS
Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
![Version](https://img.shields.io/github/v/release/fabel-smith/stundenplan-card)
![Maintenance](https://img.shields.io/maintenance/yes/2026)
![License](https://img.shields.io/github/license/fabel-smith/stundenplan-card)

> **TL;DR** - **Automatischer Stundenplan aus Stundenplan24 oder Schulmanager Online?** →
> installiere die **stundenplan-suite** - **Stundenplan manuell
> anzeigen?** → nutze die **stundenplan-card**

Eine Lovelace Custom Card zur Darstellung eines Stundenplans als Tabelle
-- inklusive **visuellem Editor (GUI)**, **Heute-Highlight** und
**Hervorhebung des aktuellen Fachs**.

> **Hinweis:**\
> Diese Card ist das **Frontend**.\
> Wenn du deinen Stundenplan automatisch aus *stundenplan24.de* oder aus
> der Home-Assistant-Integration *Schulmanager Online* übernehmen möchtest,
> nutze die
> **stundenplan-suite**:\
> https://github.com/fabel-smith/stundenplan-suite

------------------------------------------------------------------------

## ✨ Features

-   Tabellenansicht (Tage × Stunden)
-   **Kompletter visueller Editor (kein YAML notwendig)**
-   Manueller Stundenplan direkt im Dialog bearbeitbar
-   Aufklappbare Stunden (Accordion-Editor)
-   Fächer je Wochentag editierbar
-   Fach kann um Lehrer und Raum ergänzt werden
-   Mehrere Einträge pro Stunde möglich (Zellen teilbar / Leerzeile)
-   Kompletter Stundenplan direkt im UI pflegbar
-   Pausen-Zeilen (`break: true` + `label`)
-   **Cell-Styles (pro Fachzelle):**
    -   Hintergrundfarbe
    -   Transparenz
    -   Textfarbe
-   Heute-Highlight (`highlight_today`)
-   Aktuelles Fach hervorheben (`highlight_current`)
-   Stunden untereinander einfügen / Pausen darunter einfügen
-   Zeilen löschen
-   A/B-Wochen
-   HACS-kompatibel

------------------------------------------------------------------------

## 📸 Screenshot

![Screenshot](https://raw.githubusercontent.com/fabel-smith/stundenplan-card/main/screenshot.png)

### Neuer visueller Editor (manueller Stundenplan)

Der Stundenplan kann vollständig direkt im Home-Assistant-Dialog
erstellt werden ---\
kein YAML und keine JSON-Dateien notwendig.

-   Stunde anklicken → Details bearbeiten
-   Fach pro Wochentag eintragen
-   Lehrer und Raum optional ergänzen
-   Farben individuell setzen
-   Pausen als eigene Zeile definieren

------------------------------------------------------------------------

## 🧩 Installation

### Installation über HACS (empfohlen)

HACS öffnen → Frontend\
Stundenplan Card installieren\
Home Assistant neu laden (oder Browser-Cache aktualisieren)

Die Lovelace-Resource wird in der Regel automatisch hinzugefügt.

### Manuelle Prüfung der Resource (nur falls nötig)

Einstellungen → Dashboards → Ressourcen

URL:

    /local/stundenplan-card/stundenplan-card.js

Typ:

    JavaScript-Modul

> **Hinweis (Browser-Cache):**\
> Nach einem Update der Card kann es notwendig sein den Browser-Cache zu
> leeren (`STRG + F5`), da Home Assistant Custom Cards aggressiv cached.

------------------------------------------------------------------------

## 🔁 Wechselwochen (A/B)

Die Card unterstützt Schulen mit **A/B-Wochenmodell**.

Empfohlener Standardfall: - Umschaltung rein nach Kalenderwoche (gerade
/ ungerade KW) - keine Ferienlogik erforderlich

------------------------------------------------------------------------

## 🧑‍🏫 Manueller Stundenplan (ohne Sensoren, ohne JSON)

Du kannst den Stundenplan komplett direkt in der Card pflegen.

Vorgehen:

1.  Card zum Dashboard hinzufügen
2.  Bearbeiten öffnen
3.  Abschnitt **„Manuell (rows)"** aufklappen
4.  **+ Stunde** oder **+ Pause** hinzufügen
5.  Stunde anklicken → Details bearbeiten

### Einstellbar pro Stunde

-   Fachbezeichnung
-   Lehrer (optional)
-   Raum (optional)
-   Start- und Endzeit
-   Fach pro Wochentag (Mo--Fr)
-   Pause (colspan-Zeile)
-   Hintergrundfarbe je Fach
-   Transparenz
-   Textfarbe

Mit **„+ Stunde darunter"** oder **„+ Pause darunter"** kannst du den
Plan sehr schnell aufbauen.

### Manuelle Wechselwochen

Im Abschnitt **„Manuell (rows)"** kannst du **Wechselwochen A/B**
aktivieren. Anschließend lassen sich Woche A und Woche B getrennt im
visuellen Editor pflegen. Die Karte wechselt automatisch anhand der
Kalenderwoche. Dabei kannst du festlegen, ob Woche A auf eine gerade oder
ungerade Kalenderwoche fällt.

Im YAML entsprechen dem die Einstellungen:

```yaml
source_type: manual
week_mode: kw_parity
week_a_is_even_kw: true
rows:       # Woche A
  - time: 1.
    cells: [Mathe, Deutsch, Englisch, Sport, Biologie]
rows_b:     # Woche B
  - time: 1.
    cells: [Deutsch, Mathe, Kunst, Englisch, Sport]
```

### Zeitspalte ausblenden

Für Essenspläne und andere Wochenübersichten kann die Spalte
**„Stunde"** im Bereich **„Allgemein"** deaktiviert werden. Im YAML:

```yaml
show_time_column: false
```

Mehrere Fächer innerhalb einer Stunde sind möglich (z. B.
Gruppenunterricht / AG / Teilung).\
Durch eine Leerzeile kann eine Stunde mehrfach unterteilt werden.

### Unterschiedliche Unterrichtszeiten je Tag

JSON- und Sensorquellen können optional für jede Tageszelle eine eigene Zeit
über `cell_times` bereitstellen. Das ist beispielsweise für verkürzte
Unterrichtstage geeignet. Jeder Eintrag darf ein Zeitbereich als Text oder ein
Objekt mit `time`, `start` und `end` sein:

```yaml
time: 08:00-08:45
cells: [Mathe, Englisch]
cell_times:
  - start: "08:00"
    end: "08:45"
  - "08:00-08:30"
```

In der Wochenansicht verwendet die gemeinsame Stunden-Spalte heute als
Fokustag, andernfalls den ersten sichtbaren Tag. In der rollierenden Ansicht
gilt der erste sichtbare Tag. Die Hervorhebung der aktuellen Stunde
berücksichtigt dabei ebenfalls die jeweilige Zellzeit.

Diese Methode benötigt: - keine REST-Sensoren - keine JSON-Dateien -
keine externe Integration

------------------------------------------------------------------------

## 🔌 Nutzung mit der stundenplan-suite

Die Card dient sowohl als Anzeige für automatisch importierte Daten
(*stundenplan-suite*) als auch als vollständig eigenständig gepflegter
Stundenplan.

Die Suite unterstützt zwei Datenquellen:

- **Stundenplan24** wird direkt von der Suite abgerufen.
- **Schulmanager Online** wird über die bereits installierte
  [Schulmanager-Integration](https://github.com/rwunsch/schulmanager-online-hass)
  angebunden. Die Suite liest deren Kalender- und Stundenplan-Entitäten und
  erzeugt daraus den einheitlichen Wochensensor für die Karte.

In der Kartenkonfiguration unter **Datenquellen → Stundenplan Suite
(Integration)** einfach den passenden `*_woche`-Sensor auswählen. Die Karte
benötigt keine Schulmanager-Zugangsdaten. Weitere Informationen zur Einrichtung
stehen im Repository der
[Stundenplan Suite](https://github.com/fabel-smith/stundenplan-suite).

------------------------------------------------------------------------

## ⚠️ Wichtiger Hinweis zu automatischen Datenquellen

Die Nutzung der *stundenplan-suite* bzw. der automatischen
Datenübernahme aus **stundenplan24.de** oder **Schulmanager Online** erfolgt **auf eigene
Verantwortung**.

Diese Anzeige ist kein offizielles System der Schule.\
Sie dient ausschließlich der komfortablen Darstellung.

Für die Richtigkeit, Vollständigkeit oder Aktualität der Daten wird
keine Gewähr übernommen.\
Bitte regelmäßig mit den offiziellen Schulquellen abgleichen und nicht
ausschließlich darauf verlassen, insbesondere bei Vertretungen,
Raumänderungen oder Unterrichtsausfall.

------------------------------------------------------------------------

## 🔄 Update-Hinweise (v3.1.0)

Version **3.1.0** führt einen komplett überarbeiteten manuellen Editor
ein.

Bestehende Konfigurationen funktionieren weiterhin unverändert.\
Du kannst jederzeit zusätzlich den manuellen Editor nutzen oder darauf
umsteigen.

------------------------------------------------------------------------

## ☕ Unterstützung

Wenn dir die Card hilft oder dir Zeit spart, freue ich mich über Unterstützung:

<a href="https://www.buymeacoffee.com/fabelsmith" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="45" alt="Buy Me a Coffee">
</a>
