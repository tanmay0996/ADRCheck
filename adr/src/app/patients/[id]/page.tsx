import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPatientById } from "@/lib/data"
import DashboardHeader from "@/components/dashboard-header"

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const patient = await getPatientById(params.id)

  if (!patient) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">{patient.name}</h1>
            <p className="text-muted-foreground">Patient ID: {patient.patientId}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/patients">Back to Patients</Link>
            </Button>
            <Button asChild>
              <Link href={`/patients/${params.id}/edit`}>Edit Patient</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{patient.age} years</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Gender</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{patient.gender}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Admission Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Date(patient.admissionDate).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="checkups">Checkups</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Overview</CardTitle>
                <CardDescription>General information about the patient</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Diagnosis</h3>
                  <p>{patient.diagnosis}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Symptoms</h3>
                  <p>{patient.symptoms}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="checkups" className="mt-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Checkup</CardTitle>
                <CardDescription>Record a new checkup for this patient</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Checkup History</CardTitle>
                <CardDescription>Previous checkups for this patient</CardDescription>
              </CardHeader>
              <CardContent>
                {patient.checkups && patient.checkups.length > 0 ? (
                  <div className="space-y-4">
                    {patient.checkups.map((checkup, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">
                            {new Date(checkup.date).toLocaleDateString()}{" "}
                            <span className="text-muted-foreground text-sm">
                              {new Date(checkup.date).toLocaleTimeString()}
                            </span>
                          </h3>
                        </div>
                        <p className="mb-2">{checkup.notes}</p>
                        {checkup.vitals && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            <div className="bg-muted p-2 rounded">
                              <span className="block text-muted-foreground">Temperature</span>
                              <span>{checkup.vitals.temperature}°C</span>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <span className="block text-muted-foreground">Blood Pressure</span>
                              <span>{checkup.vitals.bloodPressure}</span>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <span className="block text-muted-foreground">Heart Rate</span>
                              <span>{checkup.vitals.heartRate} bpm</span>
                            </div>
                            <div className="bg-muted p-2 rounded">
                              <span className="block text-muted-foreground">Oxygen</span>
                              <span>{checkup.vitals.oxygenSaturation}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No checkups recorded yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="medications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Medications</CardTitle>
                <CardDescription>Medications prescribed to the patient</CardDescription>
              </CardHeader>
              <CardContent>
                {patient.medications && patient.medications.length > 0 ? (
                  <ul className="space-y-2">
                    {patient.medications.map((medication, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>{medication}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No medications prescribed yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

