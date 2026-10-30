# Direkte Kalenderauswahl (ab v3.10.0)

Ab v3.10.0 ist kein zusaetzlicher Template-Sensor mehr erforderlich.

Unter **Termine und Hinweise eintragen** kann ein vorhandener HA-Kalender
ausgewaehlt werden. Die Karte liest ihn direkt; ein Template-Sensor ist nicht
erforderlich. Ohne Auswahl bleibt das bisherige Verhalten erhalten.

## Termine anlegen

- Einen **ganztaegigen Termin fuer genau einen Tag** im ausgewaehlten Kalender anlegen.
- Den Titel beispielsweise `Mathearbeit [3,4]` oder `Badehose [1,2]` nennen.
- Die Zahlen in eckigen Klammern bezeichnen Unterrichtsstunden, nicht Uhrzeiten.
- Die Karte ordnet Hinweise nach Datum und Stunde zu, unabhaengig vom Fachnamen.
- Termine mit Uhrzeit, mehrtaegige Termine und Titel ohne Stundenangabe werden
  vorerst nicht uebernommen. Die Karte zeigt eine Zusammenfassung uebersprungener Eintraege.
- Kalenderhinweise werden im Kalender bearbeitet. Manuelle Hinweise bleiben im
  Karteneditor bearbeitbar. Die Karte schreibt nichts in den Kalender zurueck.

## Aktualisierung und Grenzen

### Benannte Zeilen ab v3.11.0

Neben Zahlen sind benannte Zeilen moeglich: `Pasta [Essen]`, `Erinnerung [MP]`
oder `Treffpunkt [Lernzeit A]`. Gemeint ist die Bezeichnung in der linken
Stundenspalte, nicht das Fach in einer Tageszelle. Die Zeile muss bereits im
Stundenplan angelegt sein; der Kalendereintrag erzeugt keine neue Zeile.
Gross-/Kleinschreibung und mehrfach vorhandene Leerzeichen spielen keine Rolle.
Mehrere Zeilen werden mit Kommas getrennt, z. B. `[5,Essen]`.
Benannte Zeilen beginnen mit einem Buchstaben. Zahlen bleiben auf 1 bis 99
begrenzt; Bereiche wie `[3-4]` sind weiterhin keine gueltige Stundenangabe.
Diese Erweiterung betrifft die direkte Kalenderauswahl, nicht das alte
Template-Sensor-Beispiel. Mit v3.10.0 sind nur nummerierte Stunden moeglich.

## Abruf

Die Karte liest beim Laden und danach alle fuenf Minuten die kommenden 60 Tage
ab heute. Zum sofortigen Einlesen kann die Dashboard-Seite neu geladen werden.
Auch Termine ohne bereits geladenen Stundenplan werden beruecksichtigt. Der
optionale Schalter fuer anstehende Termine unter der Tabelle macht diese sichtbar.
Vergangene Kalendertermine werden nicht nachgeladen.

Bei einem Ladefehler werden Kalenderhinweise nicht als aktuelle Daten angezeigt;
manuelle Hinweise und die bisherige Sensorquelle bleiben nutzbar. Ein erneuter
Versuch erfolgt nach einer Minute. Entfernen der Kalenderauswahl loescht keine
Termine im Kalender.

```yaml
calendar_entity: calendar.schultermine
show_upcoming_notes: true
```

Die bisherige Option `dated_entries_entity` bleibt kompatibel. Wird derselbe
Kalender bereits ueber einen Sensor eingebunden, sollte nur einer der beiden
Zugangswege konfiguriert werden.

## Lokaler Testbuild

`npx vite build --config vite.calendar-test.config.ts` erzeugt einen gesonderten
Kartentyp `custom:stundenplan-card-calendar-test` mit eigenem Editor und eigener
Versionskennung. Die HACS-Ressource und deren Kartentyp werden nicht ersetzt.

Technische Grundlage: [Home Assistant Calendar REST API](https://developers.home-assistant.io/docs/api/rest/#get-apicalendarscalendar-entity_idstarttimestampendtimestamp).
