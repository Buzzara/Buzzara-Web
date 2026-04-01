# Buzzara Web

## Visao Geral

O `Buzzara-Web` e o frontend publico da plataforma Buzzara.  
Ele e responsavel por exibir os anuncios publicos e os detalhes dos perfis/anuncios consumindo a `Buzzara-API`.

Fluxos principais:

- listagem publica de anuncios
- filtro por localizacao e categoria de genero
- detalhe publico de anuncio
- detalhe publico de perfil
- navegacao para o painel admin local

Assim como o admin, este projeto nao acessa o banco diretamente. Tudo passa pela API.

## Stack Tecnologica

- React 18
- TypeScript
- Vite 5
- React Router
- Axios
- TanStack Query
- Tailwind CSS
- shadcn/ui
- Radix UI
- Embla Carousel

## Arquitetura do Projeto

Estrutura principal:

- `src/api`
  Funcoes de acesso HTTP aos endpoints publicos.
- `src/components`
  Componentes reutilizaveis de layout, cards e secoes.
- `src/context`
  Contextos auxiliares como geolocalizacao.
- `src/hooks`
  Hooks de consulta e estado para anuncios e perfil publico.
- `src/pages`
  Paginas publicas como home, anuncio, perfil e detalhes.
- `src/routes`
  Definicao das rotas do aplicativo.
- `src/types`
  Tipagens dos contratos retornados pela API.
- `vite.config.ts`
  Configuracao de desenvolvimento local e proxy.

## Como o Projeto se Conecta com a API

Em desenvolvimento, o frontend publico roda em:

- `http://localhost:5174`

A API roda em:

- `http://localhost:8080`

O Vite faz proxy local:

- `/api` -> `http://localhost:8080`
- `/uploads` -> `http://localhost:8080`

Arquivos relevantes:

- [vite.config.ts](C:/Projects/Buzzara-Web/vite.config.ts)
- [.env.example](C:/Projects/Buzzara-Web/.env.example)
- [src/api/api.ts](C:/Projects/Buzzara-Web/src/api/api.ts)

## Variaveis de Ambiente

Exemplo atual:

```env
VITE_API_URL=/api
VITE_ADMIN_URL=http://localhost:5173
```

Descricao:

- `VITE_API_URL`
  Base da API via proxy local.
- `VITE_ADMIN_URL`
  URL do painel admin local, usada no botao "Entrar".

## Requisitos para Rodar Localmente

- Node.js 20 ou superior
- npm
- API `Buzzara-API` em execucao
- Banco da API em execucao via Docker

## Como Clonar e Subir o Projeto

### 1. Clonar o repositorio

