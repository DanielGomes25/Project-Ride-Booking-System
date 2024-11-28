# Usando a imagem oficial do Node.js (versão 18-alpine para ser mais leve)
FROM node:18-alpine

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e o package-lock.json para o container
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos para o diretório de trabalho dentro do container
COPY . .
# Rodar as migrations do Prisma
RUN npx prisma migrate deploy

# Rodar o script de seed após a inicialização do banco de dados
RUN npm run seed
# Configurar a variável de ambiente para o banco de dados
ENV DATABASE_URL="postgresql://postgres:mybank123@database-1.clqaiowkk5b9.us-east-1.rds.amazonaws.com:5432/mydatabase"

# Compilar o código TypeScript
RUN npm run build

# Expor a porta 8080, que é a porta onde o backend estará ouvindo
EXPOSE 8080

# Definir o comando para rodar o backend
CMD ["npm", "run", "start"]
