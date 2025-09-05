import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import LoginForm from '../src/lib/components/organisms/LoginForm.svelte';

describe('LoginForm', () => {
	it('renders login form with all required fields', () => {
		render(LoginForm);
		
		expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
		expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
	});

	it('shows validation errors for empty fields', async () => {
		render(LoginForm);
		
		const submitButton = screen.getByRole('button', { name: /sign in/i });
		await fireEvent.click(submitButton);
		
		await waitFor(() => {
			expect(screen.getByText('Username is required')).toBeInTheDocument();
			expect(screen.getByText('Password is required')).toBeInTheDocument();
		});
	});

	it('calls onLoginSuccess when valid credentials are provided', async () => {
		let loginSuccessCalled = false;
		const handleLoginSuccess = () => {
			loginSuccessCalled = true;
		};

		render(LoginForm, { onLoginSuccess: handleLoginSuccess });
		
		const usernameInput = screen.getByLabelText(/username/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole('button', { name: /sign in/i });

		await fireEvent.input(usernameInput, { target: { value: 'admin' } });
		await fireEvent.input(passwordInput, { target: { value: 'admin' } });
		await fireEvent.click(submitButton);

		await waitFor(() => {
			expect(loginSuccessCalled).toBe(true);
		}, { timeout: 2000 });
	});
});
