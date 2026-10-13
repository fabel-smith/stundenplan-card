# Termine & Abweichungen

Verfuegbar ab v3.9.0.

Im Karteneditor gibt es zwei unabhaengig aufklappbare Bereiche:
**Termine und Hinweise eintragen** fuer Diktate, Klassenarbeiten und Erinnerungen sowie
**Fachabweichungen an bestimmten Tagen** zum Ersetzen eines Fachnamens.
Bestehende Karten bleiben ohne neue Eintraege unveraendert. Die Funktion
arbeitet mit manuellen Plaenen, JSON-Sensoren, bestehenden JSON-Dateiquellen
und der Stundenplan Suite. Eine Aenderung an der Suite ist nicht erforderlich.

## Im Editor

1. **Termine und Hinweise eintragen** oeffnen und in der Vorschau auf eine
   Unterrichtsstunde klicken. Datum und Stunde werden uebernommen.
   Alternativ **+ Termin hinzufuegen** anklicken, auch fuer spaetere Termine.
2. Termintext und Unterrichtsstunden eintragen, z. B. `Klassenarbeit Mathe`
   und `1, 2`. Eine Fachzuordnung ist bei neuen Terminen nicht erforderlich.
3. Das Datum im Kalender auswaehlen und **Datum hinzufuegen** anklicken.
   Weitere Termine koennen derselben Regel hinzugefuegt werden. Alternativ
   die Datumsliste im Format `JJJJ-MM-TT` bearbeiten.

Bei manuellen Plaenen erstellt der Vorschauklick nur dann einen Termin, wenn
der Termine-Bereich geoeffnet ist. Sonst bearbeitet er wie bisher die Fachzelle.
Beim Ueberfahren einer Vorschauzelle mit der Maus zeigt ein Tooltip die Aktion:
**Termin oder Hinweis hinzufuegen** bzw. **Fach bearbeiten**. Bestehende Hinweise
zeigen **Hinweis bearbeiten**. Diese Tooltips gelten nur im Karteneditor,
nicht auf dem Dashboard; auf Touchgeraeten bleibt die Texteinfuehrung sichtbar.
Bei zusammengefassten Stunden bestimmt die angeklickte Zeile die Stunde.
Vorschauklicks oeffnen nur einen vorlaeufigen Entwurf im Editor. Weitere Klicks
aendern dessen Datum und Stunde, statt leere Termine anzulegen. Der Entwurf
wird erst bei vollstaendigen Angaben (Text, Datum, Stunde) in die Kartenkonfiguration
uebernommen. Farben und andere Entwurfsangaben bleiben beim Wechsel der Stunde erhalten.
Leere oder unvollstaendige Entwuerfe werden nicht gespeichert, auch nicht beim
Speichern anderer Karteneinstellungen. Das **X rechts in der Eintragsueberschrift**
entfernt einen Termin oder verwirft einen Entwurf, auch im zugeklappten Zustand.
Die Schaltflaeche ist per Tastatur bedienbar und hat eine erklaerende Beschriftung.
Bereits gespeicherte leere Eintraege werden nicht automatisch entfernt.
Ein Klick direkt auf einen bestehenden Hinweis oeffnet dessen Eintrag, ohne
einen neuen Termin anzulegen. Das gilt auch fuer vergangene und anstehende
Termine; Enter oder Leertaste funktionieren ebenfalls. Externe Sensorhinweise
bleiben schreibgeschuetzt und muessen an ihrer Quelle bearbeitet werden.

Die zusaetzliche Liste **Anstehende Termine** ist standardmaessig ausgeblendet.
Mit **Anstehende Termine unter der Tabelle anzeigen** im Termine-Bereich
(`show_upcoming_notes: true` in YAML) werden Termine ausserhalb der angezeigten
Stunden eingeblendet. Ausschalten versteckt nur diese Liste, nicht die Hinweise
in den Unterrichtszellen, und loescht keine Termine.
Damit lassen sich Klassenarbeiten schon vor dem Laden der entsprechenden
Stundenplanwoche erfassen. Ein Termin bestaetigt keinen noch unbekannten Unterricht.
In der passenden Zelle wird der Hinweis auch bei leerem oder ausgeblendetem Fach
angezeigt. Er wird nicht zusaetzlich in der Terminliste wiederholt.

Die Ueberschrift zeigt den Termintext, darunter Datum und Stunden. Bei mehreren
Tagen zeigt sie Anzahl, naechsten und letzten Termin. Alle Daten bleiben aufgeklappt sichtbar.

