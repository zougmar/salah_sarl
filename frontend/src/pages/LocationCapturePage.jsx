import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MapPin, Loader } from 'lucide-react';
import api from '../services/api';

export const LocationCapturePage = () => {
  const [status, setStatus] = useState('idle'); // idle, requesting, success, error
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    // Check if user is logged in (optional - can work without auth)
    const token = localStorage.getItem('salahelec_token');
    if (token) {
      // Try to get user info to include employeeId
      api.get('/auth/me')
        .then(res => setEmployeeId(res.data._id))
        .catch(() => {
          // If token is invalid, continue without employeeId
        });
    }
  }, []);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setStatus('error');
      return;
    }

    setStatus('requesting');
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });

        try {
          const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform
          };

          await api.post('/locations/submit', {
            latitude,
            longitude,
            accuracy,
            employeeId,
            deviceInfo
          });

          setStatus('success');
        } catch (err) {
          console.error('Failed to submit location:', err);
          setError(err.response?.data?.message || 'Failed to submit location. Please try again.');
          setStatus('error');
        }
      },
      (err) => {
        console.error('Geolocation error:', err);
        let errorMessage = 'Failed to get your location. ';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage += 'Please allow location access and try again.';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case err.TIMEOUT:
            errorMessage += 'Location request timed out. Please try again.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
        }
        
        setError(errorMessage);
        setStatus('error');
      },
      options
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Location Check-In
          </h1>
          <p className="text-slate-600">
            Share your current location for tracking purposes
          </p>
        </div>

        {status === 'idle' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Privacy Notice:</strong> Your location will be securely stored and only accessible to authorized personnel.
              </p>
            </div>
            <button
              onClick={requestLocation}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Share My Location
            </button>
          </div>
        )}

        {status === 'requesting' && (
          <div className="text-center py-8">
            <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-700 font-medium">Requesting location access...</p>
            <p className="text-sm text-slate-500 mt-2">Please allow location access in your browser</p>
          </div>
        )}

        {status === 'success' && location && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Location Submitted!</h2>
            <p className="text-slate-600 mb-6">
              Your location has been successfully recorded.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Latitude:</span>
                <span className="font-mono text-slate-900">{location.latitude.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Longitude:</span>
                <span className="font-mono text-slate-900">{location.longitude.toFixed(6)}</span>
              </div>
              {location.accuracy && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Accuracy:</span>
                  <span className="font-mono text-slate-900">±{Math.round(location.accuracy)}m</span>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setStatus('idle');
                setLocation(null);
                setError(null);
              }}
              className="mt-6 w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Submit Another Location
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Error</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => {
                setStatus('idle');
                setError(null);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

