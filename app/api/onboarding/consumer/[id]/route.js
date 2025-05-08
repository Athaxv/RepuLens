// app/api/onboarding/consumer/[id]/route.js

import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  const { id: userId } = await context.params;

  try {
    console.log("user ID", userId)

    const userExists = await db.user.findUnique({
      where: { id: userId }, // Here, we're using the id to find the user
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 } // Return 404 if user doesn't exist
      );
    }
    console.log(userExists)


    const { name, jobTitle, company, interests, companiesTracked } = await req.json();
    console.log('Received data:', { name, jobTitle, company, interests, companiesTracked });
    const consumerProfile = await db.consumerProfile.create({
      data: {
        fullName: name,
        jobTitle: jobTitle,
        company: company,
        userId: userId,
        industries: interests,
        companiesTracked: companiesTracked,
         // ✅ Must match your Prisma schema
      },
    });
    console.log("profile", consumerProfile)

    
    return NextResponse.json(
      { message: "Consumer profile created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating consumer profile", error: error.message },
      { status: 500 }
    );
  }
}
