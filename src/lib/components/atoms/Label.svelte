<script lang="ts">
	interface Props {
		for?: string;
		required?: boolean;
		class?: string;
		children?: any;
	}

	let {
		for: htmlFor,
		required = false,
		class: className = '',
		children
	}: Props = $props();
</script>

<label for={htmlFor} class="label {className}" data-testid="label">
	{@render children?.()}
	{#if required}
		<span class="required" aria-label="Required">*</span>
	{/if}
</label>

<style>
	.label {
		display: block;
		font-weight: 500;
		color: #374151;
		margin-bottom: 0.5rem;
		font-size: 0.875rem;
	}

	.required {
		color: #ef4444;
		margin-left: 0.25rem;
	}
</style>
