import { useEffect, useState } from "react";
import {
  Coins,
  TrendingUp,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  ShoppingBag,
  Truck,
  Repeat,
  Calendar,
  Filter,
  Search,
  X,
  ChevronDown,
  Target,
  ChevronRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { ZoldLogoHorizontal } from "@/components/ZoldLogo";
import { WalletTabSkeleton } from "../skeletons/WalletTabSkeleton";

interface WalletTabProps {
  isLoading?: boolean;
  onOpenManageSIP?: () => void;
  onBack?: () => void;
}



export function WalletTab({ onOpenManageSIP, onBack }: WalletTabProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showGraph, setShowGraph] = useState(true);
  const [graphPeriod, setGraphPeriod] = useState("1M");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isInternalLoading, setIsInternalLoading] = useState(true);

  const totalGold = 12.547;
  const currentValue = 77845;
  const avgBuyPrice = 6150.3;
  const profitLoss = 1194;
  const profitLossPercent = 1.56;
  const freeGold = 10.547;
  const pledgedGold = 2.0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInternalLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (isInternalLoading) {
    return <WalletTabSkeleton />;
  }

  const transactions = [
    {
      id: 1,
      type: "buy",
      title: "Bought Gold",
      date: "2025-12-05",
      time: "14:30",
      grams: 2.5,
      amount: 15614,
      status: "completed",
    },
    {
      id: 2,
      type: "sell",
      title: "Sold Gold",
      date: "2025-12-03",
      time: "11:20",
      grams: 0.5,
      amount: 3099,
      status: "completed",
    },
    {
      id: 3,
      type: "jewellery",
      title: "Jewellery Conversion",
      date: "2025-12-01",
      time: "16:45",
      grams: 5.0,
      amount: 30750,
      status: "completed",
    },
    {
      id: 4,
      type: "loan",
      title: "Loan Against Gold",
      date: "2025-11-28",
      time: "10:15",
      grams: 2.0,
      amount: 9000,
      status: "active",
    },
    {
      id: 5,
      type: "buy",
      title: "SIP Purchase",
      date: "2025-11-25",
      time: "09:00",
      grams: 0.8,
      amount: 5000,
      status: "completed",
    },
    {
      id: 6,
      type: "deposit",
      title: "Physical Gold Deposit",
      date: "2025-11-20",
      time: "15:30",
      grams: 10.0,
      amount: 61500,
      status: "completed",
    },
    {
      id: 7,
      type: "buy",
      title: "Bought Gold",
      date: "2025-11-15",
      time: "12:00",
      grams: 1.5,
      amount: 9200,
      status: "completed",
    },
    {
      id: 8,
      type: "gift",
      title: "Gift Gold Received",
      date: "2025-11-10",
      time: "18:00",
      grams: 0.5,
      amount: 3000,
      status: "completed",
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "buy":
        return (
          <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-500" />
        );
      case "sell":
        return (
          <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-500" />
        );
      case "jewellery":
        return (
          <ShoppingBag className="h-5 w-5 text-purple-600 dark:text-purple-500" />
        );
      case "loan":
        return <Repeat className="h-5 w-5 text-blue-600 dark:text-blue-500" />;
      case "deposit":
        return <Coins className="h-5 w-5 text-[#8B7FA8] dark:text-[#8B7FA8]" />;
      case "delivery":
        return (
          <Truck className="h-5 w-5 text-orange-600 dark:text-orange-500" />
        );
      default:
        return (
          <Coins className="h-5 w-5 text-gray-600 dark:text-neutral-500" />
        );
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case "buy":
        return "bg-green-50 dark:bg-green-900/30";
      case "sell":
        return "bg-red-50 dark:bg-red-900/30";
      case "jewellery":
        return "bg-purple-50 dark:bg-purple-900/30";
      case "loan":
        return "bg-blue-50 dark:bg-blue-900/30";
      case "deposit":
        return "bg-[#F3F1F7] dark:bg-neutral-700";
      case "delivery":
        return "bg-orange-50 dark:bg-orange-900/30";
      default:
        return "bg-gray-50 dark:bg-neutral-700";
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    // Type filter
    if (selectedFilter !== "all" && t.type !== selectedFilter) return false;

    // Search filter
    if (
      searchQuery &&
      !t.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Date filter
    if (dateFilter !== "all") {
      const transactionDate = new Date(t.date);
      const today = new Date();
      const diffDays = Math.floor(
        (today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (dateFilter === "7days" && diffDays > 7) return false;
      if (dateFilter === "30days" && diffDays > 30) return false;
      if (dateFilter === "90days" && diffDays > 90) return false;
    }

    return true;
  });

  // Calculate totals for filtered transactions
  const totalBought = filteredTransactions
    .filter((t) => t.type === "buy")
    .reduce((sum, t) => sum + t.grams, 0);
  const totalSold = filteredTransactions
    .filter((t) => t.type === "sell")
    .reduce((sum, t) => sum + t.grams, 0);

  const handleDownloadInvoice = (id: number) => {
    alert(`Downloading invoice for transaction #${id}...`);
  };

  return (
    <div className="min-h-screen pb-6 dark:bg-neutral-900 dark:text-gray-100">
      {/* Header */}
      <div className="rounded-b-3xl bg-gradient-to-br from-[#3D3066] via-[#5C4E7F] to-[#8B7FA8] px-6 pt-6 pb-8">
        <div className="mb-6 flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <img src="01.jpg" alt="Zold Logo" className="h-16 rounded-xl" />
        </div>

        {/* Wallet Overview */}
        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md dark:bg-white/5">
          <div className="mb-6">
            <p className="mb-1 text-sm text-white/80 dark:text-white/70">
              Total Gold Holdings
            </p>
            <p className="mb-1 text-white dark:text-white/95">
              {totalGold.toFixed(3)} grams
            </p>
            <p className="text-sm text-white/90 dark:text-white/80">
              ₹{currentValue.toLocaleString()}
            </p>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/70 dark:text-white/60">
                Avg Buy Price
              </p>
              <p className="text-sm text-white dark:text-white/95">
                ₹{avgBuyPrice.toFixed(2)}/gm
              </p>
            </div>
            <div>
              <p className="text-sm text-white/70 dark:text-white/60">
                Profit/Loss
              </p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-300 dark:text-green-400" />
                <p className="text-sm text-green-300 dark:text-green-400">
                  ₹{profitLoss} ({profitLossPercent}%)
                </p>
              </div>
            </div>
          </div>

          {/* Period Selector */}
          <div className="mb-4 flex gap-2">
            {["7D", "1M", "1Y", "All"].map((period) => (
              <button
                key={period}
                onClick={() => setGraphPeriod(period)}
                className={`rounded-lg px-3 py-1 text-sm transition-colors ${graphPeriod === period
                  ? "bg-white text-[#3D3066] dark:bg-neutral-800 dark:text-white"
                  : "bg-white/20 text-white hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20"
                  }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Simple Graph Placeholder */}
          {showGraph && (
            <div className="flex h-32 items-end justify-between gap-1 rounded-lg bg-white/10 p-4 dark:bg-white/5">
              {Array.from({ length: 20 }).map((_, i) => {
                const height = Math.random() * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-white/40 dark:bg-white/20"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="-mt-4 px-6">
        {/* Breakdown Section */}
        <div className="mb-6 rounded-2xl bg-white p-4 shadow-lg dark:bg-neutral-800 dark:shadow-neutral-900/50">
          <h3 className="mb-4 text-black dark:text-white">Gold Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/30">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-100 p-2 dark:bg-green-800/50">
                  <Coins className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Free Gold
                  </p>
                  <p className="text-xs text-gray-500 dark:text-neutral-400">
                    Available for transactions
                  </p>
                </div>
              </div>
              <p className="text-gray-900 dark:text-white">
                {freeGold.toFixed(3)} gm
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/30">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-800/50">
                  <Repeat className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Pledged Gold
                  </p>
                  <p className="text-xs text-gray-500 dark:text-neutral-400">
                    Locked in loans
                  </p>
                </div>
              </div>
              <p className="text-gray-900 dark:text-white">
                {pledgedGold.toFixed(3)} gm
              </p>
            </div>
          </div>
        </div>

        {/* SIP Status */}
        <div className="mb-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white dark:from-purple-600 dark:to-pink-600">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-sm text-white/80">Active SIP</p>
              <p className="mb-1">₹5,000/month</p>
              <p className="text-sm text-white/90">Next: 25th December 2025</p>
            </div>
            <Calendar className="h-6 w-6 text-white/80" />
          </div>
          <button onClick={() => onOpenManageSIP?.()} className="w-full rounded-lg bg-white px-4 py-2 text-sm text-purple-600 transition-colors hover:bg-purple-50 dark:bg-white/20 dark:text-white dark:hover:bg-white/30">
            Manage SIP
          </button>
        </div>

        {/* Transactions */}
        <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-neutral-800 dark:shadow-neutral-900/50">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-black dark:text-white">Transactions</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-black flex items-center gap-1 text-sm text-[#3D3066] hover:text-[#5C4E7F] dark:text-[#8B7FA8] dark:hover:text-[#8B7FA8]/80"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
              <button className="flex items-center gap-1 text-sm text-[#3D3066] hover:text-[#5C4E7F] dark:text-[#8B7FA8] dark:hover:text-[#8B7FA8]/80">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="text-gray-800 w-full rounded-lg border border-gray-200 py-2 pr-10 pl-10 text-sm focus:border-[#3D3066] focus:outline-none dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:focus:border-[#8B7FA8]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute top-1/2 right-3 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-400" />
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mb-4 space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-neutral-700">
              <div>
                <label className="mb-2 block text-sm text-gray-700 dark:text-neutral-300">
                  Date Range
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#3D3066] focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:focus:border-[#8B7FA8]"
                >
                  <option value="all">All Time</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-3 dark:border-neutral-600">
                <div className="rounded-lg bg-white p-3 dark:bg-neutral-800">
                  <p className="mb-1 text-xs text-gray-500 dark:text-neutral-500">
                    Total Bought
                  </p>
                  <p className="text-green-600 dark:text-green-500">
                    {totalBought.toFixed(3)} gm
                  </p>
                </div>
                <div className="rounded-lg bg-white p-3 dark:bg-neutral-800">
                  <p className="mb-1 text-xs text-gray-500 dark:text-neutral-500">
                    Total Sold
                  </p>
                  <p className="text-red-600 dark:text-red-500">
                    {totalSold.toFixed(3)} gm
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
            {[
              { value: "all", label: "All", icon: null },
              { value: "buy", label: "Buy", icon: ArrowDownLeft },
              { value: "sell", label: "Sell", icon: ArrowUpRight },
              { value: "jewellery", label: "Jewellery", icon: ShoppingBag },
              { value: "loan", label: "Loan", icon: Repeat },
              { value: "deposit", label: "Deposit", icon: Coins },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setSelectedFilter(value)}
                className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${selectedFilter === value
                  ? "bg-[#3D3066] text-white dark:bg-[#4D3F7F]"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
                  }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          {(searchQuery ||
            dateFilter !== "all" ||
            selectedFilter !== "all") && (
              <div className="mb-3 flex items-center justify-between text-sm">
                <p className="text-gray-600 dark:text-neutral-400">
                  Found {filteredTransactions.length} transaction
                  {filteredTransactions.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDateFilter("all");
                    setSelectedFilter("all");
                  }}
                  className="flex items-center gap-1 text-[#3D3066] hover:text-[#5C4E7F] dark:text-[#8B7FA8] dark:hover:text-[#8B7FA8]/80"
                >
                  <X className="h-3 w-3" />
                  Clear all
                </button>
              </div>
            )}

          {/* Transaction List */}
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-neutral-700/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-lg p-2 ${getTypeBg(transaction.type)}`}
                  >
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {transaction.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-neutral-500">
                      {transaction.date} • {transaction.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {transaction.type === "sell" ||
                      transaction.type === "jewellery"
                      ? "-"
                      : "+"}
                    {transaction.grams} gm
                  </p>
                  <p className="text-xs text-gray-500 dark:text-neutral-500">
                    ₹{transaction.amount.toLocaleString()}
                  </p>
                  {(transaction.type === 'buy' || transaction.type === 'sell') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadInvoice(transaction.id);
                      }}
                      className="mt-1 flex items-center gap-1 text-[10px] text-[#3D3066] hover:underline dark:text-[#8B7FA8] ml-auto"
                    >
                      <FileText className="h-3 w-3" />
                      Invoice
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-neutral-500">
              <Filter className="mx-auto mb-2 h-12 w-12 text-gray-300 dark:text-neutral-700" />
              <p>No transactions found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
