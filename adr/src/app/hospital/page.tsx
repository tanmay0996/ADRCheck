"use client"
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BedDouble, 
  Stethoscope, 
  Plus, 
  List, 
  Activity,
  ArrowRight,
  Calendar,
  Bell
} from 'lucide-react';

function DashboardPage() {
  const [hospital, setHospital] = useState<{ name: string }>({ name: "Default Hospital" });
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeAdmissions: 0,
    checkupsToday: 0,
    recentActivity: [],
  });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    // Simulated data fetch
    setStats({
      totalPatients: 1234,
      activeAdmissions: 42,
      checkupsToday: 8,
      recentActivity: [
        { patientName: "John Doe", action: "Admitted", date: new Date().toISOString() },
        { patientName: "Jane Smith", action: "Checkup", date: new Date().toISOString() },
        { patientName: "Mike Johnson", action: "Discharged", date: new Date().toISOString() },
      ]
    });
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    borderColor, 
    id 
  }: { 
    title: string;
    value: number;
    icon: React.ElementType;
    borderColor: string;
    id: string;
  }) => (
    <div
      className={`bg-gray-900 rounded-xl p-6 border-t-4 ${borderColor} transform transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
      onMouseEnter={() => setHoveredCard(id)}
      onMouseLeave={() => setHoveredCard(null)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value.toLocaleString()}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-opacity-20 ${borderColor.replace('border', 'bg')}`}>
          <Icon className={`w-6 h-6 ${borderColor.replace('border', 'text').replace('-500', '-400')}`} />
        </div>
      </div>
      <div className={`mt-4 h-1 rounded-full bg-gray-800 overflow-hidden transition-all duration-500 ${hoveredCard === id ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`h-full ${borderColor.replace('border', 'bg')} animate-pulse`} style={{ width: '60%' }}></div>
      </div>
    </div>
  );

  const ActionCard = ({ 
    title, 
    description, 
    primaryAction, 
    secondaryAction, 
    borderColor 
  }: { 
    title: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    borderColor: string;
  }) => (
    <div className={`bg-gray-900 rounded-xl p-6 border-t-4 ${borderColor}`}>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-6">{description}</p>
      <div className="space-y-3">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 group">
          <Plus size={18} />
          <span>{primaryAction}</span>
          <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all" />
        </button>
        <button className="w-full bg-gray-800 hover:bg-gray-750 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
          <List size={18} />
          <span>{secondaryAction}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{hospital.name}</h1>
              <p className="text-gray-400 text-sm">Healthcare Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <Bell size={20} className="text-gray-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
              </button>
              <button className="bg-gray-800 hover:bg-gray-750 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Calendar size={18} />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-gray-400">Here's what's happening at {hospital.name} today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            borderColor="border-blue-500"
            id="patients"
          />
          <StatCard
            title="Active Admissions"
            value={stats.activeAdmissions}
            icon={BedDouble}
            borderColor="border-rose-500"
            id="admissions"
          />
          <StatCard
            title="Checkups Today"
            value={stats.checkupsToday}
            icon={Stethoscope}
            borderColor="border-emerald-500"
            id="checkups"
          />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ActionCard
            title="Patient Management"
            description="Add and manage patient records efficiently"
            primaryAction="Add New Patient"
            secondaryAction="View All Patients"
            borderColor="border-purple-500"
          />

          <div className="bg-gray-900 rounded-xl p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <p className="text-gray-400 text-sm">Latest updates and changes</p>
              </div>
              <Activity size={20} className="text-blue-400" />
            </div>
            
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">{activity.patientName}</span>
                    <span className="text-sm text-gray-400">
                      {new Date(activity.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{activity.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;