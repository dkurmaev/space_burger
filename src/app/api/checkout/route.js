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

  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productInfo = await MenuItem.findById(cartProduct._id);

    let productPrice = productInfo.basePrice;

    if (cartProduct.extras) {
      const extras = productInfo.extra.find(
        (extras) => extras._id.toString() === cartProduct.extras._id.toString()
      );
      productPrice += extras.price;
    }

    if (cartProduct.beilagen) {
      const beilagen = productInfo.beilage.find (
        (beilagen) => beilagen._id.toString() === cartProduct.beilagen._id.toString()
      );
      productPrice += beilagen.price
    }

   

    if (cartProduct.drinks) {
      const drinks = productInfo.drink.find(
        (drinks) => drinks._id.toString() === cartProduct.drinks._id.toString()
      );
      productPrice += drinks.price;
    }

    const productName = cartProduct.name;

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
  console.log({ stripeLineItems });

}




