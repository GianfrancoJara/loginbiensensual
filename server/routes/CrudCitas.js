const express = require('express');
const router = express.Router();
const Cita = require('../models/cita.model');
const authorization = require('../middleware/authorization');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'barbersr.tomas@gmail.com',
      pass: 'lzsk oaxm eved tmpu',
  },
});

const notificarCancelacion = (cita) => {
    try{
      let respuestas = [];
      const mailOptions = {
        from: 'barbersr.tomas@gmail.com',
        to: cita.correoCliente,
        subject: 'Barbería Sr. Tomas - Cita cancelada',
        text: 
        `La cita que ha agendado para la fecha y hora ${cita.fechaCita}:00 ha sido cancelada`,
      };
      const mailOptionsAdmin = {
        from: 'barbersr.tomas@gmail.com',
        to: cita.correoBarbero,
        subject: 'Barbería Sr. Tomas - Cita cancelada',
        text: 
        `La cita que ha agendado para la fecha y hora ${cita.fechaCita}:00 ha sido cancelada`,
      };
      transporter.sendMail(mailOptions, (info) => {
        console.log(`Correo electrónico de cliente enviado: ${info.response}`);
        respuestas.push(info.response)})
      transporter.sendMail(mailOptionsAdmin, (info) => {
        console.log(`Correo electrónico de cliente enviado: ${info.response}`);
        respuestas.push(info.response)})
      return respuestas;
    }
    catch(error){
      console.log({ error: 'Ocurrió un error al intentar enviar el correo.' });
    }
}

const notificarCita = (cita) => {
    const mailOptions = {
        from: 'barbersr.tomas@gmail.com',
        to: cita.correoCliente,
        subject: 'Barbería Sr. Tomas - Agendamiento realizado',
        text: 
        `Servicio: ${cita.nombreServicio}
        Precio: ${cita.precioServicio}
        Barbero: ${cita.nombreBarbero}
        Fecha y hora: ${cita.fechaCita}:00 hrs.`,
    };
    const mailOptionsBarbero = {
      from: 'barbersr.tomas@gmail.com',
      to: cita.correoBarbero,
      subject: 'Administración Barbería Sr. Tomas - Agendamiento realizado',
      text: 
      `Servicio: ${cita.nombreServicio}
      Precio: ${cita.precioServicio}
      Cliente: ${cita.nombreCliente}
      Fecha y hora: ${cita.fechaCita}:00 hrs.`,
  };
    try{
      transporter.sendMail(mailOptions, (info) => {
        console.log(`Correo electrónico de cliente enviado: ${info.response}`);
        return res.json({message: 'Correo enviado exitosamente'})})
      transporter.sendMail(mailOptionsBarbero, (info) => {
        console.log(`Correo electrónico de barbero enviado: ${info.response}`);
        return res.json({message: 'Correo enviado exitosamente'})})
    }
    catch(error){
      return res.status(500).json({ error: 'Ocurrió un error al intentar enviar el correo.' });
    }
}

router.post('/', authorization, async (req, res) => {
  const datosCita = req.body.datosCita;
  let agendado = false;
  const newCita = new Cita({
    correoCliente: req.correo,
    nombreCliente: req.nombre,
    correoBarbero: datosCita.correoBarbero,
    nombreBarbero: datosCita.nombreBarbero,
    fechaCita: datosCita.fechaCita,
    nombreServicio: datosCita.nombreServicio,
    precioServicio: datosCita.precioServicio
  });
  try {
      const citaDuplicada = await Cita.findOne({ correoBarbero: newCita.correoBarbero, fechaCita: newCita.fechaCita });
      if(citaDuplicada){
        console.log("duplicado");
      }
      await newCita.save();
      agendado = true;
      return res.json(newCita);
    } catch (error) {
      agendado = false;
      res.status(500).json({ error: 'Ocurrió un error al intentar crear la cita.' });
    }
    finally{
      if(agendado){
        notificarCita(newCita);
      }
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
    let borrado = false;
    let citaCancelada;
    try {
      citaCancelada = await Cita.findOneAndDelete({ _id: id });
      borrado = true;
      res.json({ message: 'Cita eliminada con éxito' });
    } catch (error) {
      borrado = false;
      res.status(500).json({ error: 'No se pudo eliminar la cita' });
    }
    finally{
      if(borrado){
        notificarCancelacion(citaCancelada);
      }
    }
  });

  

  
  module.exports = router;