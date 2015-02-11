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
| GET | /msgs/54db8a81d0df9128419109e1 | Returns message specified by id |
| POST | /msgs | Adds a new message to the collection |
| PUT | /msgs/54db8a81d0df9128419109e1 | Updates the message specified by id |
| DELETE | /msgs/54db8a81d0df9128419109e1 | Deletes the message specified by id |

