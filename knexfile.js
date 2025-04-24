/** @type {import('knex').Knex.Config} */
const config = {
  development: {
    client: 'pg',
    connection: {
      host: 'ep-yellow-river-a4uuuapg-pooler.us-east-1.aws.neon.tech',
      user: 'neondb_owner',
      password: 'npg_Cf1orVUDFN4T',
      database: 'mexicanosprimerojalisco_db',
      port: 5432,
      ssl: { rejectUnauthorized: false }, // obligatorio para Neon
    },
    pool: { min: 2, max: 10 },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    },
  },
};

export default config;
