![Logo]()


# 🔧🪛 Franca Medical Backend (API REST) 🩻

Repositório destinado aos códigos do backend da aplicação.
<br><br>

## 💻 Variáveis de Ambiente
Para rodar este projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`MONGO_URL="(url local ou do atlas)"`

`PORT="xxxx"`
<br><br>

## 🛡️ Variáveis de segrurança
No arquivo .env é necessário acrescentar variáveis de segurança para o JWT, randam password e configurações do nodemailer.

`JWT_SECRETE="32 caracteres aleatorios"`

`RANDOM_PASSWORD_PACIENT="sequencia aleatoria de caractes, letras e caracteres especiais"`

`LENGTH_PASSWORD="tamanho da senha de 6 a 12"`

`EMAIL_TO_MAILER="email do sistema"`

`EMAIL_USER="email do usuario"`

`EMAIL_PASS="senha do email"`
<br><br>

## 🚥🚥 Rodando localmente
Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```
<br><br>

## 📝 Stack utilizada

**Back-end:**
- [NestJS](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Pug](https://pugjs.org/api/getting-started.html) (template do e-mail)
- [JWT](https://jwt.io/)
<br><br>

## Licença

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
