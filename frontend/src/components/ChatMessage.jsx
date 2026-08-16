function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-slate-900 border border-slate-800 text-slate-200"
        }`}
      >
        {!isUser && (
          <div className="text-xs text-blue-400 font-medium mb-2">
            FINANCIAL ANALYST
          </div>
        )}

        <p className="whitespace-pre-wrap leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;