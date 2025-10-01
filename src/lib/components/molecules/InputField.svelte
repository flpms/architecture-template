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
		hasError={!!error}
		{onchange}
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
</style>
