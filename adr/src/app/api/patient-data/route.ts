import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientId, hospitalId, fullName, age, medications, symptoms, conditions } = body;

    // Convert medications object to string
    const medicationText = Object.entries(medications)
      .map(([med, status]) => `${med}: ${status}`)
      .join(', ');

    // Combine all form data into a single text string
    const combinedText = `Patient ID: ${patientId}, Hospital ID: ${hospitalId}, Name: ${fullName}, Age: ${age}, Medications: ${medicationText}, Symptoms: ${symptoms}, Conditions: ${conditions}`;
    console.log(combinedText)
    // Additional JSON keys
    const payload = {
      patient_data: combinedText,
      timestamp: new Date().toISOString(),
      source: 'Next.js API',
    };

    // Send the data to another server
    const response = await fetch('http://localhost:8000/detect_adverse_events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send data. Server responded with ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json({ message: 'Data sent successfully', result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, { status: 500 });
  }
}
