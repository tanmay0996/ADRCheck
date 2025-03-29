"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb, convertToObjectId } from "@/lib/db"
import { encryptSession, deleteSession } from "@/lib/session"
import { getHospital } from "@/lib/hospital"

// Hospital Authentication
export async function registerHospital({
  hospitalName,
  email,
  password,
}: {
  hospitalName: string
  email: string
  password: string
}) {
  const db = await getDb()

  // Check if hospital already exists
  const existingHospital = await db.collection("hospitals").findOne({ email })
  if (existingHospital) {
    throw new Error("Hospital with this email already exists")
  }

  // In a real app, you would hash the password before storing it
  // For simplicity, we're storing it as plain text here
  const result = await db.collection("hospitals").insertOne({
    name: hospitalName,
    email,
    password, // In production, use bcrypt to hash this password
    createdAt: new Date(),
  })

  // Create session
  await createSession(result.insertedId.toString())
}

export async function loginHospital({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const db = await getDb()

  // In a real app, you would compare the hashed password
  const hospital = await db.collection("hospitals").findOne({ email, password })
  if (!hospital) {
    throw new Error("Invalid credentials")
  }

  // Create session
  await createSession(hospital._id.toString())
}

export async function logoutHospital() {
  await deleteSession()
  redirect("/login")
}

// Patient Management
export async function addPatient(patientData) {
  const db = await getDb()
  const hospital = await getHospital()

  if (!hospital) {
    throw new Error("Not authenticated")
  }

  await db.collection("patients").insertOne({
    ...patientData,
    hospitalId: hospital._id,
    checkups: [],
    createdAt: new Date(),
  })
}

export async function addCheckup(checkupData) {
  const db = await getDb()
  const hospital = await getHospital()

  if (!hospital) {
    throw new Error("Not authenticated")
  }

  const patientId = checkupData.patientId
  delete checkupData.patientId

  await db
    .collection("patients")
    .updateOne({ _id: convertToObjectId(patientId), hospitalId: hospital._id }, { $push: { checkups: checkupData } })
}

// Session Management
async function createSession(hospitalId: string) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session = await encryptSession({ hospitalId, expires })

  cookies().set("session", session, {
    httpOnly: true,
    expires,
    path: "/",
  })
}

