# delilah_resto

Backend created in order to expose different  endpoint resources for Delilah Resto.

This project was created as part of an integrative backend activity where different endpoints can be consumed to get data and do the CRUD to the database.

# Tech/framework used

Delilah_resto was developed with Javascript, NodeJs and MongoDB.

# Installation

In order to initialize MongoDB and database, please follow the steps:

1. Install in your local machine Mongo DB.
download Community Server --> https://www.mongodb.com/

2. Go to the MongoDB installation path, open bin file and run in console the command: mongod --dbpath .. \ data \ db

3. Go to the MongoDB installation path, open bin file and run in a new console the command:
mongo scripts\initDB.js

4. Once database collections were created, a message will be shown:
"SCRIPT FINISHED"

5. For testing database collections were created sucessfully, we recommend to use Compass MongoDB 
download --> https://www.mongodb.com/products/compass

6. Another way for testing, go to the MongoDB installation path, open bin file and run in console the following commands:
 * mongo
 * use database
 * db.users.find()
 
 User Admin previously created will be shown.
 

# Initialize server

1. Go to delilah_resto path and run in console the command: node server.js 

Application will start to run in port 3000
