<p align="center">
  <a href="http://shopper.com.br" target="blank"><img src="https://pub-850de9adf9bd40ce951ccd70ed288808.r2.dev/wormhole/shopper-logo.png" width="200" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" /></a>
</p>
<p align="center">Technical test for web developer position at Shopper</p>

## Description

This project was developed using [Nest.js](https://github.com/nestjs/nest) framework. Here is the instructions provided by Shopper to do the test. I have two considerations about that:

1. In the /confirm endpoint, when a 404 http exception occurs I send a error_description different from the one present in instructions. Because a belive there war an errror. Error description in instruction is "Leitura do mês já realizada", but the error is not found. So it doesen't make sense, rigth?

2. In the same endpoint, the type of confirmed value required by instructions is integer, but a bill could be a float. Even though it doesn't make sense, I **ketp as an integer** and it will throw an exception if the number is not an integer.

![alt](https://pub-850de9adf9bd40ce951ccd70ed288808.r2.dev/wormhole/instructions_page-0001.jpg)
![alt](https://pub-850de9adf9bd40ce951ccd70ed288808.r2.dev/wormhole/instructions_page-0002.jpg)
![alt](https://pub-850de9adf9bd40ce951ccd70ed288808.r2.dev/wormhole/instructions_page-0003.jpg)
![alt](https://pub-850de9adf9bd40ce951ccd70ed288808.r2.dev/wormhole/instructions_page-0004.jpg)
![alt](https://pub-850de9adf9bd40ce951ccd70ed288808.r2.dev/wormhole/instructions_page-0005.jpg)
![alt](https://pub-850de9adf9bd40ce951ccd70ed288808.r2.dev/wormhole/instructions_page-0006.jpg)

## Running the app

##### Development Mode

For .env variables, use .env.example as a reference and docker-compose-dev.yml to catch the database variables. In this mode, you will start the database with docker and start a normally Nest app in watch mode. So just run:

```bash
# development mode
$ npm run dev
```

##### Production Mode

It is recommended to use .env to store the database variables. But since the test instructions said that only the GEMINI_API_KEY variable would be stored, I added an OR condition in the database connection. Therefor you just need .env with the GEMINI_API_KEY.

In production mode, you will start the entire application with docker compose. So just run 'docker compose up' command:

```bash
# production mode
$ docker compose up
```

## Test

This application was developed withou tests.

## Support

Call me!

## Stay in touch

- Linkedin - [Guilherme Oliveira](https://www.linkedin.com/in/guilherme-oliveira-%F0%9F%8F%B3%EF%B8%8F%E2%80%8D%F0%9F%8C%88-916850194/)
- Phone - +55 11 99162 7042
- Email - [gui.soliveiras@gmail.com](gui.soliveiras@gmail.com)
