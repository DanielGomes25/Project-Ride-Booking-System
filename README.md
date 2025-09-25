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
- Observação: confirmar corrida e histórico ainda exigem banco. Posso mockar isso também, se quiser.

Observações importantes
- Se a API do Google retornar zero resultados ou a chave estiver inválida, a API responde 502 com `ROUTE_UNAVAILABLE`.
- Para portfólio público, nunca commite chaves reais. Use os arquivos `.env.example`.

🖥️ Demonstração

<img src='/Drive.gif'><img>
