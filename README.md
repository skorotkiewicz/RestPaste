# RestPaste

This is a simple project written in React with a Node backend.

To try it out locally, download the repository and install the dependencies.

Remember to rename the `dotenv` file to `.env` and fill it in with your own data.

```sh
yarn install

npx prisma generate
npx prisma migrate dev # development
npx prisma migrate deploy # production

yarn dev  # start the development server
yarn start # start the production server
```

## Example Paste

```json
[
  {
    "path": "/test3",
    "key": "hello3",
    "value": "world3"
  },
  {
    "path": "/test4",
    "key": "hello4",
    "value": "world4"
  }
]
```

Request:

```text
http://localhost:5000/api/paste/clh1qxopp00003xiajdzqg2vp/test3
```

Returns:

```json
{ "hello3": "world3" }
```
