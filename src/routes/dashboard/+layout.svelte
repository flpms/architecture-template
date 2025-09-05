<script lang="ts">
	import { authStore } from '../../lib/stores/auth.store.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { children } = $props();

	// Redirect to login if not authenticated
	$effect(() => {
		if (!authStore.state.isLoading && !authStore.state.isAuthenticated) {
			goto('/');
		}
	});
</script>

<!-- Show loading state while checking authentication -->
{#if authStore.state.isLoading}
	<div class="loading-container">
		<div class="loading-spinner"></div>
		<p>Loading...</p>
	</div>
{:else if authStore.state.isAuthenticated}
	{@render children?.()}
{/if}

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-color: #f9fafb;
	}

	.loading-spinner {
		width: 2rem;
		height: 2rem;
		border: 3px solid #e5e7eb;
		border-top: 3px solid #3b82f6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 1rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.loading-container p {
		color: #6b7280;
		font-size: 0.875rem;
	}
</style>
