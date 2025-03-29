"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner";
import { addPatient } from "@/lib/actions"
import DashboardHeader from "@/components/dashboard-header"

export default function NewPatientPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [medications, setMedications] = useState<string[]>([])
  const [newMedication, setNewMedication] = useState("")

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication.trim()])
      setNewMedication("")
    }
  }

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const patientData = {
      patientId: formData.get("patientId") as string,
      name: formData.get("name") as string,
      age: Number.parseInt(formData.get("age") as string),
      gender: formData.get("gender") as string,
      admissionDate: formData.get("admissionDate") as string,
      symptoms: formData.get("symptoms") as string,
      diagnosis: formData.get("diagnosis") as string,
      medications: medications,
    }

    try {
      await addPatient(patientData)
      toast.success("The patient has been added successfully.")
      router.push("/patients")
    } catch (error) {
      console.error("Failed to add patient:", error)
      toast.error("There was an error adding the patient. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add New Patient</h1>
        </div>

        <Card>
          <form onSubmit={onSubmit}>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Enter the patient&apos;s details below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input id="patientId" name="patientId" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select name="gender" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admissionDate">Date of Admission</Label>
                  <Input id="admissionDate" name="admissionDate" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms</Label>
                <Textarea
                  id="symptoms"
                  name="symptoms"
                  placeholder="Describe the patient's symptoms"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input id="diagnosis" name="diagnosis" required />
              </div>

              <div className="space-y-2">
                <Label>Medications</Label>
                <div className="flex gap-2">
                  <Input
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Add medication"
                  />
                  <Button type="button" onClick={addMedication} variant="secondary">
                    Add
                  </Button>
                </div>
                {medications.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {medications.map((med, index) => (
                      <div
                        key={index}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        <span>{med}</span>
                        <button
                          type="button"
                          onClick={() => removeMedication(index)}
                          className="text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/patients">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Patient"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}

