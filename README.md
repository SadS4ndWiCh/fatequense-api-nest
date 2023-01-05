# 🏫 Fatequense API

Uma api não oficial do Siga para conseguir pegar suas informações de estudante 
facilmente por meio de requisições HTTP!

## 📚 Aprendizados

Fazer esta aplicação contribuiu para compreender melhor como extrair dados de um 
site por meio de web scraping, além de ter que lidar com autenticação para conseguir 
acessar rotas protegidas. Além disso, também contribuiu para entender melhor os 
testes automatizados end-to-end (e2e) e praticar fazer algo com o framework Nest.js

## 🌐 Rotas

### Login
```sh
POST /login
```
| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | Nome de usuário |
| `password` | `string` | Senha |

### Perfil do estudante
```sh
POST /student/profile
```
| Header   | Descrição                           |
| :---------- | :---------------------------------- |
| `Authorization` | Token de autorização |

### Notas parciais
```sh
POST /student/partial-grade
```
| Header   | Descrição                           |
| :---------- | :---------------------------------- |
| `Authorization` | Token de autorização |

### Faltas parciais
```sh
POST /student/partial-absences
```
| Header   | Descrição                           |
| :---------- | :---------------------------------- |
| `Authorization` | Token de autorização |

### Histórico escolar
```sh
POST /student/history
```
| Header   | Descrição                           |
| :---------- | :---------------------------------- |
| `Authorization` | Token de autorização |

### Horários de aula
```sh
POST /student/schedule
```
| Header   | Descrição                           |
| :---------- | :---------------------------------- |
| `Authorization` | Token de autorização |

### Avisos
```sh
POST /student/notices
```
| Header   | Descrição                           |
| :---------- | :---------------------------------- |
| `Authorization` | Token de autorização |

## ❓ Como utilizar

Para utilizar essa API, é necessário primeiro fazer login enviando um POST para 
a rota /login, com o nome de usuário e senha do estudante. Isso irá gerar um 
token de autorização, que deverá ser enviado no header de todas as requisições 
subsequentes.

Em seguida, as demais rotas podem ser acessadas para obter as informações desejadas.

## 🔍 Observações

- O token de autorização é válido por um período de tempo limitado, após o qual será necessário fazer login novamente para obter um novo token.

- A API pode ser utilizada apenas por estudantes da faculdade Fatec.

## 🚀 Rodando localmente

Clone o projeto

```bash
$ git clone https://github.com/SadS4ndWiCh/fatequense-api
```

Entre no diretório do projeto

```bash
$ cd fatequense-api
```

Instale as dependências

```bash
$ npm install
```

Inicie o servidor

```bash
$ npm run start:dev
```

## 🛠️ Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# coverage testes
$ npm run test:cov
```
