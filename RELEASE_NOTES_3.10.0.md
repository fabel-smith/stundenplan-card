## Farben pro Fach

![Fachfarben und kompakte Zeitangaben im Editor](https://raw.githubusercontent.com/fabel-smith/stundenplan-card/v3.10.0/docs/screenshots/release-3.10.0.png)

*Beispiel mit erfundenen Stundenplandaten und vereinfachten HA-Bedienelementen.*

Unter **Farben → Farben pro Fach** lassen sich Hintergrund, Textfarbe und Transparenz je Fach einstellen. Das funktioniert auch mit Schulmanager, JSON-Sensoren und der Stundenplan Suite. Die Farben bleiben beim Wochenwechsel dem Fach zugeordnet; die Quelldaten werden nicht verändert. Ohne eigene Fachfarben bleibt alles wie bisher.

## Kalender direkt auswählen

Unter **Termine und Hinweise eintragen** kann jetzt ein vorhandener Home-Assistant-Kalender ausgewählt werden. Ein zusätzlicher Template-Sensor ist dafür nicht mehr nötig.

Ganztägige Termine für einen einzelnen Tag heißen beispielsweise **Mathearbeit [3,4]**: Die Karte zeigt den Hinweis am jeweiligen Datum in der 3. und 4. Stunde. Sie lädt die kommenden 60 Tage und aktualisiert alle fünf Minuten. Termine mit Uhrzeit, mehrtägige Termine und Titel ohne Stundenangabe werden nicht übernommen. Bearbeitet werden die Einträge im Kalender.

Die bisherige zusätzliche Sensorquelle und manuelle Termine funktionieren weiterhin. Für denselben Kalender bitte nur einen Zugangsweg verwenden.

## Weitere Verbesserungen

- Schulmanager-Zeitangaben wie `1. 07:45:00 - 08:30:00` erscheinen auf zwei Zeilen, ohne Sekunden und ohne über die Zeitspalte hinauszulaufen. Auch die Zuordnung von Hinweisen zu solchen Stunden wurde angepasst.
- Die Liste **Anstehende Termine** kommt ohne den zusätzlichen Erklärungstext aus. Sie bleibt optional und standardmäßig ausgeschaltet.
- Die Installationsanleitung berücksichtigt die Aufnahme in den HACS-Standardkatalog.

Bestehende Einstellungen bleiben erhalten. Ein Suite-Update ist nicht erforderlich. Nach dem HACS-Update das Dashboard vollständig neu laden. Wer einen separaten Test-Kartentyp verwendet, muss anschließend wieder auf die normale HACS-Karte wechseln.

[Fachfarben einrichten](https://github.com/fabel-smith/stundenplan-card/blob/v3.10.0/docs/SUBJECT_COLORS.md) · [Kalender verbinden](https://github.com/fabel-smith/stundenplan-card/blob/v3.10.0/docs/CALENDAR_DIRECT_TEST.md)
