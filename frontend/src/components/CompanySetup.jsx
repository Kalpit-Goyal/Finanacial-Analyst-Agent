import { useState } from "react";

function CompanySetup({ onSubmit }) {
  const [company, setCompany] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company.trim()) {
      return;
    }

    onSubmit(company.trim());
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl">

        <div className="text-center mb-10">

          <div className="flex justify-center mb-5">
            <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-2xl">
              📈
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Financial Analyst
          </h1>

          <p className="mt-3 text-slate-400">
            Your AI-powered financial research assistant
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-7 shadow-2xl"
        >

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company Name
          </label>

          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. NVIDIA"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 outline-none focus:border-blue-500 transition"
          />

          <button
            type="submit"
            disabled={!company.trim()}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-xl py-3 font-medium transition"
          >
            Start Analysis
          </button>

        </form>

        <p className="text-center text-xs text-slate-600 mt-5">
          Enter a company name to begin your analysis
        </p>

      </div>
    </div>
  );
}

export default CompanySetup;