# HelpDesk Web — Login com JSON REST Server

Tela de login em React + Vite + TypeScript que autentica na API `helpdesk-jrs`
(`POST /auth`) e recebe o `access_token` (JWT).

## Rodar

1. API (em outro terminal):
   ```bash
   cd helpdesk-jrs
   json_rest_server run
   ```
   Sobe em `http://127.0.0.1:5050` (porta definida no `config.yaml`).

2. Front:
   ```bash
   cd helpdesk-web
   npm install
   npm run dev
   ```
   Abra `http://localhost:5173`.

A URL da API fica no `.env` (`VITE_API_URL`).

## Contas de teste
| Papel | E-mail | Senha | |
|---|---|---|---|
| Usuário | usuario@helpdesk.local | Usuario@123 | |
| Admin | admin@helpdesk.local | Admin@123 | marque "Entrar como administrador" |

## Arquivos principais
- `src/services/auth.ts` — `login()` faz `POST /auth`, salva o `access_token` no `localStorage`; `getMe()` usa `Authorization: Bearer TOKEN` em `/me`.
- `src/pages/Login.tsx` — formulário de login.
- `src/pages/Home.tsx` — mostra o usuário logado e o token recebido.
- `src/App.tsx` — alterna entre Login e Home conforme o token.
