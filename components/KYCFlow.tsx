import { useState } from 'react';
import { Shield, Upload, Camera, MapPin, Banknote, CheckCircle, ChevronRight, X } from 'lucide-react';

interface KYCFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

type Step = 'intro' | 'pan' | 'id' | 'selfie' | 'address' | 'bank' | 'complete';

export function KYCFlow({ onComplete, onSkip }: KYCFlowProps) {
  const [step, setStep] = useState<Step>('intro');
  const [panNumber, setPanNumber] = useState('');
  const [panName, setPanName] = useState('');
  const [idType, setIdType] = useState('aadhaar');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [accountName, setAccountName] = useState('');

  const getStepNumber = () => {
    const steps = ['intro', 'pan', 'id', 'selfie', 'address', 'bank'];
    return steps.indexOf(step);
  };

  const totalSteps = 5;

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <button
          onClick={onSkip}
          className="absolute top-6 right-6 p-2 text-gray-600 hover:bg-gray-200 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-[#F3F1F7] rounded-full p-6 mb-6">
          <Shield className="w-20 h-20 text-[#3D3066]" />
        </div>

        <h1 className="text-black mb-4">Complete KYC</h1>
        <p className="text-gray-600 text-center max-w-md mb-8">
          Verify your identity to unlock all features
        </p>

        <div className="bg-white rounded-xl p-6 w-full max-w-md mb-8 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-gray-900">Higher Transaction Limits</p>
              <p className="text-gray-600 text-sm">Buy and sell larger amounts of gold</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-gray-900">Loan Eligibility</p>
              <p className="text-gray-600 text-sm">Get instant loans against your gold</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-gray-900">Faster Withdrawals</p>
              <p className="text-gray-600 text-sm">Quick and secure money transfers</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep('pan')}
          className="w-full max-w-md bg-[#3D3066] text-white py-3 rounded-lg hover:bg-[#5C4E7F] transition-colors mb-3 flex items-center justify-center gap-2"
        >
          Complete KYC Now
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={onSkip}
          className="text-gray-600 hover:text-gray-800"
        >
          Skip, Do Later
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className='text-black'>KYC Verification</h2>
            <button
              onClick={onSkip}
              className="text-gray-600 hover:text-gray-800"
            >
              Skip
            </button>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < getStepNumber() ? 'bg-[#3D3066]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Step {getStepNumber()} of {totalSteps}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-6">
        {step === 'pan' && (
          <div className="bg-white rounded-xl p-6">
            <div className="bg-[#F3F1F7] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-[#3D3066]" />
            </div>
            <h2 className="mb-2 text-black">PAN Details</h2>
            <p className="text-gray-600 mb-6">Enter your PAN card information</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">PAN Number</label>
                <input
                  type="text"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase().slice(0, 10))}
                  placeholder="ABCDE1234F"
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                  maxLength={10}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Name as per PAN</label>
                <input
                  type="text"
                  value={panName}
                  onChange={(e) => setPanName(e.target.value)}
                  placeholder="Enter name"
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Upload PAN Card</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#8B7FA8] cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-gray-400 text-sm">PNG, JPG or PDF (max. 5MB)</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('id')}
              disabled={!panNumber || !panName}
              className="w-full bg-[#3D3066] text-white py-3 rounded-lg hover:bg-[#5C4E7F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'id' && (
          <div className="bg-white rounded-xl p-6">
            <div className="bg-[#F3F1F7] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-[#3D3066]" />
            </div>
            <h2 className="text-black mb-2">ID Proof</h2>
            <p className="text-gray-600 mb-6">Upload your identity document</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Select ID Type</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                >
                  <option value="aadhaar">Aadhaar Card</option>
                  <option value="passport">Passport</option>
                  <option value="voter">Voter ID</option>
                  <option value="driving">Driving License</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Front Side</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#8B7FA8] cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Upload front side</p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Back Side</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#8B7FA8] cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Upload back side</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('selfie')}
              className="w-full bg-[#3D3066] text-white py-3 rounded-lg hover:bg-[#5C4E7F] transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'selfie' && (
          <div className="bg-white rounded-xl p-6">
            <div className="bg-[#F3F1F7] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-[#3D3066]" />
            </div>
            <h2 className="mb-2 text-black">Selfie Verification</h2>
            <p className="text-gray-600 mb-6">Take a selfie for identity verification</p>

            <div className="bg-gray-100 rounded-lg aspect-square max-w-sm mx-auto mb-6 flex items-center justify-center">
              <Camera className="w-16 h-16 text-gray-400" />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-900 text-sm">
                <strong>Tips for a good selfie:</strong>
              </p>
              <ul className="text-blue-800 text-sm mt-2 space-y-1 list-disc list-inside">
                <li>Make sure your face is clearly visible</li>
                <li>Remove glasses or hat if any</li>
                <li>Ensure good lighting</li>
              </ul>
            </div>

            <button
              onClick={() => setStep('address')}
              className="w-full bg-[#3D3066] text-white py-3 rounded-lg hover:bg-[#5C4E7F] transition-colors mb-3"
            >
              Capture Selfie
            </button>
            <button
              onClick={() => setStep('address')}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Upload from Gallery
            </button>
          </div>
        )}

        {step === 'address' && (
          <div className="bg-white rounded-xl p-6">
            <div className="bg-[#F3F1F7] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-[#3D3066]" />
            </div>
            <h2 className="mb-2 text-black">Address Details</h2>
            <p className="text-gray-600 mb-6">Enter your residential address</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Address Line</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no., Street, Area"
                  rows={3}
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                    placeholder="Pincode"
                    maxLength={6}
                    className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State"
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                />
              </div>
            </div>

            <button
              onClick={() => setStep('bank')}
              disabled={!address || !city || !pincode || !state}
              className="w-full bg-[#3D3066] text-white py-3 rounded-lg hover:bg-[#5C4E7F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'bank' && (
          <div className="bg-white rounded-xl p-6">
            <div className="bg-[#F3F1F7] rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
              <Banknote className="w-8 h-8 text-[#3D3066]" />
            </div>
            <h2 className="text-black mb-2">Bank Details</h2>
            <p className="text-gray-600 mb-6">Add your bank account for transactions</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  placeholder="Enter IFSC code"
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Account Holder Name</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Name as per bank"
                  className="text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                />
              </div>
            </div>

            <button
              onClick={() => setStep('complete')}
              disabled={!accountNumber || !ifsc || !accountName}
              className="w-full bg-[#3D3066] text-white py-3 rounded-lg hover:bg-[#5C4E7F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit for Verification
            </button>
          </div>
        )}

        {step === 'complete' && (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="bg-green-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-black mb-2">KYC Submitted!</h1>
            <p className="text-gray-600 mb-8">
              Your documents are under review. We'll notify you once verified.
            </p>

            <div className="bg-[#F3F1F7] border border-[#B5A9C9] rounded-lg p-4 mb-8">
              <p className="text-[#3D3066]">
                Verification usually takes 24-48 hours
              </p>
            </div>

            <button
              onClick={onComplete}
              className="w-full bg-[#3D3066] text-white py-3 rounded-lg hover:bg-[#5C4E7F] transition-colors"
            >
              Continue to App
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
