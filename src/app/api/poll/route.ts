import { NextRequest, NextResponse } from "next/server";
import Poll from "../../../../models/PollSchema";
import { connectMongo } from "../../../../utils/connect";

export async function GET() {
    await connectMongo();
    try {
        const polls = await Poll.find()
        return NextResponse.json({ polls })
    }
    catch(err) {
        return NextResponse.json({err});
    }
}

export async function POST(req: Request) {
    await connectMongo();
    const { title, question, response } = await req.json();
    try {
        const poll = new Poll({
            title,
            question,
            response
        })
        await poll.save()
        return NextResponse.json({ poll })
    }
    catch(err) {
        return NextResponse.json({err});
    }
}