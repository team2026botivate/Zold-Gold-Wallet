import { useState } from 'react';
import { X, Coins, MapPin, CreditCard, CheckCircle, Info, Sparkles } from 'lucide-react';

interface BuyGoldFlowProps {
  onClose: () => void;
}

type Step = 'amount' | 'partner' | 'payment' | 'success';

export function BuyGoldFlow({ onClose }: BuyGoldFlowProps) {
  const [step, setStep] = useState<Step>('amount');
  const [inputMode, setInputMode] = useState<'rupees' | 'grams'>('rupees');
  const [amount, setAmount] = useState('');
  const [selectedStorage, setSelectedStorage] = useState<'vault' | 'partner'>('vault');
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const goldBuyPrice = 6245.50;
  const gstRate = 3; // 3%

  const calculateGrams = (rupees: number) => {
    return rupees / goldBuyPrice;
  };

  const calculateRupees = (grams: number) => {
    return grams * goldBuyPrice;
  };

  const inputValue = parseFloat(amount) || 0;
  const grams = inputMode === 'rupees' ? calculateGrams(inputValue) : inputValue;
  const rupees = inputMode === 'grams' ? calculateRupees(inputValue) : inputValue;
  const gst = rupees * (gstRate / 100);
  const totalAmount = rupees + gst;

  const partners = [
    { id: 1, name: 'Shree Ganesh Jewellers', area: 'Connaught Place', distance: 2.3 },
    { id: 2, name: 'Lakshmi Gold House', area: 'Saket', distance: 5.7 },
    { id: 3, name: 'Tanishq Select', area: 'Karol Bagh', distance: 7.2 },
  ];

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-neutral-900 z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#3D3066] via-[#5C4E7F] to-[#8B7FA8] px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <h2 className="text-white">Buy Gold</h2>
          </div>
          <div className="bg-white/20 dark:bg-white/10 rounded-full px-3 py-1">
            <span className="text-white text-sm">
              Step {step === 'amount' ? 1 : step === 'partner' ? 2 : step === 'payment' ? 3 : 4} of 3
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 pb-24">
        {step === 'amount' && (
          <div>
            {/* Live Rate */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <p className="text-gray-600 dark:text-neutral-400 text-sm mb-2">Current Gold Rate (24K)</p>
              <p className="text-gray-900 dark:text-white">₹{goldBuyPrice.toFixed(2)}/gram</p>
            </div>

            {/* Input Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => {
                  setInputMode('rupees');
                  setAmount('');
                }}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  inputMode === 'rupees'
                    ? 'bg-[#3D3066] dark:bg-[#4D3F7F] text-white'
                    : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border border-gray-300 dark:border-neutral-700'
                }`}
              >
                Buy in ₹
              </button>
              <button
                onClick={() => {
                  setInputMode('grams');
                  setAmount('');
                }}
                className={`flex-1 py-3 rounded-lg transition-colors ${
                  inputMode === 'grams'
                    ? 'bg-[#3D3066] dark:bg-[#4D3F7F] text-white'
                    : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border border-gray-300 dark:border-neutral-700'
                }`}
              >
                Buy in Grams
              </button>
            </div>

            {/* Amount Input */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <label className="block text-gray-700 dark:text-neutral-300 mb-3">
                {inputMode === 'rupees' ? 'Enter Amount (₹)' : 'Enter Weight (grams)'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={inputMode === 'rupees' ? '1000' : '1.0'}
                step={inputMode === 'rupees' ? '100' : '0.1'}
                className="text-gray-800 w-full px-4 py-4 border-2 border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8] focus:border-transparent"
              />
              <p className="text-gray-500 dark:text-neutral-500 text-sm mt-2">Minimum: ₹100</p>

              {amount && (
                <div className="mt-4 p-4 bg-[#F3F1F7] dark:bg-neutral-700 rounded-lg">
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-1">You will get</p>
                  {inputMode === 'rupees' ? (
                    <p className="text-gray-900 dark:text-white">{grams.toFixed(4)} grams</p>
                  ) : (
                    <p className="text-gray-900 dark:text-white">₹{rupees.toFixed(2)}</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick Amount Buttons */}
            {inputMode === 'rupees' && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1000, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            )}

            {/* Storage Option */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <h3 className="text-black mb-4 dark:text-white">Storage Option</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedStorage('vault')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                    selectedStorage === 'vault'
                      ? 'border-[#3D3066] dark:border-[#8B7FA8] bg-[#F3F1F7] dark:bg-neutral-700'
                      : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedStorage === 'vault' 
                        ? 'border-[#3D3066] dark:border-[#8B7FA8]' 
                        : 'border-gray-300 dark:border-neutral-600'
                    }`}>
                      {selectedStorage === 'vault' && (
                        <div className="w-3 h-3 rounded-full bg-[#3D3066] dark:bg-[#8B7FA8]" />
                      )}
                    </div>
                    <p className="text-gray-900 dark:text-white">Store in Zold Vault</p>
                  </div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm ml-8">
                    Secure digital storage with AT Plus Jewellers
                  </p>
                </button>

                <button
                  onClick={() => setSelectedStorage('partner')}
                  className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                    selectedStorage === 'partner'
                      ? 'border-[#3D3066] dark:border-[#8B7FA8] bg-[#F3F1F7] dark:bg-neutral-700'
                      : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedStorage === 'partner' 
                        ? 'border-[#3D3066] dark:border-[#8B7FA8]' 
                        : 'border-gray-300 dark:border-neutral-600'
                    }`}>
                      {selectedStorage === 'partner' && (
                        <div className="w-3 h-3 rounded-full bg-[#3D3066] dark:bg-[#8B7FA8]" />
                      )}
                    </div>
                    <p className="text-gray-900 dark:text-white">Allocate to Partner Store</p>
                  </div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm ml-8">
                    For easy pickup or jewellery conversion later
                  </p>
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-900 dark:text-blue-300 mb-1">Purity: 24K / 999</p>
                  <p className="text-blue-800 dark:text-blue-400">GST and minimal charges applicable</p>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            {amount && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
                <h3 className="mb-4 dark:text-white">Price Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-neutral-400">Gold Value</span>
                    <span className="text-gray-900 dark:text-white">₹{rupees.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-neutral-400">GST ({gstRate}%)</span>
                    <span className="text-gray-900 dark:text-white">₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-neutral-700 pt-3 flex justify-between">
                    <span className="text-gray-900 dark:text-white">Total Amount</span>
                    <span className="text-gray-900 dark:text-white">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={() => setStep(selectedStorage === 'partner' ? 'partner' : 'payment')}
              disabled={!amount || parseFloat(amount) < 100}
              className="w-full bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-neutral-700"
            >
              Continue to {selectedStorage === 'partner' ? 'Partner Selection' : 'Payment'}
            </button>
          </div>
        )}

        {step === 'partner' && (
          <div>
            <h2 className="text-black mb-4 dark:text-white">Select Partner Store</h2>
            <div className="space-y-3 mb-6">
              {partners.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => setSelectedPartner(partner.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${
                    selectedPartner === partner.id
                      ? 'border-[#3D3066] dark:border-[#8B7FA8] bg-[#F3F1F7] dark:bg-neutral-700'
                      : 'border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPartner === partner.id 
                        ? 'border-[#3D3066] dark:border-[#8B7FA8]' 
                        : 'border-gray-300 dark:border-neutral-600'
                    }`}>
                      {selectedPartner === partner.id && (
                        <div className="w-3 h-3 rounded-full bg-[#3D3066] dark:bg-[#8B7FA8]" />
                      )}
                    </div>
                    <p className="text-gray-900 dark:text-white">{partner.name}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-neutral-500 text-sm ml-8">
                    <MapPin className="w-4 h-4" />
                    <span>{partner.area} • {partner.distance} km</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('amount')}
                className="flex-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('payment')}
                disabled={!selectedPartner}
                className="flex-1 bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-neutral-700"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div>
            {/* Order Summary */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <h3 className="text-black mb-4 dark:text-white">Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-neutral-400">Gold Amount</span>
                  <span className="text-gray-900 dark:text-white">{grams.toFixed(4)} grams</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-neutral-400">Rate</span>
                  <span className="text-gray-900 dark:text-white">₹{goldBuyPrice.toFixed(2)}/gm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-neutral-400">Storage</span>
                  <span className="text-gray-900 dark:text-white">
                    {selectedStorage === 'vault' ? 'Zold Vault' : 'Partner Store'}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-neutral-700 pt-3 flex justify-between">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <h3 className="text-black mb-4 dark:text-white">Select Payment Method</h3>
              <div className="space-y-3">
                {[
                  { id: 'upi', name: 'UPI', icon: CreditCard },
                  { id: 'netbanking', name: 'Net Banking', icon: CreditCard },
                  { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                      paymentMethod === method.id
                        ? 'border-[#3D3066] dark:border-[#8B7FA8] bg-[#F3F1F7] dark:bg-neutral-700'
                        : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id 
                          ? 'border-[#3D3066] dark:border-[#8B7FA8]' 
                          : 'border-gray-300 dark:border-neutral-600'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-3 h-3 rounded-full bg-[#3D3066] dark:bg-[#8B7FA8]" />
                        )}
                      </div>
                      <method.icon className="w-5 h-5 text-gray-600 dark:text-neutral-500" />
                      <span className="text-gray-900 dark:text-white">{method.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(selectedStorage === 'partner' ? 'partner' : 'amount')}
                className="flex-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('success')}
                className="flex-1 bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors"
              >
                Pay ₹{totalAmount.toFixed(2)}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-8 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-6 w-24 h-24 mx-auto mb-6 relative">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-500 absolute inset-0 m-auto" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#8B7FA8] animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              <h1 className="text-black mb-3 dark:text-white">Purchase Successful!</h1>
              <p className="text-gray-600 dark:text-neutral-400 mb-6">
                You have successfully purchased {grams.toFixed(4)} grams of gold
              </p>

              <div className="bg-[#F3F1F7] dark:bg-neutral-700 rounded-lg p-4 mb-6">
                <p className="text-gray-600 dark:text-neutral-400 text-sm mb-1">Your new gold balance</p>
                <p className="text-gray-900 dark:text-white">{(12.547 + grams).toFixed(4)} grams</p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={onClose}
                className="w-full bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors"
              >
                View Wallet
              </button>
              <button className="w-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                Convert to Jewellery
              </button>
              <button className="w-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                Set up SIP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}