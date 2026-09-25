## Neu

- Neuer Editorbereich **Hintergründe & Linien** mit Farbpalette, freier Farbwahl und Transparenzregler für Kartenfläche, Tabellenkopf und Navigation, Zeilenzellen sowie Trennlinien.
- Transparente und halbtransparente Flächen für Dashboards mit Hintergrundbild. Unterstützt werden unter anderem `transparent`, `rgba(...)` und Hex-Farben mit Alpha.
- Vier neue CSS-Variablen: `--stundenplan-card-background`, `--stundenplan-header-background`, `--stundenplan-row-background` und `--stundenplan-divider-color`.
- Die Einstellungen gelten für manuelle Pläne, JSON-/Sensorquellen, die Stundenplan Suite und das Wochen-Popup.

Damit wird der Wunsch aus [Issue #12](https://github.com/fabel-smith/stundenplan-card/issues/12) umgesetzt. Danke an snoova für die Anregung!

## Bestehende Konfigurationen

Ohne neue Einstellungen bleibt die bisherige Darstellung erhalten. Individuelle Zellfarben und Zellrahmen haben weiterhin Vorrang; Highlights und Hinweisfarben bleiben unabhängig einstellbar. **Zurücksetzen** entfernt die jeweilige Hintergrundvorgabe und verwendet wieder Theme- oder geerbte CSS-Werte.

Beispiel für transparente Flächen, zusätzlich zur bisherigen Kartenkonfiguration:

```yaml
card_background: transparent
header_background: transparent
row_background: transparent
divider_color: "rgba(255, 255, 255, 0.15)"
```

## Prüfung

Build, Syntax- und Verhaltenstests sowie Browser-Regressionstests sind bestanden. Geprüft wurden unter anderem Transparenz, CSS-Vererbung, Zellfarben, Popup, Sensorquellen und der Editor bei 320 und 440 Pixeln Breite. Darstellungsvergleiche ohne neue Optionen stimmen mit v3.4.1 und v3.5.1 überein.

Die Browser-Tests verwenden vereinfachte Home-Assistant-Bedienelemente. Ein Test direkt in einer Home-Assistant-Installation steht noch aus.
