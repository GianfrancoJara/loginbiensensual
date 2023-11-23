const router = require("express").Router();
const mercadopago = require("mercadopago");

router.post("/crear-orden", async (req, res) => {
  let items = [];
    mercadopago.configure({
        access_token: process.env.MERCADOPAGO_API_KEY,
    });
    const carrito = req.body;
    console.log(carrito);
    if(carrito){
      carrito.forEach(item => {
        items.push({
          title: item.nombre,
          unit_price: item.precio,
          quantity: item.cantidad,
          currency_id: "CLP",
        })
      });
    }
      try {
        const result = await mercadopago.preferences.create({
          items: items,
          notification_url: "https://8c2d-2803-c180-2100-b68-a9d7-4b56-9e63-8fc5.ngrok-free.app/pago/webhook",
          back_urls: {
            success: "http://localhost:3000/?statuspago=success",
            pending: "http://localhost:3000/?statuspago=pending",
            failure: "http://localhost:3000/?statuspago=failure",
          },
        });
        res.json(result.body);
      } catch (error) {
        return res.status(500).json({ message: error });
      }
});



router.post("/webhook", async (req, res) => {
  let pagoRealizado = false;
    try {
        const payment = req.query;
        if (payment.type === "payment") {
          const data = await mercadopago.payment.findById(payment["data.id"]);
          pagoRealizado = true;
        }
      } catch (error) {
        pagoRealizado = false;
        console.log(error);
        return res.status(500).json({ message: "La transacción ha fallado" });
      }
      finally{
        console.log("pago realizado?");
        console.log(pagoRealizado);
      }
});

router.get("/success", (req, res) => res.send("Success"));

module.exports = router;
