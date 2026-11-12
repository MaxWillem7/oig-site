import * as migration_20261112_103659_init from './20261112_103659_init';

export const migrations = [
  {
    up: migration_20261112_103659_init.up,
    down: migration_20261112_103659_init.down,
    name: '20261112_103659_init'
  },
];
