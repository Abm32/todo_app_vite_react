export class AuthError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export interface AuthState {
  loading: boolean;
  error: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}