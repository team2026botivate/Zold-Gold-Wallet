"use client";

import { LoginScreen } from "@/components/LoginScreen";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleComplete = (userData: any, isSignup: boolean) => {
        localStorage.setItem("user", JSON.stringify(userData));
        if (isSignup) {
            localStorage.setItem("appState", "kyc");
            router.push("/kyc");
        } else {
            localStorage.setItem("appState", "main");
            router.push("/home");
        }
    };

    return <LoginScreen onComplete={handleComplete} />;
}
