import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

interface Payload {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string | null;
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("juwelary");

    const data: Payload = await req.json();

    const { name, email, password, role, image } = data;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "name, email, password required" },
        { status: 400 }
      );
    }

    const collectionName = process.env.NEXTAUTH_USER;
    if (!collectionName) {
      return NextResponse.json(
        { message: "collection env not found" },
        { status: 500 }
      );
    }

    const result = await db.collection(collectionName).insertOne({
      name,
      email,
      password,
      role,
      image,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { message: "Database fetch failed", error: error.message },
      { status: 500 }
    );
  }
}
