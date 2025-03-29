import Link from "next/link"
import { Button } from "@/components/ui/button"
import { logoutHospital } from "@/lib/actions"

interface DashboardHeaderProps {
  hospitalName?: string
}

export default function DashboardHeader({ hospitalName }: DashboardHeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="font-bold text-xl">
            HMS
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/patients" className="text-sm font-medium">
              Patients
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {hospitalName && <span className="text-sm font-medium hidden md:inline-block">{hospitalName}</span>}
          <form action={logoutHospital}>
            <Button variant="outline" size="sm" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}

