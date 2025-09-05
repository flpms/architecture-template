<script lang="ts">
	import { authStore } from '../../lib/stores/auth.store.js';
	import Button from '../../lib/components/atoms/Button.svelte';

	async function handleLogout() {
		await authStore.logout();
	}
</script>

<svelte:head>
	<title>GitHub Repository Viewer</title>
</svelte:head>

<div class="dashboard">
	<header class="header">
		<div class="header-content">
			<h1>GitHub Repository Viewer</h1>
			<div class="user-info">
				<span>Welcome, {authStore.state.user?.username}!</span>
				<Button variant="secondary" onclick={handleLogout}>
					Logout
				</Button>
			</div>
		</div>
	</header>

	<main class="main">
		<div class="content">
			<h2>Repository Search</h2>
			<p>This will be the GitHub repository search functionality.</p>
			<p>Coming soon...</p>
		</div>
	</main>
</div>

<style>
	.dashboard {
		min-height: 100vh;
		background-color: #f9fafb;
	}

	.header {
		background-color: white;
		border-bottom: 1px solid #e5e7eb;
		padding: 1rem 0;
	}

	.header-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header h1 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.user-info span {
		color: #6b7280;
		font-size: 0.875rem;
	}

	.main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.content {
		background-color: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
	}

	.content h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 1rem 0;
	}

	.content p {
		color: #6b7280;
		margin: 0.5rem 0;
	}
</style>
