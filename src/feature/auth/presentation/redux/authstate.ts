export interface AuthState {
    token: string | null;
    username: string | null;
    password: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
