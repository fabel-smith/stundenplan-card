## Korrekturen

- **A/B-Wochenanzeige:** Das Label berücksichtigt jetzt die mit `week_offset_entity` ausgewählte Woche, einschließlich negativer Versätze und der Wochen-Zuordnung über `week_map`. Die ISO-Kalenderwochenberechnung ist auch für Jahreswechsel korrigiert. Behebt #13.
- **Sensorquellen per YAML:** Eine konfigurierte `source_entity` wird auch dann gelesen, wenn die zusätzlichen Quellfelder leer sind. Das gilt ebenfalls für Datums- und Aktualisierungsangaben.
- **Raum- und Lehrerangaben:** Weitere Raumnamen wie `U04`, `E18`, `IT 4`, `Ph 1` und `KuWe 25` werden erkannt. Mehrere vollständige Fach/Raum/Lehrer-Blöcke in einer Zelle bleiben sichtbar; normale Fachnamen werden nicht als Lehrer ausgeschlossen.
- **Schulmanager-Dokumentation:** Der Verweis zeigt jetzt auf die von der Suite-Einrichtung erwartete Integration von MrIcemanLE. Die Abgrenzung zum ähnlich benannten Projekt von rwunsch ist dokumentiert.

Danke an @RF1705 für den Fehlerbericht, @KoenigMjr für den Beitrag in #14 und @8R3N38 für den Hinweis zur Suite-Anleitung.

## Bestehende Konfiguration und Prüfung

Keine Konfigurationsänderung erforderlich. Farben, Filter, Bedienung und gespeicherte Pläne bleiben erhalten. Die Darstellung der geprüften bisherigen Wochen-/Rolling-Ansichten entspricht v3.8.1; die oben genannten Fehlerfälle werden korrigiert.

Build, Syntaxprüfung, Vertrags- und Browser-Regressionstests bestanden. Zusätzlich geprüft: wechselnde Wochenversätze, Attribut-Versatz, ausgeblendete Navigation, fehlender Versatz-Sensor, Jahreswechsel, Wochen-Mapping sowie alte und neue Raumformate mit parallelen Stunden und Hinweisen.

Die Browserprüfung verwendet vereinfachte Home-Assistant-Bedienelemente. Ein direkter Test in einer echten Home-Assistant-Installation steht noch aus.

Die begleitende **Stundenplan Suite v0.3.11** korrigiert die Installationsanleitung, ohne die Datenabfrage zu ändern. Sie ist für die Kartenkorrekturen nicht erforderlich. Nach dem Karten-Update das Dashboard neu laden.
