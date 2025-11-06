import clientPromise from "../lib/mongodb";

export default async function GetAllCourses() {
  const client = await clientPromise;

  const collection = client.db("juwelary").collection("courses");

  const result = await collection.find({}).toArray();
  return result;
}
