import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuthStore } from '../utils/store';
import { UserType } from '../types';

const Register = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    userType: '' as UserType,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const userTypes = [
    {
      type: UserType.INDIVIDUAL,
      title: 'Individual / Family',
      description: 'Manage your personal and family healthcare',
      icon: '👤',
    },
    {
      type: UserType.PET_OWNER,
      title: 'Pet Owner',
      description: 'Healthcare management for your pets',
      icon: '🐾',
    },
    {
      type: UserType.VETERAN,
      title: 'Veteran',
      description: 'Access veteran services and VA benefits',
      icon: '🎖️',
    },
  ];

  const handleNext = () => {
    if (step === 1 && !formData.userType) {
      setError('Please select a user type');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await api.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userType: formData.userType,
      });
      setAuth(response.token, response.user);
      navigate('/onboarding');
    } catch (err: any) {
      setError(
        err.response?.data?.error || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Join MedTap AI</h1>
          <p className="text-gray-600 mt-2">
            Start managing your healthcare today
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              1
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              2
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="card max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-700 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Choose Your Account Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userTypes.map((type) => (
                  <button
                    key={type.type}
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: type.type })}
                    className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      formData.userType === type.type
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-4xl mb-3">{type.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="btn btn-primary w-full mt-6"
                disabled={!formData.userType}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Create Your Account
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <User className="w-4 h-4 inline mr-1" />
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="label">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Password
                </label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">
                  At least 8 characters
                </p>
              </div>

              <div>
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  required
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-primary-500 hover:text-primary-600">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-500 hover:text-primary-600">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline flex-1"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-500 hover:text-primary-600 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secured with HIPAA-compliant encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
