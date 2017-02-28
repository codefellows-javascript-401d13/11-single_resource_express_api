Single Resource Express API
===

## Description
  * Utilizes an `express` server, one resource, and various third party tools to route and handle requests and allow data to persist on the file system.

## Server Endpoints
  * **`/api/neighbor`**
  * `POST` request
   * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * `GET` request
   * pass `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
  * `DELETE` request
   * pass `?id=<uuid>` in the query string to **DELETE** a specific resource
   * this should return a 204 status code with no content in the body
