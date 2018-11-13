# Hisabisa

Hisabisa is a web application to help keep in touch with old friends.

## Installation

Install [Yarn](https://yarnpkg.com/en/docs/install) package manager.

Install [Liquibase](https://www.liquibase.org/index.html) database migration tool.

Install [PostgreSQL](https://www.postgresql.org/download/) database system.

Clone this repository and run `yarn install` in the directory to install all dependencies for the project.

Set up Postgres, and create a database called "hisabisa".

Install the [postgreSQL JDBC driver](https://jdbc.postgresql.org/download.html) and move the file into `/opt/liquibase/lib/`.

Run `liquibase update` to create the tables for the database.

`yarn start` to run the node server.

`yarn startd` to start the nodemon server.

`yarn startw` to start the webpack dev server.

You will be able to access the web app on localhost:8080

## Technologies

* [Node.js](https://nodejs.org/en/) runtime environment
* [Express](https://expressjs.com/) http server
* [React](https://reactjs.org/) front end framework
* [PostgreSQL](https://www.postgresql.org/) database management system
