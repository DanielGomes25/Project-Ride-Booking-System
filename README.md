Ride Booking System é um projeto conceito desenvolvido para simplificar o processo de reserva de viagens de carro particular. O sistema oferece uma experiência eficiente e intuitiva para os usuários, permitindo a solicitação de viagens, escolha entre motoristas disponíveis e visualização do histórico de viagens realizadas.

🛠️ Tecnologias Utilizadas

Backend: Construído com Node.js, TypeScript, Fastify e Prisma ORM, garantindo uma API REST robusta e escalável.

Frontend: Desenvolvido em React, proporcionando uma interface amigável e fluida para os usuários.

Banco de Dados: Integrado com Postgres para persistência de dados eficiente.

✨ Funcionalidades

Solicitação de Viagens: Usuários podem reservar viagens de forma simples e rápida.

Escolha de Motoristas: Listagem de motoristas disponíveis no momento da reserva.

Histórico de Viagens: Visualização das viagens realizadas, com implementação de tipagem rigorosa em TypeScript.

🎯 Objetivos do Projeto

Demonstrar habilidades no desenvolvimento de um sistema completo com Node.js e React.

Utilizar práticas modernas como ORM Prisma, Fastify e TypeScript para criar uma solução performática e bem estruturada.

Proporcionar uma experiência de usuário eficiente e responsiva.

🚀 Como Executar (Local)

Pré‑requisitos
- Node.js 18+ e npm
- Postgres 15+ (ou use Docker, veja abaixo)

1) Backend
- Copie o arquivo de exemplo e configure as variáveis:
  - `cp backend/.env.example backend/.env`
  - Ajuste `DATABASE_URL` para o seu Postgres local.
  - Para testar sem chave Google, mantenha `USE_MOCK_ROUTES=true`.
  - Opcional: se quiser rotas reais, coloque sua chave do Google em `GOOGLE_API_KEY` (Directions API habilitada) e defina `USE_MOCK_ROUTES=false`.
- Instale dependências e gere o Prisma Client:
  - `cd backend && npm install`
  - `npx prisma migrate dev` (cria/aplica tabelas)
  - `npm run seed` (popula motoristas)
