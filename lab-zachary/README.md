# Express Single Resource API router w/File Server persistance

This app creates an HTTP server that handles GET, POST, and DELETE to a filesystem-level persistance layer.

# System Requirements

  - Terminal.app on macOS or equivalent
  - node.js and npm package manager installed


### Installation

Clone the repository to your local server
```sh
https://github.com/zcrumbo/11-single_resource_express_api/tree/lab-zachary
```

Install the dependencies -

```sh
$ npm i
```

[HTTPie](https://httpie.org/) will be required to run the HTTP requests from your terminal window. You will need to install this with [Homebrew][1] on macOS. It is also easier to see the results of all operations by running mocha tests with the command
```sh
$ mocha
```

Start the server

```sh
$ node server.js
```
If you want to use the debug and nodemon modules, run the npm script:
```
npm start
```

### Connecting

If you are using HTTPie, in your terminal window, type the following commands, where '3000' would be replaced with your local environment PORT variable, if configured. Commands can only be sent to the api/bike endpoint
```sh
$  http POST :3000/api/bike name='test name' content='test content' #creates a new bike object and writes it to the fileserver, and returns a unique id
$ http GET localhost:8000/api/bike/sample-id #returns the name and content of a stored bike object
$ DELETE localhost:8000/api/bike/sample-id #deletes the bike file from server storage
```

Sending the following requests to the server will have the results below:

* `GET`:  404 response with 'not found' for valid requests made with an id that was not found
 * `GET`: 400 response with 'bad request' if no id was provided in the request
 * `GET`: 200 response with a response body for a request made with a valid id
 * `POST`: 400 response with 'bad request' if no request body was provided or the body was invalid
 * `POST`: 400 response with the body content for a post request with a valid body

[1]:https://brew.sh/

