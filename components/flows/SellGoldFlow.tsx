"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Coins, MapPin, CreditCard, CheckCircle, Info, Sparkles, AlertCircle, TrendingDown, Wallet, Shield } from 'lucide-react';

interface SellGoldFlowProps {
  onClose: () => void;
}

type Step = 'amount' | 'storage' | 'payment' | 'payment-gateway' | 'success';

export function SellGoldFlow({ onClose }: SellGoldFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('amount');
  const [inputMode, setInputMode] = useState<'rupees' | 'grams'>('grams');
  const [amount, setAmount] = useState('');
  const [selectedStorage, setSelectedStorage] = useState<'vault' | 'partner'>('vault');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank');
  const [isProceedChecked, setIsProceedChecked] = useState(false);

  const goldSellPrice = 6180.75; // Typically lower than buy price
  const goldBuyPrice = 6245.50; // For reference
  const priceDifference = goldBuyPrice - goldSellPrice;
  const spreadPercentage = ((priceDifference / goldBuyPrice) * 100).toFixed(2);
  const tdsRate = 0.75; // 0.75% TDS on sale over ₹50,000
  const shippingFee = 150; // For partner delivery

  const userGoldBalance = 12.547; // User's current gold balance in grams

  const calculateRupees = (grams: number) => {
    return grams * goldSellPrice;
  };

  const calculateGrams = (rupees: number) => {
    return rupees / goldSellPrice;
  };

  const inputValue = parseFloat(amount) || 0;
  const grams = inputMode === 'rupees' ? calculateGrams(inputValue) : inputValue;
  const rupees = inputMode === 'grams' ? calculateRupees(inputValue) : inputValue;

  // Calculate TDS (applicable only if sale amount > ₹50,000)
  const tdsApplicable = rupees > 50000;
  const tdsAmount = tdsApplicable ? rupees * (tdsRate / 100) : 0;

  // Shipping fee only if selling from partner store
  const shippingCharge = selectedStorage === 'partner' ? shippingFee : 0;

  const totalDeductions = tdsAmount + shippingCharge;
  const netAmount = rupees - totalDeductions;

  const storageOptions = [
    {
      id: 'vault',
      name: 'Zold Vault',
      description: 'Instant settlement to your bank account',
      processingTime: '2-4 hours',
      icon: Shield
    }
  ];

  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer', icon: CreditCard, description: 'Direct to your bank account' },
    { id: 'upi', name: 'UPI', icon: CreditCard, description: 'Instant settlement' },
    { id: 'credit', name: 'Store Credit', icon: Wallet, description: 'Use for future purchases' },
  ];

  // Check if user has enough gold
  const hasInsufficientGold = grams > userGoldBalance;
  const isValidAmount = parseFloat(amount) > 0 && grams <= userGoldBalance && grams >= 0.1;

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
            <h2 className="text-white">Sell Gold</h2>
          </div>
          <div className="bg-white/20 dark:bg-white/10 rounded-full px-3 py-1">
            <span className="text-white text-sm">
              Step {step === 'amount' ? 1 : step === 'storage' ? 2 : step === 'payment' ? 3 : 4} of 4
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6 pb-24">
        {step === 'amount' && (
          <div>
            {/* Gold Price Comparison */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-2">Sell Price (24K)</p>
                  <p className="text-gray-900 dark:text-white text-lg">₹{goldSellPrice.toFixed(2)}/gram</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-2">Buy Price</p>
                  <p className="text-gray-900 dark:text-white text-lg">₹{goldBuyPrice.toFixed(2)}/gram</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-neutral-700">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-red-600 dark:text-red-400 text-sm">
                    Spread: ₹{priceDifference.toFixed(2)} ({spreadPercentage}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Your Gold Balance */}
            <div className="bg-gradient-to-r from-[#3D3066] to-[#5C4E7F] rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Your Gold Balance</p>
                  <p className="text-white text-lg">{userGoldBalance.toFixed(4)} grams</p>
                </div>
                <div className="bg-white/20 rounded-full p-3">
                  <Coins className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Input Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => {
                  setInputMode('grams');
                  setAmount('');
                }}
                className={`flex-1 py-3 rounded-lg transition-colors ${inputMode === 'grams'
                  ? 'bg-[#3D3066] dark:bg-[#4D3F7F] text-white'
                  : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border border-gray-300 dark:border-neutral-700'
                  }`}
              >
                Sell in Grams
              </button>
              <button
                onClick={() => {
                  setInputMode('rupees');
                  setAmount('');
                }}
                className={`flex-1 py-3 rounded-lg transition-colors ${inputMode === 'rupees'
                  ? 'bg-[#3D3066] dark:bg-[#4D3F7F] text-white'
                  : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-neutral-300 border border-gray-300 dark:border-neutral-700'
                  }`}
              >
                Sell in ₹
              </button>
            </div>

            {/* Amount Input */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <label className="block text-gray-700 dark:text-neutral-300 mb-3">
                {inputMode === 'grams' ? 'Enter Weight to Sell (grams)' : 'Enter Amount (₹)'}
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={inputMode === 'grams' ? '1.0' : '1000'}
                step={inputMode === 'grams' ? '0.1' : '100'}
                min="0"
                className="text-gray-800 w-full px-4 py-4 border-2 border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8] focus:border-transparent"
              />

              {/* Validation Messages */}
              {amount && hasInsufficientGold && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                  Insufficient gold balance. You have only {userGoldBalance.toFixed(4)} grams.
                </p>
              )}
              {amount && parseFloat(amount) < (inputMode === 'grams' ? 0.1 : 100) && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-2">
                  Minimum {inputMode === 'grams' ? '0.1 grams' : '₹100'} required
                </p>
              )}
              {amount && !hasInsufficientGold && parseFloat(amount) >= (inputMode === 'grams' ? 0.1 : 100) && (
                <p className="text-green-600 dark:text-green-400 text-sm mt-2">
                  Available: {userGoldBalance.toFixed(4)} grams
                </p>
              )}

              {amount && isValidAmount && (
                <div className="mt-4 p-4 bg-[#F3F1F7] dark:bg-neutral-700 rounded-lg">
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-1">You will receive</p>
                  {inputMode === 'grams' ? (
                    <p className="text-gray-900 dark:text-white">₹{rupees.toFixed(2)}</p>
                  ) : (
                    <p className="text-gray-900 dark:text-white">{grams.toFixed(4)} grams</p>
                  )}
                </div>
              )}
            </div>

            {/* Quick Amount Buttons */}
            {inputMode === 'grams' && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[0.5, 1.0, 5.0].map((gms) => (
                  <button
                    key={gms}
                    onClick={() => setAmount(gms.toString())}
                    className="bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                    disabled={gms > userGoldBalance}
                  >
                    {gms}g
                  </button>
                ))}
              </div>
            )}

            {/* Price Breakdown */}
            {amount && isValidAmount && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
                <h3 className="text-black mb-4 dark:text-white">Estimated Proceeds</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-neutral-400">Gold Value ({grams.toFixed(4)}g)</span>
                    <span className="text-gray-900 dark:text-white">₹{rupees.toFixed(2)}</span>
                  </div>

                  {tdsApplicable && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-neutral-400">TDS ({tdsRate}%)</span>
                      <span className="text-red-600 dark:text-red-400">- ₹{tdsAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {selectedStorage === 'partner' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-neutral-400">Shipping/Verification</span>
                      <span className="text-red-600 dark:text-red-400">- ₹{shippingCharge.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 dark:border-neutral-700 pt-3 flex justify-between">
                    <span className="text-gray-900 dark:text-white font-medium">Net Amount</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">₹{netAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Important Information */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-yellow-900 dark:text-yellow-300 mb-1">Important Notes</p>
                  <ul className="space-y-1 text-yellow-800 dark:text-yellow-400">
                    <li>• TDS @{tdsRate}% applicable on sales above ₹50,000</li>
                    <li>• Final amount subject to purity verification</li>
                    <li>• Processing time varies by settlement method</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => setStep('storage')}
              disabled={!isValidAmount}
              className="w-full bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-neutral-700"
            >
              Continue to Settlement
            </button>
          </div>
        )}

        {step === 'storage' && (
          <div>
            <h2 className="text-black mb-4 dark:text-white">Choose Settlement Method</h2>

            {/* Storage Options */}
            <div className="space-y-3 mb-6">
              {storageOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedStorage(option.id as 'vault' | 'partner')}
                    className={`w-full p-4 rounded-xl border-2 transition-colors text-left ${selectedStorage === option.id
                      ? 'border-[#3D3066] dark:border-[#8B7FA8] bg-[#F3F1F7] dark:bg-neutral-700'
                      : 'border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600'
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedStorage === option.id
                        ? 'border-[#3D3066] dark:border-[#8B7FA8]'
                        : 'border-gray-300 dark:border-neutral-600'
                        }`}>
                        {selectedStorage === option.id && (
                          <div className="w-3 h-3 rounded-full bg-[#3D3066] dark:bg-[#8B7FA8]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-gray-900 dark:text-white">{option.name}</p>
                          <span className="text-sm text-gray-500 dark:text-neutral-400">
                            {option.processingTime}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1">
                          {option.description}
                        </p>
                      </div>
                      <Icon className="w-5 h-5 text-gray-600 dark:text-neutral-500" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Option Details */}
            <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 mb-6">
              <h4 className="text-gray-900 dark:text-white mb-2">
                {selectedStorage === 'vault' ? 'Digital Vault Settlement' : 'Partner Store Collection'}
              </h4>
              <p className="text-gray-600 dark:text-neutral-400 text-sm">
                {selectedStorage === 'vault'
                  ? 'Your gold will be verified digitally and amount will be settled to your chosen payment method.'
                  : 'You will receive an appointment to visit the selected partner store for physical verification and collection.'
                }
              </p>
            </div>

            {/* Proceed Confirmation */}
            {selectedStorage === 'vault' && (
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-4 mb-6 border border-gray-200 dark:border-neutral-700">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="proceedConfirm"
                    checked={isProceedChecked}
                    onChange={(e) => setIsProceedChecked(e.target.checked)}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="proceedConfirm" className="text-gray-900 dark:text-white">
                      I understand that by proceeding, I am selling {grams.toFixed(4)} grams of gold
                    </label>
                    <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1">
                      This action is irreversible. Your gold will be deducted from your vault balance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('amount')}
                className="flex-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('payment')}
                disabled={selectedStorage === 'vault' && !isProceedChecked}
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
              <h3 className="text-black mb-4 dark:text-white">Sell Order Summary</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-neutral-400">Gold Selling</span>
                  <span className="text-gray-900 dark:text-white">{grams.toFixed(4)} grams</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-neutral-400">Sell Rate</span>
                  <span className="text-gray-900 dark:text-white">₹{goldSellPrice.toFixed(2)}/gm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-neutral-400">Settlement Method</span>
                  <span className="text-gray-900 dark:text-white">
                    {selectedStorage === 'vault' ? 'Digital Vault' : 'Partner Store'}
                  </span>
                </div>
                {tdsApplicable && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-neutral-400">TDS Deduction</span>
                    <span className="text-red-600 dark:text-red-400">- ₹{tdsAmount.toFixed(2)}</span>
                  </div>
                )}
                {shippingCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-neutral-400">Shipping Fee</span>
                    <span className="text-red-600 dark:text-red-400">- ₹{shippingCharge.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 dark:border-neutral-700 pt-3 flex justify-between">
                  <span className="text-gray-900 dark:text-white font-medium">Net Amount</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">₹{netAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
              <h3 className="text-black mb-4 dark:text-white">Receive Payment Via</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${selectedPaymentMethod === method.id
                        ? 'border-[#3D3066] dark:border-[#8B7FA8] bg-[#F3F1F7] dark:bg-neutral-700'
                        : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === method.id
                            ? 'border-[#3D3066] dark:border-[#8B7FA8]'
                            : 'border-gray-300 dark:border-neutral-600'
                            }`}>
                            {selectedPaymentMethod === method.id && (
                              <div className="w-3 h-3 rounded-full bg-[#3D3066] dark:bg-[#8B7FA8]" />
                            )}
                          </div>
                          <Icon className="w-5 h-5 text-gray-600 dark:text-neutral-500" />
                          <div>
                            <span className="text-gray-900 dark:text-white">{method.name}</span>
                            <p className="text-gray-600 dark:text-neutral-400 text-sm">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        {method.id === 'bank' && selectedPaymentMethod === method.id && (
                          <div className="text-sm text-gray-500 dark:text-neutral-400">
                            •••• 4321
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Final Confirmation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-900 dark:text-blue-300 mb-1">
                    {selectedStorage === 'vault'
                      ? 'Settlement will be initiated immediately after verification'
                      : 'Visit partner store within 7 days with your appointment details'
                    }
                  </p>
                  <p className="text-blue-800 dark:text-blue-400">
                    You will receive confirmation via SMS & email
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('storage')}
                className="flex-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('payment-gateway')}
                className="flex-1 bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors"
              >
                Confirm Sell Order
              </button>
            </div>
          </div>
        )}

        {step === 'payment-gateway' && (
          <div>
            <h2 className="text-black mb-4 dark:text-white">
              {selectedPaymentMethod === 'upi' ? 'Enter UPI ID' :
                selectedPaymentMethod === 'bank' ? 'Enter Bank Details' :
                  'Confirm Store Credit'}
            </h2>

            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 mb-6 shadow-lg dark:shadow-neutral-900/50">
              {selectedPaymentMethod === 'upi' && (
                <div>
                  <label className="block text-gray-700 dark:text-neutral-300 mb-3">UPI ID</label>
                  <input
                    type="text"
                    placeholder="example@upi"
                    className="text-black w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                  />
                  <p className="text-sm text-gray-500 mt-2">Enter your Virtual Payment Address (VPA)</p>
                </div>
              )}

              {selectedPaymentMethod === 'bank' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 dark:text-neutral-300 mb-2">Account Holder's Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      required
                      className="text-black w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-neutral-300 mb-2">Bank Account Number <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter Account Number"
                      required
                      className="text-black w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-neutral-300 mb-2">Account Type</label>
                    <select className="text-black w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]">
                      <option value="savings">Savings</option>
                      <option value="current">Current</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-neutral-300 mb-2">IFSC Code <span className='text-red-500'>*</span></label>
                    <input
                      type="text"
                      placeholder="Enter IFSC Code"
                      required
                      className="text-black w-full px-4 py-3 border-2 border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7FA8]"
                    />
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'credit' && (
                <div className="text-center py-4">
                  <Wallet className="w-12 h-12 text-[#8B7FA8] mx-auto mb-3" />
                  <p className="text-gray-900 dark:text-white font-medium">Store Credit</p>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mt-1">
                    Amount will be added to your Zold Wallet instantly
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('payment')}
                className="flex-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('success')}
                className="flex-1 bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors"
              >
                Confirm Sell Order
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

              <h1 className="text-black mb-3 dark:text-white">Sell Order Confirmed!</h1>
              <p className="text-gray-600 dark:text-neutral-400 mb-6">
                You have successfully placed a sell order for {grams.toFixed(4)} grams of gold
              </p>

              <div className="space-y-4">
                <div className="bg-[#F3F1F7] dark:bg-neutral-700 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-1">Estimated Settlement</p>
                  <p className="text-gray-900 dark:text-white">₹{netAmount.toFixed(2)}</p>
                  <p className="text-gray-500 dark:text-neutral-500 text-xs mt-1">
                    {selectedStorage === 'vault'
                      ? 'Within 4 hours to your bank account'
                      : 'Upon verification at partner store'
                    }
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-neutral-400 text-sm mb-1">Your updated gold balance</p>
                  <p className="text-gray-900 dark:text-white">{(userGoldBalance - grams).toFixed(4)} grams</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  onClose();
                  router.push('/wallet');
                }}
                className="w-full bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors"
              >
                View Wallet
              </button>
              <button className="w-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                Download Receipt
              </button>
              <button className="w-full bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                Buy More Gold
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}