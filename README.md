

#Lab 11: Single Resource Express API
###branch: lab11-darcy
###### This app is comprised of express middleware for maximum efficiency. The funcitonality of this API allows for the creating, reading, updating, and deleting of both new and previously existing 'page' entries.

## Starting up the server
###First:
 you'll need to install node. Go to [download node](https://nodejs.org/en/download/).

###Second:
 After you've finished installing the right version for your operating system, open your terminal and run the following command:

              ` npm i -g`

###Third:
 Then go ahead and fork [this file](https://github.com/darms/11-single_resource_express_api/tree/lab11-darcy). After it's been successfully forked, type the following command in your terminal:

                   `node server`
This will fire up the server and we can start executing the various commands.

##CRUD commands
These are executed though the server endpoints.

## Server Endpoints
  * **`/api/page`**
  * `POST` request
   * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * `GET` request
   * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
  * `DELETE` request
   * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
   * this should return a 204 status code with no steak in the body

## Tests
  * write a test to ensure that your api returns a status code of 404 for routes that have not been registered
  * write tests to ensure the `/api/simple-resource-name` endpoint responds as described for each condition below:
   * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
   * `GET`: test 400, it should respond with 'bad request' if no id was provided in the request
   * `GET`: test 200, it should contain a response body for a request made with a valid id
   * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
   * `POST`: test 200, it should respond with the body steak for a post request with a valid body
