import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, RotateCcw, Sparkles, X } from "lucide-react";
export function ChatPanel({
  close,
  initial,
}: {
  close: () => void;
  initial: string;
}) {
  const [input, setInput] = useState(initial);
  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent/messages" }),
  });
  const busy = status === "submitted" || status === "streaming";
  const errorText = error?.message.includes("abonnement Runable")
    ? error.message
    : "L’IA est indisponible. Réessaie plus tard.";
  return (
    <div className="modal-backdrop">
      <dialog open
        className="chat-modal"
        aria-modal="true"
        aria-label="Discussion avec LAY IA"
      >
        <header>
          <span className="chat-title">
            <Sparkles size={20} /> LAY IA <small>Discussion gratuite</small>
          </span>
          <button className="icon-btn" onClick={close} aria-label="Fermer">
            <X />
          </button>
        </header>
        <div className="chat-content" aria-live="polite">
          {messages.length === 0 ? (
            <div className="chat-welcome">
              <img src="/images/logo.jpg" alt="" />
              <h2>Salut, on avance ensemble ?</h2>
              <p>
                Une question, une idée, un projet.
                <br />
                Dis-moi ce dont tu as besoin.
              </p>
              {[
                "Aide-moi à écrire mon CV",
                "Je veux apprendre l’anglais",
                "Comment lancer une petite entreprise ?",
              ].map((q) => (
                <button key={q} onClick={() => setInput(q)}>
                  {q} <ArrowUp size={15} />
                </button>
              ))}
            </div>
          ) : (
            messages.map((m) => (
              <div className={"message " + m.role} key={m.id}>
                <b>{m.role === "user" ? "Toi" : "LAY IA"}</b>
                {m.parts.map((p, i) =>
                  p.type === "text" ? <p key={i}>{p.text}</p> : null,
                )}
              </div>
            ))
          )}
          {busy && <p className="thinking">LAY IA réfléchit…</p>}
          {error && (
            <p className="error" role="alert">
              {errorText}
            </p>
          )}
        </div>
        <form
          className="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim() && !busy) {
              void sendMessage({ text: input });
              setInput("");
            }
          }}
        >
          <textarea
            autoFocus
            aria-label="Ta question"
            placeholder="Écris ta question ici…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={4000}
          />
          <button
            className="send-btn"
            disabled={busy || !input.trim()}
            aria-label="Envoyer la question"
          >
            <ArrowUp />
          </button>
        </form>
        <footer>
          <span>
            L’IA peut se tromper. Vérifie les informations importantes.
          </span>
          <button
            disabled={busy}
            onClick={() => setMessages([])}
            aria-label="Nouvelle discussion"
          >
            <RotateCcw size={14} />
          </button>
        </footer>
      </dialog>
    </div>
  );
}
