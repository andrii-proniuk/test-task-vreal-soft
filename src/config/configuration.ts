export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  jwt: {
    secret: process.env.JWT_ACCESS_SECRET || 'secret',
    expiration: process.env.JWT_ACCESS_EXPIRATION || '1d',
  },
});
