# Ferienkalender (ab v3.11.0)

Im Karteneditor unter **Ferien** einen vorhandenen Home-Assistant-Kalender
auswählen, zum Beispiel den Schulmanager-Kalender. Ein zusätzlicher Sensor
oder ein eigener Kalender nur für Ferien ist nicht notwendig.

Die Karte zeigt erkannte Ferien mit Zeitraum über der Tabelle und markiert
die betroffenen Spalten mit **Ferien**. Das funktioniert auch bei mehrtägigen
Einträgen, in der Rolling-Ansicht und ohne geladenen Unterrichtsplan.
Es werden nur Ferien angezeigt, die mindestens einen sichtbaren Tag betreffen.
Für Ferien in der nächsten Woche die entsprechende Woche oder Rolling-Ansicht wählen.

**Unterricht und Hinweise bleiben unverändert.** Ferien werden nicht automatisch
übersprungen; diese erste Version blendet keine gelieferten Stunden aus.
Ohne Kalenderauswahl bleibt die Darstellung unverändert.

## Erkennung

Nur ganztägige Einträge mit vollständigem passendem Titel werden berücksichtigt.
Groß-/Kleinschreibung und zusätzliche Leerzeichen spielen keine Rolle.
Erkannt werden:

- Ferien, Schulferien
- Herbstferien, Winterferien, Weihnachtsferien
- Osterferien, Pfingstferien, Sommerferien
- Faschingsferien, Fastnachtsferien, Frühjahrsferien
- Beweglicher Ferientag, Bewegliche Ferientage

Elternabende, Ferienbetreuung, öffentliche Feiertage und sonstige Schultermine
werden nicht automatisch als Ferien behandelt. Unter **Welche Einträge zählen
als Ferien?** lassen sich weitere vollständige Ferienbezeichnungen ergänzen,
jeweils eine pro Zeile. Beispiel: `Herbstferien BW`.
Ein Eintrag namens `Keine Herbstferien` ist ohne ausdrückliche Aufnahme kein Treffer.
Beschreibungen werden nicht zur Erkennung verwendet.

## Aktualisierung

Die Karte liest den Kalender nur, schreibt nichts zurück und aktualisiert die
Ferien alle fünf Minuten. Beim Wechsel des angezeigten Zeitraums wird neu geladen.
Bereits begonnene Ferien werden berücksichtigt, sofern der Kalender sie für den
angefragten Zeitraum liefert. Das Enddatum ganztägiger HA-Einträge ist exklusiv:
Start 26.10. und Ende 01.11. bedeutet Ferien bis einschließlich 31.10.

Bei einem nicht verfügbaren Kalender oder Ladefehler entfernt die Karte dessen
Ferienmarkierungen und zeigt einen Hinweis. Fehlende Daten bedeuten nicht
automatisch Ferien oder Unterricht. Nach einem Ladefehler erfolgt ein erneuter
Versuch in einer Minute. Ohne ausgewählten Kalender werden keine Ferien abgefragt.

```yaml
holiday_calendar_entity: calendar.schulkalender
# Optional: zusätzliche vollständige Bezeichnungen, keine Teilwörter.
holiday_extra_titles:
  - Herbstferien BW
```

Die direkte Kalenderquelle für Arbeiten (`calendar_entity`) ist unabhängig davon.
Sie erwartet weiterhin einzelne ganztägige Termine mit Stundenangabe, etwa
`Mathearbeit [3,4]`. Ein gemischter Schulkalender kann als Ferienquelle dienen,
ohne Elternabende in Unterrichtsausfälle umzudeuten.
