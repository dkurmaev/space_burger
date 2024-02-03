import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import {User} from '@/models/User';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongoConnect";

const authOptions = {
   /*  adapter: MongoDBAdapter(clientPromise), */
    secret: process.env.SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                username: {label: "Email", type: "email", placeholder: "test@example.com"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({email});
                if (user) {
                    console.log('found user', user);
                }
                const passwordOk = user && bcrypt.compareSync(password, user.password);
                console.log("Result of the secret password:", passwordOk);

                if (passwordOk) {
                    user.name = user.name || "Default Name";
                    user.email = user.email || "default@example.com";
                    /*user.isAdmin = await isAdmin;*/

                    return user;
                }

                return null
            }
        })
    ],
};

export default authOptions;
