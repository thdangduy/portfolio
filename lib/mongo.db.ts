import mongoose, { Connection } from "mongoose";
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Please provide a MongoDB String");
}

declare global {
  var cachedConn: Connection | null;
}
globalThis.cachedConn = globalThis.cachedConn || null;

async function connectToDB(): Promise<Connection> {
  if (globalThis.cachedConn) return globalThis.cachedConn;
  try {
    const cxt = await mongoose.connect(DATABASE_URL as string);
    globalThis.cachedConn = cxt.connection;
    return cxt.connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
export default connectToDB;
