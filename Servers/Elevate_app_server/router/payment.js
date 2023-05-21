const express = require("express");
require("dotenv").config();
const router = express();
router.use(express.json());
const client = require("../connection/connection");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/pay", async (req, res) => {
  try {
    let { amount, name } = req.body;
    if (!name || !amount)
      return res.status(400).json({ message: "All fields are required" });
    amount = parseInt(amount);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "pkr",
      payment_method_types: ["card"],
      metadata: { name },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.use("/stripe", express.raw({ type: "*/*" }));
router.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  console.log("HHHHHHHHHHHHH" + req.body);
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});

module.exports = router;
