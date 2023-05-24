import { NextResponse, NextRequest } from "next/server";
import Poll from "../../../../../models/PollSchema";
export async function GET(req: NextRequest) {
    const idParams = req.nextUrl.pathname.split('/')[3]
    try {
        const resp = await Poll.findById({ _id: idParams });
        return NextResponse.json({ resp })
    }
    catch(err) {
        return NextResponse.json({err});
    }
}