### My Fisher Price First Express API for Blogs!!!!

This is a single resource API using express middleware to make creating a server and routing requests much more efficient and painless. It allows you to upload a blog entry, look at stored blog entries, see a list of available blog entries, and delete a blog entry.

### Directions for Use

* make sure you have [node.js and npm installed](https://docs.npmjs.com/getting-started/installing-node), then in a terminal window, clone the code:
  ```
  $ git clone https://github.com/radenska/11-single_resource_express_api.git
  ```

* run npm i:
  ```
  $ npm i
  ```
* start the server!
  ```
  $ node server.js
  ```
* in a new terminal window, do the stuff! Here are your options:
  - look at a blog entry:
    ```
    $ http :3003/api/blog/blogID
    ```
  - upload a blog entry:
    ```
    $ http POST :3003/api/blog name="blog entry name" content="blog entry contents"
    ```
  - look at a list of IDs of available blog entries (so you know how to look up a specific one!):
    ```
    $ http :3003/api/blog
    ```
  - delete a blog entry:
    ```
    $ http DELETE :3003/api/blog/blogID
    ```

That's it!

##### Created by Yana Radenska
