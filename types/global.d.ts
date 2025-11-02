export {};

export type Roles = "admin" | "moderator" | "teacher" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
