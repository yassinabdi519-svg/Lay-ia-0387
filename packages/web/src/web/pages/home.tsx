import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  BookOpen,
  BriefcaseBusiness,
  Lightbulb,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Menu,
  X,
  Globe2,
} from "lucide-react";
import { ChatPanel } from "../components/chat-panel";
import { AuthPanel } from "../components/auth-panel";
import { authClient } from "../lib/auth";
const features = [
  {
    icon: BookOpen,
    title: "Apprends à ton rythme.",
    desc: "Une leçon difficile ? Une nouvelle langue ? LAY IA t’explique simplement, étape par étape.",
    tag: "APPRENDRE",
    question: "Je veux apprendre l’anglais, aide-moi à commencer.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Prépare ton avenir.",
    desc: "Un CV clair, une bonne candidature, un entretien préparé. Fais le premier pas vers ton prochain travail.",
    tag: "TROUVER UN TRAVAIL",
    question: "Aide-moi à créer mon premier CV.",
  },
  {
    icon: Lightbulb,
    title: "Donne vie à ton idée.",
    desc: "Tu veux lancer une activité ? Organise tes idées et construis un plan simple pour démarrer.",
    tag: "ENTREPRENDRE",
    question: "Comment démarrer une petite activité à Djibouti ?",
  },
];
const faqs = [
  [
    "C’est quoi LAY IA ?",
    "C’est un assistant intelligent pensé pour les jeunes de Djibouti. Tu poses une question et il t’aide à avancer avec des explications simples.",
  ],
  [
    "Est-ce que les discussions sont gratuites ?",
    "Oui. Tu peux discuter et recevoir de l’aide de base gratuitement. Premium est prévu pour les fonctions avancées, mais n’est pas encore activé.",
  ],
  [
    "Est-ce que LAY IA peut me trouver un emploi ?",
    "LAY IA t’aide à préparer ton CV, tes candidatures et tes entretiens. Il ne garantit pas un emploi et ne consulte pas encore les offres en temps réel.",
  ],
  [
    "Puis-je payer avec WAAFI ?",
    "Pas encore. Les paiements seront activés après la connexion d’un compte marchand. Aucun paiement n’est demandé sur ce site pour le moment.",
  ],
  [
    "Est-ce que je peux créer des vidéos ?",
    "La génération de vidéos est prévue pour Premium. Elle n’est pas disponible tant que le service de génération et les paiements ne sont pas connectés.",
  ],
];
export default function Home() {
  const [chat, setChat] = useState(false),
    [initial, setInitial] = useState(""),
    [login, setLogin] = useState(false),
    [menu, setMenu] = useState(false),
    [faq, setFaq] = useState<number | null>(0),
    [billing, setBilling] = useState<"week" | "month">("week");
  const { data: session } = authClient.useSession();
  const open = (q = "") => {
    setInitial(q);
    setChat(true);
    setMenu(false);
  };
  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">
          <img src="/images/logo.jpg" alt="" />
          LAY<span>IA</span>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          <a href="#pour-toi" onClick={() => setMenu(false)}>
            Pour toi
          </a>
          <a href="#comment" onClick={() => setMenu(false)}>
            Comment ça marche
          </a>
          <a href="#premium" onClick={() => setMenu(false)}>
            Premium <Sparkles size={13} />
          </a>
        </nav>
        <div className="header-actions">
          {session ? (
            <button
              className="text-btn"
              onClick={() => void authClient.signOut()}
            >
              Déconnexion
            </button>
          ) : (
            <button className="login-link" onClick={() => setLogin(true)}>
              Se connecter
            </button>
          )}
          <button className="btn small" onClick={() => open()}>
            Essayer LAY IA <ArrowUpRight size={16} />
          </button>
          <button
            className="menu-btn"
            onClick={() => setMenu(!menu)}
            aria-label="Menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="live-dot" /> UNE IA PENSÉE POUR DJIBOUTI
            </div>
            <h1>
              LAY IA<span className="title-dash"> —</span>
              <br />
              Ton ami
              <br />
              <span className="red">intelligence.</span>
            </h1>
            <p>
              Apprends. Trouve ta voie. Lance ton projet.
              <br />
              Un ami intelligent pour avancer avec toi,
              <br className="desktop-break" /> chaque jour.
            </p>
            <button className="btn" onClick={() => open()}>
              Pose ta question <ArrowUpRight size={20} />
            </button>
            <div className="hero-note">
              <span className="tiny-avatars">
                <i>A</i>
                <i>M</i>
                <i>S</i>
              </span>
              <span>
                Pour les jeunes. Pour leurs idées.
                <br />
                <b>Pour un avenir qui commence ici.</b>
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-top">
              <span>
                <span className="live-dot" /> TON PROCHAIN PAS
              </span>
              <ArrowUpRight />
            </div>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <img
              className="hero-logo"
              src="/images/logo.jpg"
              alt="Logo rouge de LAY IA"
            />
            <span className="float-tag tag-one">
              <BookOpen size={16} /> J’apprends
            </span>
            <span className="float-tag tag-two">
              <BriefcaseBusiness size={16} /> Je construis mon avenir
            </span>
            <span className="float-tag tag-three">
              <Lightbulb size={16} /> Je me lance
            </span>
            <div className="art-bottom">
              <span>
                UNE QUESTION.
                <br />
                <b>DE NOUVELLES POSSIBILITÉS.</b>
              </span>
              <span className="art-number">01 / ∞</span>
            </div>
          </div>
        </section>
        <div className="manifesto wrap">
          <span>FAIT POUR TOI</span>
          <p>
            De grandes idées.
            <br />
            <b>Un premier pas tout simple.</b>
          </p>
          <span className="manifesto-right">
            <Globe2 size={18} /> Djibouti, et au-delà.
          </span>
        </div>
        <section className="features wrap" id="pour-toi">
          <div className="section-heading">
            <div>
              <span className="eyebrow">01 — À TES CÔTÉS</span>
              <h2>
                Ton potentiel.
                <br />
                <span className="muted">Sans les obstacles.</span>
              </h2>
            </div>
            <p>
              Pas besoin de tout savoir.
              <br />
              Commence avec ce que tu as.
              <br />
              LAY IA t’aide pour la suite.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <article className="feature" key={f.tag}>
                <div className="feature-top">
                  <f.icon size={25} />
                  <span>0{i + 1}</span>
                </div>
                <div className="feature-tag">{f.tag}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <button onClick={() => open(f.question)}>
                  On commence ? <ArrowUpRight size={18} />
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="question-section" id="comment">
          <div className="wrap question-layout">
            <div>
              <span className="eyebrow">02 — AUSSI SIMPLE QU’UN MESSAGE</span>
              <h2>
                Pose ta question.
                <br />
                <span className="red">
                  Le reste, on le fait
                  <br />
                  ensemble.
                </span>
              </h2>
              <p>
                Écris comme tu parles. LAY IA te répond
                <br />
                avec des mots simples et des idées utiles.
              </p>
              <div className="steps">
                <span>
                  <b>1</b> Tu poses ta question
                </span>
                <span>
                  <b>2</b> LAY IA t’explique
                </span>
                <span>
                  <b>3</b> Tu passes à l’action
                </span>
              </div>
              <button className="btn" onClick={() => open()}>
                Parler à LAY IA <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="preview-chat">
              <div className="preview-header">
                <img src="/images/logo.jpg" alt="" />
                <span>
                  LAY IA<small>Ton ami intelligence</small>
                </span>
                <Sparkles size={19} />
              </div>
              <div className="preview-label">UN EXEMPLE POUR COMMENCER</div>
              <div className="preview-user">
                Je veux préparer mon premier CV.
                <br />
                Par où je commence ?
              </div>
              <div className="preview-ai">
                <Sparkles size={19} />
                <div>
                  <b>On commence ensemble.</b>
                  <p>Un bon CV raconte qui tu es et ce que tu sais faire.</p>
                  <ul>
                    <li>Ton prénom et tes coordonnées</li>
                    <li>Ta formation et tes compétences</li>
                    <li>Tes expériences, même les petites</li>
                  </ul>
                  <p>Qu’est-ce que tu aimerais faire comme travail ?</p>
                </div>
              </div>
              <button
                className="preview-input"
                onClick={() => open("Aide-moi à préparer mon premier CV.")}
              >
                <span>Et toi, quelle est ta question ?</span>
                <span className="send-btn">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </div>
          </div>
        </section>
        <section className="premium wrap" id="premium">
          <div className="section-heading">
            <div>
              <span className="eyebrow">03 — VA ENCORE PLUS LOIN</span>
              <h2>
                À ton rythme.
                <br />
                Selon tes envies.
              </h2>
            </div>
            <p>
              La discussion reste gratuite.
              <br />
              Des possibilités supplémentaires
              <br />
              arriveront avec Premium.
            </p>
          </div>
          <div className="pricing-grid">
            <article className="free-plan">
              <span className="plan-label">LE PREMIER PAS</span>
              <h3>LAY IA Gratuit</h3>
              <div className="price">
                0 <span>FDJ</span>
              </div>
              <p>Une question suffit pour avancer.</p>
              <ul>
                {[
                  "Discussion avec LAY IA",
                  "Aide de base pour apprendre et les langues",
                  "Conseils pour ton CV et tes candidatures",
                  "Premiers pas pour ton entreprise",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
              <button className="btn outline" onClick={() => open()}>
                Commencer gratuitement <ArrowUpRight size={18} />
              </button>
              <small>Sans carte bancaire.</small>
            </article>
            <article className="paid-plan">
              <span className="coming">
                BIENTÔT DISPONIBLE <Sparkles size={12} />
              </span>
              <span className="plan-label">PLUS DE POSSIBILITÉS</span>
              <h3>
                LAY IA Premium <Sparkles size={23} />
              </h3>
              <div className="billing-switch">
                <button
                  className={billing === "week" ? "active" : ""}
                  onClick={() => setBilling("week")}
                >
                  Par semaine
                </button>
                <button
                  className={billing === "month" ? "active" : ""}
                  onClick={() => setBilling("month")}
                >
                  Par mois
                </button>
              </div>
              <div className="price">
                {billing === "week" ? "500" : "5 000"}{" "}
                <span>FDJ / {billing === "week" ? "semaine" : "mois"}</span>
              </div>
              <p>Les fonctions avancées, à venir.</p>
              <ul>
                {[
                  "Tout ce qui est inclus dans Gratuit",
                  "Accompagnement plus approfondi",
                  "Scripts et prompts avancés",
                  "Génération de vidéos (service à connecter)",
                ].map((x) => (
                  <li key={x}>
                    <Check size={17} />
                    {x}
                  </li>
                ))}
              </ul>
              <button className="btn" disabled>
                Activation prochainement <ArrowUpRight size={18} />
              </button>
              <small>Paiements et vidéos non activés. Aucun prélèvement.</small>
            </article>
          </div>
        </section>
        <section className="faq wrap" id="questions">
          <div>
            <span className="eyebrow">ON T’EXPLIQUE</span>
            <h2>
              Des questions ?<br />
              <span className="muted">C’est normal.</span>
            </h2>
            <p>Voici les réponses, simplement.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <article key={q}>
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  aria-expanded={faq === i}
                >
                  {q}
                  {faq === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                {faq === i && <p>{a}</p>}
              </article>
            ))}
          </div>
        </section>
        <section className="final-cta wrap">
          <div className="eyebrow">L’AVENIR NE SE FAIT PAS TOUT SEUL.</div>
          <h2>
            Une idée en tête ?<br />
            On en parle.
          </h2>
          <button className="btn" onClick={() => open()}>
            Pose ta première question <ArrowUpRight size={20} />
          </button>
          <p>
            <ShieldCheck size={14} /> Ne partage jamais tes mots de passe ou ton
            PIN.
          </p>
          <span className="cta-star">✳</span>
        </section>
      </main>
      <footer className="site-footer wrap">
        <div>
          <a href="/" className="brand">
            <img src="/images/logo.jpg" alt="" />
            LAY<span>IA</span>
          </a>
          <p>
            Ton ami intelligence.
            <br />
            Pensé pour Djibouti. Ouvert sur l’avenir.
          </p>
        </div>
        <div className="footer-links">
          <a href="#pour-toi">Pour toi</a>
          <a href="#premium">Premium</a>
          <a href="#questions">Questions fréquentes</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LAY IA</span>
          <span>Les réponses IA peuvent contenir des erreurs.</span>
          <span>
            Apprendre. Avancer. Créer. <ArrowRight size={14} />
          </span>
        </div>
      </footer>
      {chat && <ChatPanel close={() => setChat(false)} initial={initial} />}
      {login && <AuthPanel close={() => setLogin(false)} />}
    </>
  );
}
