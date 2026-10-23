import { mergeConfig } from 'vite';
import base from './vite.config';

// Isolated local HA test: never replace the installed HACS custom elements.
export default mergeConfig(base, {
  plugins: [{
    name: 'isolated-calendar-test',
    enforce: 'pre',
    transform(source, id) {
      if (!id.endsWith('/src/stundenplan-card.ts')) return;
      return source
        .replaceAll('"stundenplan-card"', '"stundenplan-card-calendar-test"')
        .replaceAll('"custom:stundenplan-card"', '"custom:stundenplan-card-calendar-test"')
        .replaceAll('"stundenplan-card-editor"', '"stundenplan-card-calendar-test-editor"')
        .replaceAll('__STUNDENPLAN_CARD_VERSION', '__STUNDENPLAN_CALENDAR_TEST_VERSION')
        .replaceAll('"v3.10.0"', '"calendar-test-3.10.0"')
        .replace('name: "Stundenplan Card"', 'name: "Stundenplan Card - Kalender TEST"')
        .replace('description: "Stundenplan Card v3.10.0 (marker: STUNDENPLAN_CARD_v3.10.0)"', 'description: "Isolierter lokaler Testbuild"');
    }
  }],
  build: { outDir: 'dist-calendar-test', lib: { fileName: () => 'stundenplan-card-calendar-test.js' } }
});
