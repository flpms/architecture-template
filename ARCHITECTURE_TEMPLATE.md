# Architecture Template - SvelteKit Application

## Project Overview

This template provides architectural guidelines for building a SvelteKit application with a focus on functional programming, atomic design patterns, and test-driven development. The project follows modern development practices and tools for scalable and maintainable applications.

## Technology Stack

- **Framework**: SvelteKit
- **Svelte Version**: 5 (latest)
- **UI Components**: bits-ui
- **Testing**: Vitest
- **Design Pattern**: Atomic Design
- **Programming Paradigm**: Functional Programming
- **Data Flow**: DDAU (Data Down, Actions Up)
- **Rendering**: Client-side only (no SSR)

## Core Principles

### 1. Functional Programming
- Use pure functions whenever possible
- Avoid side effects in components
- Implement immutable data patterns
- Prefer composition over inheritance

### 2. DDAU (Data Down, Actions Up)
- Props flow down from parent to child components
- Events bubble up from child to parent components
- No direct state mutation in child components
- Clear separation of concerns between data and actions

### 3. Atomic Design Structure
```
src/
├── lib/
│   ├── components/
│   │   ├── atoms/          # Basic building blocks
│   │   ├── molecules/      # Simple combinations of atoms
│   │   ├── organisms/      # Complex UI components
│   │   └── templates/      # Page-level layouts
│   ├── services/          # API integrations and external services
│   ├── stores/            # State management
│   ├── utils/             # Pure utility functions
│   └── types/             # TypeScript type definitions
├── routes/                # SvelteKit routes (client-side only)
└── tests/                 # Test files
```

### 4. State Management Rules
- Use Svelte 5 runes for reactive state
- Implement stores for global state
- Keep component state minimal and local
- Use derived state for computed values

## Development Workflow

### Test-Driven Development (TDD)
1. **Red**: Write a failing test first
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code while keeping tests green

### Test Structure
- Unit tests for atoms and molecules
- Integration tests for organisms and templates
- End-to-end tests for complete user flows
- Service layer tests for API integrations

## Component Guidelines

### Atoms
- Single responsibility components
- No internal state (stateless)
- Reusable across the application
- Examples: Button, Input, Label, Icon, Badge

### Molecules
- Combine multiple atoms
- Handle simple interactions
- Minimal state management
- Examples: InputField (Label + Input), SearchBox (Input + Button), Card

### Organisms
- Complex components with business logic
- May contain state
- Handle multiple user interactions
- Examples: Form, Navigation, DataTable, Modal

### Templates
- Page-level layouts
- Define component structure
- No styling or content
- Examples: PageTemplate, DashboardTemplate, FormTemplate

## Service Layer Architecture

### API Services
- Centralized API communication
- Error handling and retry logic
- Request/response transformation
- Authentication management

### Service Structure
```typescript
// Example service structure
interface ApiService {
  get<T>(endpoint: string): Promise<T>
  post<T>(endpoint: string, data: any): Promise<T>
  put<T>(endpoint: string, data: any): Promise<T>
  delete<T>(endpoint: string): Promise<T>
}
```

## Code Style Guidelines

### Svelte 5 Patterns
- Use `$state()` for reactive variables
- Use `$derived()` for computed values
- Use `$effect()` for side effects
- Implement proper component lifecycle management

### Functional Patterns
- Pure functions for data transformation
- Immutable data structures
- Function composition
- Higher-order functions for reusability

### Naming Conventions
- Components: PascalCase (e.g., `UserForm.svelte`)
- Functions: camelCase (e.g., `validateData`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `API_BASE_URL`)
- Types: PascalCase (e.g., `UserData`)

## Commit Guidelines

### Conventional Commits
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Commitlint Configuration
```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore"
      ]
    ],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"]
  }
}
```

## Project Structure Example

### Component Implementation
```
src/lib/components/
├── atoms/
│   ├── Button.svelte
│   ├── Input.svelte
│   ├── Label.svelte
│   ├── Icon.svelte
│   └── Badge.svelte
├── molecules/
│   ├── InputField.svelte
│   ├── SearchBox.svelte
│   └── Card.svelte
├── organisms/
│   ├── Form.svelte
│   ├── Navigation.svelte
│   └── DataTable.svelte
└── templates/
    ├── PageTemplate.svelte
    └── DashboardTemplate.svelte

src/lib/services/
├── api.service.ts
├── storage.service.ts
└── validation.service.ts

src/lib/stores/
├── app.store.ts
└── ui.store.ts

tests/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── services/
└── integration/
```

## Configuration Requirements

### Vitest Configuration
- Component testing with @testing-library/svelte
- Coverage reporting
- Mock service layer for testing
- Snapshot testing for UI components

### SvelteKit Configuration
- Disable SSR completely
- Client-side routing only
- Static adapter for deployment
- TypeScript support enabled

### ESLint and Prettier
- Functional programming rules
- Svelte-specific linting
- Import sorting and organization
- Consistent code formatting

## Limitations and Constraints

### What NOT to Implement
- Server-side rendering (SSR)
- Server-side data processing
- Database connections in routes
- Direct DOM manipulation
- Imperative programming patterns
- Class-based components

### Development Constraints
- All API calls must go through service layer
- No direct state mutation in components
- Components must be testable in isolation
- Follow atomic design hierarchy strictly
- Implement comprehensive test coverage
- Use TypeScript for type safety

## Getting Started Checklist

1. **Setup Project Structure**
   - [ ] Initialize SvelteKit project with client-side adapter
   - [ ] Configure Vitest for testing
   - [ ] Setup bits-ui component library
   - [ ] Configure TypeScript
   - [ ] Setup ESLint and Prettier

2. **Implement Core Architecture**
   - [ ] Create atomic design folder structure
   - [ ] Setup service layer pattern
   - [ ] Configure state management with stores
   - [ ] Implement error handling patterns

3. **Develop Features (TDD)**
   - [ ] Write tests for atoms (Button, Input, Label)
   - [ ] Implement atoms to pass tests
   - [ ] Write tests for molecules (InputField, Card)
   - [ ] Implement molecules to pass tests
   - [ ] Write tests for organisms (Form, Navigation)
   - [ ] Implement organisms to pass tests
   - [ ] Write integration tests for complete user flows
   - [ ] Implement service layer for external integrations

4. **Quality Assurance**
   - [ ] Setup commitlint configuration
   - [ ] Configure pre-commit hooks
   - [ ] Implement comprehensive test coverage
   - [ ] Document component APIs
   - [ ] Validate architectural patterns

## Success Criteria

- All components follow atomic design principles
- 100% test coverage for critical paths
- No SSR dependencies or server-side code
- Functional programming patterns throughout
- DDAU data flow implemented correctly
- Service layer handles all external integrations
- Conventional commits and proper git workflow
- TypeScript types for all interfaces and functions

---

This template serves as a comprehensive guide for building maintainable, testable, and scalable SvelteKit applications using modern development practices and architectural patterns.
