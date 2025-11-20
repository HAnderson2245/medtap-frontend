import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../utils/store';
import { 
  Heart, Calendar, FileText, Activity, PawPrint, Medal,
  Bell, Plus, TrendingUp, Clock, AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    appointments: 0,
    records: 0,
    documents: 0,
    pets: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [recentRecords, setRecentRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [appointments, records] = await Promise.all([
        api.getAppointments(),
        api.getMedicalRecords()
      ]);

      setStats({
        appointments: appointments.length,
        records: records.length,
        documents: 0,
        pets: 0
      });

      setUpcomingAppointments(appointments.slice(0, 3));
      setRecentRecords(records.slice(0, 5));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Book Appointment',
      description: 'Schedule with a provider',
      action: () => navigate('/appointments'),
      color: 'bg-blue-500'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Add Record',
      description: 'Upload medical records',
      action: () => navigate('/medical-records'),
      color: 'bg-green-500'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Body Scan',
      description: 'View 3D body map',
      action: () => navigate('/body-scan'),
      color: 'bg-purple-500'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Health Metrics',
      description: 'Track your vitals',
      action: () => navigate('/profile'),
      color: 'bg-red-500'
    }
  ];

  if (user?.userType === 'pet_owner') {
    quickActions.push({
      icon: <PawPrint className="w-6 h-6" />,
      title: 'My Pets',
      description: 'Manage pet records',
      action: () => navigate('/pets'),
      color: 'bg-orange-500'
    });
  }

  if (user?.userType === 'veteran') {
    quickActions.push({
      icon: <Medal className="w-6 h-6" />,
      title: 'VA Benefits',
      description: 'Access veteran services',
      action: () => navigate('/veteran'),
      color: 'bg-indigo-500'
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.profile?.firstName || 'User'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your healthcare overview
              </p>
            </div>
            <button className="btn btn-primary flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Records</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.records}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              View all records
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Appointments</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.appointments}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Clock className="w-4 h-4 mr-1" />
              {upcomingAppointments.length} upcoming
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Documents</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.documents}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              Manage documents
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Health Score</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">85%</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5% this month
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="card hover:scale-105 transition-transform text-left"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-3`}>
                  {action.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <button
                onClick={() => navigate('/appointments')}
                className="text-primary-500 hover:text-primary-600 text-sm font-medium"
              >
                View All
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="spinner"></div>
              </div>
            ) : upcomingAppointments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{apt.providerName}</p>
                        <p className="text-sm text-gray-600">{apt.providerSpecialty}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(apt.appointmentDate).toLocaleDateString()} at{' '}
                          {new Date(apt.appointmentDate).toLocaleTimeString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No upcoming appointments</p>
                <button
                  onClick={() => navigate('/appointments')}
                  className="btn btn-primary mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Book Appointment
                </button>
              </div>
            )}
          </div>

          {/* Recent Medical Records */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Records</h2>
              <button
                onClick={() => navigate('/medical-records')}
                className="text-primary-500 hover:text-primary-600 text-sm font-medium"
              >
                View All
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <div className="spinner"></div>
              </div>
            ) : recentRecords.length > 0 ? (
              <div className="space-y-3">
                {recentRecords.map((record) => (
                  <div
                    key={record.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer"
                    onClick={() => navigate('/medical-records')}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold">{record.title}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {record.provider || 'No provider'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded ${
                        record.isCritical 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {record.recordType}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No medical records yet</p>
                <button
                  onClick={() => navigate('/medical-records')}
                  className="btn btn-primary mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Record
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Health Alerts */}
        <div className="mt-6 card bg-yellow-50 border-yellow-200">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-900">Health Alert</h3>
              <p className="text-sm text-yellow-800 mt-1">
                Don't forget your annual physical exam! It's been over 12 months since your last checkup.
              </p>
              <button className="btn btn-outline mt-3 text-sm">
                Schedule Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
