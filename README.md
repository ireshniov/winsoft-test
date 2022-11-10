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

#### CatalogTemplateController /catalog-templates:

* GET /catalog-templates/:uuid

```curl
curl --request GET '127.0.0.1:3000/catalogs-templates/43608992-65b8-4e2a-bb0e-209ef7e61eb6' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM2YmI2OTIxZjA0NDMzYzQ3MTVjOTVjIiwiYXVkIjoiaHR0cHM6Ly93aW5zb2Z0LXRlc3QuY29tIiwiaWF0IjoxNjY4MDM1MDg5LCJleHAiOjE2NjgxMjE0ODksImF6cCI6IlU4b2Q4amJuaGZLUktqMTA2Tk44emhWRkRocDdnVFBSIiwiZ3R5IjoicGFzc3dvcmQiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y2F0YWxvZyIsImRlbGV0ZTpjYXRhbG9nIiwicmVhZDpjYXRhbG9nIl19.BkWy0Ix5lFY97XW0bO7QsDB-MdyAUKsA69Ts-vyAQ8BEhTOPBNa9UbzkgBja86pQdzxxKFLyj2ZAghmBXPhiLwoywb4wm8dNRGMhNDuUSnnJTrazO8zTZ3P5JGtH6JI9VoTMYrdgU_8tAbV19Pb1BEGjGMkgCoHwKOMpuzKQCy92Hm85Rx6KKX409TZLNJFsnaltCluIseISxNuVQzmODYKR9rAgZMOEKl6p97bZSDx8btzQjQFevqH09rxV-tkqvqXfxf456Sv87D1-8QZVN16djAl2ZPyN2FR7HBZLVjz0hZb8AW0_sOYs2Xd83PB7SkVSI3LzVdeHLi4DdKmzSA' \
--header 'Content-Type: application/json'
```

* POST /catalog-templates

```curl
curl --location --request POST '127.0.0.1:3000/catalog-templates' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoicWN5RWZQRlN6MlBBTjdVWm1GUDF3YXh0cW1wRmRXUE1AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vd2luc29mdC10ZXN0LmNvbSIsImlhdCI6MTY2Nzk4MjUyNiwiZXhwIjoxNjY4MDY4OTI2LCJhenAiOiJxY3lFZlBGU3oyUEFON1VabUZQMXdheHRxbXBGZFdQTSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbXX0.oFBI0AD4_cUDY4S7xLb67Bnccxp3JXODGia0NSlW_IUi46dRooyBCxfNR_qz-GVfAkF9gdDkzgYDMUz-BWI04nWMBaNdOH2e_pqWRYUaX_ejP0Bozx6iTQ5wPn1B5IF1pzH0tYfUKdzm86Z2JuL3qlxTsATlRdhc3Z892mn6Eyf9r_REbpadR5S4fpqQmC9p7nk83gk7DjV3fyXeqSiN5rswuiNbl7gjJh_i423kGsVv4WxusCgJVFkoCjs_4LpiHy-PlQTrOHT1jGX0exdC19M5Qp0DmvWUR_mUgcB9IKmSlZ4BHa27y80FK-_A0Ja5NOhyuTjAYytABs2kmLbveQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test1",
    "documents": [
        {
            "name": "document1",
            "fields": [
                {
                    "name": "field1",
                    "type": "string"
                },
                {
                    "name": "field2",
                    "type": "number"
                }
            ]
        }
    ]
}'
```

* PUT /catalog-templates/:uuid

```curl
curl --request PUT '127.0.0.1:3000/catalog-templates/8d8f49f4-ff67-402f-8b82-cca6aec8378c' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoicWN5RWZQRlN6MlBBTjdVWm1GUDF3YXh0cW1wRmRXUE1AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vd2luc29mdC10ZXN0LmNvbSIsImlhdCI6MTY2Nzk4MDg3NiwiZXhwIjoxNjY4MDY3Mjc2LCJhenAiOiJxY3lFZlBGU3oyUEFON1VabUZQMXdheHRxbXBGZFdQTSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.lPFOwycckjZTs-hyWrqHl1RiQuRWPQSBkbQLC_GSfOh-8GooygywIY8T8lK5PJpkSqMtOQ1F03apfBGi8w4DJn7rdhq9DakocdxfKKQq8hOtJN0nqd8iiyyx0pJwYwXyY5iNgUXs5lkFCWadJzkKe9cJGwhHUb-fTKK8n-mK0BmlnMkx2tGGPBa0gzWq3drrWFpkyLjpp2qtmjbqLtexVJofdWg7S77wNacIOoLloNRmv-vXRxgMOUBiAU1v5mD_lSZS7m9ldm-u0n0RKi2iTGuY3p731Gz_pVKLB68P_MJM7flRx3ZpTdKN2wHnNfNchOs9kT19lK_TzWBpycUevA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test1_updated",
    "documents": [
        {
            "name": "document1_updated",
            "fields": [
                {
                    "name": "field1_updated",
                    "type": "number"
                }
            ]
        }
    ]
}'
```

