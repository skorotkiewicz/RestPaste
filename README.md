# RestPaste

This JSON pastebin allows to store and retrieve JSON data through a simple RESTful API. Create new pastes by sending a POST request with the JSON data.

The API also supports partial retrieval of data using the fields query parameter. Specify a comma-separated list of fields they want to retrieve, and the API will return only those fields from the JSON data.

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

## Example Paste for any JSON

```
{
  "pet1": {
    "petName": "Claudine",
    "petType": "House cat"
  },
  "pet2": {
    "petName": "Sunny",
    "petType": "Gerbil"
  }
}
```

Request:

```text
http://localhost:5000/api/fpaste/json/clh30axuj00003xjvimyk6m8z?fields=petName,petType
```

Returns:

```json
{
  "pet1": {
    "petName": "Claudine",
    "petType": "House cat"
  },
  "pet2": {
    "petName": "Sunny",
    "petType": "Gerbil"
  }
}
```
