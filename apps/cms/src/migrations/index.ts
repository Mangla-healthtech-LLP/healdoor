import * as migration_20260613_141252 from './20260613_141252';
import * as migration_20260613_180401_users from './20260613_180401_users';

export const migrations = [
  {
    up: migration_20260613_141252.up,
    down: migration_20260613_141252.down,
    name: '20260613_141252',
  },
  {
    up: migration_20260613_180401_users.up,
    down: migration_20260613_180401_users.down,
    name: '20260613_180401_users'
  },
];
