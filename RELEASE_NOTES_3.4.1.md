# v3.4.1 - Vorschau-Klick öffnet wieder die passende Zelle

## Behoben

- Ein Klick auf eine Fachzelle in der Vorschau öffnet die passende Zeile im manuellen Editor und fokussiert das Fach.
- Im Bearbeitungsdialog wird nicht mehr die normale Tap-Aktion ausgelöst. Auf dem Dashboard funktionieren Ansichtswechsel und Wochen-Popup unverändert.
- Die Zellenauswahl berücksichtigt verbundene Folgestunden, leere Zellen, Pausenzeilen und A/B-Wochen beim wochenübergreifenden Rolling.
- JSON- und Integrationsquellen öffnen keinen manuellen Zelleneditor.

Bestehende Einstellungen, Farben und die Darstellung der Stundenpläne bleiben unverändert. Es ist keine Konfigurationsänderung nötig.

## Prüfung

Build, Syntax- und Verhaltenstests sowie Browser-Regressionsprüfungen erfolgreich. Die bisherigen Darstellungsvergleiche mit v3.3.3 stimmen weiterhin überein.

Die Editor-Browsertests verwenden vereinfachte Home-Assistant-Bedienelemente; ein Test direkt in einer Home-Assistant-Installation steht noch aus.

## Unterstützung

Du nutzt die Karte gerne? Über einen kleinen Kaffee als Unterstützung für die Weiterentwicklung freue ich mich: [Buy Me a Coffee](https://www.buymeacoffee.com/fabelsmith). Danke auch für eure Rückmeldungen und Verbesserungsvorschläge!
