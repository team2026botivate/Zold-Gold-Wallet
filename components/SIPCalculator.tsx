import { useState } from 'react';
import { Calculator, TrendingUp, Calendar, Coins, ArrowRight, X } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SIPCalculatorProps {
  onClose: () => void;
}

export function SIPCalculator({ onClose }: SIPCalculatorProps) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [duration, setDuration] = useState(12); // months
  const [expectedReturn, setExpectedReturn] = useState(12); // annual %

  // Calculate returns
  const totalInvestment = monthlyInvestment * duration;
  const monthlyRate = expectedReturn / 12 / 100;
  const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, duration) - 1) / monthlyRate) * (1 + monthlyRate));
  const estimatedReturns = futureValue - totalInvestment;
  const totalValue = totalInvestment + estimatedReturns;

  // Pie chart data
  const chartData = [
    { name: 'Investment', value: totalInvestment, color: '#8B7FA8' },
    { name: 'Returns', value: estimatedReturns, color: '#D4AF37' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-end justify-center z-50">
      <style>{`.zold-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .zold-hide-scrollbar::-webkit-scrollbar{ display:none; }`}</style>
      <div className="bg-white dark:bg-neutral-800 w-full max-w-lg rounded-t-3xl max-h-[90vh] overflow-y-auto zold-hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#3D3066] to-[#5C4E7F] dark:from-[#4D3F7F] dark:to-[#5C4E9F] px-6 py-5 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white">SIP Calculator</h2>
                <p className="text-white/80 text-sm">Plan your gold investment</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Input Controls */}
          <div className="space-y-6 mb-6">
            {/* Monthly Investment */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700 dark:text-neutral-300">Monthly Investment</label>
                <span className="text-[#3D3066] dark:text-[#8B7FA8]">₹{monthlyInvestment.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#3D3066] dark:accent-[#8B7FA8]"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-neutral-400 mt-1">
                <span>₹500</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700 dark:text-neutral-300">Duration</label>
                <span className="text-[#3D3066] dark:text-[#8B7FA8]">{duration} {duration === 1 ? 'month' : 'months'}</span>
              </div>
              <input
                type="range"
                min="3"
                max="120"
                step="3"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#3D3066] dark:accent-[#8B7FA8]"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-neutral-400 mt-1">
                <span>3 months</span>
                <span>10 years</span>
              </div>
            </div>

            {/* Expected Return */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-gray-700 dark:text-neutral-300">Expected Annual Return</label>
                <span className="text-[#3D3066] dark:text-[#8B7FA8]">{expectedReturn}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#3D3066] dark:accent-[#8B7FA8]"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-neutral-400 mt-1">
                <span>5%</span>
                <span>20%</span>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-gradient-to-br from-[#3D3066] to-[#5C4E7F] dark:from-[#4D3F7F] dark:to-[#5C4E9F] rounded-2xl p-6 mb-6">
            <p className="text-white/90 text-sm mb-4">Estimated Returns</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Total Investment</span>
                <span className="text-white">₹{totalInvestment.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">Est. Returns</span>
                <span className="text-green-300">+₹{Math.round(estimatedReturns).toLocaleString()}</span>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex items-center justify-between">
                <span className="text-white">Total Value</span>
                <span className="text-white">₹{Math.round(totalValue).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-gray-50 dark:bg-neutral-700 rounded-2xl p-6 mb-6">
            <h3 className="text-gray-900 dark:text-white mb-4">Investment Breakdown</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderColor: '#e5e7eb',
                      borderRadius: '0.5rem',
                      color: '#1f2937'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#8B7FA8]"></div>
                <span className="text-sm text-gray-600 dark:text-neutral-300">Investment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                <span className="text-sm text-gray-600 dark:text-neutral-300">Returns</span>
              </div>
            </div>
          </div>

          {/* Quick Preset Options */}
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white mb-3">Quick Presets</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setMonthlyInvestment(2000);
                  setDuration(12);
                }}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 hover:border-[#3D3066] dark:hover:border-[#8B7FA8] transition-colors text-left"
              >
                <p className="text-gray-900 dark:text-white text-sm">Starter Plan</p>
                <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1">₹2,000/mo • 1 year</p>
              </button>
              <button
                onClick={() => {
                  setMonthlyInvestment(5000);
                  setDuration(24);
                }}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 hover:border-[#3D3066] dark:hover:border-[#8B7FA8] transition-colors text-left"
              >
                <p className="text-gray-900 dark:text-white text-sm">Growth Plan</p>
                <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1">₹5,000/mo • 2 years</p>
              </button>
              <button
                onClick={() => {
                  setMonthlyInvestment(10000);
                  setDuration(36);
                }}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 hover:border-[#3D3066] dark:hover:border-[#8B7FA8] transition-colors text-left"
              >
                <p className="text-gray-900 dark:text-white text-sm">Premium Plan</p>
                <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1">₹10,000/mo • 3 years</p>
              </button>
              <button
                onClick={() => {
                  setMonthlyInvestment(20000);
                  setDuration(60);
                }}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-3 hover:border-[#3D3066] dark:hover:border-[#8B7FA8] transition-colors text-left"
              >
                <p className="text-gray-900 dark:text-white text-sm">Elite Plan</p>
                <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1">₹20,000/mo • 5 years</p>
              </button>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full bg-[#3D3066] dark:bg-[#4D3F7F] text-white py-4 rounded-xl hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors flex items-center justify-center gap-2">
            <span>Start SIP Investment</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-gray-500 dark:text-neutral-400 text-xs mt-4">
            *Returns are estimated based on historical gold price appreciation. Actual returns may vary.
          </p>
        </div>
      </div>
    </div>
  );
}