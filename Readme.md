# SaaS boilerplate

<a href="https://www.buymeacoffee.com/signofactory" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

This is the branch for Chapter 1 of a [Medium series of articles that have the objective of building a SaaS boilerplate using Next.js, Express.js, Firebase Auth, TypeORM and PostgreSQL](https://medium.com/signofactory/building-your-first-saas-using-next-js-firebase-auth-express-js-and-postgresql-97a0285ce30a).

## Installation

You'll need to get the client and admin credentials for firebase and place them in `packages/web/src/config/firebaseAdminConfig.json` and `packages/web/src/config/firebaseClientConfig.json`.

Sample structure for `firebaseAdminConfig.json`:

```json
{
  "type": string,
  "project_id": string,
  "private_key_id": string,
  "private_key": string,
  "client_email": string,
  "client_id": string,
  "auth_uri": string,
  "token_uri": string,
  "auth_provider_x509_cert_url": string,
  "client_x509_cert_url": string
}
```

Sample structure for `firebaseClientConfig.json`

## Getting started

This branch is meant to be used as guideline to get to the end of Chapter 1 of the [Building your first SaaS using Next.js, Firebase Auth, Express.js and PostgreSQL](https://medium.com/signofactory/building-your-first-saas-using-next-js-firebase-auth-express-js-and-postgresql-97a0285ce30a) series on linkedin.

To get started, navigate to the client folder

```sh
cd packages/web
```

and launch the project

```
yarn install && yarn dev
```

## Support

You can support us by:

- Sharing the article on Twitter, Linkedin or Reddit
- [Buying us a coffee](https://www.buymeacoffee.com/signofactory)
- Opening PRs to improve the boilerplate
