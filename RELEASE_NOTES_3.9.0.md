## Termine und Hinweise

![Diktat, Klassenarbeit und Fachwechsel im Beispiel-Stundenplan](https://raw.githubusercontent.com/fabel-smith/stundenplan-card/main/docs/screenshots/release-3.9.0.png)

*Fiktive Beispieldaten: farbige Hinweise in den Unterrichtsstunden und Schwimmen als datumsbezogener Fachwechsel.*

- Klassenarbeiten, Diktate und Erinnerungen direkt in der Karte eintragen: mit **+ Termin hinzufügen** oder per Klick auf eine Unterrichtsstunde in der Editor-Vorschau.
- Neue Termine werden nach **Datum und Stunde** zugeordnet, unabhängig vom Fachnamen. Auch spätere Termine ohne bereits geladenen Stundenplan sind möglich.
- Die zusätzliche Liste **Anstehende Termine** unter der Tabelle ist optional und standardmäßig ausgeschaltet. Der Schalter im Termine-Bereich blendet nur diese Liste ein oder aus; Termine und Hinweise in den Unterrichtszellen bleiben erhalten.
- Vorhandene Hinweise lassen sich per Klick bearbeiten. Text- und Hintergrundfarben sind mit Farbpalette und Transparenzregler einstellbar.
- Vergangene Einträge werden automatisch in einem eingeklappten Bereich gesammelt und bleiben bearbeitbar.
- Unvollständige neue Einträge bleiben ungespeicherte Entwürfe. Mehrere Vorschauklicks erzeugen keine leeren Termine. Ein X in der Überschrift entfernt den Eintrag; Tooltips erklären die Vorschauaktionen.

## Fachabweichungen und Editor

- **Fachabweichungen an bestimmten Tagen:** Ein Fach gezielt an ausgewählten Terminen ersetzen, beispielsweise Schwimmen durch Sport. Die Quelldaten bleiben unverändert. Die Termine werden ausdrücklich angegeben, nicht automatisch im Zweiwochenrhythmus berechnet.
- **Ansicht & Rolling** steht dauerhaft direkt hinter den Datenquellen. Der Ansichtsmodus und die dazugehörigen Rolling-Einstellungen sind jetzt zusammengefasst; Zusatzfelder erscheinen nur bei Auswahl von **Ab heute (rolling)**.
- Klarere Hilfetexte und kompaktere Eintragsüberschriften mit Datum und Unterrichtsstunden.

## Aktualisierung

Die Ergänzungen funktionieren mit manuellen Plänen, JSON und der Stundenplan Suite. Bestehende Einstellungen und Pläne bleiben erhalten; ein Suite-Update ist dafür nicht erforderlich.

Nach dem Update über HACS das Dashboard vollständig neu laden. Eine zusätzliche Testdatei muss durch die reguläre HACS-Ressource ersetzt werden, damit künftige HACS-Updates wirksam werden.
