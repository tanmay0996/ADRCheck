// app/api/hospitals/[id]/patients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Patient from '@/models/Patient';
import Hospital from '@/models/Hospital';
import mongoose from 'mongoose';

// GET /api/hospitals/[hospitalId]/patients - Get all patients for a hospital
export async function GET(
  request: NextRequest,
  { params }: { params: { hospitalId: string } }
) {
  try {
    await dbConnect();

    // const hospitalId = params?.hospitalId;
    const hospitalId = "67e8826c8105ad7fdbbbf060";
    
    // Validate hospital ID
    if (!hospitalId || !mongoose.Types.ObjectId.isValid(hospitalId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital ID' },
        { status: 400 }
      );
    }
    
    // Check if hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return NextResponse.json(
        { success: false, error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    // Get all patients for this hospital
    const patients = await Patient.find({ hospital: hospitalId });
    
    return NextResponse.json({ success: true, data: patients }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

// POST /api/hospitals/[hospitalId]/patients - Add a new patient to a hospital
export async function POST(
  request: NextRequest,
  { params }: { params: { hospitalId: string } }
) {
  try {
    await dbConnect();

    console.log("Received Request:", request.method, request.url);
    console.log("Hospital ID:", params.hospitalId);

    // const hospitalId = params?.hospitalId;
    const hospitalId = "67e8826c8105ad7fdbbbf060";
    
    // Validate hospital ID
    if (!hospitalId || !mongoose.Types.ObjectId.isValid(hospitalId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital ID' },
        { status: 400 }
      );
    }
    
    // Check if hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return NextResponse.json(
        { success: false, error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.age) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Extract and format medications
    const formattedMedications = body.medications?.map((med: string) => 
      [
        `started ${med}`,
        `began ${med}`,
        `prescribed ${med}`,
        `initiated ${med}`,
        `stopped ${med}`,
        `discontinued ${med}`,
        `withdrew ${med}`,
        `cessation of ${med}`,
        `after ${med}`,
        `following ${med}`,
        `subsequent to ${med}`
      ].join(' ')
    ).join(' ') || '';

    // Extract and format symptoms
    const formattedSymptoms = body.symptoms?.map((sym: string) => 
      `experiencing ${sym}`
    ).join(' ') || '';

    // Extract and format conditions
    const formattedConditions = body.conditions?.map((cond: string) => 
      `suffering from ${cond}`
    ).join(' ') || '';

    // Concatenate all data into a single drugUsage string
    const drugUsage = `${formattedMedications} ${formattedSymptoms} ${formattedConditions}`.trim();

    // Create the patient with a reference to the hospital
    const newPatient = await Patient.create({
      name: body.name,
      age: body.age,
      drugUsage,
      hospital: hospitalId
    });

    // Add patient reference to the hospital's patients array
    await Hospital.findByIdAndUpdate(
      hospitalId,
      { $push: { patients: newPatient._id } }
    );

    return NextResponse.json(
      { success: true, data: newPatient },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating patient:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create patient' },
      { status: 500 }
    );
  }
}
