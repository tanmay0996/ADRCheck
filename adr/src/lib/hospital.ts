import { getDb } from "@/lib/db"
import { getSession } from "@/lib/session"
import { cache } from "react"

export const getHospital = cache(async () => {
  const session = await getSession()
  if (!session?.hospitalId) return null

  const db = await getDb()
  const hospital = await db.collection("hospitals").findOne({
    _id: session.hospitalId,
  })

  return hospital as any
})

