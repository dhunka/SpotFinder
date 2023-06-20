const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express")
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");
const stripe = require('stripe')('sk_test_51N75MIGD6rvnwVkTFtBSmdDduY8PZwRC88wo90jCkiWVx6RljIXff6Ezjv5Oym2LTX6dUeLLXYgxD5w6cQ9RZt0m00TteEuftQ');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


try {
  admin.initializeApp({
    credential: admin.credential.cert(credentials)
  });

  const db = admin.firestore();

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  
  
  app.post('/payment-sheet', async (req, res) => {
    const { price } = req.body;
    if (typeof price !== 'number' || price < 1) {
      return res.status(400).json({ error: 'Invalid price' });
    }
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(price * 100),
      currency: 'usd',
      customer: customer.id,
      payment_method_types: ['card'],
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: 'pk_test_51N75MIGD6rvnwVkTDi2rwCqgzXzroP7Osg6FjbznpuZyFqCTKrhtYpDYjuXvCm1AqhFSFfuFpo5CunviTZnyH52K00HWd3jwyP'
    });
  });


  // Endpoint para manejar el resultado de la hoja de pago
  app.post('/payment-sheet-result', async (req, res) => {
    try {
      try{
        const { paymentIntentId, success } = req.body;
        console.log('Payment Sheet Result - Data Received:', req.body);
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      }catch (error) {
        console.error('Error al guardar el documento en Firestore:', error);
        res.status(500).send('Error al guardar el documento en Firestore');
      }

      if (success) {
        const pagoJson = {
          paymentIntentId: paymentIntentId,
          monto: paymentIntent.amount,
          // Agrega más propiedades según los datos que desees guardar en la base de datos
        };
           console.log('paymentIntentId:', paymentIntentId);
           console.log('success:', success);
           console.log('pagoJson:', pagoJson);
        try {
          const response = await db.collection('pagos').doc().set(pagoJson);
          console.log('Documento creado:', response);
        } catch (error) {
          console.error('Error al guardar el documento en Firestore:', error);
          res.status(500).send('Error al guardar el documento en Firestore');
        }
        
      } else {
        await stripe.paymentIntents.cancel(paymentIntentId);
        res.status(200).send('Payment canceled');
      }
    } catch (error) {
      console.error('Error handling payment sheet result:', error);
      res.status(500).send('Error handling payment sheet result');
    }
  });

  app.get('/estacionamientos', async (req, res) => {
    try {
       const estacionamientoRef = db. collection("estacionamiento");
       const response = await estacionamientoRef.get();
       let responseArr = [];
       response. forEach(doc => {
       responseArr.push (doc.data());
      });
      res. send (responseArr);
      } catch(error) {
      res.send(error);
      }
    }) 
  
  app.post('/create', async (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.email;
      const userJson = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      };
      const response = db.collection("usuario").doc(id).set(userJson);
      res.send(response);
     } catch(error) {
       res.send(error);
     }
  });
  
  //read
  app.get('/read/all', async (req, res) => {
    try {
       const usuarioRef = db. collection("usuario");
       const response = await usuarioRef.get();
       let responseArr = [];
       response. forEach(doc => {
       responseArr.push (doc.data());
      });
      res. send (responseArr);
      } catch(error) {
      res.send(error);
      }
    }) 
  
  //read:id
  app.get('/read/:id', async (req, res) => {
    try {
      const usuarioRef = db.collection("usuario").doc(req.params.id);
      const response = await usuarioRef.get();
      res.send(response.data());
    } catch(error) {
      res.send(error);
    }
  });
  
  app.post('/update', async(req, res) => {
      try {
      const id=reg.body.id;
      const newFirstName = "hello world!";
      const userRef = await db.collection ("users").doc (id)
      .update({
      firstName: newFirstName
      });
      res.send (userRef);
      } catch(error) {
      res. send(error);
      }
    });
  
  //delete
  app.delete('/delete/:id', async (req, res) => {
      try {
         const response = await db.collection("usuario").doc(req.params.id).delete();
         res.send(response); 
       } catch(error) {
         res.send(error);
       }
      })

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);  
  });
} catch (error) {
  console.error('Error al inicializar Firebase o al acceder a Firestore:', error);
  res.status(500).send('Error al inicializar Firebase o al acceder a Firestore');
}
