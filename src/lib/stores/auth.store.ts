import { writable } from 'svelte/store';
import { authService } from '../services/auth.service.js';
import type { AuthState, LoginCredentials } from '../types/auth.js';

function createAuthStore() {
	const initialState: AuthState = {
		user: null,
		isAuthenticated: false,
		isLoading: false,
		error: null
	};

	const { subscribe, set, update } = writable<AuthState>(initialState);

	// Initialize auth state on store creation
	async function initialize() {
		update(state => ({ ...state, isLoading: true }));
		
		try {
			const user = await authService.getCurrentUser();
			if (user) {
				update(state => ({
					...state,
					user,
					isAuthenticated: true,
					isLoading: false
				}));
			} else {
				update(state => ({ ...state, isLoading: false }));
			}
		} catch (error) {
			update(state => ({
				...state,
				error: error instanceof Error ? error.message : 'Failed to initialize auth',
				isLoading: false
			}));
		}
	}

	async function login(credentials: LoginCredentials) {
		update(state => ({ ...state, isLoading: true, error: null }));

		try {
			const user = await authService.login(credentials);
			update(state => ({
				...state,
				user,
				isAuthenticated: true,
				isLoading: false
			}));
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Login failed';
			update(state => ({
				...state,
				error: errorMessage,
				isLoading: false
			}));
			throw error;
		}
	}

	async function logout() {
		update(state => ({ ...state, isLoading: true, error: null }));

		try {
			await authService.logout();
			update(state => ({
				...state,
				user: null,
				isAuthenticated: false,
				isLoading: false
			}));
		} catch (error) {
			update(state => ({
				...state,
				error: error instanceof Error ? error.message : 'Logout failed',
				isLoading: false
			}));
		}
	}

	function clearError() {
		update(state => ({ ...state, error: null }));
	}

	// Initialize the store
	initialize();

	return {
		subscribe,
		login,
		logout,
		clearError
	};
}

export const authStore = createAuthStore();
