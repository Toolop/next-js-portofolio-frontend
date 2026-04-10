"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { login, LoginResponse } from "@/data/mockApi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [accessKey, setAccessKey] = useState("");
  const [encryptionPhrase, setEncryptionPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<LoginResponse | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    const res = await login(accessKey, encryptionPhrase);
    setResponse(res);
    setIsLoading(false);

    if (res.success) {
      setTimeout(() => {
        router.push("/");
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
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#81ECFF] text-2xl md:text-3xl font-black tracking-tighter mb-2"
          >
            SYSTEM_ACCESS_PORTAL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-neutral-500 text-[10px] tracking-[0.3em] font-bold uppercase"
          >
            KINETIC GRID CMS SECURITY LAYER
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 rounded-sm shadow-2xl relative group"
        >
          {/* Subtle light effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#81ECFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <form onSubmit={handleLogin} className="relative z-10 space-y-8">
            {/* Access Key Input */}
            <div className="space-y-3">
              <label className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase block">
                ACCESS_KEY
              </label>
              <div className="relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within/input:text-[#81ECFF] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M18 10a8 8 0 1 0-16 0"/><circle cx="12" cy="10" r="3"/><path d="M7 20c0-1.5 1-3.5 5-3.5s5 2 5 3.5"/><path d="M15.5 2h.5a2 2 0 0 1 2 2v2"/><path d="M8.5 2H8a2 2 0 0 0-2 2v2"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter primary identity string"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-sm py-4 pl-12 pr-4 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-[#81ECFF]/50 focus:ring-1 focus:ring-[#81ECFF]/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Encryption Phrase Input */}
            <div className="space-y-3">
              <label className="text-neutral-500 text-[10px] font-bold tracking-widest uppercase block">
                ENCRYPTION_PHRASE
              </label>
              <div className="relative group/input">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within/input:text-[#81ECFF] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zM12 2L2 12"/>
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={encryptionPhrase}
                  onChange={(e) => setEncryptionPhrase(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-sm py-4 pl-12 pr-4 text-sm text-neutral-200 placeholder:text-neutral-700 focus:outline-none focus:border-[#81ECFF]/50 focus:ring-1 focus:ring-[#81ECFF]/20 transition-all font-mono"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={isLoading}
              className="w-full bg-[#81ECFF] hover:bg-white text-black font-black text-xs tracking-[0.2em] py-5 rounded-sm flex items-center justify-center gap-3 transition-colors uppercase disabled:opacity-50 disabled:cursor-not-allowed group/btn"
            >
              {isLoading ? "PROCESING..." : "VERIFY IDENTITY"}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </motion.button>
          </form>

          {/* Response Messages */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-sm text-[10px] font-bold tracking-widest text-center border ${
                  response.success
                    ? "bg-[#81ECFF]/10 border-[#81ECFF]/30 text-[#81ECFF]"
                    : "bg-red-500/10 border-red-500/30 text-red-500"
                }`}
              >
                {response.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Footer */}
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <button className="text-[10px] text-neutral-600 font-bold hover:text-neutral-400 transition-colors tracking-widest uppercase">
              REQUEST RESET
            </button>
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
