# GitHub Repository Viewer

Uma aplicação SvelteKit focada em login e consulta de repositórios do GitHub, desenvolvida seguindo os princípios de arquitetura funcional e design atômico.

## 🚀 Recursos

- **Sistema de Login**: Autenticação simples com credenciais fixas
- **Arquitetura Funcional**: Baseada em componentes puros e padrão DDAU
- **Design Atômico**: Estrutura organizada em átomos, moléculas e organismos
- **TypeScript**: Tipagem forte em todo o projeto
- **Svelte 5**: Utilizando as novas runes para gerenciamento de estado
- **Client-side Only**: Sem SSR, apenas rendering no cliente

## 🔐 Credenciais de Acesso

Para acessar a aplicação, use as seguintes credenciais:

- **Usuário**: `admin`
- **Senha**: `admin`

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 20.19+ ou 22.12+ (recomendado)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd architecture-template
```

2. Instale as dependências:
```bash
npm install --force
```
> Nota: A flag `--force` é necessária devido à incompatibilidade de versões do Node.js

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em: `http://localhost:5173`

### Outros Comandos

- **Build para produção**: `npm run build`
- **Preview da build**: `npm run preview`
- **Executar testes**: `npm run test:unit`
- **Executar linter**: `npm run lint`
- **Formatar código**: `npm run format`
- **Storybook**: `npm run storybook`

## 📁 Estrutura do Projeto

```
src/
├── lib/
│   ├── components/
│   │   ├── atoms/           # Componentes básicos (Button, Input, Label)
│   │   ├── molecules/       # Combinações simples (InputField)
│   │   ├── organisms/       # Componentes complexos (LoginForm)
│   │   └── templates/       # Layouts de página (PageTemplate)
│   ├── services/           # Serviços de API (auth.service.ts)
│   ├── stores/             # Gerenciamento de estado (auth.store.ts)
│   ├── types/              # Definições TypeScript (auth.ts)
│   └── utils/              # Funções utilitárias
├── routes/                 # Rotas SvelteKit
│   ├── dashboard/          # Área protegida
│   ├── +layout.svelte      # Layout principal
│   ├── +layout.ts          # Configuração SSR
│   └── +page.svelte        # Página de login
└── tests/                  # Testes automatizados
```

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Login
- [x] Formulário de login funcional
- [x] Validação de campos obrigatórios
- [x] Autenticação com credenciais fixas (admin/admin)
- [x] Feedback visual de loading
- [x] Tratamento de erros
- [x] Persistência de sessão no localStorage

### ✅ Arquitetura
- [x] Componentes atômicos (Button, Input, Label)
- [x] Moléculas (InputField)
- [x] Organismos (LoginForm)
- [x] Templates (PageTemplate)
- [x] Serviços (AuthService)
- [x] Stores com Svelte 5 runes
- [x] Tipagem TypeScript completa

### ✅ Navegação e Proteção
- [x] Redirecionamento após login
- [x] Proteção de rotas privadas
- [x] Logout funcional
- [x] Estados de loading

### 🚧 Próximas Funcionalidades
- [ ] Consulta de repositórios do GitHub
- [ ] Interface de busca de usuários
- [ ] Listagem de repositórios
- [ ] Detalhes dos repositórios
- [ ] Testes automatizados completos

## 🧪 Testes

O projeto está configurado com Vitest para testes unitários e de componentes:

```bash
# Executar testes
npm run test:unit

# Executar testes em modo watch
npm run test:unit -- --watch

# Executar testes com coverage
npm run test:unit -- --coverage
```

## 🎨 Padrões de Desenvolvimento

### Convenções de Nomenclatura
- **Componentes**: PascalCase (`LoginForm.svelte`)
- **Funções**: camelCase (`validateForm`)
- **Constantes**: SCREAMING_SNAKE_CASE (`MOCK_CREDENTIALS`)
- **Tipos**: PascalCase (`LoginCredentials`)

### Princípios Seguidos
- **DDAU**: Data Down, Actions Up
- **Functional Programming**: Funções puras sempre que possível
- **Atomic Design**: Hierarquia clara de componentes
- **TDD**: Desenvolvimento orientado a testes
- **Single Responsibility**: Cada componente tem uma responsabilidade única

## 🚨 Problemas Conhecidos

1. **Versão do Node.js**: O projeto requer Node.js 20.19+ ou 22.12+, mas funciona com versões anteriores usando `--force`
2. **Dependências**: Algumas dependências podem precisar da flag `--force` para instalação

## 📝 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando SvelteKit e TypeScript**
