// 1: requerir los paquetes necesatios: mongoose, drone...
// 2: crear los datos {array de datos que hay que almacenar en la base de datos}
// 3: conectarnos a la base de datos: require(con el enlace al archivo de la base de datos)
// 4: una vez nos hemos conectado a la vase de datos creamos cosas dentro


// Iteration #1

const mongoose = require("mongoose");

const Drone = require('../models/Drone.model')

const drone = [
  {
    name: 'DJI Phantom 4 Pro',
    propellers: 4,
    maxSpeed: 20
  },
  {
    name: 'DJI INSPIRE 2',
    propellers: 4,
    maxSpeed: 26
  },
  {
    name: 'Courier 3000i',
    propellers: 6,
    maxSpeed: 18
  },
];

require('../db/index')

Drone.deleteMany()
.then(allDrones => {
  console.log('everything deleted')
})
.then(
Drone.create(drone)
.then((createdDrones) => {
  console.log('drones created in database')
  mongoose.connection.close();
})
.catch((err) => {
  console.log(err)
}))