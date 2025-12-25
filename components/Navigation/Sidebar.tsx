import {
    Home,
    Wallet,
    MapPin,
    Banknote,
    User,
    Coins,
    Target,
    Gift,
    Menu,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => pathname === path;

    return (
        <div
            className={`fixed top-0 left-0 hidden h-full min-h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 lg:flex dark:border-neutral-700 dark:bg-neutral-800 ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Sidebar Header */}
            <div className="border-b border-gray-200 p-6 dark:border-neutral-700">
                {!collapsed ? (
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3D3066] dark:bg-[#4D3F7F]">
                            <Coins className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Gold Wallet
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-neutral-400">
                                Digital Gold Platform
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3D3066] dark:bg-[#4D3F7F]">
                            <Coins className="h-6 w-6 text-white" />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 space-y-2 overflow-y-auto p-4 custom_scrollbar">
                {[
                    { path: "/home", icon: Home, label: "Home" },
                    { path: "/wallet", icon: Wallet, label: "Wallet" },
                    { path: "/partners", icon: MapPin, label: "Partners" },
                    { path: "/loans", icon: Banknote, label: "Loans" },
                    { path: "/profile", icon: User, label: "Profile" },
                ].map((item) => (
                    <Link
                        key={item.path}
                        href={item.path}
                        className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${isActive(item.path)
                            ? "bg-[#cebcf1] text-[#3D3066] dark:bg-neutral-700 dark:text-white"
                            : "text-gray-700 hover:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-700/50"
                            }`}
                    >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                            <span className="font-medium">{item.label}</span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Quick Actions in Sidebar */}
            <div className="border-t border-gray-200 p-4 dark:border-neutral-700">
                {!collapsed && (
                    <h3 className="mb-3 text-xs font-semibold text-gray-500 uppercase dark:text-white">
                        Quick Actions
                    </h3>
                )}
                <div className="space-y-2">
                    <Link
                        href="/buy-gold"
                        className={`flex w-full items-center ${!collapsed ? "gap-3" : "justify-center"
                            } rounded-lg bg-[#3D3066] p-3 text-white transition-colors hover:bg-[#5C4E7F] dark:bg-[#4D3F7F] dark:hover:bg-[#5C4E9F]`}
                        title="Buy Gold"
                    >
                        <Coins className="h-5 w-5" />
                        {!collapsed && <span className="font-medium">Buy Gold</span>}
                    </Link>
                    <Link
                        href="/gold-goals"
                        className={`flex w-full items-center ${!collapsed ? "gap-3" : "justify-center"
                            } rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50 dark:border-neutral-600 dark:hover:bg-neutral-700/50`}
                        title="Create Goal"
                    >
                        <Target className="h-5 w-5 text-black dark:text-white" />
                        {!collapsed && (
                            <span className="font-medium text-black dark:text-white">
                                Create Goal
                            </span>
                        )}
                    </Link>
                    <Link
                        href="/gift-gold"
                        className={`flex w-full items-center ${!collapsed ? "gap-3" : "justify-center"
                            } rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50 dark:border-neutral-600 dark:hover:bg-neutral-700/50`}
                        title="Gift Gold"
                    >
                        <Gift className="h-5 w-5 text-black dark:text-white" />
                        {!collapsed && (
                            <span className="font-medium text-black dark:text-white">
                                Gift Gold
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Sidebar Toggle */}
            <div className="border-t border-gray-200 p-4 dark:border-neutral-700">
                <button
                    onClick={onToggle}
                    className="flex w-full items-center justify-center gap-3 rounded-lg p-3 text-gray-600 transition-colors hover:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-700/50"
                >
                    <Menu className="h-5 w-5" />
                    {!collapsed && (
                        <span className="font-medium">Collapse Menu</span>
                    )}
                </button>
            </div>
        </div>
    );
}
