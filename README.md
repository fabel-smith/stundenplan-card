# Stundenplan Card (Home Assistant)

[![HACS
Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
![Version](https://img.shields.io/github/v/release/fabel-smith/stundenplan-card)
![Maintenance](https://img.shields.io/maintenance/yes/2026)
![License](https://img.shields.io/github/license/fabel-smith/stundenplan-card)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-Unterst%C3%BCtzen-FFDD00?logo=buymeacoffee&logoColor=000000)](https://www.buymeacoffee.com/fabelsmith)

> **Welche Komponenten brauchst du?**
> - **Manueller Stundenplan oder vorhandener JSON-Sensor:** Die **stundenplan-card** genügt.
> - **Stundenplan24:** **stundenplan-suite** für die Daten und **stundenplan-card** für die Anzeige.
> - **Schulmanager Online:** Vorhandene **Schulmanager-Integration** mit der **stundenplan-suite** verbinden und in der **stundenplan-card** anzeigen.

Eine flexible Stundenplan-Karte für Home Assistant mit **visuellem Editor**,
**A/B-Wochen**, **Wochen- und Rolling-Ansicht** sowie individuellen Farben.
Sie zeigt manuelle Pläne, Daten aus JSON-Sensoren oder Wochensensoren der
Stundenplan Suite an und kann den aktuellen Unterricht hervorheben.

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
-   Ganze Woche oder **Ab heute (rolling)**, optional auf die Kalenderwoche begrenzt
-   Normale und kompakte Darstellung
-   Titelzeile, Datum und Zeitspalte optional ausblendbar
-   Ansicht umschalten oder Wochen-Popup per Tipp auf die Karte
-   Gleiche Folgestunden verbinden und leere Endstunden ausblenden (optional)
-   Gleichmäßige Tages-Spalten für mehrere gleich breite Karten (optional)
-   **Kompletter visueller Editor (kein YAML notwendig)**
-   Manueller Stundenplan direkt im Dialog bearbeitbar
-   Aufklappbare Stunden (Accordion-Editor)
-   Fächer je Wochentag editierbar
-   Fach kann um Lehrer und Raum ergänzt werden
-   Mehrere Einträge pro Stunde möglich (Zellen teilbar / Leerzeile)
-   Kompletter Stundenplan direkt im UI pflegbar
-   Pausen-Zeilen (`break: true` + `label`)
-   Farbpalette, freier Farbwähler und Transparenzregler für Highlights und manuelle Zellen
-   Hintergrund- und Textfarben pro Fachzelle; JSON-/Sensorquellen unterstützen `cell_styles`
-   Heute-Highlight (`highlight_today`)
-   Aktuelles Fach hervorheben (`highlight_current`)
-   Stunden untereinander einfügen / Pausen darunter einfügen
-   Zeilen löschen
-   A/B-Wochen
-   HACS-kompatibel

------------------------------------------------------------------------

## 📸 Screenshot

![Screenshot](https://raw.githubusercontent.com/fabel-smith/stundenplan-card/main/screenshot.png)

*Beispiel aus einer älteren Version. Editor, Bezeichnungen und Anordnung der
Bedienelemente wurden seitdem überarbeitet; das Bild zeigt nicht den aktuellen
Editor von v3.4.0.*

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
3.  Unter **Datenquellen** die Quelle **Manuell (rows)** auswählen
4.  Den nun sichtbaren Abschnitt **Manueller Stundenplan** aufklappen
5.  **+ Stunde** oder **+ Pause** hinzufügen
6.  Stunde anklicken → Details bearbeiten

Für diesen manuellen Modus brauchst du weder eine externe Integration noch
JSON-Dateien oder REST-Sensoren. Auch manuelle A/B-Pläne sind ohne Suite möglich.

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

Im Abschnitt **Manueller Stundenplan** kannst du **Wechselwochen A/B**
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

## Anzeigeoptionen

Diese Optionen gelten unabhängig davon, ob die Daten manuell, aus einem
JSON-Sensor oder aus der Suite kommen.

### Zeitspalte ausblenden

Für Essenspläne und andere Wochenübersichten kann die Spalte
**„Stunde"** im Bereich **„Allgemein"** deaktiviert werden. Im YAML:

```yaml
show_time_column: false
```

### Leere Endstunden ausblenden

Unter **Allgemein → Ansicht** kann die Karte automatisch nach der letzten
belegten Stunde der aktuell sichtbaren Tage gekürzt werden. In YAML:

```yaml
trim_empty_rows: true
```

Die Einstellung entfernt nur vollständig leere Zeilen am Tabellenende. Pausen
und Freistunden zwischen belegten Stunden bleiben erhalten. In der
rollierenden Ansicht werden ausschließlich die gerade sichtbaren Tage
berücksichtigt.

### Doppelstunden verbinden

Unter **Allgemein → Ansicht** können direkt aufeinanderfolgende identische
Fächer automatisch zu einer gemeinsamen Zelle verbunden werden. In YAML:

```yaml
merge_double_lessons: true
```

Die Karte verbindet nur nicht-leere Zellen mit demselben Text und demselben
Zellstil. Pausenzeilen unterbrechen die Verbindung. Dadurch bleiben echte
Freistunden erhalten, und Ausfälle oder Änderungen werden nicht versehentlich
mit regulären Stunden zusammengefasst. Die Markierung der aktuellen Stunde gilt
für den gesamten verbundenen Zeitraum.

Unterschiede, die bei der Darstellung keine Wirkung haben (beispielsweise eine
Transparenzangabe ohne Hintergrundfarbe), verhindern die Verbindung nicht.

### Gleichmäßige Spaltenbreiten


Für mehrere gleich breite Stundenplan-Karten mit gleicher Anzahl sichtbarer
Tage kann unter
**Allgemein → Ansicht** die Option **Gleichmäßige Spaltenbreiten** aktiviert
werden. In YAML:

```yaml
equal_column_widths: true
```

Dann werden die Tages-Spalten gleichmäßig auf die verfügbare Kartenbreite
verteilt und lange Fachbezeichnungen innerhalb ihrer Spalte umgebrochen. Das
funktioniert sowohl mit der ganzen Woche als auch mit einer eintägigen
Rolling-Ansicht. Ohne diese Option bestimmt der Inhalt wie bisher die Breite.

### Rolling auf eine Kalenderwoche begrenzen

Unter **Allgemein → Rolling** gibt es optional **Auf Kalenderwoche begrenzen**:

```yaml
view_mode: rolling
days_ahead: 4
rolling_week_only: true
```

Ab Donnerstag erscheinen bei Schultagen Mo–Fr nur Donnerstag und Freitag.
Die Grenze ist der Sonntag der Woche des Starttags. Am Wochenende springt die
Ansicht wie bisher zum nächsten konfigurierten Schultag (normalerweise Montag).
Auch die eingestellte Umschaltzeit bleibt wirksam: Nach der letzten Stunde am
Freitag kann Montag bereits der neue Starttag sein. Die Option ist standardmäßig
aus; bestehende Rolling-Ansichten bleiben wochenübergreifend.

### Editor und Farben

Der Editor passt seine Felder an die verfügbare Breite an. Ansichtsmodus,
Ansichtsdichte und Tap-Aktion werden über kompakte Dropdowns ausgewählt.
Der Bereich **Manueller Stundenplan** erscheint nur bei der Datenquelle
**Manuell**. Gespeicherte A/B-Pläne bleiben bei einem Quellenwechsel erhalten.

Unter **Farben** und bei manuellen Zellen stehen eine Farbpalette, ein freier
Farbwähler und ein Transparenzregler bereit: **0 % = deckend, 100 % = durchsichtig**.
Bestehende Farbwerte werden beim Öffnen nicht verändert. Individuelle CSS-Werte
können weiterhin unter **Farbcode** eingetragen werden. Die Schalter für farbige
Fach- und Zeittexte befinden sich unter **Highlights**.

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

## Update-Hinweise

**v3.4.0** ergänzt einen kompakteren, an die Editorbreite angepassten Dialog,
Farbpalette und Transparenzregler sowie die optionale Rolling-Wochengrenze.
Der manuelle Editor erscheint nur bei manueller Datenquelle; gespeicherte
A/B-Pläne bleiben beim Quellenwechsel erhalten.

Bestehende Einstellungen und Farbwerte bleiben erhalten. Die neue
Wochenbegrenzung ist standardmäßig ausgeschaltet.

Alle Änderungen und Hinweise stehen in den
[GitHub-Releases](https://github.com/fabel-smith/stundenplan-card/releases).

------------------------------------------------------------------------

## ☕ Unterstützung

Wenn dir die Card hilft oder dir Zeit spart, freue ich mich über Unterstützung:

<a href="https://www.buymeacoffee.com/fabelsmith" target="_blank">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="45" alt="Buy Me a Coffee">
</a>
