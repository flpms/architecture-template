export interface LoginCredentials {
	username: string;
	password: string;
}

export interface User {
	id: string;
	username: string;
}

export interface AuthState {
	user: User | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
}

export interface AuthService {
	login(credentials: LoginCredentials): Promise<User>;
	logout(): Promise<void>;
	getCurrentUser(): Promise<User | null>;
}
