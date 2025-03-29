import { cache } from "react"
import { getDb, convertToObjectId } from "@/lib/db"
import { getSession } from "@/lib/session"

export const getHospital = cache(async () => {
  const session = await getSession()
  if (!session?.hospitalId) return null

  const db = await getDb()
  const hospital = await db.collection("hospitals").findOne({
    _id: convertToObjectId(session.hospitalId),
  })

  return hospital
})

export async function getPatientStats() {
  const hospital = await getHospital()
  if (!hospital) return { totalPatients: 0, activeAdmissions: 0, checkupsToday: 0, recentActivity: [] }

  const db = await getDb()

  // Get total patients
  const totalPatients = await db.collection("patients").countDocuments({
    hospitalId: hospital._id,
  })

  // Get active admissions (patients admitted in the last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const activeAdmissions = await db.collection("patients").countDocuments({
    hospitalId: hospital._id,
    admissionDate: { $gte: thirtyDaysAgo.toISOString() },
  })

  // Get checkups today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const patientsWithCheckupsToday = await db
    .collection("patients")
    .find({
      hospitalId: hospital._id,
      "checkups.date": { $gte: today.toISOString() },
    })
    .toArray()

  const checkupsToday = patientsWithCheckupsToday.reduce((count, patient) => {
    const todayCheckups = patient.checkups.filter((checkup: any) => new Date(checkup.date) >= today)
    return count + todayCheckups.length
  }, 0)

  // Get recent activity
  const recentPatients = await db
    .collection("patients")
    .find({ hospitalId: hospital._id })
    .sort({ createdAt: -1 })
    .limit(5)
    .toArray()

  const recentActivity = recentPatients.map((patient) => ({
    patientId: patient._id,
    patientName: patient.name,
    action: "was admitted",
    date: patient.createdAt,
  }))

  return {
    totalPatients,
    activeAdmissions,
    checkupsToday,
    recentActivity,
  }
}

export async function getPatients(query = "") {
  const hospital = await getHospital()
  if (!hospital) return []

  const db = await getDb()

  const filter: any = { hospitalId: hospital._id }

  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: "i" } },
      { patientId: { $regex: query, $options: "i" } },
      { diagnosis: { $regex: query, $options: "i" } },
    ]
  }

  const patients = await db.collection("patients").find(filter).sort({ createdAt: -1 }).toArray()

  return patients
}

export async function getPatientById(id: string) {
  const hospital = await getHospital()
  if (!hospital) return null

  const objectId = convertToObjectId(id)
  if (!objectId) return null

  const db = await getDb()
  const patient = await db.collection("patients").findOne({
    _id: objectId,
    hospitalId: hospital._id,
  })

  return patient
}

