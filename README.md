# uxGroupCase
Repository to put the UX Group test into practice

### Pré-requisitos

- Node.js (v20+ recomendado)
- npm

### Passo a passo

1. Clone o repositório:

   git clone https://github.com/nog139/uxGroupCase.git

2. Instale as dependências:

    npm i

3. Rode o projeto:

    npm run dev

### OBSERVAÇÕES

O projeto não usa banco de dados, os dados são salvos em arquivos .json.

Todos os dados são validados usando Zod.

O campo valor da comissão pode ser positivo ou negativo.

### USUÁRIOS
[POST] /users/create
Body JSON:
{
"email": "usuario@email.com",
"senha": "123456",
"nome": "João da Silva"
}

[GET] /users
Retorna todos os usuários cadastrados.

[PUT] /users/:id
Body JSON:
{
"email": "novo@email.com",
"senha": "novaSenha",
"nome": "Novo Nome"
}

[GET] /users/:id/status
Altera o status (ativo/inativo) de um usuário pelo ID.

### ----------------------------

### AFILIADOS
[POST] /affiliate/create
Body JSON:
{
"nome": "Maria",
"cpf": "12345678900",
"dataNasc": "1990-01-01",
"email": "maria@email.com",
"telefone": "11999999999",
"endereco": "Rua A, 123",
"cidade": "Curitiba",
"estado": "PR"
}

[GET] /affiliates
Retorna todos os afiliados cadastrados.

[PUT] /affiliates/:id
Body JSON:
{
"nome": "Maria Editada",
"dataNasc": "1990-01-01",
"email": "nova@email.com",
"telefone": "11988888888",
"endereco": "Rua Nova, 456",
"cidade": "Londrina",
"estado": "PR"
}

[GET] /affiliates/:id/status
Altera o status (ativo/inativo) de um afiliado pelo ID.

### ----------------------------

### COMISSÕES
[POST] /commission/create
Body JSON:
{
"affiliateId": "uuid-do-afiliado",
"valor": -150.75,
"data": "2024-07-22T12:00:00.000Z"
}

[DELETE] /commission/delete/:id
Deleta a comissão com o ID informado.

[GET] /commission/:affiliateId
Retorna todas as comissões vinculadas ao afiliado com o ID informado.

### ----------------------------
