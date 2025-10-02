import { describe, it, expect, vi } from 'vitest';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'secondary' | 'danger';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	loading?: boolean;
	onclick?: () => void;
	class?: string;
	children?: unknown;
}

// Mock Button component behavior functions for testing
function createButtonComponent(props: Partial<ButtonProps> = {}) {
	const defaultProps = {
		type: 'button',
		variant: 'primary',
		size: 'md',
		disabled: false,
		loading: false,
		onclick: undefined,
		class: '',
		children: undefined
	};

	return { ...defaultProps, ...props };
}

function generateButtonClasses(variant: string, size: string, customClass: string) {
	return `btn btn-${variant} btn-${size} ${customClass}`.trim();
}

function handleButtonClick(disabled: boolean, loading: boolean, onclick?: () => void) {
	if (!disabled && !loading && onclick) {
		onclick();
	}
}

describe('Button Atom', () => {
	describe('Default Props', () => {
		it('has correct default values', () => {
			const button = createButtonComponent();

			expect(button.type).toBe('button');
			expect(button.variant).toBe('primary');
			expect(button.size).toBe('md');
			expect(button.disabled).toBe(false);
			expect(button.loading).toBe(false);
			expect(button.class).toBe('');
		});
	});

	describe('Props - Type', () => {
		it('accepts submit type', () => {
			const button = createButtonComponent({ type: 'submit' });
			expect(button.type).toBe('submit');
		});

		it('accepts reset type', () => {
			const button = createButtonComponent({ type: 'reset' });
			expect(button.type).toBe('reset');
		});

		it('defaults to button type', () => {
			const button = createButtonComponent();
			expect(button.type).toBe('button');
		});
	});

	describe('Props - Variant', () => {
		it('defaults to primary variant', () => {
			const button = createButtonComponent();
			expect(button.variant).toBe('primary');
		});

		it('accepts secondary variant', () => {
			const button = createButtonComponent({ variant: 'secondary' });
			expect(button.variant).toBe('secondary');
		});

		it('accepts danger variant', () => {
			const button = createButtonComponent({ variant: 'danger' });
			expect(button.variant).toBe('danger');
		});
	});

	describe('Props - Size', () => {
		it('defaults to medium size', () => {
			const button = createButtonComponent();
			expect(button.size).toBe('md');
		});

		it('accepts small size', () => {
			const button = createButtonComponent({ size: 'sm' });
			expect(button.size).toBe('sm');
		});

		it('accepts large size', () => {
			const button = createButtonComponent({ size: 'lg' });
			expect(button.size).toBe('lg');
		});
	});

	describe('Props - Disabled State', () => {
		it('defaults to enabled', () => {
			const button = createButtonComponent();
			expect(button.disabled).toBe(false);
		});

		it('can be disabled', () => {
			const button = createButtonComponent({ disabled: true });
			expect(button.disabled).toBe(true);
		});
	});

	describe('Props - Loading State', () => {
		it('defaults to not loading', () => {
			const button = createButtonComponent();
			expect(button.loading).toBe(false);
		});

		it('can be in loading state', () => {
			const button = createButtonComponent({ loading: true });
			expect(button.loading).toBe(true);
		});
	});

	describe('CSS Class Generation', () => {
		it('generates correct default classes', () => {
			const classes = generateButtonClasses('primary', 'md', '');
			expect(classes).toBe('btn btn-primary btn-md');
		});

		it('generates classes with custom variant and size', () => {
			const classes = generateButtonClasses('secondary', 'lg', '');
			expect(classes).toBe('btn btn-secondary btn-lg');
		});

		it('includes custom classes', () => {
			const classes = generateButtonClasses('primary', 'md', 'custom-class');
			expect(classes).toBe('btn btn-primary btn-md custom-class');
		});

		it('handles multiple custom classes', () => {
			const classes = generateButtonClasses('danger', 'sm', 'custom-1 custom-2');
			expect(classes).toBe('btn btn-danger btn-sm custom-1 custom-2');
		});
	});

	describe('Click Event Handling', () => {
		it('calls onclick handler when enabled and not loading', () => {
			const handleClick = vi.fn();
			handleButtonClick(false, false, handleClick);

			expect(handleClick).toHaveBeenCalledTimes(1);
		});

		it('does not call onclick when disabled', () => {
			const handleClick = vi.fn();
			handleButtonClick(true, false, handleClick);

			expect(handleClick).not.toHaveBeenCalled();
		});

		it('does not call onclick when loading', () => {
			const handleClick = vi.fn();
			handleButtonClick(false, true, handleClick);

			expect(handleClick).not.toHaveBeenCalled();
		});

		it('does not call onclick when both disabled and loading', () => {
			const handleClick = vi.fn();
			handleButtonClick(true, true, handleClick);

			expect(handleClick).not.toHaveBeenCalled();
		});

		it('handles undefined onclick gracefully', () => {
			// Should not throw error
			expect(() => handleButtonClick(false, false, undefined)).not.toThrow();
		});
	});

	describe('Functional Programming Principles', () => {
		it('is pure - same input produces same output', () => {
			const props: Partial<ButtonProps> = { variant: 'secondary', size: 'lg', class: 'test' };

			const result1 = createButtonComponent(props);
			const result2 = createButtonComponent(props);

			expect(result1).toEqual(result2);
		});

		it('does not mutate input props', () => {
			const originalProps: Partial<ButtonProps> = { variant: 'primary', size: 'md' };
			const propsCopy = { ...originalProps };

			createButtonComponent(originalProps);

			expect(originalProps).toEqual(propsCopy);
		});

		it('follows DDAU pattern - actions bubble up', () => {
			let actionCalled = false;
			const action = () => { actionCalled = true; };

			// Component only stores the action, doesn't execute it immediately
			const button = createButtonComponent({ onclick: action });
			expect(actionCalled).toBe(false);

			// Action is only called when click is handled
			handleButtonClick(button.disabled, button.loading, button.onclick);
			expect(actionCalled).toBe(true);
		});
	});

	describe('Button State Logic', () => {
		it('is enabled when not disabled and not loading', () => {
			const disabled = false;
			const loading = false;
			const isDisabled = disabled || loading;
			expect(isDisabled).toBe(false);
		});

		it('is disabled when disabled prop is true', () => {
			const disabled = true;
			const loading = false;
			const isDisabled = disabled || loading;
			expect(isDisabled).toBe(true);
		});

		it('is disabled when loading prop is true', () => {
			const disabled = false;
			const loading = true;
			const isDisabled = disabled || loading;
			expect(isDisabled).toBe(true);
		});

		it('is disabled when both disabled and loading are true', () => {
			const disabled = true;
			const loading = true;
			const isDisabled = disabled || loading;
			expect(isDisabled).toBe(true);
		});
	});

	describe('Edge Cases', () => {
		it('handles empty string class', () => {
			const classes = generateButtonClasses('primary', 'md', '');
			expect(classes).toBe('btn btn-primary btn-md');
		});

		it('handles whitespace in custom class', () => {
			const classes = generateButtonClasses('primary', 'md', '  custom  ');
			expect(classes).toBe('btn btn-primary btn-md   custom  ');
		});

		it('maintains immutability with multiple prop updates', () => {
			const button1 = createButtonComponent({ variant: 'primary' });
			const button2 = createButtonComponent({ variant: 'secondary' });

			expect(button1.variant).toBe('primary');
			expect(button2.variant).toBe('secondary');
		});
	});

	describe('Component Interface Validation', () => {
		it('accepts all valid type values', () => {
			const validTypes: Array<'button' | 'submit' | 'reset'> = ['button', 'submit', 'reset'];

			validTypes.forEach(type => {
				const button = createButtonComponent({ type });
				expect(button.type).toBe(type);
			});
		});

		it('accepts all valid variant values', () => {
			const validVariants: Array<'primary' | 'secondary' | 'danger'> = ['primary', 'secondary', 'danger'];

			validVariants.forEach(variant => {
				const button = createButtonComponent({ variant });
				expect(button.variant).toBe(variant);
			});
		});

		it('accepts all valid size values', () => {
			const validSizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];

			validSizes.forEach(size => {
				const button = createButtonComponent({ size });
				expect(button.size).toBe(size);
			});
		});
	});
});