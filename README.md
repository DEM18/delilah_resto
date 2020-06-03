# delilah_resto

Este proyecto fue creado como parte de una actividad de backend integradora donde se pueden consumir diferentes endpoints para obtener datos y hacer el CRUD a la base de datos.

# Tecnología / framework

Delilah_resto fue desarrollado con Javascript, NodeJs y MongoDB.

# Instalación DB

Para inicializar la base de datos MongoDB, seguir los siguientes pasos:

1. Instalar en su máquina local Mongo DB.
* descargar Community Server --> https://www.mongodb.com/

2. Dirigirse a la ruta de instalación de MongoDB, abrir el archivo bin y ejecutar en la consola el comando: 
* mongod --dbpath .. \ data \ db

3. Copiar el path del archivo "initBD" que se encuentra en el directorio delilah_resto/src/scripts y luego dirigirse a la ruta de instalación de MongoDB, abrir el archivo bin y ejecutar en una nueva consola el comando:
* mongo path-file-initDB

Ejemplo : mongo C:\Users\Daniela\Documents\Acámica\delilah_resto\scripts\initDB.js

4. Una vez que se crearon las colecciones de la base de datos, se mostrará el mensaje:
* "SCRIPT FINISHED"

5. Para comprobar que las colecciones  se crearon correctamente, descargar un gestor de base de datos y conectars la base al puerto 27017.

6. Otra forma de prueba es dirigiendose a la ruta de instalación de MongoDB, abrir el archivo bin y ejecutar en la consola los siguientes comandos:
 * mongo
 * use database
 * db.users.find()
 
Se mostrará la creación del usuario administrador.
 

# Inicializar servidor

1. Dirigirse a la ruta del proyecto delilah_resto y ejecutar en la consola el comando: 
* node server.js 


La aplicación comenzará a ejecutarse en el puerto 3000