* DELETE /catalog-templates/:uuid

```curl
curl --request DELETE '127.0.0.1:3000/catalog-templates/a1b73695-1357-43e4-b743-6c073e587bba' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoicWN5RWZQRlN6MlBBTjdVWm1GUDF3YXh0cW1wRmRXUE1AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vd2luc29mdC10ZXN0LmNvbSIsImlhdCI6MTY2Nzk4MDg3NiwiZXhwIjoxNjY4MDY3Mjc2LCJhenAiOiJxY3lFZlBGU3oyUEFON1VabUZQMXdheHRxbXBGZFdQTSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.lPFOwycckjZTs-hyWrqHl1RiQuRWPQSBkbQLC_GSfOh-8GooygywIY8T8lK5PJpkSqMtOQ1F03apfBGi8w4DJn7rdhq9DakocdxfKKQq8hOtJN0nqd8iiyyx0pJwYwXyY5iNgUXs5lkFCWadJzkKe9cJGwhHUb-fTKK8n-mK0BmlnMkx2tGGPBa0gzWq3drrWFpkyLjpp2qtmjbqLtexVJofdWg7S77wNacIOoLloNRmv-vXRxgMOUBiAU1v5mD_lSZS7m9ldm-u0n0RKi2iTGuY3p731Gz_pVKLB68P_MJM7flRx3ZpTdKN2wHnNfNchOs9kT19lK_TzWBpycUevA' \
--header 'Content-Type: application/json'
```

#### CatalogController {/catalogs}:

* GET /catalogs/:uuid

```curl
curl --request GET '127.0.0.1:3000/catalogs/994ce690-c5fc-4bf7-8c7b-28540d10ee24' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM2YjY3MDBmYmM5YTkyNzM2YTY1MmZmIiwiYXVkIjoiaHR0cHM6Ly93aW5zb2Z0LXRlc3QuY29tIiwiaWF0IjoxNjY4MDAyNTQzLCJleHAiOjE2NjgwODg5NDMsImF6cCI6IlU4b2Q4amJuaGZLUktqMTA2Tk44emhWRkRocDdnVFBSIiwiZ3R5IjoicGFzc3dvcmQiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y2F0YWxvZy10ZW1wbGF0ZSIsImRlbGV0ZTpjYXRhbG9nLXRlbXBsYXRlIiwicmVhZDpjYXRhbG9nLXRlbXBsYXRlIiwicmVhZDpvdGhlcjpjYXRhbG9nIiwidXBkYXRlOmNhdGFsb2ctdGVtcGxhdGUiLCJ2ZXJpZmljYXRpb246Y2F0YWxvZyJdfQ.ss02oiHLyfgtf7dVHRrXJnlbxmr165wDVnBQr74vEouRQQKY8itwenHlHdoLVTAZzuCxCpMOCMz9Sry0pE_N8MwVH2uo_5siYFz2D4VlIOB-sTmH2ZjSHFHcyEmblYmtmG8kMWewqa6-krt7r87Cyol5SsjIgoaewOmhV8xnDPhfD125WrotM9zec2CJ26NvInG6QpkgPu63Ujb8eu3ktOkzKRkUcJmPsoeDE8d2YvZB7k801wXTmSeGZgLFU2h4n-D1ph4lp2qB30qqFckAy_mj37tjrUFMks9jscxxMDrjVJRJKvLRJajKXpZMyWlNWEmEneWDE2YUNJsV1970Pg' \
--header 'Content-Type: application/json' \
```

* POST /catalogs

