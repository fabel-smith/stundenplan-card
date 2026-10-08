## Einfacherer Einstieg in den manuellen Stundenplan

- Ein leerer Plan zeigt jetzt einen deutlichen Button **Erste Stunde hinzufügen** mit einer kurzen Anleitung.
- **+ Stunde** und **+ Pause** sind klar erkennbare, per Tastatur bedienbare Buttons mit ausreichend großer Klickfläche. Sie benötigen keine zusätzlich geladenen Home-Assistant-Button-Komponenten.
- Neue Stunden und Pausen öffnen sich sofort. Der Editor scrollt zur neuen Zeile und setzt den Tastaturfokus auf deren Überschrift, ohne ein Textfeld und damit die Bildschirmtastatur automatisch zu öffnen.
- Verständlichere Bezeichnungen: **Zellfarben** statt „Cell-Styles“ und **Manuell** statt „Manuell (rows)“.
- Der Einstieg gilt auch für leere A/B-Wochen. Die jeweils andere Woche bleibt unverändert.

Danke an tiwa für den Hinweis zum schwer erkennbaren Einstieg im manuellen Editor.

## Bestehende Pläne und Prüfung

Dies ist ein gebündeltes Wartungsupdate für die Bedienung des Editors. Bestehende Pläne, Filter, Farben und Datenquellen bleiben unverändert. Keine Konfigurationsänderung und kein Suite-Update erforderlich.

Build, Syntax-, Vertrags- und Browser-Regressionstests bestanden. Getestet wurden unter anderem Anlegen, Bearbeiten, Entfernen, Wiederöffnen einer gespeicherten Konfiguration, A/B-Wochen, Tastaturbedienung, Scrollen sowie helle und dunkle Ansichten bei 320 und 440 Pixeln Breite. Die Kartendarstellung ohne neue Einstellungen stimmt weiterhin mit v3.8.0 überein.

Die Browser-Tests verwenden vereinfachte HA-Bedienelemente und simulieren die Konfigurationsspeicherung. Ein direkter Test in einer echten Home-Assistant-Installation steht noch aus.

Nach dem HACS-Update das Dashboard neu laden. Weitere Verbesserungswünsche werden zunächst gesammelt; dringende Fehlerbehebungen bleiben davon ausgenommen.
