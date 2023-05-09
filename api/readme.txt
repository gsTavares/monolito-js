// Para criar o backend

-- Tenha o node instalado

-- Se for abrir esse projeto de teste e não tiver a pasta node_modules
    rodar o comando npm install

1 - Crie uma pasta
2 - Entre nela pelo CMD
3 - Rode o comando npm init -y
4 - npm install express
5 - npm install typescript ts-node nodemon -D
6.1 - npm install @types/express @types/node -D
6.2 - npm install pg
6.3 - npm install @types/pg
6.4 - npm install cors
6.5 - npm install @types/cors

7 - Criar o arquivo tsconfig.json e jogar isso dentro dele:
{
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"]
}

8 - Abrir o package.json, na coluna "scripts", adicionar isso:
"build": "tsc --project ./",
"start:dev": "nodemon src/server.ts",
"start:prod": "node dist/server.js"

9 - Criar pasta src e criar o arquivo server.ts
10 - Usar o arquivo de exemplo para criar o servidor
11 - Para iniciar o server --> rodar o comando npm run start:dev

// Documentações

https://node-postgres.com/apis/client
https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
https://expressjs.com/pt-br/4x/api.html
https://levelup.gitconnected.com/creating-a-node-js-api-with-express-and-typescript-549fba5f5a33