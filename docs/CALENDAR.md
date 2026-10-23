# Schulkalender mit der Stundenplan Card verbinden

**Ab v3.10.0 einfacher:** Den Kalender direkt im Karteneditor auswaehlen.
Die [Anleitung zur direkten Kalenderauswahl](CALENDAR_DIRECT_TEST.md) kommt ohne
Template-Sensor aus. Das folgende YAML-Beispiel bleibt fuer v3.9.0 und fuer
individuelle Aufbereitungen nutzbar. Bitte nicht beide Wege fuer dieselben Termine verwenden.

Dieses Beispiel uebernimmt Klassenarbeiten und Erinnerungen aus einem Kalender in Home Assistant in die **Stundenplan Card ab v3.9.0**. Die Karte liest den Kalender nicht direkt: Ein kleiner Template-Sensor bereitet die Termine fuer ihre zusaetzliche Terminquelle auf.

## Beispiel herunterladen

- [Fertige YAML-Konfiguration](../examples/calendar/schultermine.yaml)
- [YAML-Datei direkt herunterladen](https://raw.githubusercontent.com/fabel-smith/stundenplan-card/main/examples/calendar/schultermine.yaml)

Ihr braucht kein neues Karten-Release: Die zusaetzliche Sensorquelle ist bereits ab v3.9.0 vorhanden. Die Einrichtung erfolgt per YAML, nicht ueber eine Kalenderauswahl im Karteneditor.

## So benutzt ihr den Kalender

Legt fuer jedes Kind einen eigenen Schulkalender an, zum Beispiel mit der HA-Integration **Lokaler Kalender**. Ein bereits in HA eingebundener Kalender geht ebenfalls, wenn er `calendar.get_events` unterstuetzt.

Tragt einen **eintaegigen Ganztagstermin** ein. Die Unterrichtsstunden stehen in eckigen Klammern am Ende des Titels:

| Titel im Kalender | Anzeige in der Karte |
| --- | --- |
| `Mathearbeit [3,4]` | Mathearbeit in Stunde 3 und 4 |
| `Diktat [2]` | Diktat in Stunde 2 |
| `Badehose [1,2]` | Badehose in Stunde 1 und 2 |

Das Datum kommt vom Kalendereintrag. Ein Fachname muss nicht mit dem Stundenplan uebereinstimmen. Auch weit im Voraus eingetragene Arbeiten werden beruecksichtigt, sobald sie innerhalb des Abrufzeitraums liegen.

## Einmalig einrichten

1. Erstellt vor Konfigurationsaenderungen eine Sicherung. Ermittelt unter **Einstellungen > Geraete & Dienste > Entitaeten** die Kalender-ID, zum Beispiel `calendar.schultermine`.
2. Legt die [Datei `schultermine.yaml`](../examples/calendar/schultermine.yaml) im HA-Konfigurationsordner unter `/config/packages/schultermine.yaml` ab. Passt darin nur `schulkalender: calendar.schultermine` an euren Kalender an.
3. Falls ihr noch keine Packages nutzt, ergaenzt in `configuration.yaml`:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

**Wichtig:** Gibt es bereits `homeassistant:`, ergaenzt nur die Zeile `packages:` darunter. Einen bestehenden Package-Aufbau beibehalten, nicht ein zweites Mal anlegen. Die Beispieldatei gehoert weder in `automations.yaml` noch in die Kartenkonfiguration.

4. Prueft die HA-Konfiguration unter **Entwicklerwerkzeuge > YAML**, bevor ihr Home Assistant neu startet.
5. Prueft unter **Entwicklerwerkzeuge > Zustaende** den neuen Sensor `sensor.stundenplan_kalendertermine`. Sein Attribut `entries` sollte die Termine enthalten. Wenn HA wegen eines bereits bestehenden Namens eine andere Entitaets-ID vergibt, verwendet diese im naechsten Schritt.
6. Fuegt im Code-Editor der bestehenden Stundenplan-Karte diese beiden Zeilen auf oberster Ebene hinzu; den restlichen Karteninhalt unveraendert lassen:

```yaml
dated_entries_entity: sensor.stundenplan_kalendertermine
dated_entries_attribute: entries
```

Falls bereits eine zusaetzliche Terminquelle eingetragen ist, nicht einfach ueberschreiben: Dieses Beispiel ersetzt diese Quelle und kombiniert nicht automatisch mehrere externe Sensoren. Manuell in der Karte angelegte Termine bleiben zusaetzlich erhalten.

Optional koennt ihr Termine ausserhalb der gerade dargestellten Stunden unter der Tabelle anzeigen lassen:

```yaml
show_upcoming_notes: true
```

Das ist besonders hilfreich, wenn der Stundenplan fuer einen kuenftigen Termin noch nicht geladen ist. Die Liste bestaetigt nicht, dass zu dieser Zeit tatsaechlich Unterricht stattfindet.

Fuer ein weiteres Kind braucht ihr eine getrennte Package-Datei mit eigenem Kalender, anderem Sensornamen und einer eigenen `unique_id`. Einfaches Kopieren ohne diese Anpassungen fuehrt zu Namenskonflikten.

## Was das Beispiel macht

- Es fragt beim HA-Start und alle 15 Minuten den Kalender ab: ab heute bis ausschliesslich zum Beginn des Tages in 60 Tagen. Die Synchronisierung des Kalenderanbieters kann zusaetzliche Zeit brauchen.
- Aenderungen und geloeschte Eintraege werden beim naechsten erfolgreichen Abruf uebernommen. Wiederholungen funktionieren, sofern der Kalender sie als einzelne Ereignisse liefert.
- Nur eintaegige Ganztagstermine mit Stundenangabe wie `[3,4]` werden importiert. Termine mit Uhrzeit, mehrtaegige Eintraege, fehlende Stunden oder ungueltige Titel werden ignoriert. Der Sensor zeigt ihre Anzahl unter `ignorierte_termine`.
- Die Zahlen muessen zu den Stundenbezeichnungen eurer Karte passen, zum Beispiel `3.` und `4.`. Dieses einfache Beispiel unterstuetzt keine Sonderbezeichnungen wie `MP`.
- Vergangene externe Termine verschwinden beim naechsten Abruf aus dem Sensor. Sie werden **nicht** in das Archiv der manuellen Kartentermine kopiert. Im Kalender bleiben sie erhalten.
- Wenn der Abruf fehlschlaegt, wird der Sensor nicht verfuegbar. Die Karte meldet die fehlende Terminquelle; manuelle Termine bleiben davon unberuehrt.

Die Kalendertermine werden nicht veraendert. Es werden weder E-Mails ausgelesen noch KI-Dienste verwendet. Termintitel stehen anschliessend auch in Sensorattributen und koennen entsprechend eurer HA-Einstellungen in der Historie landen. Verwendet deshalb nur die benoetigten Angaben und einen getrennten Schulkalender.

## Kurz testen

Legt fuer morgen einen Ganztagstermin `Testarbeit [3,4]` an. Nach dem naechsten Abruf muss im Sensor `entries` ein Eintrag mit `text: Testarbeit`, dem Datum und `periods: ['3', '4']` stehen. Die Karte zeigt ihn an der passenden Stunde oder mit der optionalen Einstellung in der Liste unter der Tabelle.

Aendert den Titel, prueft die Aktualisierung und loescht den Testtermin danach. Beim naechsten erfolgreichen Abruf muss er auch aus der Karte verschwinden.

**Pruefstand:** Die beiliegenden Tests pruefen die tatsaechlichen YAML-Templates lokal sowie das erzeugte Datenformat gegen die Terminlogik der Karte. Am 15.10.2026 wurde das Beispiel zusaetzlich mit einem lokalen HA-Testkalender geprueft: Ein heutiger Ganztagstermin erschien in beiden angegebenen Stunden, ein zukuenftiger Termin in der Vorschau-Liste. Die HA-Konfigurationspruefung war erfolgreich; aktiviert wurde per Template-Reload ohne Neustart. Im isolierten Test wurde minuetlich statt alle 15 Minuten abgerufen. Aenderungen, Loeschungen und Fehlerfaelle sind bislang lokal getestet, nicht vollstaendig live. Prueft eure eigene HA-Konfiguration trotzdem vor der Aktivierung.

## Fuer Entwickler

Aus dem Stammverzeichnis dieses Repositories ausfuehren:

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -r examples/calendar/requirements-test.txt
.\.venv\Scripts\python examples/calendar/test_calendar_example.py --card-module src/dated-entries.js
```

Node.js muss ebenfalls verfuegbar sein. Die Tests benoetigen weder HA-Zugang noch Kalenderdaten.

## Hintergrund

- [Home Assistant: Kalenderereignisse abrufen](https://www.home-assistant.io/actions/calendar.get_events/)
- [Home Assistant: Template-Sensoren](https://www.home-assistant.io/integrations/template/)
- [Home Assistant: Packages](https://www.home-assistant.io/docs/configuration/packages/)
- [Stundenplan Card: Termine und Hinweise](DATED_ENTRIES.md)