Aeltere Hinweise ohne `match: period` behalten ihre bisherige Fachzuordnung.
Unter **Bisherige Fachzuordnung** kann sie bearbeitet oder nach Eingabe von Stunden
ausdruecklich mit **Auf Datum und Stunde umstellen** entfernt werden.

Unter **Fachabweichungen an bestimmten Tagen** bleibt das urspruengliche Fach
erforderlich, z. B. `BSC` fuer einen Wechsel zu `Schwimmen`. Die Stunden sind dort
optional: Leer bedeutet alle passenden Fachstunden am Datum. Gross-/Kleinschreibung
ist unerheblich; Fachnamen muessen ansonsten vollstaendig stimmen.
Auch neue Fachabweichungen beginnen als ungespeicherter Entwurf. Erst mit
urspruenglichem Fach, neuem Fachnamen und Datum werden sie uebernommen.
Mehrfaches Anklicken von **+ Abweichung hinzufuegen** oeffnet denselben Entwurf,
statt weitere leere Eintraege anzulegen. Termin- und Abweichungsentwuerfe
bleiben unabhaengig voneinander; beide lassen sich mit dem X verwerfen.

Eine Regel laesst sich deaktivieren, ohne ihre Daten zu loeschen.
Unvollstaendige Eintraege werden mit einem Hinweis nicht angewendet.

In beiden Bereichen stehen vergangene Eintraege automatisch unter
**Vergangene Termine**, standardmaessig zugeklappt. Ein Eintrag wird erst
dort einsortiert, wenn alle seine Termine vor heute liegen. Heute und
zukuenftige Termine bleiben aktuell; unvollstaendige Eintraege bleiben
ebenfalls sichtbar. Massgeblich ist das lokale Datum des anzeigenden Geraets.
Ein laenger geoeffneter Editor aktualisiert die Einteilung innerhalb einer
Minute nach dem Tageswechsel. Es werden keine Daten geloescht oder verschoben:
Die Regeln bleiben beim Zurueckblaettern wirksam. Vergangene Eintraege koennen
weiter bearbeitet werden; ein neu ergaenztes zukuenftiges Datum holt sie zurueck.

Bei Hinweisen bietet **Hinweisfarben (optional)** eine Palette,
eine eigene Farbauswahl und Transparenz fuer Text und Hintergrund. Nur der
Hinweis wird eingefaerbt, nicht die Fachzelle. **Zuruecksetzen** stellt je
Farbe die bisherige Darstellung wieder her. Ohne Farbauswahl aendert sich nichts.
Die optionalen Felder `color` und `background` funktionieren auch bei Hinweisen
aus dem zusaetzlichen Sensor. Ungueltige Farbwerte werden nicht dargestellt.

## Beispiel: Hinweis und Fachwechsel

Diese Felder zur vorhandenen Kartenkonfiguration hinzufuegen:

```yaml
dated_entries:
  - date: '2026-10-16'
    match: period
    action: note
    text: Schulaufgabe
    color: '#212121'
    background: 'rgba(255, 235, 59, 0.5)'
    periods: [3]
  - dates: ['2026-10-16', '2026-11-06']
    subject: BSC
    action: replace
    text: Schwimmen
    periods: [1, 2]
  - dates: ['2026-10-23', '2026-11-13']
    subject: BSC
    action: replace
    text: Sport
    periods: [1, 2]
```

Die Termine sind Beispiele, keine allgemein gueltige Schuljahresliste.
Bei Ferien oder Ausfall wird nichts verschoben. Es gibt bewusst keine
automatische Annahme "gerade Woche = Schwimmen". Ein Tag ohne passende
Regel zeigt unveraendert die Daten der Quelle, also beispielsweise `BSC`.

## Zusaetzliche Datenquelle

Die optionale Sensorquelle wird vorerst nicht im visuellen Editor angeboten.
Bestehende YAML-Konfigurationen bleiben unterstuetzt und werden beim Bearbeiten
im Editor beibehalten. Diese Quelle gilt
gemeinsam fuer Hinweise und Fach-Abweichungen. Sein Attribut enthaelt eine Liste im selben Format wie
`dated_entries`. Eine JSON-Zeichenkette mit dieser Liste ist ebenfalls erlaubt.
Lokale Eintraege und Sensoreintraege werden gemeinsam angewendet.

Kartenkonfiguration:

```yaml
dated_entries_entity: sensor.schultermine
dated_entries_attribute: entries
```

