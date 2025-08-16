export interface GoogleAuthRequest {
  googleIdToken: string;
  googleAccessToken: string;
}

export interface GoogleUserInfo {
  name: string;
  email: string;
  picture: string;
  sub?: string;
}