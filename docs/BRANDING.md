# Card icon

The blue timetable is the Card mark. The Suite uses a matching turquoise stacked timetable.
PNG assets are in `src/assets`: 256 and 512 pixel versions for documentation and a
64 pixel version embedded into the JS bundle for the 32 pixel editor heading.
There are no remote image requests or instance-specific paths. The dashboard card
itself does not get an additional logo or change its configured title.

The designs were generated with OpenAI image generation and approved by the
maintainer. The blue header was cleaned before export. PNG exports retain alpha.

## Marketplace limitation (checked 2026-10-31)

Marketplace's `renderRepositoryIcon` currently uses brand images only for
repositories with category `integration` and a domain. Dashboard/plugin entries
use `typeIcon(repository.category)`. Adding an `icon` key to `hacs.json` would not
change this; unsupported keys are ignored. The Card icon can appear in the README
on its detail page once published, not as a custom catalogue-list icon.

- [Marketplace icon renderer](https://github.com/home-assistant/frontend/blob/87babb1a3ba3069677ccaadeeebc8c3af270a1c4/src/panels/marketplace/tools/repository-icon.ts)
- [Manifest keys](https://contributors.home-assistant.io/marketplace/reference/hacs-json/)
- [Custom integration brand images](https://contributors.home-assistant.io/core/integrations/brands/)

Do not patch Home Assistant or mislabel the Card as an integration to replace the
Marketplace category icon. The local HA test does not publish these assets.
