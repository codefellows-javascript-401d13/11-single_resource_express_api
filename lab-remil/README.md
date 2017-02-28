# Sneaker Rest API
This REST API supports GET, POST, and DELETE requests supports file system persistence with the use of the ExpressJS framework. The resource are for this api are sneakers.

### Running the Server
  - Run the file **server.js** located in the directory named **/lab-remil/**
```sh
node server
```

### Endpoint
- All requests route to the endpoint of: `/api/sneaker/id`
- **GET** and **DELETE** requests need to specify the id of the sneaker; ex:
```
/api/sneaker/jfd9kfe
```
- **POST** requests require ONE object with the *model* property and *brand* property
