# PDFColab WebApp

### Local Setup

- Install [git](https://github.com/git-guides/install-git), [docker](https://docs.docker.com/get-docker/) & [docker-compose](https://docs.docker.com/compose/install/).
- Install [python pip](https://www.python.org/downloads/) & [flake8](https://pypi.org/project/flake8/).
- Install [node](https://nodejs.org/en/download/) & [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable).
- Do `yarn install --frozen-lockfile`.
- Run `docker-compose build` & `docker-compose up` to run the app.
- Run `docker exec -i db_container_name pg_restore -c -U postgres -d devdb  < db.tar` parallely for populating local db using `db.tar` dump.

### How to do migration ?

- Run `docker-compose up`
- Run `docker exec -it webserver_container_name /bin/sh` parallely
- Run `./manage.py makemigrations`
- Run `./manage.py migrate`

### How to add new packages / libraries in development server ?

- For Node: Run `yarn add ( with -D depending on package type ) package_name/s ( with version if required )`.
- For Python: Add `library_name/s with version` in [requirements.txt](requirements.txt) / [requirements.dev.txt](requirements.dev.txt) ( depending on library type ).
- Run `docker-compose build --no-cache` at the root post that in both ^ cases.

### How to update the db dump ?

- Run `docker exec -i db_container_name pg_dump -U postgres -F t devdb > db.tar` for updating the dump in `db.tar` file.
- Run `docker-compose down` and delete `db_volume` in docker.
- Run `docker-compose up` and `docker exec -i db_container_name pg_restore -c -U postgres -d devdb  < db.tar` parallely for updating the local db.

### Tech stack

- Docker
- Nginx
- Django
- PostgreSQL
- Webpack
- ReactJS ( ES6 )
- Zustand
- TailwindCSS
- ESLint
- Flake8
- Yarn
- Git
- Lefthook
