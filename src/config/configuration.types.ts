export interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
}

export interface JwtConfig {
  secret: string;
  expiration: string;
}
