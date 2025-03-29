"use server"

import { cookies } from "next/headers"

// In a real app, you would use a proper encryption library
// This is a simplified version for demonstration purposes
export async function encryptSession(data: any): Promise<string> {
  return Buffer.from(JSON.stringify(data)).toString("base64")
}

export async function decryptSession(session: string): Promise<any> {
  try {
    const data = JSON.parse(Buffer.from(session, "base64").toString())

    // Check if session is expired
    if (data.expires && new Date(data.expires) < new Date()) {
      return null
    }

    return data
  } catch (error) {
    console.error("Failed to decrypt session:", error)
    return null
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null

  return decryptSession(session)
}

export async function deleteSession() {
  cookies().delete("session")
}

