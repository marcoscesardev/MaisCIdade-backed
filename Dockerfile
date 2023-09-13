# Use uma imagem Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY package.json yarn.lock ./

# Instale as dependências usando o Yarn
RUN yarn install

# Copie o restante dos arquivos
COPY . .

# Exponha a porta em que a aplicação NestJS está rodando
EXPOSE 3000

# Defina o comando para iniciar a aplicação com o Yarn
CMD ["yarn", "start"]
