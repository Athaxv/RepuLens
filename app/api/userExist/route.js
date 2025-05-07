import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const { email } = await req.json();
        const user = await db.user.findUnique({
            where: { email },
            select: { id: true }
          });
        console.log(user)
        return NextResponse.json({ user })
    } catch (error) {
        console.log(error)
    }
} 