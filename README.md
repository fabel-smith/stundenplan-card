# Stundenplan Card (Home Assistant)

[![HACS
Custom](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz)
![Version](https://img.shields.io/github/v/release/fabel-smith/stundenplan-card)
![Maintenance](https://img.shields.io/maintenance/yes/2026)
![License](https://img.shields.io/github/license/fabel-smith/stundenplan-card)

> **TL;DR** - **Automatischer Stundenplan aus stundenplan24.de?** →
> installiere die **stundenplan-suite** - **Stundenplan manuell
> anzeigen?** → nutze die **stundenplan-card**

Eine Lovelace Custom Card zur Darstellung eines Stundenplans als Tabelle
-- inklusive **visuellem Editor (GUI)**, **Heute-Highlight** und
**Hervorhebung des aktuellen Fachs**.

> **Hinweis:**\
> Diese Card ist das **Frontend**.\
> Wenn du deinen Stundenplan automatisch aus *stundenplan24.de*
> importieren möchtest (Sensoren, A/B-Wochen, Auto-Update), nutze die
> **stundenplan-suite**:\
> https://github.com/fabel-smith/stundenplan-suite

------------------------------------------------------------------------

## ✨ Features

-   Tabellenansicht (Tage × Stunden)
-   **Kompletter visueller Editor (kein YAML notwendig)**
-   Manueller Stundenplan direkt im Dialog bearbeitbar
-   Aufklappbare Stunden (Accordion-Editor)
-   Fächer je Wochentag editierbar
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

-   Start- und Endzeit
-   Fach pro Wochentag (Mo--Fr)
-   Pause (colspan-Zeile)
-   Hintergrundfarbe je Fach
-   Transparenz
-   Textfarbe

Mit **„+ Stunde darunter"** oder **„+ Pause darunter"** kannst du den
Plan sehr schnell aufbauen.

Diese Methode benötigt: - keine REST-Sensoren - keine JSON-Dateien -
keine externe Integration

------------------------------------------------------------------------

## ⚠️ Wichtiger Hinweis zur Nutzung mit stundenplan24

Die Nutzung der *stundenplan-suite* bzw. der automatischen
Datenübernahme aus **stundenplan24.de** erfolgt **auf eigene
Verantwortung**.

Die dargestellten Daten können: - verspätet sein - unvollständig sein -
fehlerhaft übertragen werden

Diese Card ist **kein offizielles System der Schule** und kein
verlässlicher Ersatz für: - den offiziellen Vertretungsplan - schulische
Mitteilungen - Lehrerankündigungen

Bitte den Stundenplan **regelmäßig mit den offiziellen Quellen der
Schule abgleichen**.\
Verlasse dich nicht ausschließlich auf die Anzeige in Home Assistant,
insbesondere bei: - Vertretungen - Raumänderungen - Ausfällen

Ziel ist eine komfortable Anzeige -- **nicht eine garantierte
Richtigkeit**.\
Ich übernehme keine Haftung dafür, dass Termine korrekt oder vollständig
dargestellt werden.

------------------------------------------------------------------------

## 🔄 Update-Hinweise (v3.1.0)

Version **3.1.0** führt einen komplett überarbeiteten manuellen Editor
ein.

Bestehende Konfigurationen funktionieren weiterhin unverändert.\
Du kannst jederzeit zusätzlich den manuellen Editor nutzen oder darauf
umsteigen.

------------------------------------------------------------------------

`<a href="https://www.buymeacoffee.com/fabelsmith" target="_blank">`{=html}
`<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="45" alt="Buy Me a Coffee">`{=html}
`</a>`{=html}
