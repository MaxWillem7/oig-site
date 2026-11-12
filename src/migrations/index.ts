import * as migration_20261112_094827_init from './20261112_094827_init';

export const migrations = [
  {
    up: migration_20261112_094827_init.up,
    down: migration_20261112_094827_init.down,
    name: '20261112_094827_init'
  },
];
