<script lang="ts">
	import Label from '../atoms/Label.svelte';
	import Input from '../atoms/Input.svelte';

	interface Props {
		label: string;
		id: string;
		type?: 'text' | 'password' | 'email';
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		error?: string;
		class?: string;
		onchange?: (value: string) => void;
	}

	let {
		label,
		id,
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		disabled = false,
		required = false,
		error,
		class: className = '',
		onchange
	}: Props = $props();
</script>

<div class="input-field {className}" data-testid="input-field">
	<Label for={id} {required}>
		{label}
	</Label>
	<Input
		{id}
		{type}
		{placeholder}
		bind:value
		{disabled}
		{required}
		{onchange}
		class={error ? 'error' : ''}
	/>
	{#if error}
		<span class="error-message" data-testid="error-message">{error}</span>
	{/if}
</div>

<style>
	.input-field {
		margin-bottom: 1rem;
	}

	.error-message {
		display: block;
		color: #ef4444;
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}

	:global(.input-field .input.error) {
		border-color: #ef4444;
	}

	:global(.input-field .input.error:focus) {
		border-color: #ef4444;
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}
</style>
