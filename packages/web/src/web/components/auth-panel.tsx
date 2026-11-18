import { useState } from "react";
import { X } from "lucide-react";
import { authClient } from "../lib/auth";
export function AuthPanel({ close }: { close: () => void }) {
  const [signup, setSignup] = useState(false),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [name, setName] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  return (
    <div className="modal-backdrop">
      <dialog open
        className="auth-modal"
        aria-modal="true"
        aria-label="Connexion"
      >
        <button
          className="icon-btn auth-close"
          onClick={close}
          aria-label="Fermer"
        >
          <X />
        </button>
        <img src="/images/logo.jpg" alt="Logo LAY IA" />
        <h2>{signup ? "Bienvenue chez toi." : "Content de te revoir."}</h2>
        <p>Ton prochain pas commence ici.</p>
        <button
          className="google-btn"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setError("");
            try {
              const r = await authClient.managedAuth.signIn({
                provider: "google",
              });
              if (r.error) setError(r.error.message ?? "Connexion impossible.");
              else close();
            } catch {
              setError("Connexion Google indisponible.");
            } finally {
              setBusy(false);
            }
          }}
        >
          Continuer avec Google
        </button>
        <div className="or">ou avec ton email</div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            try {
              const r = signup
                ? await authClient.signUp.email({ email, password, name })
                : await authClient.signIn.email({ email, password });
              if (r.error) setError(r.error.message ?? "Connexion impossible.");
              else close();
            } catch {
              setError("Connexion indisponible. Réessaie.");
            } finally {
              setBusy(false);
            }
          }}
        >
          {signup && (
            <label>
              Ton prénom
              <input
                  aria-label="Ton prénom"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
          )}
          <label>
            Email
            <input
              aria-label="Email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
          <label>
            Mot de passe
            <input
              aria-label="Mot de passe"
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={signup ? "new-password" : "current-password"}
            />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className="btn" disabled={busy}>
            {busy
              ? "Un instant…"
              : signup
                ? "Créer mon compte"
                : "Me connecter"}
          </button>
        </form>
        <button
          className="text-btn"
          onClick={() => {
            setSignup(!signup);
            setError("");
          }}
        >
          {signup
            ? "Déjà un compte ? Se connecter"
            : "Pas de compte ? Inscris-toi"}
        </button>
      </dialog>
    </div>
  );
}
