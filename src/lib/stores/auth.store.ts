import { authService } from '../services/auth.service.js';
import type { AuthState, LoginCredentials } from '../types/auth.js';

function createAuthStore() {
	const state = $state<AuthState>({
		user: null,
		isAuthenticated: false,
		isLoading: false,
		error: null
	});

	// Initialize auth state on store creation
	async function initialize() {
		state.isLoading = true;
		try {
			const user = await authService.getCurrentUser();
			if (user) {
				state.user = user;
				state.isAuthenticated = true;
			}
		} catch (error) {
			state.error = error instanceof Error ? error.message : 'Failed to initialize auth';
		} finally {
			state.isLoading = false;
		}
	}

	async function login(credentials: LoginCredentials) {
		state.isLoading = true;
		state.error = null;

		try {
			const user = await authService.login(credentials);
			state.user = user;
			state.isAuthenticated = true;
		} catch (error) {
			state.error = error instanceof Error ? error.message : 'Login failed';
			throw error;
		} finally {
			state.isLoading = false;
		}
	}

	async function logout() {
		state.isLoading = true;
		state.error = null;

		try {
			await authService.logout();
			state.user = null;
			state.isAuthenticated = false;
		} catch (error) {
			state.error = error instanceof Error ? error.message : 'Logout failed';
		} finally {
			state.isLoading = false;
		}
	}

	function clearError() {
		state.error = null;
	}

	// Initialize the store
	initialize();

	return {
		get state() {
			return state;
		},
		login,
		logout,
		clearError
	};
}

export const authStore = createAuthStore();
