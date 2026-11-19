import * as migration_20261112_103659_init from './20261112_103659_init';
import * as migration_20261119_075857_vacature_blokken from './20261119_075857_vacature_blokken';
import * as migration_20261119_080000_inhoud_zorg_vacatures_privacy from './20261119_080000_inhoud_zorg_vacatures_privacy';
import * as migration_20261119_082538_vacature_kop_en_slot from './20261119_082538_vacature_kop_en_slot';
import * as migration_20261119_083000_vacatures_gelijk_aan_live from './20261119_083000_vacatures_gelijk_aan_live';

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
  {
    up: migration_20261119_082538_vacature_kop_en_slot.up,
    down: migration_20261119_082538_vacature_kop_en_slot.down,
    name: '20261119_082538_vacature_kop_en_slot',
  },
  {
    up: migration_20261119_083000_vacatures_gelijk_aan_live.up,
    down: migration_20261119_083000_vacatures_gelijk_aan_live.down,
    name: '20261119_083000_vacatures_gelijk_aan_live',
  },
];
