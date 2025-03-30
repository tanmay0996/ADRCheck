// models/hospital.ts
import mongoose, { Schema, Document, model, models } from "mongoose";

export interface IHospital extends Document {
  name: string;
  address: string;
  email: string;
  patients: mongoose.Types.ObjectId[];
}

const HospitalSchema = new Schema<IHospital>(
  {
    name: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    patients: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Patient" 
    }]
  },
  { timestamps: true }
);

// Pre-remove hook to delete all patients associated with this hospital
HospitalSchema.pre('deleteOne', { document: true, query: false }, async function() {
  // Import here to avoid circular dependency
  const Patient = mongoose.model('Patient');
  await Patient.deleteMany({ hospital: this._id });
});

export default models.Hospital || model<IHospital>("Hospital", HospitalSchema);