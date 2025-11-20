import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="card max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to MedTap AI!</h1>
        <p className="text-gray-600 mb-6">Let's set up your profile.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary"
        >
          Complete Profile Setup
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
