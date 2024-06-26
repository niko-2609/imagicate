// import mongoose, {Mongoose} from "mongoose";


// // const MONGODB_URL= process.env.MONGODB_URL
// // console.log(MONGODB_URL)


// interface MongooseConnection  {
//     conn: Mongoose | null,
//     promise: Promise<Mongoose> | null
// }

// /**
//  * this line is declaring a variable named cached of type MongooseConnection and
//  * assigning to it the Mongoose connection fetched from the global object. 
//  * This pattern is often used to cache resources or objects retrieved 
//  * from global contexts, such as databases or configuration settings.
//  */
// let cached: MongooseConnection = (global as any).mongoose 

// // if nothing is present in cached, initialize it with null
// if (!cached) {
//     cached = (global as any).mongoose = {
//         conn : null,
//         promise: null
//     }
// }


// // connect to database, returns a connection
// export const connectToDatabase = async () => {
//     // if there is a connection cached, return
//     // this is where caching is optimizing the serverless approach.
//     if (cached.conn) return cached.conn;

//     if (!process.env.MONGODB_URL) return new Error("Missing MongoDB url");

//     // connect to db only happens if there is no promise that is cached.
//     // thus reducing calls to db
//     cached.promise = cached.promise || mongoose.connect(process.env.MONGODB_URL!, {
//         dbName: "imagify", 
//         bufferCommands: false
//     })

  

//     // resolve connection promise and get the connection.
//     cached.conn = await cached.promise;

//     return cached.conn;
// }

import  mongoose,{ Mongoose } from 'mongoose';

const MONGODB_URL = 'mongodb+srv://admin:ybYSCkGeLy9SdpxO@next-dev0.hutjotc.mongodb.net/imagify?retryWrites=true&w=majority&appName=next-dev0'

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {

  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginify', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}