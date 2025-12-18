"use client";
import React, { useState } from "react";

import { Onboarding } from "@/components/Onboarding";
import { LoginScreen } from "@/components/LoginScreen";
import { KYCFlow } from "@/components/KYCFlow";
import { MainApp } from "@/components/MainApp";

type AppState = "onboarding" | "login" | "kyc" | "main";

export default function Page() {
  const [appState, setAppState] = useState<AppState>("onboarding");
  const [user, setUser] = useState<any>(null);

  const [mounted, setMounted] = React.useState(false);

  // On mount, read persisted state and mark mounted. We wait to render
  // the real UI until after mount to avoid hydration mismatch / flashing.
  React.useEffect(() => {
    setMounted(true);
    try {
      const storedState = localStorage.getItem("appState");
      const storedUser = localStorage.getItem("user");

      if (
        storedState === "onboarding" ||
        storedState === "login" ||
        storedState === "kyc" ||
        storedState === "main"
      ) {
        setAppState(storedState as AppState);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  // Persist appState and user whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem("appState", appState);
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    } catch (e) {
      // ignore storage errors
    }
  }, [appState, user]);

  const handleOnboardingComplete = () => setAppState("login");
  const handleLoginComplete = (userData: any) => {
    setUser(userData);
    setAppState("kyc");
  };
  const handleKYCSkip = () => setAppState("main");
  const handleKYCComplete = () => setAppState("main");

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="min-h-screen">
      {appState === "onboarding" && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {appState === "login" && <LoginScreen onComplete={handleLoginComplete} />}

      {appState === "kyc" && (
        <KYCFlow onComplete={handleKYCComplete} onSkip={handleKYCSkip} />
      )}

      {appState === "main" && <MainApp user={user} />}
    </div>
  );
}