```curl
curl --request POST '127.0.0.1:3000/catalogs' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjM2YmI2OTIxZjA0NDMzYzQ3MTVjOTVjIiwiYXVkIjoiaHR0cHM6Ly93aW5zb2Z0LXRlc3QuY29tIiwiaWF0IjoxNjY4MDA0MjkzLCJleHAiOjE2NjgwOTA2OTMsImF6cCI6IlU4b2Q4amJuaGZLUktqMTA2Tk44emhWRkRocDdnVFBSIiwiZ3R5IjoicGFzc3dvcmQiLCJwZXJtaXNzaW9ucyI6WyJjcmVhdGU6Y2F0YWxvZyIsImRlbGV0ZTpjYXRhbG9nIiwicmVhZDpjYXRhbG9nIl19.PyJZ45ELjDBvmZ84m-U7wx21vWRVGctJghzbKkvSYeN2ntKHGkZANrS9MLgJrUsTPnTQDV0iABcQD2F8UTViFe6Zu-PX8X3rpYHEzZwep3DbGf__EE3p790WNuyGdLQD9-NtP2qQw9qDQ7zxc6AJJrC2DEi8KVwxoFuRIMeShcrDunE2mchy-FBSkbCaVoIM48GOevLDfXMtfdIwDoL-87zE_5NbiTYYEOnuU6u0CEggnnJ6CDSB2JqzFdHYzOZabB6_BgnySBi0a_6luP5lyEdU9FFZXe1-3I_bncDrOjSuCs5zCOtqcas3feWxf58DaxEtZKzsXzyrzmaUqpt-0w' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test1",
    "documents": [
        {
            "name": "document1",
            "fields": [
                {
                    "name": "field1",
                    "type": "string",
                    "value": "valid value"
                },
                {
                    "name": "field2",
                    "type": "number",
                    "value": "9"
                }
            ]
        }
    ]
}'
```

* PUT /catalogs/:uuid/verification

```curl
curl --request PUT '127.0.0.1:3000/catalogs/994ce690-c5fc-4bf7-8c7b-28540d10ee24/verification' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoicWN5RWZQRlN6MlBBTjdVWm1GUDF3YXh0cW1wRmRXUE1AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vd2luc29mdC10ZXN0LmNvbSIsImlhdCI6MTY2Nzk1MjYzNywiZXhwIjoxNjY4MDM5MDM3LCJhenAiOiJxY3lFZlBGU3oyUEFON1VabUZQMXdheHRxbXBGZFdQTSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.BGuPLZK542BeaybcP8RXO84Dh7M9TAobA6wvpRaK9U39dm3okARjHgv6oB2rT_PocO5RKtSA8vV294EOPw2pJ_bqBihAww6DvPYSU2QPNkssUQKG2093fZAqqglOCbOsdr-liE_aD5i5bXvPT3Fq1KYrKprkJdKejphPtr1I4onXvAtJIIGEwyxmIyPvnfuP71bh6GZ_9rIPLfTo3cBP6OUzyTR1HlhH68YMmIfs8yZWG33DIcklQPiJqtCyrp7AFdpzBkisuuyNqWUvgVz2zy06S9zZ7UWZzparzcWexZM-Craw5M-FKNVCeaX8-U7UJtDBhwptRmw0jiZy1ScJnA' \
--header 'Content-Type: application/json' \
--data-raw '{
    "documents": [
        {
            "uuid": "41d56946-319c-45a3-b19e-eab6654e3466",
            "status": "verified"
        }
    ]
}'
```

* DELETE /catalogs/:uuid

```curl
curl --request DELETE '127.0.0.1:3000/catalogs/8633daca-25ff-4f1f-9a2a-2b0c90a5b15b' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImliTVY1dHlJRFdTOFpDc2RRSnRrYiJ9.eyJpc3MiOiJodHRwczovL3dpbnNvZnQtdGVzdC5ldS5hdXRoMC5jb20vIiwic3ViIjoicWN5RWZQRlN6MlBBTjdVWm1GUDF3YXh0cW1wRmRXUE1AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vd2luc29mdC10ZXN0LmNvbSIsImlhdCI6MTY2Nzk1MjYzNywiZXhwIjoxNjY4MDM5MDM3LCJhenAiOiJxY3lFZlBGU3oyUEFON1VabUZQMXdheHRxbXBGZFdQTSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.BGuPLZK542BeaybcP8RXO84Dh7M9TAobA6wvpRaK9U39dm3okARjHgv6oB2rT_PocO5RKtSA8vV294EOPw2pJ_bqBihAww6DvPYSU2QPNkssUQKG2093fZAqqglOCbOsdr-liE_aD5i5bXvPT3Fq1KYrKprkJdKejphPtr1I4onXvAtJIIGEwyxmIyPvnfuP71bh6GZ_9rIPLfTo3cBP6OUzyTR1HlhH68YMmIfs8yZWG33DIcklQPiJqtCyrp7AFdpzBkisuuyNqWUvgVz2zy06S9zZ7UWZzparzcWexZM-Craw5M-FKNVCeaX8-U7UJtDBhwptRmw0jiZy1ScJnA' \
--header 'Content-Type: application/json' \
```

## Test

```bash
$ npm run test

# test coverage
$ npm run test:cov
```
