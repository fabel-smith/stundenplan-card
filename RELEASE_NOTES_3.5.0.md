## Neu

Der neue aufklappbare Bereich **Schrift & Abstände** macht die Karte besser an Wallpanels und unterschiedliche Bildschirmgrößen anpassbar. Die Erweiterung greift den Wunsch aus [Issue #11](https://github.com/fabel-smith/stundenplan-card/issues/11) auf.

- Einstellbare Schriftgrößen für Fächer, Stunden und Uhrzeiten, Wochentage sowie Raum-, Lehrer- und Hinweistext.
- Optionale Mindesthöhe der Stundenzeilen. Längere Inhalte können die Zeile weiterhin vergrößern; Pausenzeilen bleiben kompakt.
- Titelgröße und Titel-Schriftfamilie befinden sich ebenfalls im neuen Bereich. Für den Titel der Kompaktansicht gibt es einen eigenen optionalen Größenwert.
- **Größen zurücksetzen** stellt die bisherigen Größen wieder her. Farben und Titel-Schriftfamilie bleiben erhalten.
- Zusätzlich stehen CSS-Variablen für individuelle Anpassungen bereit. Beispiele und die Zuordnung der Variablen stehen im README.

Die Einstellungen funktionieren für manuelle Pläne, JSON-/Sensorquellen und die Stundenplan Suite sowie in normaler Ansicht, Kompaktansicht und Wochen-Popup.

## Bestehende Karten

Die neuen Felder sind optional. Leere Felder behalten die bisherigen Vorgaben der jeweiligen Ansicht bei. Vorhandene Farben, Stundenpläne und Anzeigeoptionen bleiben erhalten; es ist keine Konfigurationsänderung erforderlich.

## Prüfung

Build, Syntaxprüfung und Verhaltenstests erfolgreich. Browserprüfungen decken Schriftgrößen, CSS-Vererbung, wachsende Zeilen, verbundene Folgestunden, Popup und das Speichern bzw. Zurücksetzen der Einstellungen ab. Acht Ansichtsvarianten ohne neue Größenangaben stimmen bei Texten, Farben und Zellmaßen mit v3.4.1 überein. Das Editorlayout wurde bei 320 und 440 Pixeln geprüft.

Die Editor-Browsertests verwenden vereinfachte Home-Assistant-Bedienelemente; ein Test direkt in Home Assistant steht noch aus.

## Unterstützung

Du nutzt die Karte gerne? Über einen kleinen Kaffee als Unterstützung für die Weiterentwicklung freue ich mich: [Buy Me a Coffee](https://www.buymeacoffee.com/fabelsmith). Danke auch für eure Rückmeldungen und Verbesserungsvorschläge!
