"use server";

import clientPromise from "../lib/mongodb";

export async function AdminSessionGet() {
  const client = await clientPromise;
  const db = client.db("juwelary");
  const requestSession = db.collection("requestSession");
  const result = await requestSession.find({}).toArray();
  return JSON.parse(JSON.stringify(result));
}
