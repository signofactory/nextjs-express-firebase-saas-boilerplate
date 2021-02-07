const path = require('path');

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [path.join(__dirname, './dist/migrations/*.js')],
  entities: [path.join(__dirname, './dist/entities/*.js')],
  cli: {
    migrationsDir: 'src/migrations',
  },
  cache: true,
  logging: false,
  synchronize: true,
};
