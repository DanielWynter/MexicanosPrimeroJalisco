// knexfile.js

/** @type {import('knex').Knex.Config} */
const config = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'mexicanosprimerojalisco_db',
      user: 'postgres',
      password: 'wynter1305',
      host: 'localhost',
      port: 5432,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

export default config;
