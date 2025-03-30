// app/api/hospitals/[hospitalId]/patients/[patientId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Patient from '@/models/Patient';
import Hospital from '@/models/Hospital';
import mongoose from 'mongoose';

// GET /api/hospitals/[hospitalId]/patients/[patientId] - Get a specific patient
export async function GET(
  request: NextRequest,
  { params }: { params: { hospitalId: string; patientId: string } }
) {
  try {
    await dbConnect();
    
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(params.hospitalId) || 
        !mongoose.Types.ObjectId.isValid(params.patientId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital or patient ID' },
        { status: 400 }
      );
    }
    
    // Find patient that belongs to the specified hospital
    const patient = await Patient.findOne({
      _id: params.patientId,
      hospital: params.hospitalId
    });
    
    if (!patient) {
      return NextResponse.json(
        { success: false, error: 'Patient not found in this hospital' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: patient }, { status: 200 });
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}

// PUT /api/hospitals/[hospitalId]/patients/[patientId] - Update a patient
export async function PUT(
  request: NextRequest,
  { params }: { params: { hospitalId: string; patientId: string } }
) {
  try {
    await dbConnect();
    
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(params.hospitalId) || 
        !mongoose.Types.ObjectId.isValid(params.patientId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital or patient ID' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Process drug usage array if provided
    if (body.drugUsageArray) {
      body.drugUsage = Array.isArray(body.drugUsageArray)
        ? body.drugUsageArray.join(' ')
        : body.drugUsageArray;
        
      // Remove the array from the update data
      delete body.drugUsageArray;
    }
    
    // Update the patient that belongs to the specified hospital
    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: params.patientId, hospital: params.hospitalId },
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedPatient) {
      return NextResponse.json(
        { success: false, error: 'Patient not found in this hospital' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, data: updatedPatient },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating patient:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

// DELETE /api/hospitals/[hospitalId]/patients/[patientId] - Delete a patient
export async function DELETE(
  request: NextRequest,
  { params }: { params: { hospitalId: string; patientId: string } }
) {
  try {
    await dbConnect();
    
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(params.hospitalId) || 
        !mongoose.Types.ObjectId.isValid(params.patientId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid hospital or patient ID' },
        { status: 400 }
      );
    }
    
    // Find and delete the patient
    const deletedPatient = await Patient.findOneAndDelete({
      _id: params.patientId,
      hospital: params.hospitalId
    });
    
    if (!deletedPatient) {
      return NextResponse.json(
        { success: false, error: 'Patient not found in this hospital' },
        { status: 404 }
      );
    }
    
    // Remove patient reference from the hospital's patients array
    await Hospital.findByIdAndUpdate(
      params.hospitalId,
      { $pull: { patients: params.patientId } }
    );
    
    return NextResponse.json(
      { success: true, message: 'Patient deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
}