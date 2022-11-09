## Description

Winsoft coding task.

## Installation

```bash
$ cp .env.example .env
```

### Configure env

As I used auth0 for authentication and authorization you should provide `AUTH0_ISSUER_URL` and `AUTH0_AUDIENCE` in your
.env file:

```bash
AUTH0_ISSUER_URL=https://winsoft-test.eu.auth0.com/
AUTH0_AUDIENCE=https://winsoft-test.com
```

### Build and start containers

```bash
$ docker-compose up -d --build
```

## Use the app

As endpoints are secured you should fetch access token

### Retrieve access token

#### For admin

Permissions:

| Permission              | Description                              |
|-------------------------|:-----------------------------------------|
| admin:catalog           | Create/read/update/delete other catalogs | 
| create:catalog-template | Create catalog template                  |
| delete:catalog-template | Delete catalog template                  |
| read:catalog            | Read catalog                             |
| read:catalog-template   | Read catalog template(s)                 |
| update:catalog-template | Update catalog template                  |
| verification:catalog    | Verification catalog                     |

```curl
curl --request POST 'https://winsoft-test.eu.auth0.com/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=admin@winsoft-test.com' \
--data-urlencode 'password=@DS@az3y^Tih.9t' \
--data-urlencode 'audience=https://winsoft-test.com' \
--data-urlencode 'client_id=U8od8jbnhfKRKj106NN8zhVFDhp7gTPR' \
--data-urlencode 'client_secret=CM5NGK4UeyRc7QvLo7OPRZ0W4cYoP1Ur0j_YBk0v2NzXZIJIjPxH4qe-CrSVlTXU'
```

#### For user

Permissions:

| Permission      | Description    |
|-----------------|:---------------|
| create:catalog  | Create catalog | 
| delete:catalog  | Delete catalog |
| read:catalog    | Read catalog   |

I created 3 users:

```bash
user1@winsoft-test.com / 8hMRkwVc+sWf8T#
user2@winsoft-test.com / 8hMRkwVc+sWf8T#
user2@winsoft-test.com / 8hMRkwVc+sWf8T#
```

You can retrieve their access token easily. Just substitute username and password:

```curl
curl --request POST 'https://winsoft-test.eu.auth0.com/oauth/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=user1@winsoft-test.com' \
--data-urlencode 'password=8hMRkwVc+sWf8T#' \
--data-urlencode 'audience=https://winsoft-test.com' \
--data-urlencode 'client_id=U8od8jbnhfKRKj106NN8zhVFDhp7gTPR' \
--data-urlencode 'client_secret=CM5NGK4UeyRc7QvLo7OPRZ0W4cYoP1Ur0j_YBk0v2NzXZIJIjPxH4qe-CrSVlTXU'
```

### Endpoints:

* Catalog template read
* Catalog template create
* Catalog template update
* Catalog template delete
* Catalog read
* Catalog create
* Catalog delete
* Catalog verification
