import { useState } from "react";
import { X, Calculator, TrendingUp, ChevronRight, Info, AlertCircle } from "lucide-react";

export function ApplyLoan({ isOpen, onClose, eligibleGold, maxLoanAmount, interestRate }: {
    isOpen: boolean;
    onClose: () => void;
    eligibleGold: number;
    maxLoanAmount: number;
    interestRate: number;
}) {
    const [selectedOption, setSelectedOption] = useState<"online" | "partner">("online");
    const [goldAmount, setGoldAmount] = useState<number>(5.0);
    const [tenure, setTenure] = useState<number>(6);

    if (!isOpen) return null;

    // Calculate loan details
    const goldPricePerGm = 6000; // Assuming 6000/gm
    const eligibleLoanAmount = Math.min(
        goldAmount * goldPricePerGm * 0.75,
        maxLoanAmount
    );
    const monthlyInterestRate = interestRate / 12 / 100;
    const emi = eligibleLoanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure) /
        (Math.pow(1 + monthlyInterestRate, tenure) - 1);
    const totalInterest = emi * tenure - eligibleLoanAmount;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-neutral-800 dark:text-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-neutral-700">
                    <div>
                        <h2 className="text-xl font-semibold text-black dark:text-white">
                            Apply for Gold Loan
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">
                            Get instant loan against your gold
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto p-6">
                    {/* Loan Options */}
                    <div className="mb-6">
                        <h3 className="mb-3 text-black dark:text-white">Select Loan Type</h3>
                        <div className="space-y-3">
                            {/* Online Loan Option */}
                            <button
                                onClick={() => setSelectedOption("online")}
                                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${selectedOption === "online"
                                        ? "border-[#3D3066] bg-[#F3F1F7] dark:border-[#8B7FA8] dark:bg-neutral-700"
                                        : "border-gray-200 hover:border-[#8B7FA8] dark:border-neutral-700"
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <TrendingUp className="h-5 w-5 text-[#3D3066] dark:text-[#8B7FA8]" />
                                            <span className="font-medium text-black dark:text-white">
                                                Online Loan
                                            </span>
                                        </div>
                                        <p className="mb-3 text-sm text-gray-600 dark:text-neutral-400">
                                            Instant approval and disbursement
                                        </p>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-neutral-400">
                                                    Max Amount
                                                </span>
                                                <span className="text-black dark:text-white">₹50,000</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-neutral-400">
                                                    Interest Rate
                                                </span>
                                                <span className="text-black dark:text-white">{interestRate}% p.a.</span>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedOption === "online" && (
                                        <div className="ml-2 h-5 w-5 rounded-full border-4 border-[#3D3066] dark:border-[#8B7FA8]" />
                                    )}
                                </div>
                            </button>

                            {/* Partner Store Option */}
                            <button
                                onClick={() => setSelectedOption("partner")}
                                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${selectedOption === "partner"
                                        ? "border-[#3D3066] bg-[#F3F1F7] dark:border-[#8B7FA8] dark:bg-neutral-700"
                                        : "border-gray-200 hover:border-[#8B7FA8] dark:border-neutral-700"
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                            <span className="font-medium text-black dark:text-white">
                                                Partner Store Loan
                                            </span>
                                        </div>
                                        <p className="mb-3 text-sm text-gray-600 dark:text-neutral-400">
                                            Higher amounts with partner assistance
                                        </p>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-neutral-400">
                                                    Max Amount
                                                </span>
                                                <span className="text-black dark:text-white">No Limit</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600 dark:text-neutral-400">
                                                    Interest Rate
                                                </span>
                                                <span className="text-black dark:text-white">{interestRate - 0.5}% p.a.</span>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedOption === "partner" && (
                                        <div className="ml-2 h-5 w-5 rounded-full border-4 border-[#3D3066] dark:border-[#8B7FA8]" />
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Loan Calculator */}
                    <div className="mb-6">
                        <h3 className="mb-3 text-black dark:text-white">Loan Calculator</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300">
                                    Gold to Pledge (grams)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={goldAmount}
                                        onChange={(e) => setGoldAmount(parseFloat(e.target.value) || 0)}
                                        step="0.1"
                                        min="0.1"
                                        max={eligibleGold}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black focus:ring-2 focus:ring-[#8B7FA8] focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:ring-[#8B7FA8]"
                                    />
                                    <div className="absolute right-3 top-3 text-sm text-gray-500 dark:text-neutral-400">
                                        gm
                                    </div>
                                </div>
                                <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                                    Max available: {eligibleGold} gm
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300">
                                    Loan Tenure
                                </label>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {[3, 6, 9, 12].map((months) => (
                                        <button
                                            key={months}
                                            onClick={() => setTenure(months)}
                                            className={`rounded-lg py-3 text-sm ${tenure === months
                                                    ? "bg-[#3D3066] text-white dark:bg-[#4D3F7F]"
                                                    : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                                                }`}
                                        >
                                            {months} months
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Loan Summary */}
                            <div className="rounded-xl bg-gradient-to-r from-[#F3F1F7] to-[#E5E1F0] p-5 dark:from-neutral-700 dark:to-neutral-800">
                                <h4 className="mb-3 text-black dark:text-white">Loan Summary</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-neutral-400">Gold Value</span>
                                        <span className="text-black dark:text-white">
                                            ₹{(goldAmount * goldPricePerGm).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-neutral-400">Loan Amount</span>
                                        <span className="text-lg font-semibold text-[#3D3066] dark:text-[#8B7FA8]">
                                            ₹{eligibleLoanAmount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-neutral-400">Monthly EMI</span>
                                        <span className="text-black dark:text-white">
                                            ₹{emi.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 dark:text-neutral-400">Total Interest</span>
                                        <span className="text-black dark:text-white">
                                            ₹{totalInterest.toFixed(0)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-300 pt-3 dark:border-neutral-600">
                                        <span className="font-medium text-gray-700 dark:text-neutral-300">
                                            Total Payment
                                        </span>
                                        <span className="font-semibold text-black dark:text-white">
                                            ₹{(eligibleLoanAmount + totalInterest).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                        <div className="flex items-start gap-3">
                            <Info className="mt-0.5 h-5 w-5 text-blue-600 dark:text-blue-400" />
                            <div className="text-sm">
                                <p className="mb-1 font-medium text-blue-900 dark:text-blue-300">
                                    Important Information
                                </p>
                                <ul className="space-y-1 text-blue-800 dark:text-blue-300">
                                    <li>• Gold valuation is based on current market rates</li>
                                    <li>• 75% of gold value is provided as loan</li>
                                    <li>• Gold is stored in secure vaults with insurance</li>
                                    <li>• Early repayment options available</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-6 dark:border-neutral-700">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-gray-300 py-3 text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-600 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // Handle loan application submission
                                alert(`Loan application submitted for ₹${eligibleLoanAmount.toLocaleString()}`);
                                onClose();
                            }}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#3D3066] to-[#5C4E7F] py-3 text-white transition-all hover:from-[#5C4E7F] hover:to-[#8B7FA8] dark:from-[#4D3F7F] dark:to-[#5C4E9F] dark:hover:from-[#5C4E9F] dark:hover:to-[#8B7FA8]"
                        >
                            Submit Application
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                    <p className="mt-3 text-center text-xs text-gray-500 dark:text-neutral-500">
                        By proceeding, you agree to our terms and conditions
                    </p>
                </div>
            </div>
        </div>
    );
}