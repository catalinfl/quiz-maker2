import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    test: string
}

export function GET(res: NextApiResponse, req: NextApiRequest) {
    res.statusCode = 300;
    return new Response("test")
}