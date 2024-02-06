import authOptions from "@/libs/authOptions";
import { MenuItem } from "@/models/MenuItem";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const stripe = require("stripe")(process.env.STRIPE_SK);

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email; 

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });

  let subtotal = 0; 

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;

    
    if (cartProduct.extras?.length > 0) {
      for (const extra of cartProduct.extras) {
        const extraInfo = productInfo.extras.find(
          (ex) => ex._id.toString() === extra._id.toString()
        );
        productPrice += extraInfo.price;
      }
    }

    
    if (cartProduct.drink) {
      const drink = productInfo.drinks.find(
        (d) => d._id.toString() === cartProduct.drink._id.toString()
      );
      productPrice += drink.price;
    }

    
    if (cartProduct.beilage) {
      const beilage = productInfo.beilagen.find(
        (b) => b._id.toString() === cartProduct.beilage._id.toString()
      );
      productPrice += beilage.price;
    }

    const productName = cartProduct.name;

    
    subtotal += productPrice;

    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "EUR",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100, 
      },
    });
  }

  
  const shippingPrice = 4.9; 
  subtotal += shippingPrice; 
  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url: "http://localhost:3000/orders/" + orderDoc._id.toString() + "?clear-cart=1",
    cancel_url: "http://localhost:3000/cart?canceled=1",
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Lieferung",
          type: "fixed_amount",
          fixed_amount: { amount: 490, currency: "EUR" },
        },
      },
    ],
  });

  
  await Order.findByIdAndUpdate(orderDoc._id, {
    totalAmount: subtotal,
    shippingCost: shippingPrice,
    userId: session.user.id, 
  });

  return Response.json(stripeSession.url);
}
