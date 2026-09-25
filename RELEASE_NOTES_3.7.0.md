## Verbesserungen

- **Rolling-Highlight korrigiert:** Wenn derselbe Wochentag mehrfach sichtbar ist, wird nur das heutige Datum hervorgehoben. Der gleiche Wochentag der kommenden Woche bekommt keine Markierung des aktuellen Unterrichts mehr, auch bei verbundenen Folgestunden.
- **Wochennavigation optional ausblenden:** Unter **Allgemein > Titel & Kopfzeile** lassen sich die Pfeile und der Wochenversatz ausblenden, ohne die gewaehlte Woche zu veraendern.
- **Abstand zwischen Kopfzeile und Tabelle:** Unter **Schrift & Abstaende** einstellbar. Leer verwendet den bisherigen Abstand; `0` entfernt den zusaetzlichen Abstand. Dort sind auch die Titelgroessen fuer normale und kompakte Ansicht einstellbar.
- **Eigener Bereich Rolling:** Die Rolling-Einstellungen liegen jetzt in einem separaten aufklappbaren Bereich. Dieser erscheint nur bei der Ansicht **Ab heute (rolling)**.
- Build-Abhaengigkeiten aktualisiert, Sicherheitshinweise ergaenzt und Dokumentationsbilder durch fiktive Beispieldaten ersetzt.

## Bestehende Konfigurationen

Keine Konfigurationsaenderung erforderlich. Ohne neue Einstellungen bleiben Abstaende und Navigation wie bisher; vorhandene Farben und Stundenplaene bleiben erhalten. Die korrigierte Hervorhebung gilt automatisch.

## Pruefung und Update

Build, Vertrags- und Browser-Regressionstests wurden ausgefuehrt. Die Browser-Tests verwenden vereinfachte Home-Assistant-Bedienelemente; ein direkter Test in einer echten Home-Assistant-Installation steht noch aus.

Nach dem HACS-Update das Dashboard neu laden. Falls weiterhin die alte Version erscheint, den Frontend-Cache des verwendeten Browsers leeren.
