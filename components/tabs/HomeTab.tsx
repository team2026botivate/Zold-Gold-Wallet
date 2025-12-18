import {
  TrendingUp,
  TrendingDown,
  Coins,
  ShoppingBag,
  Truck,
  Repeat,
  MapPin,
  Gift,
  Bell,
  BarChart3,
  Clock,
  Users,
  Calculator,
  Calendar,
  Star,
  Sparkles,
  Target,
  ChevronRight,
} from "lucide-react";
import { ZoldLogo } from "../ZoldLogo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { useState } from "react";

interface HomeTabProps {
  onBuyGold: () => void;
  onOpenSIPCalculator?: () => void;
  onOpenReferral?: () => void;
  onOpenGiftGold?: () => void;
  onOpenAuspiciousDays?: () => void;
  onOpenGoldGoals?: () => void;
}

export function HomeTab({
  onBuyGold,
  onOpenSIPCalculator,
  onOpenReferral,
  onOpenGiftGold,
  onOpenAuspiciousDays,
  onOpenGoldGoals,
}: HomeTabProps) {
  const goldBuyPrice = 6245.5;
  const goldSellPrice = 6198.2;
  const priceChange = 1.2;
  const userGoldGrams = 12.547;
  const userGoldValue = 77845;
  const profitToday = 950;

  const [chartTimeframe, setChartTimeframe] = useState<
    "1D" | "1W" | "1M" | "1Y"
  >("1D");

  // Mock price data for different timeframes
  const priceData = {
    "1D": [
      { time: "9:00", price: 6150 },
      { time: "10:00", price: 6175 },
      { time: "11:00", price: 6160 },
      { time: "12:00", price: 6190 },
      { time: "1:00", price: 6210 },
      { time: "2:00", price: 6195 },
      { time: "3:00", price: 6220 },
      { time: "4:00", price: 6245 },
    ],
    "1W": [
      { time: "Mon", price: 6100 },
      { time: "Tue", price: 6120 },
      { time: "Wed", price: 6090 },
      { time: "Thu", price: 6150 },
      { time: "Fri", price: 6180 },
      { time: "Sat", price: 6200 },
      { time: "Sun", price: 6245 },
    ],
    "1M": [
      { time: "Wk1", price: 6000 },
      { time: "Wk2", price: 6050 },
      { time: "Wk3", price: 6100 },
      { time: "Wk4", price: 6245 },
    ],
    "1Y": [
      { time: "Jan", price: 5800 },
      { time: "Mar", price: 5900 },
      { time: "May", price: 6000 },
      { time: "Jul", price: 5950 },
      { time: "Sep", price: 6100 },
      { time: "Nov", price: 6200 },
      { time: "Dec", price: 6245 },
    ],
  };

  return (
    <div className="min-h-screen pb-6 dark:bg-neutral-900 dark:text-gray-100">
      {/* Header */}
      <div className="rounded-b-3xl bg-gradient-to-br from-[#3D3066] via-[#5C4E7F] to-[#8B7FA8] px-6 pt-6 pb-8">
        <div className="mb-6 flex items-center justify-between">
          <ZoldLogo variant="full" size="sm" theme="light" />
          <div className="flex items-center gap-2">
            <button className="relative rounded-full bg-white/20 p-2 backdrop-blur-sm dark:bg-white/10">
              <Bell className="h-5 w-5 text-white dark:text-white/90" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm dark:bg-white/10">
              <Coins className="h-5 w-5 text-white dark:text-white/90" />
            </div>
          </div>
        </div>

        {/* Live Gold Rates */}
        <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-md dark:bg-white/5">
          <p className="mb-3 text-sm text-white/90 dark:text-white/80">
            Live Gold Rate (24K)
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/80 dark:text-white/70">
                Buy Price
              </p>
              <p className="text-white dark:text-white/95">
                ₹{goldBuyPrice.toFixed(2)}/gm
              </p>
            </div>
            <div>
              <p className="text-sm text-white/80 dark:text-white/70">
                Sell Price
              </p>
              <p className="text-white dark:text-white/95">
                ₹{goldSellPrice.toFixed(2)}/gm
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-green-300 dark:text-green-400" />
            <span className="text-sm text-green-300 dark:text-green-400">
              +{priceChange}% today
            </span>
          </div>
        </div>
      </div>

      <div className="-mt-6 px-6">
        {/* Wallet Summary Card */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-neutral-900/50">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600 dark:text-neutral-400">
              Your Gold Balance
            </p>
            <Coins className="h-5 w-5 text-[#3D3066] dark:text-[#8B7FA8]" />
          </div>
          <div className="mb-2">
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              Total Gold
            </p>
            <p className="text-gray-900 dark:text-white">
              {userGoldGrams.toFixed(3)} grams
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              Current Value
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-gray-900 dark:text-white">
                ₹{userGoldValue.toLocaleString()}
              </p>
              <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-500">
                <TrendingUp className="h-3 w-3" />₹{profitToday}
              </span>
            </div>
          </div>
          <button className="w-full rounded-lg bg-[#F3F1F7] py-2 text-[#3D3066] transition-colors hover:bg-[#E5E1F0] dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600">
            View Wallet Details
          </button>
        </div>

        {/* Price Chart Section */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-lg dark:bg-neutral-800 dark:shadow-neutral-900/50">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#3D3066] dark:text-[#8B7FA8]" />
              <h3 className="text-gray-900 dark:text-white">
                Gold Price Chart
              </h3>
            </div>
            <button className="flex items-center gap-1 text-sm text-[#3D3066] dark:text-[#8B7FA8]">
              <Bell className="h-4 w-4" />
              Set Alert
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="mb-4 flex gap-2">
            {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setChartTimeframe(tf)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  chartTimeframe === tf
                    ? "bg-[#3D3066] text-white dark:bg-[#4D3F7F]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height={192}>
              <AreaChart data={priceData[chartTimeframe]}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3D3066" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3D3066" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorPriceDark"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8B7FA8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B7FA8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  className="dark:stroke-neutral-700"
                />
                <XAxis
                  dataKey="time"
                  stroke="#999"
                  className="dark:stroke-neutral-500"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="#999"
                  className="dark:stroke-neutral-500"
                  style={{ fontSize: "12px" }}
                  domain={["dataMin - 50", "dataMax + 50"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                  formatter={(value) =>
                    typeof value === "number"
                      ? `₹${value.toLocaleString()}`
                      : ""
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3D3066"
                  strokeWidth={2}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Market Analytics */}
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4 dark:border-neutral-700">
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-neutral-500">
                24h High
              </p>
              <p className="text-sm text-gray-900 dark:text-white">₹6,280</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-neutral-500">
                24h Low
              </p>
              <p className="text-sm text-gray-900 dark:text-white">₹6,145</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-gray-500 dark:text-neutral-500">
                Volume
              </p>
              <p className="text-sm text-gray-900 dark:text-white">125 kg</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="mb-4 text-black dark:text-white">Quick Actions</h2>
          <div className="space-y-3">
            {/* Primary Actions - Full Width */}
            <button
              onClick={onBuyGold}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#3D3066] p-5 text-white shadow-lg transition-colors hover:bg-[#5C4E7F] dark:bg-[#4D3F7F] dark:shadow-neutral-900/30 dark:hover:bg-[#5C4E9F]"
            >
              <Coins className="h-6 w-6" />
              <span className="text-lg">Buy Gold</span>
            </button>

            {/* Featured: Create Goal - Full Width with Gradient */}
            <button
              onClick={onOpenGoldGoals}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-5 text-white shadow-lg transition-all hover:from-blue-600 hover:to-cyan-600 dark:from-blue-600 dark:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700"
            >
              <Target className="h-6 w-6" />
              <span className="text-lg">Create Gold Goal</span>
            </button>

            {/* Secondary Actions - 2 Column Grid */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700">
                <TrendingDown className="h-6 w-6" />
                <span>Sell Gold</span>
              </button>
              <button
                onClick={onOpenGiftGold}
                className="flex flex-col items-center gap-2 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 p-4 text-white transition-colors hover:from-pink-600 hover:to-rose-600 dark:from-pink-600 dark:to-rose-600 dark:hover:from-pink-700 dark:hover:to-rose-700"
              >
                <Gift className="h-6 w-6" />
                <span>Gift Gold</span>
              </button>
              <button
                onClick={onOpenReferral}
                className="flex flex-col items-center gap-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 p-4 text-white transition-colors hover:from-purple-600 hover:to-pink-600 dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700"
              >
                <Users className="h-6 w-6" />
                <span>Refer & Earn</span>
              </button>
              <button className="flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700">
                <ShoppingBag className="h-6 w-6" />
                <span>Jewellery</span>
              </button>
              <button
                onClick={onOpenSIPCalculator}
                className="col-span-2 flex flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white p-4 text-gray-700 transition-colors hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              >
                <Calculator className="h-6 w-6" />
                <span>SIP Calculator</span>
              </button>
            </div>
          </div>
        </div>

        {/* Auspicious Days Banner */}
        <button
          onClick={onOpenAuspiciousDays}
          className="mb-6 w-full rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] p-6 text-white shadow-lg transition-all hover:opacity-95 dark:from-[#B8860B] dark:to-[#D4AF37]"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 text-left">
              <div className="mb-2 flex items-center gap-2">
                <Star className="h-5 w-5" />
                <p className="text-sm">शुभ मुहूर्त • Monthly Muhurat</p>
              </div>
              <h3 className="mb-1">Auspicious Days for Gold</h3>
              <p className="mb-3 text-sm text-white/90">
                Next: Pushya Nakshatra • Jan 13 • 5% OFF + Auto-buy
              </p>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-1.5 text-sm backdrop-blur-sm dark:bg-white/10">
                <Sparkles className="h-4 w-4" />
                <span>View all special days (Monthly + Festivals)</span>
              </div>
            </div>
            <div className="ml-4 text-6xl">⭐</div>
          </div>
        </button>

        {/* Active Goals Section */}
        <div className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-black dark:text-white">Your Gold Goals</h2>
            <button
              onClick={onOpenGoldGoals}
              className="flex items-center gap-1 text-sm text-[#3D3066] dark:text-[#8B7FA8]"
            >
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Goal 1: Wedding */}
            <button
              onClick={onOpenGoldGoals}
              className="relative w-full rounded-xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-[#3D3066] hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-[#8B7FA8] dark:hover:shadow-neutral-900/50"
            >
              <div className="mb-3 flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 p-3 text-2xl text-white">
                  💍
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="text-gray-900 dark:text-white">
                      Wedding Jewellery
                    </h4>
                    <span className="flex-shrink-0 text-xs text-orange-600 dark:text-orange-400">
                      25%
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-gray-600 dark:text-neutral-400">
                    Wedding Goal
                  </p>

                  {/* Progress Bar Container */}
                  <div className="relative mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500 dark:from-pink-600 dark:to-rose-600"
                      style={{ width: "25%" }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-neutral-400">
                      ₹1,25,000 / ₹5,00,000
                    </span>
                    <span className="text-gray-500 dark:text-neutral-500">
                      425 days left
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-fit items-center gap-1.5 rounded bg-green-50 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">
                <Sparkles className="h-3 w-3" />
                <span>Auto-allocate active</span>
              </div>
            </button>

            {/* Goal 2: Diwali */}
            <button
              onClick={onOpenGoldGoals}
              className="w-full rounded-xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-[#3D3066] hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-[#8B7FA8] dark:hover:shadow-neutral-900/50"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-3 text-2xl text-white">
                  🪔
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <h4 className="text-gray-900 dark:text-white">
                      Diwali Gold Purchase
                    </h4>
                    <span className="flex-shrink-0 text-xs text-blue-600 dark:text-blue-400">
                      45%
                    </span>
                  </div>
                  <p className="mb-2 text-sm text-gray-600 dark:text-neutral-400">
                    Festival Goal
                  </p>

                  {/* Progress Bar */}
                  <div className="relative mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700">
                    <div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 dark:from-orange-600 dark:to-red-600"
                      style={{ width: "45%" }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-neutral-400">
                      ₹45,000 / ₹1,00,000
                    </span>
                    <span className="text-gray-500 dark:text-neutral-500">
                      325 days left
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Partner Highlight */}
        <div className="mb-6">
          <h2 className="mb-4 text-black dark:text-white">
            Nearest Zold Partner
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">
                  Shree Ganesh Jewellers
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-neutral-500">
                  <MapPin className="h-4 w-4" />
                  <span>Connaught Place, Delhi • 2.3 km</span>
                </div>
              </div>
            </div>
            <div className="mb-3 flex gap-2 text-xs">
              <span className="rounded bg-green-50 px-2 py-1 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Pickup Available
              </span>
              <span className="rounded bg-blue-50 px-2 py-1 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Jewellery Conversion
              </span>
            </div>
            <button className="w-full rounded-lg bg-[#3D3066] py-2 text-white transition-colors hover:bg-[#5C4E7F] dark:bg-[#4D3F7F] dark:hover:bg-[#5C4E9F]">
              Visit Store
            </button>
          </div>
        </div>

        {/* Promotions */}
        <div className="mb-6">
          <h2 className="mb-4 text-black dark:text-white">
            Offers & Promotions
          </h2>
          <div className="space-y-3">
            <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white dark:from-purple-600 dark:to-pink-600">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2">Akshaya Tritiya Special</p>
                  <p className="mb-3 text-sm text-white/90">
                    0% making charges on jewellery conversion up to 10 grams
                  </p>
                  <button
                    onClick={onOpenGiftGold}
                    className="rounded-lg bg-white px-4 py-2 text-sm text-purple-600 transition-colors hover:bg-purple-50 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                  >
                    Explore Offers
                  </button>
                </div>
                <Gift className="h-12 w-12 text-white/80" />
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-r from-[#8B7FA8] to-[#B5A9C9] p-6 text-white dark:from-[#5C4E7F] dark:to-[#8B7FA8]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="mb-2">Launch Offer</p>
                  <p className="mb-3 text-sm text-white/90">
                    Refer friends and earn ₹100 gold credit for each successful
                    referral
                  </p>
                  <button
                    onClick={onOpenReferral}
                    className="rounded-lg bg-white px-4 py-2 text-sm text-[#3D3066] transition-colors hover:bg-purple-50 dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                  >
                    Refer Now
                  </button>
                </div>
                <Coins className="h-12 w-12 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
