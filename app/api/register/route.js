import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/prisma";

export async function POST(req) {
    try {
        const { name, email, password, userType } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                fullName: name,
                email,
                password: hashedPassword,
                role: userType
            },
        });

        return NextResponse.json(
            { message: "User registered successfully", userId: newUser.id },
            { status: 201 }
          );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { message: "An error occurred while registering user", error: error.message },
            { status: 500 }
        );
    }
}
