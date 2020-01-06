// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    host: '35.193.246.141',
    database: 'postgres',
    user:     'postgres',
    password: '123456789'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
