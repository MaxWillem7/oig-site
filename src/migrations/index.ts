import * as migration_20261112_103659_init from './20261112_103659_init';
import * as migration_20261119_075857_vacature_blokken from './20261119_075857_vacature_blokken';
import * as migration_20261119_080000_inhoud_zorg_vacatures_privacy from './20261119_080000_inhoud_zorg_vacatures_privacy';

export const migrations = [
  {
    up: migration_20261112_103659_init.up,
    down: migration_20261112_103659_init.down,
    name: '20261112_103659_init',
  },
  {
    up: migration_20261119_075857_vacature_blokken.up,
    down: migration_20261119_075857_vacature_blokken.down,
    name: '20261119_075857_vacature_blokken',
  },
  {
    up: migration_20261119_080000_inhoud_zorg_vacatures_privacy.up,
    down: migration_20261119_080000_inhoud_zorg_vacatures_privacy.down,
    name: '20261119_080000_inhoud_zorg_vacatures_privacy',
  },
];
