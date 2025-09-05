<script lang="ts">
	import { authStore } from '../lib/stores/auth.store.js';
	import LoginForm from '../lib/components/organisms/LoginForm.svelte';
	import PageTemplate from '../lib/components/templates/PageTemplate.svelte';
	import { goto } from '$app/navigation';

	// Redirect to dashboard if already authenticated
	$effect(() => {
		if (authStore.state.isAuthenticated) {
			goto('/dashboard');
		}
	});

	function handleLoginSuccess() {
		goto('/dashboard');
	}
</script>

<PageTemplate title="Login">
	<LoginForm onLoginSuccess={handleLoginSuccess} />
</PageTemplate>
