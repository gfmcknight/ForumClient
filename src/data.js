export default {
  state: {
    loggedIn: false,
    token: "",
    rootInitialized: false
  },
  user : {
    "id": 1,
    "name": "Graham",
    "email": null,
    "created": "2017-07-01T00:37:47.1260695",
    "status": 4,
    "hasSignature": false,
    "signature": null
  },
  root : {
    "id": 1,
    "name": "Root",
    "description": "This is the root board",
    "allowsThreads": true
  },
  topic : {
    "id": 1,
    "name": "Index",
    "description": "This is the root board",
    "allowsThreads": true
  },
  subtopics : [
    {
      "id": 2,
      "name": "Sample Subtopic",
      "description": "The first subtopic on this board.",
      "allowsThreads": true
    }
  ],
  threads : [
    {
      "id": 1,
      "title": "My first topic!",
      "created": "2017-07-11T18:53:53.1608594",
      "locked": false,
      "ownerID": 2,
      "authorID": 1,
      "author": {
          "id": 1,
          "name": "Graham",
          "email": "graham.mcknight2@gmail.com",
          "created": "2017-07-11T18:29:45.4903222",
          "status": "Administrator",
          "hasSignature": false,
          "signature": null
      }
    }
  ],
  thread: {
    "id": 1,
    "title": "My first topic!",
    "created": "2017-07-11T18:53:53.1608594",
    "locked": false,
    "ownerID": 2,
    "authorID": 1,
    "author": {
      "id": 1,
      "name": "Graham",
      "email": "graham.mcknight2@gmail.com",
      "created": "2017-07-11T18:29:45.4903222",
      "status": "Administrator",
      "hasSignature": true,
      "signature": "null"
    }
  },
  posts: [
    {
      "id": 1,
      "text": "Congratulations!",
      "created": "2017-07-11T18:55:54.5764526",
      "hasSignature": true,
      "signature": "I changed my...",
      "ownerID": 1,
      "authorID": 1,
      "author": {
          "id": 1,
          "name": "Graham",
          "email": "graham.mcknight2@gmail.com",
          "created": "2017-07-11T18:29:45.4903222",
          "status": "Administrator",
          "hasSignature": false,
          "signature": null
        }
    },
    {
      "id": 2,
      "text": "You really did it!",
      "created": "2017-07-11T18:56:37.0323116",
      "hasSignature": true,
      "signature": "...signature a lot",
      "ownerID": 1,
      "authorID": 1,
      "author": {
          "id": 1,
          "name": "Graham",
          "email": "graham.mcknight2@gmail.com",
          "created": "2017-07-11T18:29:45.4903222",
          "status": "Administrator",
          "hasSignature": false,
          "signature": null
      }
    },
    {
      "id": 3,
      "text": "I'm proud of me!",
      "created": "2017-07-11T18:56:37.0323116",
      "hasSignature": true,
      "signature": "null",
      "ownerID": 1,
      "authorID": 1,
      "author": {
          "id": 1,
          "name": "Graham",
          "email": "graham.mcknight2@gmail.com",
          "created": "2017-07-11T18:29:45.4903222",
          "status": "Administrator",
          "hasSignature": false,
          "signature": null
      }
    }
  ]
}
