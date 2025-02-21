import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Mock authentication check
  if (email === "test@example.com" && password === "password") {
    // Create a mock JWT token with correct format: header.payload.signature
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64");
    const payload = Buffer.from(JSON.stringify({ email })).toString("base64");
    const signature = "mock-signature"; // Fake signature

    const token = `${header}.${payload}.${signature}`;

    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
