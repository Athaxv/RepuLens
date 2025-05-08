import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  const { id: userId } = await context.params;

  try {
    // Check if user exists
    const userExists = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Parse request body
    const {
      businessName,
      industry,
      annualRevenue,
      employeeCount,
      website,
      twitter,
      linkedin,
      instagram,
    } = await req.json();

    // Create BusinessProfile
    const businessProfile = await db.businessProfile.create({
      data: {
        businessName,
        industry,
        annualRevenue,
        numberOfEmployees: employeeCount,
        companyWebsite: website,
        twitter,
        linkedin,
        instagram,
        userId, // Connect to User
      },
    });

    return NextResponse.json(
      { message: "Business profile created", businessProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating business profile:", error);
    return NextResponse.json(
      { message: "Failed to create business profile", error: error.message },
      { status: 500 }
    );
  }
}