Beispiel fuer den Inhalt des Sensorattributs `entries`:

```json
[
  {"date": "2026-10-16", "subject": "M", "action": "note", "text": "Schulaufgabe", "periods": [3]},
  {"date": "2026-10-23", "subject": "E", "text": "Referat"}
]
```

Ohne `action` gilt `note`. `enabled: false` deaktiviert einen Eintrag.
`date` ist ein einzelnes Datum; `dates` eine Liste oder kommagetrennte
Zeichenkette. `periods` ist eine Liste oder kommagetrennte Zeichenkette.

Die Karte erstellt keinen Sensor und ruft keine Kalender-API ab. Ein
bestehender REST-/Template-Sensor oder eine Automation kann die Liste
bereitstellen. Ein unveraenderter Kalenderdatensatz mit `summary` und
`start` reicht nicht aus; er muss in das obige Format umgewandelt werden.
Beim Aktualisieren der HA-Sensordaten aktualisiert sich die Anzeige mit.
Ist der Termin-Sensor nicht verfuegbar oder das Attribut ungueltig, werden
seine Eintraege nicht verwendet. Ein Hinweis erscheint; der Stundenplan
und gueltige lokale Regeln bleiben verfuegbar.

## Verhalten und Grenzen

- Abgleich nach **konkretem Datum**, auch beim Wochenwechsel, Jahreswechsel,
  A/B-Wochen, Wochen-Popup und wiederholten Wochentagen in Rolling.
- Ein Hinweis wird zusaetzlich angezeigt. Das Fach bleibt erhalten.
- Ein Fachwechsel ersetzt nur die erste Zeile des passenden Fachblocks.
  Uhrzeit, Raum, Lehrkraft und Zellfarben bleiben erhalten.
- Fachwechsel und alte fachbezogene Hinweise vergleichen das urspruengliche Fach. Ein Fachwechsel loest
  keine weitere Regel fuer den neuen Namen aus.
- Pausen werden nicht durch Termine belegt. Neue Hinweise nach Datum und Stunde
  sind unabhaengig vom Fachinhalt; sie ersetzen keinen Unterricht.
- Erkennbare Ausfall-/Vertretungsmarker im Text verhindern einen Fachwechsel.
  Nicht uebermittelte oder nur durch eine Farbe codierte Aenderungen kann
  die Karte nicht verlaesslich erkennen. Eine Farbauswahl allein ist kein
  Ausfallmerkmal. Datumsregeln ersetzen keine aktuellen Schuldaten.
- Bei unterschiedlichen Fachwechseln fuer dieselbe Zelle bleibt das Original
  erhalten; ein Konflikthinweis erscheint. Gleiche Hinweise werden nur einmal
  angezeigt.
- Faecherfilter gelten vor und nach dem Fachwechsel. Ausgeblendete Faecher
  werden nicht durch Termine wieder sichtbar. Zeilen mit einem datums- und
  stundenbezogenen Hinweis bleiben beim Kuerzen erhalten. Hinweise verlaengern
  nicht den fuer den Rolling-Tageswechsel berechneten Unterrichtstag.
- Doppelstunden werden nur zusammengefasst, wenn auch die Hinweise identisch
  sind. Ein nur fuer Stunde 2 geltender Hinweis trennt die Darstellung wieder.
- Parallele Fachbloecke muessen fuer die Regelzuordnung durch Leerzeilen
  getrennt sein. Raum oder Lehrkraft werden nicht als Fach durchsucht.
- Rolling blendet die Termine passend zum angezeigten Datum ein. Die Funktion
  beschafft selbst keine zukuenftigen Stundenplaene von Schulservern.
- Die Daten bleiben in der Kartenkonfiguration bzw. beim gewaehlten Sensor.
  Es werden keine Quelldaten veraendert und keine externen Anfragen hinzugefuegt.

## Lokale Pruefung

```sh
npm run build
node --check dist/stundenplan-card.js
node test-suite-contract.mjs
node test-dated-entries.mjs
node test-editor-browser.cjs
```

Der Browser-Test benoetigt Playwright und einen Chromium-Browser (optional
ueber `PLAYWRIGHT_MODULE` und `BROWSER_EXECUTABLE`). `BASELINE_REF=b4cad9c`
vergleicht bestehende Darstellungen mit v3.8.2. Der Test verwendet vereinfachte
HA-Bedienelemente und ist kein Test in einer echten Home-Assistant-Installation.
