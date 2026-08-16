import { useState } from "react";
import ChatMessage from "./ChatMessage";

function ChatWindow({ company }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) {
      return;
    }

    const userMessage = input.trim();

    // Clear input box
    setInput("");

    // Immediately display user's message
    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company: company,
            question: userMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();

      // Display analyst's response
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.report,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "I couldn't connect to the financial analyst backend. Make sure the FastAPI server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = (question) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col">

        {/* Application title */}
        <div className="p-5 border-b border-slate-800">
          <h1 className="font-semibold text-lg">
            Financial Analyst
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            AI Financial Research
          </p>
        </div>

        {/* Company */}
        <div className="p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Analyzing
          </p>

          <h2 className="text-lg font-semibold mt-2">
            {company}
          </h2>
        </div>

        {/* Capabilities */}
        <div className="px-5 mt-3">
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
            Capabilities
          </p>

          <div className="space-y-2">

            <div className="text-sm text-slate-300 px-3 py-2 rounded-lg bg-slate-800">
              Financial Analysis
            </div>

            <div className="text-sm text-slate-600 px-3 py-2 rounded-lg">
              Web Research
            </div>

            <div className="text-sm text-slate-600 px-3 py-2 rounded-lg">
              Charts
            </div>

            <div className="text-sm text-slate-600 px-3 py-2 rounded-lg">
              Predictions
            </div>

            <div className="text-sm text-slate-600 px-3 py-2 rounded-lg">
              Reports
            </div>

          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-16 border-b border-slate-800 flex items-center px-6">

          <div>
            <h2 className="font-semibold">
              {company}
            </h2>

            <p className="text-xs text-slate-500">
              Financial Analysis
            </p>
          </div>

        </header>

        {/* Conversation */}
        <div className="flex-1 overflow-y-auto">

          <div className="max-w-3xl mx-auto px-6 py-10">

            {/* Empty state */}
            {messages.length === 0 && (
              <div className="text-center pt-16">

                <div className="text-4xl mb-5">
                  📊
                </div>

                <h2 className="text-2xl font-semibold">
                  Ask about {company}
                </h2>

                <p className="text-slate-400 mt-3 max-w-lg mx-auto">
                  Ask questions about revenue, profitability,
                  valuation, balance sheet, cash flow, or
                  any other financial information.
                </p>

                {/* Suggestions */}
                <div className="grid sm:grid-cols-2 gap-3 mt-8 text-left">

                  <button
                    onClick={() =>
                      handleSuggestion(
                        "What was the latest revenue?"
                      )
                    }
                    className="border border-slate-800 bg-slate-900 rounded-xl p-4 hover:border-slate-700 transition text-left"
                  >
                    <p className="text-sm font-medium">
                      Latest revenue
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Analyze recent revenue
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      handleSuggestion(
                        "What is the company's profitability?"
                      )
                    }
                    className="border border-slate-800 bg-slate-900 rounded-xl p-4 hover:border-slate-700 transition text-left"
                  >
                    <p className="text-sm font-medium">
                      Profitability
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Analyze profit and margins
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      handleSuggestion(
                        "What is the company's current valuation?"
                      )
                    }
                    className="border border-slate-800 bg-slate-900 rounded-xl p-4 hover:border-slate-700 transition text-left"
                  >
                    <p className="text-sm font-medium">
                      Valuation
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Analyze valuation metrics
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      handleSuggestion(
                        "Analyze the company's balance sheet."
                      )
                    }
                    className="border border-slate-800 bg-slate-900 rounded-xl p-4 hover:border-slate-700 transition text-left"
                  >
                    <p className="text-sm font-medium">
                      Balance sheet
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Analyze assets and liabilities
                    </p>
                  </button>

                </div>
              </div>
            )}

            {/* Messages */}
            {messages.length > 0 && (
              <div className="space-y-6">

                {messages.map((message, index) => (
                  <ChatMessage
                    key={index}
                    role={message.role}
                    content={message.content}
                  />
                ))}

                {/* Loading */}
                {loading && (
                  <div className="flex justify-start">

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4">

                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />

                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:150ms]" />

                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>

                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        </div>

        {/* Input */}
        <div className="border-t border-slate-800 bg-slate-950 p-4">

          <div className="max-w-3xl mx-auto">

            <div className="relative">

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Ask about ${company}...`}
                rows={1}
                className="w-full resize-none bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-blue-500 transition"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="absolute right-3 bottom-3 h-9 w-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 flex items-center justify-center transition"
              >
                ↑
              </button>

            </div>

            <p className="text-center text-xs text-slate-600 mt-2">
              AI-generated financial analysis may contain errors.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ChatWindow;