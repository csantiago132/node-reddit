# Node Reddit

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1cb4ccfa507c4c1a89eafe35f311a233)](https://www.codacy.com/app/csantiago132/node-reddit?utm_source=github.com&utm_medium=referral&utm_content=csantiago132/node-reddit&utm_campaign=Badge_Grade)
[![CircleCI](https://circleci.com/gh/csantiago132/node-reddit.svg?style=svg)](https://circleci.com/gh/csantiago132/node-reddit)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

<p align="center"><img src="https://raw.githubusercontent.com/csantiago132/node-reddit/develop/preview.png" alt="node-address-book preview"/></p>

A Reddit-like app for users to discuss and share content, built with Node and
Express using Sequelize on a PostgreSQL database.

## Prerequisites

> - PostgreSQL
> - Yarn >= 1.5.x
> - Node >=10.x

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes.

1. Clone this repo using
   `git clone https://github.com/csantiago132/node-reddit.git`

2. Move to the appropriate directory: `cd node-reddit`

3. Run `yarn install` to install dependencies

4. If you don't have Postgres installed on your computer, please
   [download](https://www.openscg.com/bigsql/postgresql/installers.jsp/) and
   install using the installer for your operating system

5. Create the databases for the application by running the `createdb` command:

- A database to use in the application
- a database for testing the application

```bash
  createdb -U postgress -w node-reddit
  createdb -U postgress -w node-reddit-test
```

6. start your database by running the following command:
   `pg_ctl -D /usr/local/var/postgres[VERSION NUMBER HERE] start`

- If your postgres folder does not have a version number, run
  `pg_ctl -D /usr/local/var/postgres start`

7. Run the migration scripts `yarn run migrateDb` on the terminal

- this will run `sequelize db:migrate && sequelize db:migrate --env test`

**Your database is now ready to accept contacts**

## Features

- [x] CircleCI integration
- [x] Jazmine test environment
- [x] Husky pre-commit hooks (to lint and format the code)
- [x] Add new posts to the database
- [x] Add new comments to the database
- [x] Upvote/downvote a post
- [x] View all favorite post, latest comments & posts from an user

## TODO List

In the near future, I want to add:

- [ ] Increase and refactor tests suites
- [ ] Add coverage reports thru Coveralls
- [ ] Build a front-end and create an UI for the application

## Built With

- [NodeJS](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [Sequelize](https://github.com/sequelize/sequelize#readme)
- [PostgreSQL](https://www.openscg.com/bigsql/postgresql/installers.jsp/)
- [passport](https://github.com/jaredhanson/passport)
- [pg-hstore](https://github.com/scarney81/pg-hstore)

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available,
see the
[tags on this repository](https://github.com/csantiago132/node-reddit/releases).

## Authors

- **Carlos Santiago** - _Initial work_ -
  [csantiago132](https://github.com/csantiago132)

## License

This project is licensed under the MIT License - see the
[LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- **Cory Trimm** - _for mentoring_ - [github](https://github.com/ctrimm)
