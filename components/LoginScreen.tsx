import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginScreenProps {
  onComplete: (userData: any, isSignup: boolean) => void;
}

export function LoginScreen({ onComplete }: LoginScreenProps) {
  // Steps: 'login' (Username/Pass), 'signup_form' (Initial Details), 'signup_otp' (Verify), 'signup_details' (Profile - City/Email)
  const [step, setStep] = useState<"login" | "signup_form" | "signup_otp" | "signup_details">("login");

  // Login State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Sign Up State
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showReferral, setShowReferral] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // Simulate login
      onComplete({ name: "User", phone: "9876543210", email: username, city: "Demo City" }, false); // Mock data
    }
  };

  const handleSignupFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupName && signupUsername && signupPassword && signupPhone.length === 10) {
      const captchaValue = recaptchaRef.current?.getValue();
      if (!captchaValue) {
        alert("Please complete the CAPTCHA");
        return;
      }
      setStep("signup_otp");
    }
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setStep("signup_details");
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city) {
      onComplete({
        phone: signupPhone,
        name: signupName,
        email,
        city,
        referralCode,
        username: signupUsername
      }, true);
    }
  };

  const handleResendOTP = () => {
    alert("OTP Resent!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#3D3066] via-[#5C4E7F] to-[#8B7FA8] p-3 sm:p-4 md:p-6 lg:p-8">
      {/* Form Card */}
      <div className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg rounded-2xl bg-white p-4 xs:p-5 sm:p-6 md:p-8 shadow-xl mx-2 xs:mx-3 sm:mx-4">
        {/* Logo/Image Container */}
        <div className="mb-4 sm:mb-6 md:mb-8 flex items-center justify-center">
          <img
            src="01.jpg"
            alt="Zold Logo"
            className="h-16 xs:h-20 sm:h-24 md:h-28 lg:h-32 w-auto rounded-2xl object-cover"
          />
        </div>

        {/* LOGIN SCREEN: Username & Password */}
        {step === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <p className="mb-4 sm:mb-6 text-gray-600 text-center font-bold text-base xs:text-lg sm:text-xl">
              Login to continue
            </p>

            <div className="mb-3 xs:mb-4">
              <label className="mb-1 xs:mb-2 block text-xs xs:text-sm sm:text-base text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <div className="mb-4 xs:mb-5 sm:mb-6">
              <label className="mb-1 xs:mb-2 block text-xs xs:text-sm sm:text-base text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!username || !password}
              className="flex w-full items-center justify-center gap-1 xs:gap-2 rounded-lg bg-[#3D3066] py-2.5 xs:py-3 sm:py-3.5 text-sm xs:text-base text-white transition-colors hover:bg-[#5C4E7F] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Login
              <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5" />
            </button>

            <div className="mt-4 xs:mt-5 sm:mt-6 text-center">
              <p className="text-xs xs:text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setStep("signup_form")}
                  className="font-medium text-[#3D3066] hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        )}

        {/* SIGN UP FORM: Name, Username, Pass, Mobile */}
        {step === "signup_form" && (
          <form onSubmit={handleSignupFormSubmit}>
            <h2 className="mb-4 sm:mb-6 text-black text-center text-lg xs:text-xl sm:text-2xl font-semibold">Create Account</h2>

            <div className="mb-3">
              <label className="mb-1 block text-xs xs:text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="Enter full name"
                className="w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 text-sm xs:text-base text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-xs xs:text-sm font-medium text-gray-700">Username *</label>
              <input
                type="text"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 text-sm xs:text-base text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-xs xs:text-sm font-medium text-gray-700">Password *</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 text-sm xs:text-base text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-xs xs:text-sm font-medium text-gray-700">Phone Number *</label>
              <div className="flex gap-2">
                <div className="rounded-lg bg-gray-100 px-3 xs:px-4 py-3 text-black flex items-center text-sm xs:text-base">
                  +91
                </div>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value.slice(0, 10))}
                  placeholder="10 digit number"
                  className="flex-1 rounded-lg border border-gray-300 px-3 xs:px-4 py-3 text-sm xs:text-base text-black focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="mb-4 flex justify-center">
              <ReCAPTCHA
                sitekey="6LcAbjcsAAAAAC_p892D_-ciL3LUT3WIbIBokTge"
                ref={recaptchaRef}
              />
            </div>



            {showReferral && (
              <div className="mb-4">
                <label className="mb-1 block text-xs xs:text-sm font-medium text-gray-700">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="text-gray-800 w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 text-sm xs:text-base focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
                />
              </div>
            )}

            {!showReferral && (
              <button
                type="button"
                onClick={() => setShowReferral(true)}
                className="mb-4 sm:mb-6 text-xs xs:text-sm text-[#3D3066] hover:underline"
              >
                Have a referral code?
              </button>
            )}

            <button
              type="submit"
              disabled={!signupName || !signupUsername || !signupPassword || signupPhone.length !== 10}
              className="flex w-full items-center justify-center gap-1 xs:gap-2 rounded-lg bg-[#3D3066] py-2.5 xs:py-3 sm:py-3.5 text-sm xs:text-base text-white transition-colors hover:bg-[#5C4E7F] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Get OTP
              <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5" />
            </button>

            <div className="mt-4 xs:mt-5 text-center">
              <button
                type="button"
                onClick={() => setStep("login")}
                className="text-xs xs:text-sm text-gray-600 hover:underline"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

        {/* SIGN UP: OTP */}
        {step === "signup_otp" && (
          <form onSubmit={handleOTPSubmit}>
            <h2 className="mb-2 text-black text-lg xs:text-xl sm:text-2xl font-semibold text-center">Verify OTP</h2>
            <p className="mb-4 sm:mb-6 text-gray-600 text-xs xs:text-sm sm:text-base text-center">
              Enter the 6-digit code sent to<br />+91 {signupPhone}
            </p>

            <div className="mb-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="Enter OTP"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center tracking-widest text-gray-800 text-base xs:text-lg sm:text-xl focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
                maxLength={6}
              />
            </div>

            <div className="mb-4 sm:mb-6 flex flex-col xs:flex-row items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setStep("signup_form")}
                className="text-xs xs:text-sm text-gray-600 hover:underline"
              >
                Change details
              </button>
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-xs xs:text-sm font-medium text-[#3D3066] hover:underline"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="submit"
              disabled={otp.length !== 6}
              className="flex w-full items-center justify-center gap-1 xs:gap-2 rounded-lg bg-[#3D3066] py-2.5 xs:py-3 sm:py-3.5 text-sm xs:text-base text-white transition-colors hover:bg-[#5C4E7F] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Verify
              <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5" />
            </button>
          </form>
        )}

        {/* SIGN UP: Details */}
        {step === "signup_details" && (
          <form onSubmit={handleDetailsSubmit}>
            <h2 className="mb-2 text-black text-lg xs:text-xl sm:text-2xl font-semibold text-center">Complete Your Profile</h2>
            <p className="mb-4 sm:mb-6 text-gray-600 text-xs xs:text-sm sm:text-base text-center">Tell us a bit about yourself</p>

            {/* Name already collected */}
            <div className="mb-4">
              <p className="text-gray-700 text-center text-sm xs:text-base">
                Welcome, <span className="font-semibold">{signupName}</span>!
              </p>
            </div>

            <div className="mb-4">
              <label className="mb-1 xs:mb-2 block text-gray-700 text-xs xs:text-sm sm:text-base">
                Email (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="mb-1 xs:mb-2 block text-gray-700 text-xs xs:text-sm sm:text-base">City *</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter your city"
                className="w-full rounded-lg border border-gray-300 px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 text-sm xs:text-base text-gray-800 focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!city}
              className="flex w-full items-center justify-center gap-1 xs:gap-2 rounded-lg bg-[#3D3066] py-2.5 xs:py-3 sm:py-3.5 text-sm xs:text-base text-white transition-colors hover:bg-[#5C4E7F] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Continue
              <ChevronRight className="h-4 w-4 xs:h-5 xs:w-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}