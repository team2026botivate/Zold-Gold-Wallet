import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ZoldLogo } from "@/components/ZoldLogo";

interface LoginScreenProps {
  onComplete: (userData: any) => void;
}

export function LoginScreen({ onComplete }: LoginScreenProps) {
  const [step, setStep] = useState<"phone" | "otp" | "details">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showReferral, setShowReferral] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep("otp");
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setStep("details");
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && city) {
      onComplete({ phone, name, email, city, referralCode });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#3D3066] via-[#5C4E7F] to-[#8B7FA8] p-6">
      {/* Logo */}
      <div className="mb-8">
        <ZoldLogo variant="full" size="lg" theme="light" />
      </div>

      {/* Form Card */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {step === "phone" && (
          <form onSubmit={handlePhoneSubmit}>
            <h2 className="mb-2 text-black dark:text-black">Welcome</h2>
            <p className="mb-6 text-gray-600">
              Enter your phone number to continue
            </p>

            <div className="mb-4">
              <label className="mb-2 block text-gray-700">Phone Number</label>
              <div className="flex gap-2">
                <div className="rounded-lg bg-gray-100 px-4 py-3 text-black">
                  +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                  placeholder="Enter 10 digit number"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-black focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
                  maxLength={10}
                />
              </div>
            </div>

            {showReferral && (
              <div className="mb-4">
                <label className="mb-2 block text-gray-700">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) =>
                    setReferralCode(e.target.value.toUpperCase())
                  }
                  placeholder="Enter code"
                  className="text-gray-800 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
                />
              </div>
            )}

            {!showReferral && (
              <button
                type="button"
                onClick={() => setShowReferral(true)}
                className="mb-6 text-sm text-[#3D3066] hover:underline"
              >
                Have a referral code?
              </button>
            )}

            <button
              type="submit"
              disabled={phone.length !== 10}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3D3066] py-3 text-white transition-colors hover:bg-[#5C4E7F] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Get OTP
              <ChevronRight className="h-5 w-5" />
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOTPSubmit}>
            <h2 className="mb-2 text-black">Verify OTP</h2>
            <p className="mb-6 text-gray-600">
              Enter the 6-digit code sent to +91 {phone}
            </p>

            <div className="mb-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="Enter OTP"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center tracking-widest text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
                maxLength={6}
              />
            </div>

            <button
              type="button"
              onClick={() => setStep("phone")}
              className="mb-6 text-sm text-gray-600 hover:underline"
            >
              Change phone number
            </button>

            <button
              type="submit"
              disabled={otp.length !== 6}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3D3066] py-3 text-white transition-colors hover:bg-[#5C4E7F] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Verify
              <ChevronRight className="h-5 w-5" />
            </button>
          </form>
        )}

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit}>
            <h2 className="mb-2 text-black">Complete Your Profile</h2>
            <p className="mb-6 text-gray-600">Tell us a bit about yourself</p>

            <div className="mb-4">
              <label className="mb-2 block text-gray-700">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-gray-700">
                Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-gray-700">City *</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!name || !city}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#3D3066] py-3 text-white transition-colors hover:bg-[#5C4E7F] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Continue
              <ChevronRight className="h-5 w-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
