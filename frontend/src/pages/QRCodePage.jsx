import { QRCodeDisplay } from '../components/shared/QRCodeDisplay';
import { useAuth } from '../hooks/useAuth';

export const QRCodePage = () => {
  const { user } = useAuth();
  
  // Generate the full URL for location capture page
  const locationUrl = `${window.location.origin}/location-checkin`;

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Location Check-In QR Code</h1>
          <p className="text-slate-600">
            Generate a QR code for employees to scan and submit their location
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <QRCodeDisplay url={locationUrl} title="Employee Location Check-In" />
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Instructions</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="font-semibold mb-2">For Administrators:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Display this QR code at your office entrance or work site</li>
                  <li>Employees scan the code with their mobile device</li>
                  <li>They'll be prompted to share their location</li>
                  <li>Location data is automatically saved to the system</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">For Employees:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Open your phone's camera app</li>
                  <li>Point it at the QR code</li>
                  <li>Tap the notification to open the check-in page</li>
                  <li>Allow location access when prompted</li>
                  <li>Your location will be automatically submitted</li>
                </ol>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Location data is stored securely and can be viewed in the admin dashboard. 
                  Employees can optionally log in to associate their location with their account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

