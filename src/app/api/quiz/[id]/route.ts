import { NextRequest, NextResponse } from "next/server";
import Quiz from "../../../../../models/QuizSchema";
import connectMongo from "../../../../../utils/connect";



export async function GET(req: NextRequest) {
    await connectMongo();
    const urlSeg = req.nextUrl.pathname.split('/')[3]
    try {
        const resp = await Quiz.findById({ _id: urlSeg });
        return NextResponse.json({ resp })
    }
    catch(err) {
        return NextResponse.json({err});
    }
}