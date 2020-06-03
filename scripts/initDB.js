

/*
 * Script que se encarga de poblar la base de datos  
 * 
 */

print("STARTING SCRIPT");
//Host donde está nuestra base de datos, no tiene que ser nuestro equipo local, puede ser cualquier mongoDb.
conn = new Mongo("localhost:27017");
//Nombre de la base de datos que vamos a utilizar
db = conn.getDB("database");

/*Limpiamos la base de datos por si existia algo antes*/
db.dropDatabase();


/*coleciones de nuestro modelo de datos*/
db.createCollection("roles");
db.createCollection("users");
db.createCollection("usersroles");
db.createCollection("paymentmethods");
db.createCollection("orderstatus");

/* Usuarios */
print("***********creating users*********");


userAdmin = {
  
"_id" : ObjectId("5ed2b1fecf481e34185ddf83"),
"username" : "admin1",
"name_lastname" : "Daniela Moreno",
"email": "admin1@gmail.com",
"telephone": "1158745965",
"delivery_address": "chacabuco 1458",
"password": "admin112345"
}

print("***********creating roles*********");

/* roles */


roleAdmin = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a53dd"),
    "description" : "Administrator"
};

roleUser = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a35dd"),
    "description" : "User"
};

print("***********creating user role admin*********");

userRoleAdmin = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a53de"),
    "id_user" : ObjectId("5ed2b1fecf481e34185ddf83"),
    "id_rol": ObjectId("5ed2b117beebfe0ee88a53dd")
};




paymentMethod1 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a54de"),
    "description": "Efectivo"
};

paymentMethod2 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a55de"),
    "description": "Débito"
};

paymentMethod3 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a56de"),
    "description": "Crédito"
};


orderStatus1 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a57de"),
    "description": "Nuevo"
};

orderStatus2 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a58de"),
    "description": "Confirmado"
};

orderStatus3 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a59de"),
    "description": "En preparación"
};

orderStatus4 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a60de"),
    "description": "En camino"
};

orderStatus5 = {
     
    "_id" : ObjectId("5ed2b117beebfe0ee88a59de"),
    "description": "Entregado"
};


print("***********saving users*********");
db.users.save(userAdmin);


print("***********saving roles*********");
db.roles.save(roleAdmin);
db.roles.save(roleUser);

print("***********saving user roles*********");
db.usersroles.save(userRoleAdmin);

print("***********saving payment methods*********");
db.paymentmethods.save(paymentMethod1);
db.paymentmethods.save(paymentMethod2);
db.paymentmethods.save(paymentMethod3);

print("***********saving orders status*********");
db.orderstatus.save(orderStatus1);
db.orderstatus.save(orderStatus2);
db.orderstatus.save(orderStatus3);
db.orderstatus.save(orderStatus4);
db.orderstatus.save(orderStatus5);


print("SCRIPT FINISHED");


