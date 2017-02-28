### How to use the app

To use the app you must first go to the root directory and run ``` npm start```
That should run the server, and listen for route calls. Then you make any http route call to the server. You make calls to the server by writing:

http [method] localhost:[your port or 3000]/[the route].

 If the route is not recognized it will default to 404 not found. The routes you can use are:
    1. /api/employees

the methods you can use are:
    1. GET
    2. POST
    3. DELETE

A good example of a GET request is

localhost/api/employee/89y2792742

That request would get us an employee with the id 89y2792742;
