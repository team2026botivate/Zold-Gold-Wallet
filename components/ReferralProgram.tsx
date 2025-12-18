import { useState } from 'react';
import { Gift, Copy, Share2, Users, Coins, CheckCircle, X, Twitter, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ReferralProgramProps {
  onClose: () => void;
}

export function ReferralProgram({ onClose }: ReferralProgramProps) {
  const [copied, setCopied] = useState(false);
  
  const referralCode = 'ZOLD-RAJ2024';
  const referralLink = `https://zold.app/ref/${referralCode}`;
  const totalReferrals = 8;
  const totalEarnings = 800; // ₹100 per referral
  const pendingReferrals = 3;

  const referralHistory = [
    { name: 'Priya Sharma', date: '2024-12-08', status: 'completed', earning: 100 },
    { name: 'Amit Kumar', date: '2024-12-06', status: 'completed', earning: 100 },
    { name: 'Sneha Patel', date: '2024-12-05', status: 'pending', earning: 0 },
    { name: 'Rahul Verma', date: '2024-12-03', status: 'completed', earning: 100 },
    { name: 'Kavita Singh', date: '2024-12-01', status: 'pending', earning: 0 },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Referral link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const message = `Join ZOLD - India's best digital gold platform! Use my code ${referralCode} and get ₹50 bonus. ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaTwitter = () => {
    const message = `Investing in digital gold made easy with @ZoldApp! Use my code ${referralCode} to get started. ${referralLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-end justify-center z-50">
      <style>{`.zold-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .zold-hide-scrollbar::-webkit-scrollbar{ display:none; }`}</style>
      <div className="bg-white dark:bg-neutral-800 w-full max-w-lg rounded-t-3xl max-h-[90vh] overflow-y-auto zold-hide-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-5 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-white">Referral Program</h2>
                <p className="text-white/80 text-sm">Earn ₹100 per referral</p>
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
          {/* Earnings Summary */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-[#3D3066] to-[#5C4E7F] dark:from-[#4D3F7F] dark:to-[#5C4E7F] rounded-xl p-4 text-white">
              <Users className="w-5 h-5 mb-2 text-white/80" />
              <p className="text-white/80 text-xs mb-1">Total Referrals</p>
              <p className="text-xl">{totalReferrals}</p>
            </div>
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] dark:from-[#B8860B] dark:to-[#D4AF37] rounded-xl p-4 text-white">
              <Coins className="w-5 h-5 mb-2 text-white/80" />
              <p className="text-white/80 text-xs mb-1">Total Earned</p>
              <p className="text-xl">₹{totalEarnings}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 dark:from-orange-500 dark:to-orange-600 rounded-xl p-4 text-white">
              <Gift className="w-5 h-5 mb-2 text-white/80" />
              <p className="text-white/80 text-xs mb-1">Pending</p>
              <p className="text-xl">{pendingReferrals}</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gray-50 dark:bg-neutral-700 rounded-xl p-5 mb-6">
            <h3 className="text-gray-900 dark:text-white mb-3">How it works</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#3D3066] dark:bg-[#4D3F7F] text-white rounded-full flex items-center justify-center text-sm">1</div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm">Share your unique referral code</p>
                  <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1">Send to friends via WhatsApp, Twitter, or any platform</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#3D3066] dark:bg-[#4D3F7F] text-white rounded-full flex items-center justify-center text-sm">2</div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm">Friend signs up & buys gold</p>
                  <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1">They get ₹50 bonus, you get ₹100 gold credit</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-[#3D3066] dark:bg-[#4D3F7F] text-white rounded-full flex items-center justify-center text-sm">3</div>
                <div>
                  <p className="text-gray-900 dark:text-white text-sm">Get rewarded instantly</p>
                  <p className="text-gray-500 dark:text-neutral-400 text-xs mt-1">Bonus added to your wallet automatically</p>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Code */}
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white mb-3">Your Referral Code</h3>
            <div className="bg-white dark:bg-neutral-800 border-2 border-dashed border-[#3D3066] dark:border-[#8B7FA8] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-gray-500 dark:text-neutral-400 text-xs mb-1">Your unique code</p>
                  <p className="text-[#3D3066] dark:text-[#8B7FA8] text-xl tracking-wider">{referralCode}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-[#3D3066] dark:bg-[#4D3F7F] text-white px-4 py-2 rounded-lg hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors flex items-center gap-2"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="pt-3 border-t border-gray-200 dark:border-neutral-700">
                <p className="text-gray-500 dark:text-neutral-400 text-xs mb-2">Share link</p>
                <p className="text-gray-700 dark:text-neutral-300 text-sm break-all">{referralLink}</p>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white mb-3">Share via</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={shareViaWhatsApp}
                className="bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={shareViaTwitter}
                className="bg-blue-400 text-white p-4 rounded-xl hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </button>
              <button
                onClick={copyToClipboard}
                className="bg-gray-700 dark:bg-neutral-700 text-white p-4 rounded-xl hover:bg-gray-800 dark:hover:bg-neutral-600 transition-colors flex items-center justify-center gap-2"
              >
                <Copy className="w-5 h-5" />
                <span>Copy Link</span>
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Join ZOLD',
                      text: `Use my code ${referralCode} to get ₹50 bonus!`,
                      url: referralLink,
                    });
                  }
                }}
                className="bg-[#3D3066] dark:bg-[#4D3F7F] text-white p-4 rounded-xl hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                <span>More</span>
              </button>
            </div>
          </div>

          {/* Referral History */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-3">Recent Referrals</h3>
            <div className="space-y-3">
              {referralHistory.map((referral, index) => (
                <div key={index} className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900 dark:text-white">{referral.name}</p>
                    {referral.status === 'completed' ? (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs px-2 py-1 rounded-full">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500 dark:text-neutral-400">{referral.date}</p>
                    {referral.status === 'completed' && (
                      <p className="text-green-600 dark:text-green-500">+₹{referral.earning}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
            <p className="text-yellow-800 dark:text-yellow-300 text-xs">
              <strong>Terms & Conditions:</strong> Referral bonus will be credited after the referred user completes their first gold purchase of minimum ₹500. Bonus expires after 90 days if not used.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}