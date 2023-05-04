import mongoose from "mongoose";
import Quiz from "../../../../models/QuizSchema";
import { connectMongo } from "../../../../utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongo();
    try {
        const quizzes = await Quiz.find()
        return NextResponse.json({ quizzes })
    }
    catch(err) {
        return NextResponse.json({err});
    }
}

export async function POST(req: Request) {
    await connectMongo();
    try {
      const data = await req.json();
      const { title, quizzes } = data;
      
      const quizDocs = await Quiz.create({ title, quizzes });

      return NextResponse.json({ quizDocs });
    } catch (err) {
      return NextResponse.json({ err });
    }
  }