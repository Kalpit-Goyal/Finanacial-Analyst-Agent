import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessage({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`${
          isUser
            ? "max-w-[80%] bg-blue-600 text-white"
            : "w-full bg-slate-900 border border-slate-800 text-slate-200"
        } rounded-2xl px-6 py-5`}
      >
        {!isUser && (
          <div className="text-xs text-blue-400 font-semibold tracking-wide mb-5">
            FINANCIAL ANALYST
          </div>
        )}

        <div className="text-[15px] leading-7">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // H1
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold text-white mb-6 mt-2">
                  {children}
                </h1>
              ),

              // H2
              h2: ({ children }) => (
                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  {children}
                </h2>
              ),

              // H3
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-white mt-7 mb-3">
                  {children}
                </h3>
              ),

              // Paragraph
              p: ({ children }) => (
                <p className="mb-5 text-slate-300 leading-7">
                  {children}
                </p>
              ),

              // Bold
              strong: ({ children }) => (
                <strong className="font-semibold text-white">
                  {children}
                </strong>
              ),

              // Italic
              em: ({ children }) => (
                <em className="text-slate-300 italic">
                  {children}
                </em>
              ),

              // Unordered list
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2 text-slate-300">
                  {children}
                </ul>
              ),

              // Ordered list
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2 text-slate-300">
                  {children}
                </ol>
              ),

              // List item
              li: ({ children }) => (
                <li className="pl-1 leading-7">
                  {children}
                </li>
              ),

              // Table
              table: ({ children }) => (
                <div className="overflow-x-auto w-full mb-7 rounded-lg border border-slate-700">
                  <table className="w-full min-w-[600px] border-collapse text-sm">
                    {children}
                  </table>
                </div>
              ),

              // Table head
              thead: ({ children }) => (
                <thead className="bg-slate-800 text-slate-100">
                  {children}
                </thead>
              ),

              // Table body
              tbody: ({ children }) => (
                <tbody className="divide-y divide-slate-800">
                  {children}
                </tbody>
              ),

              // Table row
              tr: ({ children }) => (
                <tr className="hover:bg-slate-800/50 transition">
                  {children}
                </tr>
              ),

              // Table header cell
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-semibold border-r border-slate-700 last:border-r-0 whitespace-nowrap">
                  {children}
                </th>
              ),

              // Table data cell
              td: ({ children }) => (
                <td className="px-4 py-3 text-slate-300 border-r border-slate-800 last:border-r-0 whitespace-nowrap">
                  {children}
                </td>
              ),

              // Horizontal rule
              hr: () => (
                <hr className="border-slate-800 my-8" />
              ),

              // Code
              code: ({ children }) => (
                <code className="bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded text-sm">
                  {children}
                </code>
              ),

              // Blockquote
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-blue-500 pl-4 my-6 text-slate-400 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;