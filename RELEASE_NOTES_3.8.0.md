## Fächer/Angebote gezielt ausblenden

Im neuen Bereich **Inhalte filtern** lassen sich Fächer/Angebote auswählen, die für das eigene Kind nicht relevant sind, beispielsweise Essen, Betreuung oder AGs.

- Verfügbare Fachnamen werden zur Auswahl angeboten; fehlende Namen können einzeln ergänzt werden. Bei direkten JSON-URLs werden die Namen manuell ergänzt.
- Der Filter gilt nur für die jeweilige Karte. Quelldaten und andere Karten bleiben unverändert.
- Vollständig leere Endzeilen werden bei aktivem Filter automatisch gekürzt. Pausen und Lücken zwischen verbleibenden Stunden bleiben erhalten.
- Regulärer Unterricht bleibt sichtbar: Endet der Unterricht etwa Montag bis Donnerstag nach der 5. Stunde und am Freitag nach der 6., wird der Freitag nicht abgeschnitten.
- Rolling mit **Nach der letzten Stunde** berücksichtigt bei aktivem Filter die letzte verbleibende Endzeit des jeweiligen Tages, auch bei A/B-Wochen.
- Funktioniert mit manuellen Plänen, JSON-/Sensorquellen, der Stundenplan Suite und dem Wochen-Popup. **Alle Einträge wieder anzeigen** setzt den Filter zurück.

Verglichen wird der vollständige Fachname in der ersten Zeile des Eintrags, nicht Raum, Lehrkraft oder Hinweise. Groß-/Kleinschreibung spielt keine Rolle. Neue oder geänderte Fachnamen werden nicht automatisch ausgeblendet. Bei mehreren durch Leerzeilen getrennten Einträgen in einer Zelle wird jeder einzeln geprüft.

Beispiel, zusätzlich zur bestehenden Kartenkonfiguration:

```yaml
hidden_subjects:
  - Ess/Spi GT
  - LZ_GS
  - AG GS 1
```

## Übersichtlicherer Editor

- Aufklappbare Bereiche mit Icons, kurzen Erklärungen und Tastaturbedienung.
- **Datenquellen** steht direkt nach **Allgemein**. Der manuelle Editor erscheint weiterhin nur bei manueller Quelle; Rolling nur bei aktiver Rolling-Ansicht.
- **Schrift & Abstände** folgt jetzt der Kartenreihenfolge: Kartentitel, Kopfzeile und Tabelle, anschließend Stunden und Inhalte.
- Neue Dokumentationsbilder mit fiktiven Beispieldaten zeigen die Editorübersicht und den Filter.

## Bestehende Konfigurationen und Prüfung

Standardmäßig ist kein Filter aktiv. Ohne ausgewählte Fächer/Angebote bleibt die bisherige Kartendarstellung erhalten. Gespeicherte Farben, Schriftgrößen und andere Einstellungen bleiben bestehen. Die Suite benötigt für diese Funktionen kein neues Update.

Build, Syntax-, Vertrags- und Browser-Regressionstests bestanden. Geprüft wurden unter anderem alle Datenquellen, verbundene Stunden, Pausen, A/B-Wochen, Tageswechsel, Popup, Rücksetzen und Editorbreiten von 320 und 440 Pixeln. Darstellungsvergleiche ohne neue Filter stimmen mit v3.7.0 überein.

Die Browser-Tests verwenden vereinfachte Home-Assistant-Bedienelemente. Ein direkter Test in einer echten Home-Assistant-Installation steht noch aus.

Nach dem HACS-Update das Dashboard neu laden. Falls weiterhin die alte Version erscheint, den Frontend-Cache des Browsers leeren.
