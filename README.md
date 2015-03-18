# soundtrack
Soundtrack to Your Life project

### Development Environment Dependencies

You will need to install bower to install or update 3rd party assets.


```shell

npm install -g bower
```

### Need data validation on user add
Right now when there is a post request to /api/v1/admin/users a new user is created regardless of the content (body) of the request.
In the /routes/users.js file I have created a new function for you to write
```javascript
function validateNewUser (newUser, next(err, user))
```
##### This function must perform a couple of operations.
1.  It must check that a minimum of an email and password have been provided in the body of the request
2.  It must confirm that there is no user with that email already stored in the system
3.  If a username has been provided, then also confirm that it is a unique username, if no username was provided, set username = to the provided email address
4.  If any of these conditions aren't met, then you want to pass an Error as the first argument of the callback function (next)
  - For example: If there is no password provided you should use the following pass the error back to our error handler
```javascript
if (!password) {
  var err = new Error('No password provided')
  err.status = 400
  return next(err)
}
```
5.  If everything passes validation and looks in order, then pass the newUser object back to the callback as the second argument of the callback function (next)
```javascript
return next(false, newUser)
```

### Notes
- This is an async function that will check for valid data and then call it's callback function, the callback expects either an error, or a valid User model and will then write that to the database
- In routes/users.js the User mongoose model establishes a link to the database users collection.  It provides access to some functions you will find useful such as the User.findOne(queryObject, callback) function
  - Examples of using this function can be seen in routes/auth.js
- This may seem overwhelming at first, but I think it will give you an idea of how all these pieces are coming together
