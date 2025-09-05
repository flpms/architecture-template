import type { LoginCredentials, User, AuthService } from '../types/auth.js';

// Mock credentials for demonstration
const MOCK_CREDENTIALS = {
	username: 'admin',
	password: 'admin'
};

// Mock user data
const MOCK_USER: User = {
	id: '1',
	username: 'admin'
};

class AuthServiceImpl implements AuthService {
	async login(credentials: LoginCredentials): Promise<User> {
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 1000));

		if (
			credentials.username === MOCK_CREDENTIALS.username &&
			credentials.password === MOCK_CREDENTIALS.password
		) {
			// Store in localStorage for persistence
			localStorage.setItem('auth_user', JSON.stringify(MOCK_USER));
			return MOCK_USER;
		} else {
			throw new Error('Invalid credentials');
		}
	}

	async logout(): Promise<void> {
		// Simulate API delay
		await new Promise(resolve => setTimeout(resolve, 500));
		localStorage.removeItem('auth_user');
	}

	async getCurrentUser(): Promise<User | null> {
		try {
			const userStr = localStorage.getItem('auth_user');
			if (userStr) {
				return JSON.parse(userStr) as User;
			}
			return null;
		} catch {
			return null;
		}
	}
}

export const authService = new AuthServiceImpl();
