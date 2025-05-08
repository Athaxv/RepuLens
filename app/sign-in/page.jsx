"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { getSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
// import { BackgroundEffect } from "@/components/background-effect"

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  
    console.log("SignIn Result:", result);
  
    if (result?.ok) {
      toast({
        title: "Login successful!",
        description: "Welcome back.",
      });
  
      // Wait for session to update
      const session = await getSession();
      console.log("Session after login:", session);
  
      const user = session?.user;
  
      if (user?.hasConsumerProfile) {
        // router.push(`/dashboard/consumer/${user.consumerId}`);
        router.push(`/dashboard/`);
      } else if (user?.hasBusinessProfile) {
        router.push(`/dashboard/`);
        // router.push(`/dashboard/business/${user.businessId}`);
      } else {
        router.push("/onboarding");
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
  
    setIsLoading(false);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white">
      {/* <BackgroundEffect /> */}

      <Link
        href="/"
        className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white md:left-8 md:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md space-y-8 rounded-2xl border border-white/10 bg-black/50 p-8 backdrop-blur-md"
      >
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-75 blur-sm"></div>
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black">
              <Sparkles className="h-6 w-6 text-amber-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-white/70">
            Sign in to your Repulens account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/70">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-white/70">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-xs text-white/70 hover:text-amber-400"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-amber-400/50 focus:ring-amber-400/50"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-black transition-all duration-300 hover:from-amber-500 hover:to-amber-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="flex items-center justify-center">
          <div className="h-px w-full flex-1 bg-white/10"></div>
          <span className="px-4 text-xs text-white/50">OR</span>
          <div className="h-px w-full flex-1 bg-white/10"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
        <Button variant={"outline"} onClick={() => signIn("google")}><svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg> Google</Button>
            <Button variant={"outline"}
  onClick={() => signIn("linkedin")}
  className="flex items-center gap-2 p-2 border rounded"
>
<svg
  className="mr-2 h-4 w-4"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 19H5V9h3v10zm-1.5-11.3c-.97 0-1.75-.79-1.75-1.75S5.53 4.2 6.5 4.2s1.75.79 1.75 1.75-.78 1.75-1.75 1.75zM20 19h-3v-5.2c0-1.24-.03-2.83-1.72-2.83-1.72 0-1.98 1.34-1.98 2.72V19h-3V9h2.88v1.36h.04c.4-.76 1.36-1.56 2.8-1.56 3 0 3.56 1.97 3.56 4.53V19z" />
</svg>

   LinkedIn
</Button>
        </div>

        <p className="text-center text-sm text-white/70">
          Don't have an account?{" "}
          <Link href="/signup" className="text-amber-400 hover:text-amber-300">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
