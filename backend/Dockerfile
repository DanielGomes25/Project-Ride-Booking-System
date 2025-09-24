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
# Compilar o código TypeScript
RUN npm run build

# Expor a porta 8080, que é a porta onde o backend estará ouvindo
EXPOSE 8080

# Definir o comando para rodar o backend, aplicando migrations e seed em runtime
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/server.js"]