- Rode a API:
  - `npm run dev` (http://localhost:8080)
  - Dica: para demo sem banco, defina `USE_MOCK_DRIVERS=true` no `.env` e você pode pular migrate/seed.
  - Para demo 100% sem dependências: também defina `USE_MOCK_DB=true` (salva/lista corridas em memória)

2) Frontend
- Configure as variáveis do Vite:
  - `cp frontend/.env.example frontend/.env`
  - Ajuste `VITE_API_BASE_URL` (ex.: http://localhost:8080)
  - Coloque a mesma `VITE_GOOGLE_MAPS_API_KEY` usada no backend
- Instale e rode:
  - `cd ../frontend && npm install`
  - `npm run dev` (Vite em http://localhost:5173)

Testando pela API (exemplos)
- Estimar corrida:
  - `curl -X POST http://localhost:8080/ride/estimate -H 'Content-Type: application/json' -d '{"customer_id":"00000000-0000-0000-0000-000000000001","origin":"Praça da Sé, São Paulo","destination":"Av. Paulista, 1000, São Paulo"}'`
- Confirmar corrida (use um `driver` retornado na estimativa):
  - `curl -X PATCH http://localhost:8080/ride/confirm -H 'Content-Type: application/json' -d '{"customer_id":"00000000-0000-0000-0000-000000000001","origin":"Praça da Sé, São Paulo","destination":"Av. Paulista, 1000, São Paulo","distance":12.3,"duration":"25 mins","driver":{"id":1,"name":"Homer Simpson"},"value":30.75}'`
- Listar corridas do cliente:
  - `curl http://localhost:8080/ride/00000000-0000-0000-0000-000000000001`

🐳 Docker Compose (opcional)
- Configure a variável `GOOGLE_API_KEY` no seu ambiente ou crie um arquivo `.env` na raiz com:
  - `GOOGLE_API_KEY=COLOQUE_SUA_CHAVE_AQUI`
- Suba tudo:
  - `docker compose up -d --build`
- Acesse:
  - Backend: http://localhost:8080
  - Frontend: http://localhost (mapeado para a porta 80)
- Aplique migrações e seed dentro do container do backend:
  - `docker compose exec backend npx prisma migrate deploy`
  - `docker compose exec backend npm run seed`

Modo mock (sem dependências externas)
- No `backend/.env` deixe:
  - `USE_MOCK_ROUTES=true` (não chama Google)
  - `USE_MOCK_DRIVERS=true` (não usa Postgres para listar motoristas)
  - `USE_MOCK_DB=true` (confirmação e histórico em memória)
- Observação: confirmar corrida e histórico ainda exigem banco. Posso mockar isso também, se quiser.

Observações importantes
- Se a API do Google retornar zero resultados ou a chave estiver inválida, a API responde 502 com `ROUTE_UNAVAILABLE`.
- Para portfólio público, nunca commite chaves reais. Use os arquivos `.env.example`.

**Variáveis De Ambiente**
- Backend (`backend/.env`):
  - `USE_MOCK_ROUTES` — quando `true`, não chama Google Directions e gera rotas simuladas.
  - `USE_MOCK_DRIVERS` — quando `true`, lista motoristas de um conjunto mock (sem banco).
  - `USE_MOCK_DB` — quando `true`, confirmações e histórico são salvos em memória.
  - `DATABASE_URL` — URL do Postgres (obrigatória quando `USE_MOCK_DB=false`).
  - `GOOGLE_API_KEY` — chave para Google Directions (obrigatória quando `USE_MOCK_ROUTES=false`).
- Frontend (`frontend/.env`):
  - `VITE_API_BASE_URL` — URL do backend (ex.: `http://localhost:8080`).
  - `VITE_GOOGLE_MAPS_API_KEY` — chave para Google Static Maps (opcional; sem ela, o mapa não é exibido, mas o app funciona).

**Fluxo De Teste Pela UI**
- Acesse `http://localhost:5173`.
- Preencha `ID do Cliente`, `Origem`, `Destino` e clique em `Calcular Estimativa`.
- Escolha um motorista, confirme, e depois consulte o histórico.

**Referência De API**
- `POST /ride/estimate`
  - Body: `{ "customer_id": string, "origin": string, "destination": string }`
  - Sucesso: `{ origin, destination, distance: number, duration: string, options: Driver[], routeResponse }`
  - Erros: `400 INVALID_DATA`, `502 ROUTE_UNAVAILABLE`.
- `PATCH /ride/confirm`
  - Body: `{ "customer_id": string, "origin": string, "destination": string, "distance": number, "duration": string, "driver": { id: number, name: string }, "value": number }`
  - Sucesso: `{ success: true }`
  - Erros: `400 INVALID_DATA`, `404 DRIVER_NOT_FOUND`, `406 INVALID_DISTANCE`.
- `GET /ride/:customer_id?driver_id=...`
  - Sucesso: `{ customer_id, rides: Ride[] }`
  - Erros: `400 INVALID_DRIVER`, `404 NO_RIDES_FOUND`.

Exemplos cURL
- Estimar:
  - `curl -X POST http://localhost:8080/ride/estimate -H 'Content-Type: application/json' -d '{"customer_id":"demo","origin":"Mogi","destination":"São Paulo"}'`
- Confirmar:
  - `curl -X PATCH http://localhost:8080/ride/confirm -H 'Content-Type: application/json' -d '{"customer_id":"demo","origin":"Mogi","destination":"São Paulo","distance":12.3,"duration":"25 mins","driver":{"id":1,"name":"Homer Simpson"},"value":30.75}'`
- Histórico:
  - `curl http://localhost:8080/ride/demo`

**Estrutura Do Projeto**
- Backend
  - Fastify + TypeScript: `backend/src/server.ts`
  - Rotas: `backend/src/routes/routes.ts`
  - Controladores: `backend/src/controllers/*`
  - Serviços: `backend/src/services/*`
  - Mock store (memória): `backend/src/mocks/memoryStore.ts`
  - Prisma schema: `backend/prisma/schema.prisma`
- Frontend
  - React + Vite: `frontend/`
  - Rotas de UI: `frontend/src/routes/AppRoutes.tsx`
  - Páginas: `frontend/src/pages/*`
  - Mapa estático: `frontend/src/components/StaticMap.tsx`

**Solução De Problemas**
- 502 `ROUTE_UNAVAILABLE`: ative `USE_MOCK_ROUTES=true` ou configure `GOOGLE_API_KEY` e habilite Directions API.
- `ECONNREFUSED` no frontend: verifique se o backend está ouvindo em `http://localhost:8080`. Ajuste `VITE_API_BASE_URL` no `frontend/.env`.
- Erros de banco: ative `USE_MOCK_DB=true` para demo, ou configure `DATABASE_URL` e rode `npx prisma migrate dev && npm run seed`.
- Mapa não aparece: defina `VITE_GOOGLE_MAPS_API_KEY` no `frontend/.env`.

🖥️ Demonstração

<img src='/Drive.gif'><img>
