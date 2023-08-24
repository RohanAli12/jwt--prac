import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getJwtSecretKey } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const headersToken = req.cookies.get("token")?.value;
  console.log("Token"+" " + headersToken);
  try {
    if (pathname === "/login" || pathname === "/register") {
      if (headersToken) {
        return NextResponse.redirect(`${origin}`);
      }
      return NextResponse.next();
    }
    if (!headersToken) {
      return NextResponse.redirect(`${origin}/login`);
    }
    const verifyToken = jwtVerify(
      headersToken,
      new TextEncoder().encode(getJwtSecretKey())
    );
    console.log("Verify Token"+verifyToken)
    if (await verifyToken) {
        return NextResponse.next()
    }
    return NextResponse.json(
        { error: { message: "Authentication required" } },
        { status: 401 }
      );
    } catch (error) {
      console.log(error);
    }
  }
  export const config = {
    matcher: ["/", "/login", "/protected"],
  };
