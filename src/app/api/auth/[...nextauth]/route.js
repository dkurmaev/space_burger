import clientPromise from "@/libs/mongoConnect";
import NextAuth from "next-auth/next";
import {MongoDBAdapter} from "@auth/mongodb-adapter"

const adapter = MongoDBAdapter(clientPromise);


import authOptions from "@/libs/authOptions";

const handler = NextAuth({...authOptions})

export {handler as GET, handler as POST}
