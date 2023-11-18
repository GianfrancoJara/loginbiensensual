const express = require('express');
const router = express.Router();
const Cita = require('../models/cita.model');
const authorization = require('../middleware/authorization');

router.post('/', authorization, async (req, res) => {
    try {
      const datosCita = req.body.datosCita;
      const newCita = new Cita({
        correoCliente: req.correo,
        correoBarbero: datosCita.correoBarbero,
        fechaCita: datosCita.fechaCita,
        nombreServicio: datosCita.nombreServicio
      });
      await newCita.save(); 
      res.json(newCita);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al intentar crear la cita.' });
    }
  });

router.get('/', async (req, res) => {
    try {
      const citas = await Cita.find();
      res.json(citas);
    } catch (error) {
      res.status(500).json({ error: 'No se pudieron obtener las citas' });
    }
  });

router.get('/miscitas/', authorization, async (req, res) => {
  try {
    const id = req.correo; 
    const citas = await Cita.find({ correoCliente: id });
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: 'No se pudieron obtener las citas' });
  }
});

router.get('/barbero/:id', async (req, res) => {
    try {
      const { id } = req.params; 
      const citas = await Cita.find({ correoBarbero: id });
      res.json(citas);
    } catch (error) {
      res.status(500).json({ error: 'No se pudieron obtener las citas' });
    }
  });



router.put('/:id', async (req, res) => {
    const { id } = req.params; 
    const citaModificada = req.body.productoModificado;
    try {
      const citaActualizada = await Cita.findOneAndUpdate({ codigoCita: id }, citaModificada); 
      res.json(citaActualizada);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo actualizar la cita' });
    }
  });


router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
      await Cita.findOneAndDelete({ _id: id });
      res.json({ message: 'Cita eliminada con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'No se pudo eliminar la cita' });
    }
  });

  

  
  module.exports = router;