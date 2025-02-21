
# Truther | Teste back-end

Este repositório segue a demanda de teste prático do seguinte [link](https://lavender-fox-89a.notion.site/Desafio-t-cnico-Truther-Backend-170774770cc1805ca447f8b625db3fcc#e5a75ec8004b447dac4acba3e35662b2).

O teste foi realizado usando Nestjs com Typescript, usando postgresql como base de dados e Prisma como ORM





## Stack utilizada

**Back-end:** Nest (node v18.19.1)

**ORM:** Prisma

**Database**: Postgres (16)

**Crypto API**: CoinGecko


## Documentação da API

### Moedas
#### Retorna todas as moedas de forma paginada da API

```http
  GET /crypto/{:id}
```

| Query   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `page` | `int` | A página (por padrão 1) da CoinGecko a ser acessada |

#### Retorna uma moeda especifica da CoinGecko e a salva na base de dados interna

```http
  GET /crypto/{:id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O id da coin da CoinGecko |


### Usuários

#### Criar usuário

```http
  POST /users
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `senha` | `string` | **Obrigatório**. Senha do usuário |
| `funcao` | `string` | Função do usuário (cliente ou admin). Por padrão: cliente|

#### Atualizar usuário

```http
  PATCH /users/{:id}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório**. Identificador do usuário no banco |


| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | Nome do usuário |
| `email` | `string` | Email do usuário |
| `funcao` | `string` | Função do usuário (cliente ou admin). Por padrão: cliente|


#### Listar todos os usuários

```http
  GET /users
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório**. Identificador do usuário no banco |

| Query   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `search` | `string` | Texto para filtragem em nome ou email |


#### Listar usuário especifico

```http
  GET /users/{:id}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório**. Identificador do usuário no banco |

#### Deletar usuário especifico

```http
  DELETE /users/{:id}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `int` | **Obrigatório**. Identificador do usuário no banco |


O arquivo **Truther.postman_collection.json** contem as rotas para importação via postman
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`
`COINGECKO_URL`
`COINGECKO_API`

Um arquivo .env.example está no repositório para base
## Funcionalidades a serem implementadas

As seguintes funcionalidades faltaram a serem desenvolvidas:

- Autenticação JWT
- CRON para get de moedas (no momento, acontecem no GET da moeda especifica)
- Testes automatizados

## Instalação

Instale o projeto com os seguintes comandos

```bash
  npm i
  npx prisma migrate deploy
  npm run build
  npm start
```
    
