"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterData, authService } from "@/services/auth";
import Link from "next/link";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{ success: boolean; message: string } | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    setApiResponse(null);

    const res = await authService.register(data);
    setApiResponse(res);
    setIsLoading(false);

    if (res.success) {
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#020201] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Corner Markers */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-[#81ECFF]/30 pointer-events-none" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-[#81ECFF]/30 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-[#81ECFF]/30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-[#81ECFF]/30 pointer-events-none" />

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#81ECFF]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[480px] relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#81ECFF] text-2xl md:text-3xl font-black tracking-tighter mb-2"
          >
            CREATE_SECURE_IDENTITY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 text-[10px] tracking-[0.3em] font-bold uppercase"
          >
            ESTABLISH NEW PROTOCOL ACCESS
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-sm shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#81ECFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase block">
                  FULL_NAME
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-black border border-white/10 rounded-sm py-3 px-4 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-[#81ECFF]/50 transition-all"
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-red-500 text-[9px] font-bold tracking-tight uppercase">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase block">
                  USERNAME
                </label>
                <input
                  {...register("username")}
                  type="text"
                  placeholder="johndoe"
                  className="w-full bg-black border border-white/10 rounded-sm py-3 px-4 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-[#81ECFF]/50 transition-all"
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-red-500 text-[9px] font-bold tracking-tight uppercase">
                    {errors.username.message}
                   </p>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase block">
                EMAIL_ADDRESS
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="identity@network.hub"
                className="w-full bg-black border border-white/10 rounded-sm py-3 px-4 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-[#81ECFF]/50 transition-all"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-[9px] font-bold tracking-tight uppercase">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase block">
                ACCESS_PHRASE
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-black border border-white/10 rounded-sm py-3 px-4 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-[#81ECFF]/50 transition-all font-mono"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-red-500 text-[9px] font-bold tracking-tight uppercase">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="w-full bg-[#81ECFF] hover:bg-white text-black font-black text-xs tracking-[0.2em] py-5 rounded-sm flex items-center justify-center gap-3 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              type="submit"
            >
              {isLoading ? "INITIALIZING..." : "GENERATE IDENTITY"}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.button>
          </form>

          {/* Response Messages */}
          <AnimatePresence>
            {apiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-sm text-[10px] font-bold tracking-widest text-center border ${
                  apiResponse.success
                    ? "bg-[#81ECFF]/10 border-[#81ECFF]/30 text-[#81ECFF]"
                    : "bg-red-500/10 border-red-500/30 text-red-500"
                }`}
              >
                {apiResponse.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Footer */}
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <Link href="/login" className="text-[10px] text-neutral-600 font-bold hover:text-[#81ECFF] transition-colors tracking-widest uppercase">
              ALREADY REGISTERED? LOGIN
            </Link>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#81ECFF]"
              />
              <span className="text-[10px] text-neutral-500 font-bold tracking-widest uppercase">
                SECURE_NODE: ACTIVE
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
