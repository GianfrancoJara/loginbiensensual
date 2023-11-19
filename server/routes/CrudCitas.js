const express = require('express');
const router = express.Router();
const Cita = require('../models/cita.model');
const authorization = require('../middleware/authorization');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'meencantaelcounter@gmail.com',
      pass: 'tknn btgp xjyn nmqj',
  },
});

const notificarCita = (correoCliente, nombreServicio, precioServicio, barbero, fecha) => {
    const mailOptions = {
        from: 'meencantaelcounter@gmail.com',
        to: correoCliente,
        subject: 'Barbería Sr Barber - Agendamiento realizado',
        text: 
        `Servicio: ${nombreServicio} \n
        Precio: ${precioServicio} \n
        Barbero: ${barbero} \n
        Fecha y hora: ${fecha}:00 hrs.`,
    };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
        }
        console.log(`Correo electrónico enviado: ${info.response}`);
        return res.json(newCita);
    });
}

router.post('/', authorization, async (req, res) => {
  const datosCita = req.body.datosCita;  
  try {
      const newCita = new Cita({
        correoCliente: req.correo,
        correoBarbero: datosCita.correoBarbero,
        fechaCita: datosCita.fechaCita,
        nombreServicio: datosCita.nombreServicio
      });
      await newCita.save();

      return res.json(newCita);
    } catch (error) {
      res.status(500).json({ error: 'Ocurrió un error al intentar crear la cita.' });
    }
    finally{
      notificarCita(req.correo, datosCita.nombreServicio, 8000, "Tomas", datosCita.fechaCita);
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