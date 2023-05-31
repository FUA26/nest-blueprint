<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# NestJS REST API 🇮🇩 by FUA

## Description

The Blueprint Project Nest.js REST API provides a robust foundation for building modern backend applications following a Node.js-based architecture. Nest.js is a TypeScript-based framework that simplifies application development by providing an organized and clean structure.

This blueprint offers a ready-to-use and well-designed framework to facilitate the development of resilient and scalable REST APIs. However, it's important to note that this blueprint requires customization to be production-ready.

In implementing this blueprint, some functions may need to be adjusted according to the specific needs of your project. Additionally, it's crucial to pay special attention to the security of this project. While the blueprint provides a solid starting point, further review and adjustments are necessary to ensure compliance with best practices and the required security standards.

If you need assistance in customizing this blueprint for a production environment and ensuring its implementation aligns with best practices, please feel free to contact me. I would be happy to help you optimize the implementation of this blueprint and secure your application.

📚 Full Documentation is coming soon! 🚀

## Features

- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Sign in and sign up via email([@nestjs/jwt](https://www.npmjs.com/package/@nestjs/jwt), [@nestjs/passport](https://www.npmjs.com/package/@nestjs/passport)).
- [x] Swagger.
- [x] Units tests.
- [x] E2E tests (BugFixing).
- [x] Docker.
- [ ] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer)).
- [ ] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [ ] File uploads. Support local and Amazon S3 drivers.

## Quick run

```bash
git clone --depth 1 https://github.com/FUA26/nest-blueprint my-app
cd my-app/
cp env-example .env
npm run start:dev
```
