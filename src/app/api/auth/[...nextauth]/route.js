import clientPromise from "@/libs/mongoConnect";
import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import authOptions from "@/libs/authOptions";

const adapter = MongoDBAdapter(clientPromise);

const handler = NextAuth({ ...authOptions });

export { handler as GET, handler as POST };
