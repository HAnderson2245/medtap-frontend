import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Users, PawPrint, Medal, FileText } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Heart className="w-12 h-12 text-primary-500" />,
      title: 'Medical Records',
      description: 'Access your complete medical history with ease',
    },
    {
      icon: <PawPrint className="w-12 h-12 text-primary-500" />,
      title: 'Pet Care',
      description: 'Manage health records for your furry family members',
    },
    {
      icon: <Medal className="w-12 h-12 text-primary-500" />,
      title: 'Veteran Services',
      description: 'Dedicated support for our veterans',
    },
    {
      icon: <Shield className="w-12 h-12 text-primary-500" />,
      title: 'HIPAA Compliant',
      description: 'Your data is secure and protected',
    },
    {
      icon: <Users className="w-12 h-12 text-primary-500" />,
      title: 'Family Management',
      description: 'Manage healthcare for your entire family',
    },
    {
      icon: <FileText className="w-12 h-12 text-primary-500" />,
      title: 'Document Management',
      description: 'Upload, sign, and manage medical documents',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-bold text-gray-900">MedTap AI</span>
          </div>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-outline"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Content */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Healthcare Records at<br />your Fingertips
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transforming healthcare with every tap. Manage your medical records,
          appointments, and health data all in one secure platform.
        </p>
        <button
          onClick={() => navigate('/register')}
          className="btn btn-primary text-lg px-8 py-4"
        >
          Start Free Today
        </button>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card text-center hover:scale-105 transition-transform"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* User Types */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Built for Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-white">
              <Heart className="w-16 h-16 text-primary-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                Individuals & Families
              </h3>
              <p className="text-gray-600">
                Manage your complete medical history and family health records
                in one place.
              </p>
            </div>
            <div className="card bg-white">
              <PawPrint className="w-16 h-16 text-primary-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Pet Owners</h3>
              <p className="text-gray-600">
                Keep track of your pets' health records, vaccinations, and vet
                appointments.
              </p>
            </div>
            <div className="card bg-white">
              <Medal className="w-16 h-16 text-primary-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Veterans</h3>
              <p className="text-gray-600">
                Access VA benefits, Tricare data, and specialized veteran
                healthcare services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of users managing their healthcare efficiently
        </p>
        <button
          onClick={() => navigate('/register')}
          className="btn btn-primary text-lg px-8 py-4"
        >
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 MedTap AI. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            HIPAA Compliant | Secure | Private
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
