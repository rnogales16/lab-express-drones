const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  Drone.find() //con Drone nos referimos a el model(plantilla) que encontramos en model.    .find() encuentra todos los objetos dentro de la base de datos
  .then(allDrones => { //una vez tenemos los datos pasamos al siguiente paso
    res.render('./drones/list', {allDrones}) //muestra la informacion en el archivo que he escrito. y mostramos la informacion de la base de datos
  })
  .catch((err) => {
    console.log(err)
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('./drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body
  Drone.create({name, propellers, maxSpeed})
  .then(createDrone => {
    console.log(createDrone)
    res.redirect('/drones')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/drones/create')
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  Drone.findById(req.params.id)
  .then(accessId => res.render('./drones/update-form', accessId))
  .catch(err => console.log(err))
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  let id = req.params.id
  const {name, propellers, maxSpeed} = req.body
  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed})
  .then(updateDroneById => {
    console.log(updateDroneById)
    res.redirect('/drones')
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/drones/${id}/edit`)
  })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  Drone.findByIdAndDelete(req.params.id)
  .then(deletedDrone => {
    console.log(deletedDrone)
    res.redirect('/drones')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/drones')
  })
});

module.exports = router;
