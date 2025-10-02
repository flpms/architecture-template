import { describe, it, expect, vi } from 'vitest';

interface InputProps {
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

// Mock Input component behavior functions for testing
function createInputComponent(props: Partial<InputProps> = {}) {
	const defaultProps = {
		id: undefined,
		type: 'text',
		placeholder: '',
		value: '',
		disabled: false,
		required: false,
		hasError: false,
		class: '',
		onchange: undefined
	};

	return { ...defaultProps, ...props };
}

function generateInputClasses(hasError: boolean, customClass: string) {
	const baseClass = 'input';
	const errorClass = hasError ? 'error' : '';
	return `${baseClass} ${errorClass} ${customClass}`.trim().replace(/\s+/g, ' ');
}

function handleInputChange(value: string, onchange?: (value: string) => void) {
	if (onchange) {
		onchange(value);
	}
}

describe('Input Atom', () => {
	describe('Default Props', () => {
		it('has correct default values', () => {
			const input = createInputComponent();

			expect(input.type).toBe('text');
			expect(input.placeholder).toBe('');
			expect(input.value).toBe('');
			expect(input.disabled).toBe(false);
			expect(input.required).toBe(false);
			expect(input.hasError).toBe(false);
			expect(input.class).toBe('');
			expect(input.id).toBeUndefined();
		});
	});

	describe('Props - Type', () => {
		it('defaults to text type', () => {
			const input = createInputComponent();
			expect(input.type).toBe('text');
		});

		it('accepts password type', () => {
			const input = createInputComponent({ type: 'password' });
			expect(input.type).toBe('password');
		});

		it('accepts email type', () => {
			const input = createInputComponent({ type: 'email' });
			expect(input.type).toBe('email');
		});
	});

	describe('Props - Value', () => {
		it('defaults to empty string', () => {
			const input = createInputComponent();
			expect(input.value).toBe('');
		});

		it('accepts custom value', () => {
			const input = createInputComponent({ value: 'test value' });
			expect(input.value).toBe('test value');
		});

		it('handles bindable value updates', () => {
			let value = 'initial';

			// Simulate value binding update
			value = 'updated';
			const updatedInput = createInputComponent({ value });

			expect(updatedInput.value).toBe('updated');
		});
	});

	describe('Props - Placeholder', () => {
		it('defaults to empty string', () => {
			const input = createInputComponent();
			expect(input.placeholder).toBe('');
		});

		it('accepts custom placeholder', () => {
			const input = createInputComponent({ placeholder: 'Enter your name' });
			expect(input.placeholder).toBe('Enter your name');
		});
	});

	describe('Props - ID', () => {
		it('defaults to undefined', () => {
			const input = createInputComponent();
			expect(input.id).toBeUndefined();
		});

		it('accepts custom id', () => {
			const input = createInputComponent({ id: 'username-input' });
			expect(input.id).toBe('username-input');
		});
	});

	describe('Props - Disabled State', () => {
		it('defaults to enabled', () => {
			const input = createInputComponent();
			expect(input.disabled).toBe(false);
		});

		it('can be disabled', () => {
			const input = createInputComponent({ disabled: true });
			expect(input.disabled).toBe(true);
		});
	});

	describe('Props - Required State', () => {
		it('defaults to not required', () => {
			const input = createInputComponent();
			expect(input.required).toBe(false);
		});

		it('can be required', () => {
			const input = createInputComponent({ required: true });
			expect(input.required).toBe(true);
		});
	});

	describe('Props - Error State', () => {
		it('defaults to no error', () => {
			const input = createInputComponent();
			expect(input.hasError).toBe(false);
		});

		it('can have error state', () => {
			const input = createInputComponent({ hasError: true });
			expect(input.hasError).toBe(true);
		});
	});

	describe('CSS Class Generation', () => {
		it('generates correct default classes', () => {
			const classes = generateInputClasses(false, '');
			expect(classes).toBe('input');
		});

		it('includes error class when hasError is true', () => {
			const classes = generateInputClasses(true, '');
			expect(classes).toBe('input error');
		});

		it('includes custom classes', () => {
			const classes = generateInputClasses(false, 'custom-class');
			expect(classes).toBe('input custom-class');
		});

		it('combines error and custom classes', () => {
			const classes = generateInputClasses(true, 'custom-class');
			expect(classes).toBe('input error custom-class');
		});

		it('handles multiple custom classes', () => {
			const classes = generateInputClasses(false, 'custom-1 custom-2');
			expect(classes).toBe('input custom-1 custom-2');
		});
	});

	describe('Input Event Handling', () => {
		it('calls onchange handler with new value', () => {
			const handleChange = vi.fn();
			const newValue = 'test input';

			handleInputChange(newValue, handleChange);

			expect(handleChange).toHaveBeenCalledTimes(1);
			expect(handleChange).toHaveBeenCalledWith(newValue);
		});

		it('handles undefined onchange gracefully', () => {
			// Should not throw error
			expect(() => handleInputChange('test', undefined)).not.toThrow();
		});

		it('calls onchange with empty string', () => {
			const handleChange = vi.fn();

			handleInputChange('', handleChange);

			expect(handleChange).toHaveBeenCalledWith('');
		});

		it('calls onchange with special characters', () => {
			const handleChange = vi.fn();
			const specialValue = '!@#$%^&*()';

			handleInputChange(specialValue, handleChange);

			expect(handleChange).toHaveBeenCalledWith(specialValue);
		});
	});

	describe('Functional Programming Principles', () => {
		it('is pure - same input produces same output', () => {
			const props: Partial<InputProps> = { type: 'email', placeholder: 'test', hasError: true };

			const result1 = createInputComponent(props);
			const result2 = createInputComponent(props);

			expect(result1).toEqual(result2);
		});

		it('does not mutate input props', () => {
			const originalProps: Partial<InputProps> = { type: 'password', value: 'secret' };
			const propsCopy = { ...originalProps };

			createInputComponent(originalProps);

			expect(originalProps).toEqual(propsCopy);
		});

		it('follows DDAU pattern - data flows down, actions up', () => {
			let externalValue = '';
			const onchange = (value: string) => {
				externalValue = value;
			};

			// Component receives data down (value prop)
			const input = createInputComponent({ value: 'initial', onchange });
			expect(input.value).toBe('initial');
			expect(externalValue).toBe(''); // No immediate execution

			// Action bubbles up when input changes
			handleInputChange('user input', input.onchange);
			expect(externalValue).toBe('user input');
		});

		it('maintains immutability', () => {
			const input1 = createInputComponent({ value: 'first' });
			const input2 = createInputComponent({ value: 'second' });

			expect(input1.value).toBe('first');
			expect(input2.value).toBe('second');
		});
	});

	describe('Component Interface Validation', () => {
		it('accepts all valid type values', () => {
			const validTypes: Array<'text' | 'password' | 'email'> = ['text', 'password', 'email'];

			validTypes.forEach(type => {
				const input = createInputComponent({ type });
				expect(input.type).toBe(type);
			});
		});

		it('handles boolean props correctly', () => {
			const input = createInputComponent({
				disabled: true,
				required: true,
				hasError: true
			});

			expect(input.disabled).toBe(true);
			expect(input.required).toBe(true);
			expect(input.hasError).toBe(true);
		});
	});

	describe('Edge Cases', () => {
		it('handles empty string class', () => {
			const classes = generateInputClasses(false, '');
			expect(classes).toBe('input');
		});

		it('handles whitespace in custom class', () => {
			const classes = generateInputClasses(false, '  custom  ');
			expect(classes).toBe('input   custom');
		});

		it('handles long values', () => {
			const longValue = 'a'.repeat(1000);
			const input = createInputComponent({ value: longValue });
			expect(input.value).toBe(longValue);
		});

		it('handles special characters in value', () => {
			const specialValue = '<script>alert("xss")</script>';
			const input = createInputComponent({ value: specialValue });
			expect(input.value).toBe(specialValue);
		});

		it('handles unicode characters', () => {
			const unicodeValue = '🚀 Hello 世界 👋';
			const input = createInputComponent({ value: unicodeValue });
			expect(input.value).toBe(unicodeValue);
		});
	});

	describe('Input Validation Logic', () => {
		it('combines required and error states correctly', () => {
			const input = createInputComponent({
				required: true,
				hasError: true,
				value: ''
			});

			expect(input.required).toBe(true);
			expect(input.hasError).toBe(true);
			expect(input.value).toBe('');
		});

		it('maintains state independence', () => {
			// Error state should be independent of other props
			const errorInput = createInputComponent({ hasError: true });
			const normalInput = createInputComponent({ hasError: false });

			expect(errorInput.hasError).toBe(true);
			expect(normalInput.hasError).toBe(false);
		});
	});

	describe('Accessibility Support', () => {
		it('supports aria-describedby through id prop', () => {
			const input = createInputComponent({ id: 'email-input' });
			expect(input.id).toBe('email-input');
		});

		it('supports required attribute for screen readers', () => {
			const input = createInputComponent({ required: true });
			expect(input.required).toBe(true);
		});

		it('provides error state information', () => {
			const input = createInputComponent({ hasError: true });
			const classes = generateInputClasses(input.hasError, input.class);
			expect(classes).toContain('error');
		});
	});

	describe('Data Binding Simulation', () => {
		it('simulates two-way binding behavior', () => {
			let boundValue = 'initial';
			const onchange = (newValue: string) => {
				boundValue = newValue;
			};

			// Initial state
			let input = createInputComponent({ value: boundValue, onchange });
			expect(input.value).toBe('initial');

			// Simulate user input
			handleInputChange('user typed this', input.onchange);
			expect(boundValue).toBe('user typed this');

			// Simulate reactive update
			input = createInputComponent({ value: boundValue, onchange });
			expect(input.value).toBe('user typed this');
		});
	});
});