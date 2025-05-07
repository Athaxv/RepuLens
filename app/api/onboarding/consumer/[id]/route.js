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


    // const { fullName, jobTitle, company, industries, companiesTracked } = await req.json();
    // console.log('Received data:', { fullName, jobTitle, company, industries, companiesTracked });
    // const consumerProfile = await db.consumerProfile.create({
    //   data: {
    //     fullName,
    //     jobTitle,
    //     company,
    //     industries,
    //     companiesTracked,
    //     userId, // ✅ Must match your Prisma schema
    //   },
    // });
    // console.log("profile", consumerProfile)

    const requestBody = await req.json();
    
    // Validate and sanitize inputs
    const fullName = requestBody.fullName || null;
    const jobTitle = requestBody.jobTitle || null;
    const company = requestBody.company || null;
    
    // Ensure arrays are properly formatted
    const industries = Array.isArray(requestBody.industries) 
      ? requestBody.industries 
      : (typeof requestBody.industries === 'string' 
          ? [requestBody.industries] 
          : []);
    
    const companiesTracked = Array.isArray(requestBody.companiesTracked) 
      ? requestBody.companiesTracked 
      : (typeof requestBody.companiesTracked === 'string' 
          ? [requestBody.companiesTracked] 
          : []);
    
    console.log('Processed data:', { 
      fullName, 
      jobTitle, 
      company, 
      industries, 
      companiesTracked 
    });

    // Check if profile already exists for this user
    const existingProfile = await db.consumerProfile.findUnique({
      where: { userId },
    });

    let consumerProfile;

    if (existingProfile) {
      // Update existing profile
      console.log("Updating existing consumer profile for user:", userId);
      consumerProfile = await db.consumerProfile.update({
        where: { userId },
        data: {
          fullName,
          jobTitle,
          company,
          industries,
          companiesTracked,
        },
      });
    } else {
      // Create new profile
      console.log("Creating new consumer profile for user:", userId);
      consumerProfile = await db.consumerProfile.create({
        data: {
          fullName,
          jobTitle,
          company,
          industries,
          companiesTracked,
          userId,
        },
      });
    }

    console.log("Consumer profile saved successfully:", consumerProfile.id);
    return NextResponse.json(
      { message: "Consumer profile created", consumer: consumerProfile },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating consumer profile", error: error.message },
      { status: 500 }
    );
  }
}
