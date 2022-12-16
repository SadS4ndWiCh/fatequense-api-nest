declare global {
  declare module '@types/jsonwebtoken' {
    interface JwtPayload {
      cookie: string;
    }
  }
}
