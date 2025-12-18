import { useState } from "react";
import {
  Gift,
  User,
  Coins,
  Heart,
  Calendar,
  Send,
  X,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

interface GiftGoldProps {
  onClose: () => void;
}

export function GiftGold({ onClose }: GiftGoldProps) {
  const [step, setStep] = useState<
    "amount" | "recipient" | "message" | "confirm"
  >("amount");
  const [giftAmount, setGiftAmount] = useState(1000);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [occasion, setOccasion] = useState("birthday");

  const goldPrice = 6245.5;
  const goldGrams = (giftAmount / goldPrice).toFixed(3);

  const occasions = [
    {
      id: "birthday",
      label: "🎂 Birthday",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "wedding",
      label: "💍 Wedding",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "anniversary",
      label: "❤️ Anniversary",
      color: "from-red-500 to-pink-500",
    },
    {
      id: "diwali",
      label: "🪔 Diwali",
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: "general",
      label: "🎁 General",
      color: "from-blue-500 to-purple-500",
    },
  ];

  const presetAmounts = [500, 1000, 2000, 5000, 10000];

  const handleSendGift = () => {
    toast.success("Gold gift sent successfully! 🎉");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 dark:bg-black/70">
      <style>{`.zold-hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } .zold-hide-scrollbar::-webkit-scrollbar{ display:none; }`}</style>
      <div className="zold-hide-scrollbar max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white dark:bg-neutral-800">
        {/* Header */}
        <div className="sticky top-0 rounded-t-3xl bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-white">Gift Gold</h2>
                <p className="text-sm text-white/80">
                  Send digital gold to loved ones
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Step Indicator */}
          <div className="mb-6 flex items-center justify-between">
            <div
              className={`flex items-center gap-2 ${step === "amount" ? "text-[#3D3066] dark:text-[#8B7FA8]" : "text-gray-400 dark:text-neutral-500"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "amount" ? "bg-[#3D3066] dark:bg-[#4D3F7F] text-white" : "bg-gray-200 dark:bg-neutral-700"}`}
              >
                1
              </div>
              <span className="text-sm">Amount</span>
            </div>
            <div className="mx-2 h-px flex-1 bg-gray-200 dark:bg-neutral-700"></div>
            <div
              className={`flex items-center gap-2 ${step === "recipient" ? "text-[#3D3066] dark:text-[#8B7FA8]" : "text-gray-400 dark:text-neutral-500"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "recipient" ? "bg-[#3D3066] dark:bg-[#4D3F7F] text-white" : "bg-gray-200 dark:bg-neutral-700"}`}
              >
                2
              </div>
              <span className="text-sm">Recipient</span>
            </div>
            <div className="mx-2 h-px flex-1 bg-gray-200 dark:bg-neutral-700"></div>
            <div
              className={`flex items-center gap-2 ${step === "message" || step === "confirm" ? "text-[#3D3066] dark:text-[#8B7FA8]" : "text-gray-400 dark:text-neutral-500"}`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${step === "message" || step === "confirm" ? "bg-[#3D3066] dark:bg-[#4D3F7F] text-white" : "bg-gray-200 dark:bg-neutral-700"}`}
              >
                3
              </div>
              <span className="text-sm">Message</span>
            </div>
          </div>

          {/* Step 1: Amount Selection */}
          {step === "amount" && (
            <div>
              {/* Select Occasion */}
              <div className="mb-6">
                <h3 className="mb-3 text-gray-900 dark:text-white">Select Occasion</h3>
                <div className="grid grid-cols-2 gap-3">
                  {occasions.map((occ) => (
                    <button
                      key={occ.id}
                      onClick={() => setOccasion(occ.id)}
                      className={`text-black rounded-xl border-2 p-4 transition-all ${
                        occasion === occ.id
                          ? "border-[#3D3066] dark:border-[#8B7FA8] bg-purple-50 dark:bg-neutral-700"
                          : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600"
                      }`}
                    >
                      <p className="text-sm dark:text-white">{occ.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift Amount */}
              <div className="mb-6">
                <h3 className="mb-3 text-gray-900 dark:text-white">Gift Amount</h3>
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#3D3066] to-[#5C4E7F] dark:from-[#4D3F7F] dark:to-[#5C4E7F] p-6 text-white">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-white/80">Amount</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={giftAmount}
                        onChange={(e) => setGiftAmount(Number(e.target.value))}
                        className="w-32 rounded-lg bg-white/20 px-3 py-1 text-right text-white outline-none"
                      />
                      <span>₹</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/80">Gold</span>
                    <span>{goldGrams} grams</span>
                  </div>
                </div>

                {/* Preset Amounts */}
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setGiftAmount(amount)}
                      className={`rounded-lg border-2 py-3 transition-all ${
                        giftAmount === amount
                          ? "border-[#3D3066] dark:border-[#8B7FA8] bg-purple-50 dark:bg-neutral-700 text-[#3D3066] dark:text-white"
                          : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-gray-300 dark:hover:border-neutral-600 text-gray-900 dark:text-white"
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep("recipient")}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D3066] dark:bg-[#4D3F7F] py-4 text-white transition-colors hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F]"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Step 2: Recipient Details */}
          {step === "recipient" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-4 text-gray-900 dark:text-white">Recipient Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-gray-700 dark:text-neutral-300">
                      Recipient Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Enter name"
                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 py-3 pl-11 pr-4 text-gray-800 dark:text-white focus:border-[#3D3066] dark:focus:border-[#8B7FA8] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-700 dark:text-neutral-300">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full rounded-xl border border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 px-4 py-3 text-gray-900 dark:text-white focus:border-[#3D3066] dark:focus:border-[#8B7FA8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    The recipient will receive an SMS with a link to claim their
                    gold gift. If they don't have a ZOLD account, they'll be
                    guided to create one.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("amount")}
                  className="flex-1 rounded-xl bg-gray-100 dark:bg-neutral-700 py-4 text-gray-700 dark:text-neutral-300 transition-colors hover:bg-gray-200 dark:hover:bg-neutral-600"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("message")}
                  disabled={!recipientName || !recipientPhone}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D3066] dark:bg-[#4D3F7F] py-4 text-white transition-colors hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>Next</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Message */}
          {step === "message" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-4 text-gray-900 dark:text-white">Add Personal Message</h3>

                <textarea
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder="Write your wishes... (optional)"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-300 dark:border-neutral-600 dark:bg-neutral-700 px-4 py-3 text-gray-900 dark:text-white focus:border-[#3D3066] dark:focus:border-[#8B7FA8] focus:outline-none"
                  maxLength={200}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                  {personalMessage.length}/200 characters
                </p>

                {/* Preview Card */}
                <div className="mt-6">
                  <h4 className="mb-3 text-sm text-gray-900 dark:text-white">Preview</h4>
                  <div
                    className={`bg-gradient-to-br ${occasions.find((o) => o.id === occasion)?.color} rounded-2xl p-6 text-white`}
                  >
                    <div className="mb-4 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Gift className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <h3 className="mb-2 text-center">
                      You've received a gold gift!
                    </h3>
                    <p className="mb-4 text-center text-sm text-white/90">
                      {recipientName || "Recipient"} gifted you {goldGrams}g of
                      24K gold (₹{giftAmount})
                    </p>
                    {personalMessage && (
                      <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                        <p className="text-sm text-white/90 italic">
                          "{personalMessage}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("recipient")}
                  className="flex-1 rounded-xl bg-gray-100 dark:bg-neutral-700 py-4 text-gray-700 dark:text-neutral-300 transition-colors hover:bg-gray-200 dark:hover:bg-neutral-600"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D3066] dark:bg-[#4D3F7F] py-4 text-white transition-colors hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F]"
                >
                  <span>Review</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirm" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-4 text-gray-900 dark:text-white">Confirm Gift Details</h3>

                <div className="mb-6 space-y-3">
                  <div className="rounded-xl bg-gray-50 dark:bg-neutral-700 p-4">
                    <p className="mb-1 text-sm text-gray-500 dark:text-neutral-400">Occasion</p>
                    <p className="text-gray-900 dark:text-white">
                      {occasions.find((o) => o.id === occasion)?.label}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 dark:bg-neutral-700 p-4">
                    <p className="mb-1 text-sm text-gray-500 dark:text-neutral-400">Recipient</p>
                    <p className="text-gray-900 dark:text-white">{recipientName}</p>
                    <p className="text-sm text-gray-600 dark:text-neutral-500">{recipientPhone}</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 dark:bg-neutral-700 p-4">
                    <p className="mb-1 text-sm text-gray-500 dark:text-neutral-400">Gift Amount</p>
                    <p className="text-gray-900 dark:text-white">
                      ₹{giftAmount} ({goldGrams}g gold)
                    </p>
                  </div>
                </div>

                <div className="mb-6 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 p-4">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    The gift amount will be debited from your wallet. The
                    recipient will receive an SMS with instructions to claim
                    their gift.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("message")}
                  className="flex-1 rounded-xl bg-gray-100 dark:bg-neutral-700 py-4 text-gray-700 dark:text-neutral-300 transition-colors hover:bg-gray-200 dark:hover:bg-neutral-600"
                >
                  Back
                </button>
                <button
                  onClick={handleSendGift}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D3066] dark:bg-[#4D3F7F] py-4 text-white transition-colors hover:bg-[#5C4E7F] dark:hover:bg-[#5C4E9F]"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Gift</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}