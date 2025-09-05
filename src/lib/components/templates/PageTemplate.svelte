<script lang="ts">
	interface Props {
		title?: string;
		children?: any;
	}

	let { title = 'Login', children }: Props = $props();
</script>

<svelte:head>
	<title>{title} - GitHub Repository Viewer</title>
</svelte:head>

<div class="page-template" data-testid="page-template">
	<div class="container">
		<main class="main-content">
			{@render children?.()}
		</main>
	</div>
</div>

<style>
	.page-template {
		min-height: 100vh;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.container {
		width: 100%;
		max-width: 1200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.main-content {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
