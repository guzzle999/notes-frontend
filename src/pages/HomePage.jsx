import React from 'react';
import {motion} from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function HomePage()  {
  const navigate = useNavigate();
  return (
    <section className="bg-white min-h-screen flex items-start justify-center pt-8 p-4 md:pt-20 md:p-0">
      {/* Wrapper card */}
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="w-full max-w-md p-6 rounded-2xl bg-white shadow-2xl ring-1 ring-slate-50">
            <div className="rounded-xl bg-gradient-to-b from-white to-[#E8F8FF] border border-transparent">
              <img src="./hero.png" className="rounded-lg"></img>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="px-6 py-8 rounded-2xl shadow-lg bg-gradient-to-br from-[#E8F8FF] to-[#F3EEFF]"
        >
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Your Notes, Made Simple & Joyful
            </h1>

            <p className="mt-4 text-lg text-slate-700">
              Notory helps you write, summarize, and share your notes — all in
              one clean, friendly space designed to lighten your day.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                aria-label="Start Writing for Free"
                onClick={() => navigate("/login")}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 bg-gradient-to-r from-[#AEE6FF] to-[#FFCCE6] text-slate-900 font-semibold shadow hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-[#AEE6FF]/30 transition cursor-pointer"
              >
                Start Writing for Free
              </button>
            </div>

            {/* Feature chips */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/70 shadow-sm">
                <div className="p-2 rounded-md bg-[#C7F5D3]/80">✨</div>
                <div>
                  <p className="text-sm font-semibold">Clean workspace</p>
                  <p className="text-sm text-slate-600">Minimal, focused UI</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/70 shadow-sm">
                <div className="p-2 rounded-md bg-[#FFF4A8]/80">⚡</div>
                <div>
                  <p className="text-sm font-semibold">Instant summaries</p>
                  <p className="text-sm text-slate-600">
                    AI-powered short insights
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/70 shadow-sm">
                <div className="p-2 rounded-md bg-[#D9D2FF]/80">🤝</div>
                <div>
                  <p className="text-sm font-semibold">Share easily</p>
                  <p className="text-sm text-slate-600">
                    Beautiful public notes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}