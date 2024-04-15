export interface JwtPayload {
  email: string;
  role: number;
  is_rep?: boolean;
}
