# Card v3.11.0-beta.2 - Vorabversion

**Nur zum freiwilligen Testen, kein regulaeres Release. Bitte vorher ein HA-Backup erstellen.**

## Wochenwechsel am Wochenende

Unter **Ansicht & Rolling > Ganze Woche** gibt es jetzt **Automatisch zur naechsten Woche**:

- **Erst am Montag**: bisheriges Verhalten, weiterhin Standard.
- **Ab Samstag**: schon samstags die kommende Woche sehen.
- **Ab Sonntag**: sonntags zur kommenden Woche wechseln.

Die Auswahl gilt bei Wochenwahl **0**. Manuelles Blaettern auf eine andere Woche
hat Vorrang. Zusammen mit **Suite v0.4.0b3** werden die passenden Daten nach Datum
gelesen, auch bei Rolling ueber eine Wochengrenze. Fehlende Unterrichtsdaten bleiben
leer und erhalten einen Hinweis, statt Unterricht aus der falschen Woche anzuzeigen.
Andere Karten werden durch den automatischen Wechsel nicht umgestellt.

## Kurz testen

1. Diese Karte und [Suite **v0.4.0b3**](https://github.com/fabel-smith/stundenplan-suite/releases/tag/v0.4.0b3)
   als Vorabversionen installieren. HA neu starten und das Dashboard vollstaendig neu laden.
2. Mit dem Suite-Wochensensor und der neuen Schulmanager-Schnittstelle testen;
   **Schulmanager Online v0.13.0b4** kann bleiben.
3. Wochenwahl auf **0** stellen, **Ab Samstag** oder **Ab Sonntag** waehlen.
   Datum, Unterricht und bisherige Kursfilter pruefen. Auch Rolling ausprobieren.

Die manuelle Wochenwahl bleibt bei -1 bis +1. Eine freie Zwei-Wochen-Vorschau
ist damit noch nicht enthalten. Alte Quellen liefern nur ihre tatsaechlich geladene Woche.
Bestehende Einstellungen bleiben erhalten. Separate lokale Testkarten werden
durch ein HACS-Update nicht automatisch auf den normalen Kartentyp umgestellt.

[Testanleitung und Rueckweg](https://github.com/fabel-smith/stundenplan-card/blob/v3.11.0-beta.2/docs/PRERELEASE_TEST.md)
