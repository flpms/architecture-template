<script lang="ts">
	import InputField from '../molecules/InputField.svelte';
	import Button from '../atoms/Button.svelte';
	import { authStore } from '../../stores/auth.store.js';
	import type { LoginCredentials } from '../../types/auth.js';

	interface Props {
		onLoginSuccess?: () => void;
	}

	let { onLoginSuccess }: Props = $props();

	let credentials = $state<LoginCredentials>({
		username: '',
		password: ''
	});

	let errors = $state<{ username?: string; password?: string }>({});

	function validateForm(): boolean {
		errors = {};
		let isValid = true;

		if (!credentials.username.trim()) {
			errors.username = 'Username is required';
			isValid = false;
		}

		if (!credentials.password.trim()) {
			errors.password = 'Password is required';
			isValid = false;
		}

		return isValid;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();

		if (!validateForm()) {
			return;
		}

		try {
			authStore.clearError();
			await authStore.login(credentials);
			onLoginSuccess?.();
		} catch (error) {
			// Error is handled by the store
			console.error('Login failed:', error);
		}
	}

	function handleUsernameChange(value: string) {
		credentials.username = value;
		if (errors.username) {
			errors.username = undefined;
		}
	}

	function handlePasswordChange(value: string) {
		credentials.password = value;
		if (errors.password) {
			errors.password = undefined;
		}
	}

	// Clear store error when component unmounts or credentials change
	$effect(() => {
		return () => authStore.clearError();
	});
</script>

<form class="login-form" onsubmit={handleSubmit} data-testid="login-form">
	<div class="form-header">
		<h2>Login</h2>
		<p>Enter your credentials to access the application</p>
	</div>

	{#if authStore.state.error}
		<div class="error-alert" data-testid="login-error">
			{authStore.state.error}
		</div>
	{/if}

	<div class="form-body">
		<InputField
			id="username"
			label="Username"
			type="text"
			placeholder="Enter your username"
			bind:value={credentials.username}
			required
			error={errors.username}
			disabled={authStore.state.isLoading}
			onchange={handleUsernameChange}
		/>

		<InputField
			id="password"
			label="Password"
			type="password"
			placeholder="Enter your password"
			bind:value={credentials.password}
			required
			error={errors.password}
			disabled={authStore.state.isLoading}
			onchange={handlePasswordChange}
		/>
	</div>

	<div class="form-footer">
		<Button
			type="submit"
			variant="primary"
			size="lg"
			loading={authStore.state.isLoading}
			disabled={authStore.state.isLoading}
			class="login-button"
		>
			{authStore.state.isLoading ? 'Signing in...' : 'Sign In'}
		</Button>
	</div>

	<div class="demo-credentials">
		<small>Demo credentials: admin / admin</small>
	</div>
</form>

<style>
	.login-form {
		max-width: 400px;
		width: 100%;
		padding: 2rem;
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.form-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.form-header h2 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 0.5rem 0;
	}

	.form-header p {
		color: #6b7280;
		font-size: 0.875rem;
		margin: 0;
	}

	.error-alert {
		background-color: #fef2f2;
		border: 1px solid #fecaca;
		color: #dc2626;
		padding: 0.75rem;
		border-radius: 0.375rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.form-body {
		margin-bottom: 1.5rem;
	}

	.form-footer :global(.login-button) {
		width: 100%;
	}

	.demo-credentials {
		text-align: center;
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #e5e7eb;
	}

	.demo-credentials small {
		color: #6b7280;
		font-size: 0.75rem;
	}
</style>
