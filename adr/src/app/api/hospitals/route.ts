// app/api/hospitals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hospital from '@/models/Hospital';
import Patient from '@/models/Patient';

// GET /api/hospitals - Get all hospitals
export async function GET() {
  try {
    await dbConnect();

    const hospitals = await Hospital.find({})
    .populate({ path: 'patients', select: 'name age' });
    
    return NextResponse.json({ success: true, data: hospitals }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hospitals' },
      { status: 500 }
    );
  }
}

// POST /api/hospitals - Create a new hospital
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.address || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newHospital = await Hospital.create({
      name: body.name,
      address: body.address,
      email: body.email,
      patients: [] // Initialize with empty patients array
    });
    
    return NextResponse.json(
      { success: true, data: newHospital },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating hospital:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A hospital with this email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create hospital' },
      { status: 500 }
    );
  }
}