# soundtrack
Soundtrack to Your Life project

### Current Status
* Database - Currently have a local mongodb running with a messages collection that contains a database of messages defined by the ./models/message.js schema
  * Todo - setup an online storage of data for easier collaboration
* API - CRUD operations have all been mapped to routes in the ./routes/msgs.js file
  * Currently Supported Routes

| Request | Route | Action |
| :------ | :---- | :----- |
| GET | /msgs | Returns all messages in collection |
| GET | /msgs/54dbbcb6ceb12b084322be1f | Returns message specified by id |
| POST | /msgs | Adds a new message to the collection |
| PUT | /msgs/54dbbcb6ceb12b084322be1f | Updates the message specified by id |
| DELETE | /msgs/54dbbcb6ceb12b084322be1f | Deletes the message specified by id |

