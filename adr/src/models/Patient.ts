// models/patient.ts
import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IPatient extends Document {
  name: string;
  age: number;
  drugUsage: string; // Single concatenated string
  hospital: mongoose.Types.ObjectId; // Reference to the hospital
}

const PatientSchema = new Schema<IPatient>(
  {
    name: { 
      type: String, 
      required: true 
    },
    age: { 
      type: Number, 
      required: true 
    },
    drugUsage: { 
      type: String, 
      required: true 
    },
    hospital: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Hospital",
      required: true // Ensure every patient has a hospital
    }
  },
  { timestamps: true }
);

export default models.Patient || model<IPatient>("Patient", PatientSchema);