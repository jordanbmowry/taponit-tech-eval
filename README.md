# taponit-tech-eval

## Installation

1. Fork and clone this repository.

2. Run `cp ./back-end/.env.sample ./back-end/.env`.

3. Update the `./back-end/.env` file with db connections (example: DEVELOPMENT_DATABASE_URL=postgres://blahblahblah:blahblahblahblahblah@blah.db.elephantsql.com/blahblah).

4. Run `npm install` inside both the back-end directory and front-end directory to install project dependencies.

5. Now you need to migrate and seed your database. There are two options.

   - (recommended) Inside the back-end directory run `npx knex migrate:latest` then run `npx knex seed:run`.
   - execute the SQL script in /back-end/src/db/SQL/products.sql on your database.

6. Run `npm run start:dev` from the back-end directory to start your server in development mode.

7. Run `npm start` from the front-end directory to start the React app at http://localhost:3000.
