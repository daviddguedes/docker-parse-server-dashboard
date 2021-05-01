## Instalation

* `git clone https://github.com/daviddguedes/docker-parse-server-dashboard`

* Make sure you have `docker` and `docker compose` installed and running in you machine

* Create a .env file on root folder and set your MONGO_DATABASE_URI. Example: `mongodb://mongo:27017/dev`

* `cd path/to/folder && docker-compose up -d`

* Visit `localhost:4040/dashboard`