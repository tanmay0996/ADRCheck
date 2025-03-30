'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/dashboard-header";

export default function DashboardPage() {
  const router = useRouter();
  const [hospital, setHospital] = useState<{ name: string }>({ name: "Default Hospital" });
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeAdmissions: 0,
    checkupsToday: 0,
    recentActivity: [],
  });

  useEffect(() => {
    async function fetchHospitalData() {
      try {
        const res = await fetch("/api/hospitals");
        const data = await res.json();

        if (!res.ok || !data.success || !data.data.length) {
          // router.push("/login");
          //mkc
          return;
        }

        setHospital(data.data[0] || { name: "Unnamed Hospital" });
      } catch (error) {
        console.error("Failed to fetch hospital:", error);
        router.push("/login");
      }
    }

    async function fetchStats() {
      try {
        const res = await fetch("/api/patient-stats"); // Implement this API in your backend
        const data = await res.json();

        setStats({
          totalPatients: data.totalPatients || 1,
          activeAdmissions: data.activeAdmissions || 1,
          checkupsToday: data.checkupsToday || 1,
          recentActivity: data.recentActivity || [],
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }

    fetchHospitalData();
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader hospitalName={hospital.name} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {hospital.name}. Manage your patient records here.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalPatients}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Admissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.activeAdmissions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Checkups Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.checkupsToday}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>Add and manage patient records</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button asChild>
                <Link href="/patients/new">Add New Patient</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/patients">View All Patients</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Recent patient admissions and checkups</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.recentActivity.length > 0 ? (
                <ul className="space-y-2">
                  {stats.recentActivity.map((activity, index) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{activity.patientName || "Unknown"}</span> - {activity.action || "No Action"} on{" "}
                      {new Date(activity.date || new Date()).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
