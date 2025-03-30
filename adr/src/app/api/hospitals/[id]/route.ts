// app/api/hospitals/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Hospital from '@/models/Hospital';
import mongoose from 'mongoose';

// GET /api/hospitals/[id] - Get a specific hospital with its patients
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const id = "67e8826c8105ad7fdbbbf060"
    
    // Validate hospital ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital ID' },
        { status: 400 }
      );
    }
    
    const hospital = await Hospital.findById(id).populate('patients');
    
    if (!hospital) {
      return NextResponse.json(
        { success: false, error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: hospital }, { status: 200 });
  } catch (error) {
    console.error('Error fetching hospital:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hospital' },
      { status: 500 }
    );
  }
}

// PUT /api/hospitals/[id] - Update a hospital
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const id = "67e8826c8105ad7fdbbbf060"
    const body = await request.json();
    
    // Validate hospital ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital ID' },
        { status: 400 }
      );
    }
    
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedHospital) {
      return NextResponse.json(
        { success: false, error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: updatedHospital },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating hospital:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A hospital with this email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update hospital' },
      { status: 500 }
    );
  }
}

// DELETE /api/hospitals/[id] - Delete a hospital and its patients
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    // Validate hospital ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital ID' },
        { status: 400 }
      );
    }
    
    const hospital = await Hospital.findById(params.id);
    
    if (!hospital) {
      return NextResponse.json(
        { success: false, error: 'Hospital not found' },
        { status: 404 }
      );
    }
    
    // The pre-remove hook will delete all associated patients
    await hospital.deleteOne();
    
    return NextResponse.json(
      { success: true, message: 'Hospital and associated patients deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting hospital:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete hospital' },
      { status: 500 }
    );
  }
}