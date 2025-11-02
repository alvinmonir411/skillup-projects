import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("juwelary");

    const products = await db
      .collection("juyelarycollection")
      .find({})
      .toArray();

    return NextResponse.json(products);
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { message: "Database fetch failed", error: error },
      { status: 500 }
    );
  }
}
