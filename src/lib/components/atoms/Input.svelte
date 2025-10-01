<script lang="ts">
	interface Props {
		id?: string;
		type?: 'text' | 'password' | 'email';
		placeholder?: string;
		value?: string;
		disabled?: boolean;
		required?: boolean;
		hasError?: boolean;
		class?: string;
		onchange?: (value: string) => void;
	}

	let {
		id,
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		disabled = false,
		required = false,
		hasError = false,
		class: className = '',
		onchange
	}: Props = $props();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = target.value;
		onchange?.(target.value);
	}
</script>

<input
	{id}
	{type}
	{placeholder}
	{value}
	{disabled}
	{required}
	class="input {hasError ? 'error' : ''} {className}"
	oninput={handleInput}
	data-testid="input"
/>

<style>
	.input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	.input:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.input:disabled {
		background-color: #f3f4f6;
		color: #6b7280;
		cursor: not-allowed;
	}

	.input.error {
		border-color: #ef4444;
	}

	.input.error:focus {
		border-color: #ef4444;
		box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
	}
</style>
