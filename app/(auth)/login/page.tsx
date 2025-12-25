"use client";

import { LoginScreen } from "@/components/LoginScreen";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            router.push("/home");
        }
    }, []);

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
