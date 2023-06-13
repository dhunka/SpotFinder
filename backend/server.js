const express = require("express")
const app = express();
const admin = require("firebase-admin");
const credentials = require("./key.json");
const stripe = require('stripe')('sk_test_51N75MIGD6rvnwVkTFtBSmdDduY8PZwRC88wo90jCkiWVx6RljIXff6Ezjv5Oym2LTX6dUeLLXYgxD5w6cQ9RZt0m00TteEuftQ');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const db = admin.firestore();

app.post('/payment-sheet', async (req, res) => {
  try {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, // Monto en centavos o céntimos de euro
      currency: 'eur',
      customer: customer.id,
      payment_method_types: ['card'],
    });

    const paymentSheetData = {
      paymentIntent: paymentIntent.client_secret,
      customer: ephemeralKey.secret,
      publishableKey: 'pk_test_51N75MIGD6rvnwVkTDi2rwCqgzXzroP7Osg6FjbznpuZyFqCTKrhtYpDYjuXvCm1AqhFSFfuFpo5CunviTZnyH52K00HWd3jwyP',
    };

    res.json(paymentSheetData);
  } catch (error) {
    console.error('Error creating payment sheet:', error);
    res.status(500).send('Error creating payment sheet');
  }
});

// Endpoint para manejar el resultado de la hoja de pago
app.post('/payment-sheet-result', async (req, res) => {
  try {
    const { paymentIntentId, success } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (success) {
      // Guardar la información del pago en la base de datos o realizar acciones necesarias
      res.status(200).send('Payment succeeded');
    } else {
      // Cancelar el pago o realizar otras acciones según sea necesario
      await stripe.paymentIntents.cancel(paymentIntentId);
      res.status(200).send('Payment canceled');
    }
  } catch (error) {
    console.error('Error handling payment sheet result:', error);
    res.status(500).send('Error handling payment sheet result');
  }
});

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
})