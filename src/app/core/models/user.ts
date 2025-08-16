export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  picture?: string;
  connectedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: Date;
}