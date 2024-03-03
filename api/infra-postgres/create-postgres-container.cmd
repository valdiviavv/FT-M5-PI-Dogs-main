docker container create ^
  --name postgres-svr ^
  -p 5432:5432 ^
  -e POSTGRES_DB=dogs_db ^
  -e POSTGRES_USER=dog_user ^
  -e POSTGRES_PASSWORD=!DogPassw0rd ^
  -e TZ=UTC ^
  -v dogs-app-data-local:/var/lib/postgresql/data ^
postgres:13.5-alpine