```bash
git clone <URL_DO_REPOSITORIO>
cd Buzzara-Web
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Preparar o arquivo `.env`

Se necessario:

```bash
copy .env.example .env
```

Conteudo esperado:

```env
VITE_API_URL=/api
VITE_ADMIN_URL=http://localhost:5173
```

### 4. Subir a API e o banco

No projeto da API:

```bash
cd C:\Users\natan\source\repos\Buzzara-API\buzzaraApi
docker compose --env-file .env -f docker-compose.db.yml -f docker-compose.yml up -d
```

### 5. Rodar o frontend publico

```bash
cd C:\Projects\Buzzara-Web
npm run dev -- --host localhost --port 5174
```

### 6. Acessar

```text
http://localhost:5174
```

## Comandos Uteis

Rodar em desenvolvimento:

```bash
npm run dev -- --host localhost --port 5174
```

Gerar build:

```bash
npm run build
```

Gerar build em modo development:

```bash
npm run build:dev
```

Rodar lint:

```bash
npm run lint
```

Preview:

```bash
npm run preview
```

## Rotas Publicas Principais

Rotas da aplicacao:

- `/`
  Home publica com listagem de anuncios
- `/profile/:id`
  Pagina principal do anuncio
- `/detalhes/:id`
  Pagina detalhada com perfil publico
- `/anuncios`
  Listagem publica simplificada
- `/anuncio/:id`
  Rota adicional de anuncio

Definicao em:

- [src/routes/index.tsx](C:/Projects/Buzzara-Web/src/routes/index.tsx)

## Endpoints Consumidos

Principais endpoints:

- `GET /publico/anuncios`
- `GET /publico/anuncios/{servicoId}`
- `GET /publico/perfil/{usuarioId}`

Arquivos relevantes:

- [src/api/anuncios.ts](C:/Projects/Buzzara-Web/src/api/anuncios.ts)
- [src/api/userGetAnunciosPorUsuario.ts](C:/Projects/Buzzara-Web/src/api/userGetAnunciosPorUsuario.ts)
- [src/hooks/useAds.ts](C:/Projects/Buzzara-Web/src/hooks/useAds.ts)
- [src/hooks/usePublicoPerfil.ts](C:/Projects/Buzzara-Web/src/hooks/usePublicoPerfil.ts)

## O que Esta Mockado ou Simulado

O projeto publico ainda mistura dados reais da API com elementos de interface simulados.

### Mockado no web

- visualizacoes do anuncio
  Sao geradas localmente com valor aleatorio.
- nota do anuncio/perfil
  E gerada aleatoriamente no frontend.
- barra de reputacao
  Depende de nota simulada.
- parte dos selos visuais de confianca
  Hoje sao mais de interface do que de validacao real.
- anuncios relacionados
  Sao derivados da lista local carregada, sem algoritmo real de relevancia.

Arquivos onde isso aparece:

- [src/pages/Profile/index.tsx](C:/Projects/Buzzara-Web/src/pages/Profile/index.tsx)
- [src/pages/DetalhesPerfil.tsx](C:/Projects/Buzzara-Web/src/pages/DetalhesPerfil.tsx)

## Ponto de Atencao Importante

Como os dados de reputacao, views e confianca ainda nao sao sustentados pela API, a proxima equipe deve decidir se:

- remove temporariamente esses elementos
- ou implementa endpoints reais para suportar essas exibicoes

Manter indicadores de confianca sem backend correspondente pode gerar interpretacao errada do usuario final.

## Pontos de Atencao para a Proxima Equipe

### Critico

- revisar toda a camada publica com base no contrato atual da API
- remover ou substituir elementos de reputacao simulados
- revisar tipagens sempre que a API mudar
- validar exibicao de imagem e video com fallback mais robusto

### Importante

- criar uma camada mais previsivel de tratamento de erro e loading
- reduzir acoplamento entre pagina e shape bruto do backend
- revisar componentes duplicados ou legados herdados da geracao inicial
- consolidar convencoes entre `pages`, `components` e `hooks`

### Evolucao

- implementar busca mais rica por cidade, estado e bairro
- criar listagem paginada real
- integrar analytics publicos reais quando a API suportar
- adicionar testes de interface e testes de contrato

## Melhorias Recomendadas

### Tecnicas

- adicionar testes com Vitest e React Testing Library
- adicionar validacao de resposta por schema
- criar camada de normalizacao de DTOs
- revisar bundle e code splitting

### Produto

- definir o que e dado publico oficial do perfil
- definir politica real de selos, reputacao e verificacao
- criar estrategia de anuncios relacionados
- alinhar melhor a navegacao entre frontend publico e painel admin

## Validacao Realizada

No estado atual documentado:

- o projeto compila com `npm run build`
- o projeto roda em `http://localhost:5174`
- o projeto consome a API local via proxy do Vite

## Ordem Recomendada para Subir o Ambiente Completo

1. Subir banco e API no projeto `Buzzara-API`
2. Subir `Buzzara-Admin` em `http://localhost:5173`
3. Subir `Buzzara-Web` em `http://localhost:5174`
4. Validar listagem publica, detalhe do anuncio e detalhe do perfil

## Arquivos Mais Importantes para Continuidade

- [src/pages/Home/index.tsx](C:/Projects/Buzzara-Web/src/pages/Home/index.tsx)
- [src/pages/Profile/index.tsx](C:/Projects/Buzzara-Web/src/pages/Profile/index.tsx)
- [src/pages/DetalhesPerfil.tsx](C:/Projects/Buzzara-Web/src/pages/DetalhesPerfil.tsx)
- [src/hooks/useAds.ts](C:/Projects/Buzzara-Web/src/hooks/useAds.ts)
- [src/hooks/usePublicoPerfil.ts](C:/Projects/Buzzara-Web/src/hooks/usePublicoPerfil.ts)
- [src/types/AnuncioPublico.ts](C:/Projects/Buzzara-Web/src/types/AnuncioPublico.ts)
- [vite.config.ts](C:/Projects/Buzzara-Web/vite.config.ts)

## Observacao Final

Este projeto foi ajustado para desenvolvimento local e hoje deve ser tratado como frontend publico dependente da `Buzzara-API`.  
Qualquer evolucao de regra de negocio, reputacao, moderacao, pagamento ou verificacao deve nascer primeiro na API e depois ser refletida aqui.
