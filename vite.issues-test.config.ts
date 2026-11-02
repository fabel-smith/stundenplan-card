import { mergeConfig } from 'vite';
import base from './vite.config';

// Separate HA trial, without replacing either HACS or the earlier holiday test.
export default mergeConfig(base, {
  plugins: [{
    name: 'isolated-issues-test',
    enforce: 'pre',
    transform(source, id) {
      if (!id.endsWith('/src/stundenplan-card.ts')) return;
      return source
        .replaceAll('"stundenplan-card"', '"stundenplan-card-issues-test"')
        .replaceAll('"custom:stundenplan-card"', '"custom:stundenplan-card-issues-test"')
        .replaceAll('"stundenplan-card-editor"', '"stundenplan-card-issues-test-editor"')
        .replaceAll('__STUNDENPLAN_CARD_VERSION', '__STUNDENPLAN_ISSUES_TEST_VERSION')
        .replaceAll('"v3.11.0"', '"issues-test-20261030-final"')
        .replace('name: "Stundenplan Card"', 'name: "Stundenplan Card - Issues TEST"')
        .replace('description: "Stundenplan Card v3.11.0 (marker: STUNDENPLAN_CARD_v3.11.0)"', 'description: "Isolierter lokaler Testbuild"');
    }
  }],
  build: { emptyOutDir: false, outDir: '../testnachweise/issues-20261026', lib: { fileName: () => 'stundenplan-card-issues-test-20261026.js' } }
});
