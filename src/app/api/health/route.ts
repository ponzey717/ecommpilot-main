import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET(): Response {
  return NextResponse.json(
    {
      service: "ecommpilot-public",
      status: "ok",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    },
  );
}
