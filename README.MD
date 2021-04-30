# Teste para Connvert

Sistema de gerencialmento de dívidas

As principais tecnologias usadas foram <a  href="https://nodejs.org/en/">Node</a>, <a  href="https://www.docker.com/">Docker</a>, <a href="https://www.typescriptlang.org/">TypeScript</a>, <a  href="https://www.mongodb.com/">MongoDb</a>, <a  href="https://jwt.io/">JWT</a> e <a  href="https://expressjs.com/pt-br/">Express</a> .

## Dependências para desenvolvimento e execução
* Node.js >= v15.12.0
* Docker
* MongoDB
* E as demais citadas acima

## Testes
* Testes não foram aplicadas pelo tempo limitado

#### Frontend - (Aplicação Web)

- [WEB](https://github.com/flavioro/connvert-code7-front)

## Executar a aplicação com Docker
```
docker-compose up -d
```

## Executar a aplicação sem Docker
- 1 - Instalar manualmente o mongo
- 2 - Instalação das dependencias
```
yarn 
```
3 - Executar a api
```
yarn dev
```

* Obs: Deixei o arquivo .env propositalmente no git, em aplicações o arquivo .env não é colocado.

## API
 * Usuário
<br>Post Register```/v1/users/create```
<br>Post Login
```/v1/users/auth```

 * Cliente
<br>Get All
 ```/v1/clients```
<br>Get By Id
 ```/v1/clients/:id```
<br>Get Debts By Client - ```/v1/clients/:id/debts```

 * Dívida
<br>Post Debt - ```/v1/debts```
<br>Put Debt - ```/v1/debts/:id```
<br>Delete Debt - ```/v1/debts/:id```