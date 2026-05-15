"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Activity,
  Cpu,
  Server,
  Cloud,
  Rocket,
  Code,
  CheckCircle2,
  Settings2,
  Database,
  Lock,
  Globe
} from "lucide-react";

const steps = [
  { id: "analyzing", label: "Analyzing Startup Idea", icon: Activity },
  { id: "architecting", label: "Designing Architecture", icon: Cpu },
  { id: "generating_db", label: "Scaffolding Database", icon: Database },
  { id: "generating_api", label: "Synthesizing API", icon: Server },
  { id: "generating_ui", label: "Building Frontend", icon: Code },
  { id: "securing", label: "Configuring Security", icon: Lock },
  { id: "deploying", label: "Deploying to Edge", icon: Cloud },
];

export default function OmniDashboard() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setCurrentStep(0);
    setLogs(["[SYSTEM] Initializing OMNI OS..."]);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setLogs((prev) => [...prev, `[AGENT] Starting task: ${steps[i].label}...`]);
      await new Promise((r) => setTimeout(r, 1500));
      setLogs((prev) => [...prev, `[SUCCESS] Completed: ${steps[i].label}.`]);
    }

    setLogs((prev) => [...prev, "[SYSTEM] SaaS Deployment Complete. Target URL active."]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">OMNI OS</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Deployments</a>
            <a href="#" className="hover:text-white transition-colors">Settings</a>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
              <span className="text-xs text-white">AP</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column - Input */}
        <div className="col-span-1 lg:col-span-5 space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
              Autonomous SaaS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">
                Generation Engine
              </span>
            </h1>
            <p className="text-slate-400 leading-relaxed">
              Describe your startup idea, target audience, and business model. OMNI will architect, scaffold, and deploy a production-ready application in minutes.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              System Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isGenerating}
              placeholder="e.g. Build a multi-tenant CRM for real estate agents with AI property matching and Stripe subscriptions..."
              className="w-full h-40 bg-black/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none transition-all disabled:opacity-50"
            />

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Settings2 className="w-4 h-4" />
                <span>Enterprise Mode Active</span>
              </div>
              <button
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className="bg-white text-black px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    Deploy SaaS
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Status */}
        <div className="col-span-1 lg:col-span-7">
          <div className="bg-black border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl shadow-blue-900/20 relative">
            <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-4 text-xs font-mono text-slate-500">omni-agent-terminal</span>
            </div>
            
            <div className="flex-1 p-6 flex flex-col font-mono text-sm overflow-hidden relative">
              {/* Pipeline Visualization */}
              <div className="mb-8 grid grid-cols-7 gap-2">
                {steps.map((step, idx) => {
                  const isActive = isGenerating && currentStep === idx;
                  const isDone = isGenerating && currentStep > idx;
                  return (
                    <div key={step.id} className="flex flex-col items-center gap-2">
                      <div
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? "border-blue-500 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                            : isDone
                            ? "border-green-500 text-green-400 bg-green-500/10"
                            : "border-white/10 text-slate-600"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Logs */}
              <div className="flex-1 bg-black/50 border border-white/5 rounded-xl p-4 overflow-y-auto space-y-2">
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                    <Terminal className="w-8 h-8 opacity-50" />
                    <p>Awaiting generation prompt...</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {logs.map((log, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={i}
                        className={`flex items-start gap-3 ${log.includes("[SUCCESS]") ? "text-green-400" : log.includes("[SYSTEM]") ? "text-blue-400" : "text-slate-300"}`}
                      >
                        <span className="opacity-50 select-none">{">"}</span>
                        <span>{log}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
