# Single Resource Express-API

This was our first foray into using Express and all its wonderful abstraction of our previously manual routes and CRUD methods. What a wonderful day indeed! Along with Express, we introduced a couple supplemental concepts used in automating our tests and debugging processes.

### Automation Features
Using the "Debug" and "Morgan" modules (both Vision Media), a new form of feedback in the terminal has been implemented. Instead of using ```console.log``` throughout the majority of the codebase, Debug/Morgan can provide more meaningful, traceable, and informative debugging interface - especially when stack-tracing for HTTP requests. The "HTTP-Errors" module was also utilized in the sending of status messages.

#### Sample Routes:
Using express I created simple CRUD routes to create and manage 'Guitar' objects. Here's an example of creating a new 'Guitar' in persisted memory ('fs) using HTTPie's CLI:
```
http POST :[PORT]/api/guitar?type=[type]&make=[make]&name=[name]
```
Where ```[PORT]``` is the user's current server port number. (default is 3000)
Where ```[name]```,```[make]``` and ```[type]``` are strings that can be chosen to represent a guitar.

Example query:
```localhost:3000/api/guitar?name=stratocaster&make=fender&type=electric```

#### Built Using:
-"Express" - (expressjs.com)
-"Morgan" - (https://github.com/expressjs/morgan)
-"Debug" - (https://github.com/visionmedia/debug)
-"HTTP-Errors" - (NPM)
-"Body-Parser" - (NPM)
-"Node-UUID" - (NPM)
-"HTTPie' - (https://httpie.org)
-"Bluebird" - (http://bluebirdjs.com/)
