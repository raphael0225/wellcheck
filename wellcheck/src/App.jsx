import { useState, useEffect, useRef } from "react";

// ─── LANGUAGES ───────────────────────────────────────────────────────────────
const FlagUS = ({ w, h }) => (
  <svg viewBox="0 0 60 30" width={w} height={h} style={{ borderRadius: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", display:"block" }}>
    <rect width="60" height="30" fill="#B22234"/>
    <rect y="2.3" width="60" height="2.3" fill="white"/>
    <rect y="6.9" width="60" height="2.3" fill="white"/>
    <rect y="11.5" width="60" height="2.3" fill="white"/>
    <rect y="16.1" width="60" height="2.3" fill="white"/>
    <rect y="20.7" width="60" height="2.3" fill="white"/>
    <rect y="25.3" width="60" height="2.3" fill="white"/>
    <rect width="24" height="16.2" fill="#3C3B6E"/>
    <circle cx="2" cy="1.4" r="0.9" fill="white"/><circle cx="6" cy="1.4" r="0.9" fill="white"/><circle cx="10" cy="1.4" r="0.9" fill="white"/><circle cx="14" cy="1.4" r="0.9" fill="white"/><circle cx="18" cy="1.4" r="0.9" fill="white"/><circle cx="22" cy="1.4" r="0.9" fill="white"/>
    <circle cx="4" cy="3.7" r="0.9" fill="white"/><circle cx="8" cy="3.7" r="0.9" fill="white"/><circle cx="12" cy="3.7" r="0.9" fill="white"/><circle cx="16" cy="3.7" r="0.9" fill="white"/><circle cx="20" cy="3.7" r="0.9" fill="white"/>
    <circle cx="2" cy="6" r="0.9" fill="white"/><circle cx="6" cy="6" r="0.9" fill="white"/><circle cx="10" cy="6" r="0.9" fill="white"/><circle cx="14" cy="6" r="0.9" fill="white"/><circle cx="18" cy="6" r="0.9" fill="white"/><circle cx="22" cy="6" r="0.9" fill="white"/>
    <circle cx="4" cy="8.3" r="0.9" fill="white"/><circle cx="8" cy="8.3" r="0.9" fill="white"/><circle cx="12" cy="8.3" r="0.9" fill="white"/><circle cx="16" cy="8.3" r="0.9" fill="white"/><circle cx="20" cy="8.3" r="0.9" fill="white"/>
    <circle cx="2" cy="10.6" r="0.9" fill="white"/><circle cx="6" cy="10.6" r="0.9" fill="white"/><circle cx="10" cy="10.6" r="0.9" fill="white"/><circle cx="14" cy="10.6" r="0.9" fill="white"/><circle cx="18" cy="10.6" r="0.9" fill="white"/><circle cx="22" cy="10.6" r="0.9" fill="white"/>
    <circle cx="4" cy="12.9" r="0.9" fill="white"/><circle cx="8" cy="12.9" r="0.9" fill="white"/><circle cx="12" cy="12.9" r="0.9" fill="white"/><circle cx="16" cy="12.9" r="0.9" fill="white"/><circle cx="20" cy="12.9" r="0.9" fill="white"/>
    <circle cx="2" cy="15.2" r="0.9" fill="white"/><circle cx="6" cy="15.2" r="0.9" fill="white"/><circle cx="10" cy="15.2" r="0.9" fill="white"/><circle cx="14" cy="15.2" r="0.9" fill="white"/><circle cx="18" cy="15.2" r="0.9" fill="white"/><circle cx="22" cy="15.2" r="0.9" fill="white"/>
  </svg>
);
const FlagPH = ({ w, h }) => (
  <svg viewBox="0 0 60 30" width={w} height={h} style={{ borderRadius: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", display:"block" }}>
    <rect width="60" height="15" fill="#0038A8"/>
    <rect y="15" width="60" height="15" fill="#CE1126"/>
    <polygon points="0,0 27,15 0,30" fill="white"/>
    <circle cx="5" cy="7" r="2" fill="#FCD116"/>
    <circle cx="5" cy="23" r="2" fill="#FCD116"/>
    <circle cx="13" cy="15" r="2" fill="#FCD116"/>
    <polygon points="9,15 10.5,10 12,15 7,12 14,12" fill="#FCD116"/>
  </svg>
);
const FlagES = ({ w, h }) => (
  <svg viewBox="0 0 60 30" width={w} height={h} style={{ borderRadius: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", display:"block" }}>
    <rect width="60" height="7.5" fill="#c60b1e"/>
    <rect y="7.5" width="60" height="15" fill="#ffc400"/>
    <rect y="22.5" width="60" height="7.5" fill="#c60b1e"/>
    <rect x="16" y="10" width="3" height="10" fill="#c60b1e"/>
    <rect x="21" y="10" width="3" height="10" fill="#c60b1e"/>
    <rect x="16" y="10" width="8" height="2" fill="#c60b1e"/>
    <rect x="16" y="18" width="8" height="2" fill="#c60b1e"/>
  </svg>
);
const FlagJP = ({ w, h }) => (
  <svg viewBox="0 0 60 30" width={w} height={h} style={{ borderRadius: 4, boxShadow: "0 1px 4px rgba(0,0,0,0.2)", display:"block" }}>
    <rect width="60" height="30" fill="white"/>
    <circle cx="30" cy="15" r="9" fill="#BC002D"/>
  </svg>
);

const FlagImg = ({ code, size = 48 }) => {
  const w = size * 1.5, h = size;
  if (code === "us") return <FlagUS w={w} h={h} />;
  if (code === "ph") return <FlagPH w={w} h={h} />;
  if (code === "es") return <FlagES w={w} h={h} />;
  if (code === "jp") return <FlagJP w={w} h={h} />;
  return null;
};

// ─── UI TRANSLATIONS ──────────────────────────────────────────────────────────
const UI = {
  en: {
    subtitle: "Employee Health & Wellness Assessment",
    chooseLanguage: "Choose your language",
    chooseAreas: "Choose your assessment areas",
    chooseDesc: "Select one or more areas you'd like to check in on today. Your responses are completely confidential.",
    selectAll: "Select All", clear: "Clear",
    beginBtn: (n) => n === 0 ? "Select at least one area to begin" : `Begin Assessment · ${n} area${n > 1 ? "s" : ""} selected`,
    sessionActive: "Session Active · Confidential", assessmentComplete: "Assessment Complete",
    startNew: "Start New", changeAreas: "← Change Areas", changeLanguage: "🌐 Language",
    placeholder: "Share how you're feeling...", placeholderDone: "Assessment complete — start a new session above",
    disclaimer: "WellCheck is a wellness support tool, not a medical service. If you are in crisis, call or text",
    domains: {
      general: { label: "General Health & Wellness", desc: "Energy, sleep, physical symptoms, preventive care" },
      mental:  { label: "Mental Health & Psychosocial", desc: "Mood, anxiety, concentration, emotional wellbeing (PHQ-9, GAD-7)" },
      lifestyle: { label: "Lifestyle & Behavioral Health", desc: "Physical activity, nutrition, hydration, screen time" },
      occupational: { label: "Occupational Health & Stress", desc: "Workload, work-life balance, burnout, job satisfaction" },
      financial: { label: "Financial Health & Wellness", desc: "Financial stress, debt, budgeting, employee financial benefits" }
    }
  },
  tl: {
    subtitle: "Pagtatasa ng Kalusugan at Kagalingan ng Empleyado",
    chooseLanguage: "Pumili ng wika",
    chooseAreas: "Piliin ang iyong mga lugar ng pagtatasa",
    chooseDesc: "Pumili ng isa o higit pang mga lugar na nais mong suriin ngayon. Ang iyong mga sagot ay ganap na kumpidensyal.",
    selectAll: "Piliin Lahat", clear: "I-clear",
    beginBtn: (n) => n === 0 ? "Pumili ng kahit isang lugar upang magsimula" : `Simulan ang Pagtatasa · ${n} lugar${n > 1 ? "" : ""} ang napili`,
    sessionActive: "Aktibong Sesyon · Kumpidensyal", assessmentComplete: "Kumpleto na ang Pagtatasa",
    startNew: "Bagong Simula", changeAreas: "← Baguhin ang mga Lugar", changeLanguage: "🌐 Wika",
    placeholder: "Ibahagi kung paano ka nararamdaman...", placeholderDone: "Kumpleto na ang pagtatasa — magsimula ng bagong sesyon sa itaas",
    disclaimer: "Ang WellCheck ay isang tool sa suporta sa kalusugan, hindi isang medikal na serbisyo. Kung nasa krisis ka, tumawag o mag-text sa",
    domains: {
      general: { label: "Pangkalahatang Kalusugan at Kagalingan", desc: "Enerhiya, tulog, mga sintomas, pag-aalaga sa kalusugan" },
      mental:  { label: "Kalusugang Pangkaisipan at Psychosocial", desc: "Mood, pagkabalisa, konsentrasyon, emosyonal na kagalingan (PHQ-9, GAD-7)" },
      lifestyle: { label: "Pamumuhay at Gawi sa Kalusugan", desc: "Pisikal na aktibidad, nutrisyon, hydration, oras sa screen" },
      occupational: { label: "Kalusugan sa Trabaho at Stress", desc: "Workload, balanse sa trabaho at buhay, burnout, kasiyahan sa trabaho" },
      financial: { label: "Pinansyal na Kalusugan at Kagalingan", desc: "Stress sa pananalapi, utang, badyet, mga benepisyo ng empleyado" }
    }
  },
  es: {
    subtitle: "Evaluación de Salud y Bienestar del Empleado",
    chooseLanguage: "Elige tu idioma",
    chooseAreas: "Elige tus áreas de evaluación",
    chooseDesc: "Selecciona una o más áreas que deseas revisar hoy. Tus respuestas son completamente confidenciales.",
    selectAll: "Seleccionar Todo", clear: "Limpiar",
    beginBtn: (n) => n === 0 ? "Selecciona al menos un área para comenzar" : `Iniciar Evaluación · ${n} área${n > 1 ? "s" : ""} seleccionada${n > 1 ? "s" : ""}`,
    sessionActive: "Sesión Activa · Confidencial", assessmentComplete: "Evaluación Completa",
    startNew: "Nueva Sesión", changeAreas: "← Cambiar Áreas", changeLanguage: "🌐 Idioma",
    placeholder: "Comparte cómo te sientes...", placeholderDone: "Evaluación completa — inicia una nueva sesión arriba",
    disclaimer: "WellCheck es una herramienta de apoyo al bienestar, no un servicio médico. Si estás en crisis, llama o envía un mensaje de texto al",
    domains: {
      general: { label: "Salud y Bienestar General", desc: "Energía, sueño, síntomas físicos, atención preventiva" },
      mental:  { label: "Salud Mental y Psicosocial", desc: "Estado de ánimo, ansiedad, concentración, bienestar emocional (PHQ-9, GAD-7)" },
      lifestyle: { label: "Salud Conductual y de Estilo de Vida", desc: "Actividad física, nutrición, hidratación, tiempo de pantalla" },
      occupational: { label: "Salud Ocupacional y Estrés", desc: "Carga de trabajo, equilibrio trabajo-vida, burnout, satisfacción laboral" },
      financial: { label: "Salud y Bienestar Financiero", desc: "Estrés financiero, deudas, presupuesto, beneficios financieros del empleado" }
    }
  },
  ja: {
    subtitle: "従業員健康・ウェルネス評価",
    chooseLanguage: "言語を選択してください",
    chooseAreas: "評価エリアを選択してください",
    chooseDesc: "本日チェックしたいエリアを1つ以上選択してください。回答は完全に機密扱いとなります。",
    selectAll: "すべて選択", clear: "クリア",
    beginBtn: (n) => n === 0 ? "開始するには少なくとも1つのエリアを選択してください" : `評価を開始 · ${n}つのエリアが選択されました`,
    sessionActive: "セッション中 · 機密", assessmentComplete: "評価完了",
    startNew: "新しいセッション", changeAreas: "← エリアを変更", changeLanguage: "🌐 言語",
    placeholder: "お気持ちを教えてください...", placeholderDone: "評価完了 — 上で新しいセッションを開始してください",
    disclaimer: "WellCheckはウェルネスサポートツールであり、医療サービスではありません。危機的状況の場合は、以下に電話またはテキストしてください：",
    domains: {
      general: { label: "一般的な健康とウェルネス", desc: "エネルギー、睡眠、身体症状、予防ケア" },
      mental:  { label: "メンタルヘルスと心理社会的健康", desc: "気分、不安、集中力、感情的健康（PHQ-9、GAD-7）" },
      lifestyle: { label: "ライフスタイルと行動的健康", desc: "身体活動、栄養、水分補給、スクリーンタイム" },
      occupational: { label: "職業的健康とストレス", desc: "業務量、ワークライフバランス、燃え尽き症候群、仕事の満足度" },
      financial: { label: "財務的健康とウェルネス", desc: "財務ストレス、借金、予算管理、従業員財務福利厚生" }
    }
  }
};

const LANGUAGES = [
  { id: "en", label: "English",  native: "English", country: "United States", flagCode: "us" },
  { id: "tl", label: "Tagalog",  native: "Tagalog",  country: "Philippines",   flagCode: "ph" },
  { id: "es", label: "Spanish",  native: "Español",  country: "Spain",         flagCode: "es" },
  { id: "ja", label: "Japanese", native: "日本語",    country: "Japan",         flagCode: "jp" }
];

// ─── DOMAIN CONFIG ────────────────────────────────────────────────────────────
const DOMAIN_IDS = ["general", "mental", "lifestyle", "occupational", "financial"];
const DOMAIN_META = {
  general:     { icon: "💊", color: "#2dd4bf" },
  mental:      { icon: "🧠", color: "#818cf8" },
  lifestyle:   { icon: "🏃", color: "#34d399" },
  occupational:{ icon: "💼", color: "#fb923c" },
  financial:   { icon: "💰", color: "#facc15" }
};

// ─── SYSTEM PROMPT BUILDER ────────────────────────────────────────────────────
function buildSystemPrompt(selectedDomains, langId) {
  const langInstructions = {
    en: "Conduct the entire assessment in English.",
    tl: "Isagawa ang buong pagtatasa sa Tagalog. Gamitin ang magalang at mainit na tono.",
    es: "Conduce toda la evaluación en español. Usa un tono cálido y profesional.",
    ja: "評価全体を日本語で行ってください。丁寧で温かみのある敬語を使用してください。"
  };

  const domainDetails = {
    general:     "GENERAL HEALTH & WELLNESS — Energy levels, sleep quality, physical symptoms, preventive care habits, chronic conditions",
    mental:      "MENTAL HEALTH & PSYCHOSOCIAL — Using validated frameworks from PHQ-9 (depression) and GAD-7 (anxiety) to assess mood, anxiety, concentration, and emotional wellbeing",
    lifestyle:   "LIFESTYLE & BEHAVIORAL HEALTH — Physical activity, nutrition, hydration, substance use, screen time",
    occupational:"OCCUPATIONAL HEALTH & WORKPLACE STRESS — Workload, work-life balance, job satisfaction, relationships with colleagues/managers, burnout indicators",
    financial:   "FINANCIAL HEALTH & WELLNESS — Financial stress levels, debt concerns, budgeting confidence, awareness of employee financial benefits (401k, EAP financial counseling, emergency funds)"
  };

  const selectedDetails = selectedDomains.map((id, i) => `${i + 1}. ${domainDetails[id]}`).join("\n");
  const count = selectedDomains.length;

  return `You are WellCheck AI, a compassionate and professional employee health assessment assistant.

LANGUAGE INSTRUCTION: ${langInstructions[langId]}

The employee has chosen to complete assessment in the following ${count} domain${count > 1 ? "s" : ""}:
${selectedDetails}

ASSESSMENT FLOW:
- Begin immediately — the employee has already seen the welcome screen and selected their domains
- Greet them warmly by name (you will learn it in the first exchange) and confirm which areas you will cover
- Ask one or two questions at a time — never overwhelm with a long list
- Use conversational, plain-language phrasing (avoid clinical jargon)
- Acknowledge and validate responses empathetically before moving on
- Adapt follow-up questions based on what the employee shares
- Cover ONLY the selected domains above
- After covering all selected domains (approximately ${count * 4} to ${count * 5} exchanges), provide a SUMMARY

DOMAIN GUIDANCE:
${selectedDomains.includes("general") ? "- General Health: ask about energy, sleep quality, recent physical symptoms, last checkup\n" : ""}${selectedDomains.includes("mental") ? "- Mental Health: gently explore mood over the past 2 weeks, anxiety, concentration, hopelessness (PHQ-9/GAD-7 framework) — be especially warm here\n" : ""}${selectedDomains.includes("lifestyle") ? "- Lifestyle: ask about exercise frequency, diet quality, hydration, sleep hours, screen time\n" : ""}${selectedDomains.includes("occupational") ? "- Occupational: ask about workload, work-life balance, relationship with manager/team, burnout signs\n" : ""}${selectedDomains.includes("financial") ? "- Financial Health: ask about financial stress (1-10), confidence managing expenses, awareness of employer benefits, debt concerns — be non-judgmental, normalize financial stress\n" : ""}
SUMMARY FORMAT (when all domains are complete):
- Brief personalized overview of their responses
- Risk indicators per domain: 🟢 Low concern | 🟡 Moderate | 🔴 High — recommend support
- 3-5 personalized actionable recommendations
- Relevant resources: EAP, HR benefits, mental health apps, financial counseling
- If high risk detected: "HR/Admin Flag: [reason]"

CRITICAL SAFETY RULES:
- If suicidal ideation or self-harm is mentioned, IMMEDIATELY provide: 988 Suicide & Crisis Lifeline (call/text 988), Crisis Text Line (text HOME to 741741)
- Never diagnose — use "your responses suggest..." language
- Responses are confidential — remind employee if needed
- Be warm, non-judgmental, and trauma-informed
- Never shame employees about financial stress

TONE: Professional but human. Like a knowledgeable friend who genuinely cares.`;
}

// ─── WELCOME MESSAGE BUILDER ──────────────────────────────────────────────────
function buildWelcome(selectedDomains, langId, uiT) {
  const domainNames = selectedDomains.map(id => uiT.domains[id]?.label).join(", ");
  const msgs = {
    en: `Hello, and welcome to **WellCheck** 👋\n\nYou've chosen to check in on: **${domainNames}**.\n\n- Completely **confidential** — responses are only used to help you\n- No right or wrong answers\n- You can change areas at any time\n\n**What's your first name?** (No last name needed)`,
    tl: `Kumusta, at maligayang pagdating sa **WellCheck** 👋\n\nPinili mong suriin ang: **${domainNames}**.\n\n- Ganap na **kumpidensyal** — ang iyong mga sagot ay para lang sa iyo\n- Walang tama o maling sagot\n- Maaari kang magpalit ng mga lugar anumang oras\n\n**Ano ang iyong pangalan?** (Hindi kailangan ng apelyido)`,
    es: `Hola, bienvenido/a a **WellCheck** 👋\n\nHas elegido revisar: **${domainNames}**.\n\n- Completamente **confidencial** — tus respuestas son solo para ayudarte\n- No hay respuestas correctas o incorrectas\n- Puedes cambiar las áreas en cualquier momento\n\n**¿Cuál es tu nombre?** (No se necesita apellido)`,
    ja: `こんにちは、**WellCheck**へようこそ 👋\n\n選択されたエリア：**${domainNames}**\n\n- 完全に**機密**です — 回答はあなたのサポートのためだけに使用されます\n- 正解・不正解はありません\n- いつでもエリアを変更できます\n\n**お名前を教えてください**（姓は不要です）`
  };
  return msgs[langId] || msgs.en;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const colorRgb = (hex) => { const m = hex.match(/[\da-f]{2}/gi); return m ? m.map(x => parseInt(x, 16)).join(",") : "255,255,255"; };

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function WellCheckApp() {
  const [phase, setPhase] = useState("lang"); // lang | select | chat | complete
  const [langId, setLangId] = useState("en");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const uiT = UI[langId] || UI.en;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const chooseLanguage = (id) => { setLangId(id); setPhase("select"); };
  const toggleDomain = (id) => setSelectedDomains(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  const selectAll = () => setSelectedDomains([...DOMAIN_IDS]);
  const clearAll = () => setSelectedDomains([]);

  const startAssessment = () => {
    if (selectedDomains.length === 0) return;
    setMessages([{ role: "assistant", content: buildWelcome(selectedDomains, langId, uiT) }]);
    setPhase("chat");
  };

  const restart = () => { setMessages([]); setSelectedDomains([]); setInput(""); setPhase("select"); };
  const changeLang = () => { setMessages([]); setSelectedDomains([]); setInput(""); setPhase("lang"); };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(selectedDomains, langId),
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("\n") || "Something went wrong. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: text }]);
      if (text.toLowerCase().includes("hr/admin flag") || text.toLowerCase().includes("personalized overview") || text.includes("🟢") || text.includes("🟡") || text.includes("🔴")) {
        setPhase("complete");
      }
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "Error. Please refresh and try again." }]); }
    setLoading(false);
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const renderMessage = (msg, i) => {
    const isUser = msg.role === "user";
    const withBreaks = [];
    msg.content.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
      p.startsWith("**") && p.endsWith("**") ? <strong key={j}>{p.slice(2, -2)}</strong> : p
    ).forEach((part, j) => {
      if (typeof part === "string") { part.split("\n").forEach((line, k) => { if (k > 0) withBreaks.push(<br key={`b${j}${k}`} />); withBreaks.push(line); }); }
      else withBreaks.push(part);
    });
    return (
      <div key={i} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 16, animation: "fadeSlideIn 0.3s ease" }}>
        {!isUser && <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2d7a52, #52c27a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 10, marginTop: 2, fontSize: 16 }}>🩺</div>}
        <div style={{ maxWidth: "72%", background: isUser ? "linear-gradient(135deg, #2d7a52, #52c27a)" : "#ffffff", color: isUser ? "#ffffff" : "#1a4d32", padding: "12px 16px", borderRadius: isUser ? "18px 18px 4px 18px" : "4px 18px 18px 18px", fontSize: 14, lineHeight: 1.65, boxShadow: isUser ? "0 4px 12px rgba(45,122,82,0.25)" : "0 2px 8px rgba(52,139,93,0.08)", border: isUser ? "none" : "1px solid rgba(52,139,93,0.12)" }}>
          {withBreaks}
        </div>
      </div>
    );
  };

  // ─── SHARED STYLES ──────────────────────────────────────────────────────────
  const card = { background: "#ffffff", borderRadius: 20, border: "1px solid rgba(52,139,93,0.15)", boxShadow: "0 8px 40px rgba(52,139,93,0.12), 0 2px 8px rgba(52,139,93,0.06)", overflow: "hidden" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e8f5e9 0%, #f1f8f4 45%, #e0f2e9 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia','Times New Roman',serif", padding: "20px" }}>
      <style>{`
        @keyframes fadeSlideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.3; } 50% { opacity:0.9; } }
        ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:rgba(52,139,93,0.25); border-radius:2px; }
        textarea:focus { outline:none; } textarea { resize:none; }
        .card-hover { transition:all 0.2s ease; cursor:pointer; }
        .card-hover:hover { transform:translateY(-2px); box-shadow: 0 6px 20px rgba(52,139,93,0.12) !important; }
        .lang-btn { transition:all 0.2s ease; cursor:pointer; }
        .lang-btn:hover { transform:translateY(-2px) scale(1.02); box-shadow: 0 6px 20px rgba(52,139,93,0.15) !important; }
        .action-btn { transition:all 0.2s ease; }
        .action-btn:hover:not(:disabled) { transform:translateY(-1px); }
      `}</style>

      {/* ── LOGO ── */}
      <div style={{ width: "100%", maxWidth: 680, marginBottom: 18, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #2d7a52, #52c27a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 16px rgba(52,139,93,0.25)" }}>🩺</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#1a4d32", letterSpacing: "-0.5px" }}>Well<span style={{ color: "#2d7a52" }}>Check</span></h1>
        </div>
        <p style={{ margin: 0, color: "#6a9c7a", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          {phase !== "lang" && <FlagImg code={LANGUAGES.find(l => l.id === langId)?.flagCode} size={14} />}
          {uiT.subtitle}
        </p>
      </div>

      {/* ── LANGUAGE SCREEN ── */}
      {phase === "lang" && (
        <div style={{ width: "100%", maxWidth: 680, animation: "fadeSlideIn 0.4s ease" }}>
          <div style={card}>
            <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid rgba(52,139,93,0.1)", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>🌐</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 20, color: "#1a4d32", fontWeight: 600 }}>
                {UI.en.chooseLanguage} / {UI.tl.chooseLanguage} / {UI.es.chooseLanguage} / {UI.ja.chooseLanguage}
              </h2>
            </div>
            <div style={{ padding: "20px 24px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {LANGUAGES.map(lang => (
                <div key={lang.id} className="lang-btn" onClick={() => chooseLanguage(lang.id)}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "24px 16px 20px", borderRadius: 14, background: "#ffffff", border: "1px solid rgba(52,139,93,0.18)", boxShadow: "0 2px 8px rgba(52,139,93,0.08)", textAlign: "center" }}>
                  <FlagImg code={lang.flagCode} size={48} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1a4d32" }}>{lang.native}</div>
                    <div style={{ fontSize: 12, color: "#7aab8a", marginTop: 2 }}>{lang.country}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "#2d7a52", background: "rgba(52,139,93,0.08)", borderRadius: 20, padding: "3px 12px", border: "1px solid rgba(52,139,93,0.15)" }}>Select ›</span>
                </div>
              ))}
            </div>
          </div>
          <p style={{ marginTop: 14, fontSize: 11, color: "#7aab8a", textAlign: "center", lineHeight: 1.5 }}>
            WellCheck is a wellness support tool, not a medical service. If you are in crisis, call or text <strong style={{ color: "#2d7a52" }}>988</strong>.
          </p>
        </div>
      )}

      {/* ── DOMAIN SELECTION SCREEN ── */}
      {phase === "select" && (
        <div style={{ width: "100%", maxWidth: 680, animation: "fadeSlideIn 0.4s ease" }}>
          <div style={card}>
            <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid rgba(52,139,93,0.1)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <h2 style={{ margin: "0 0 6px", fontSize: 18, color: "#1a4d32", fontWeight: 600 }}>{uiT.chooseAreas}</h2>
                  <p style={{ margin: "0 0 12px", fontSize: 13, color: "#6a9c7a", lineHeight: 1.5 }}>{uiT.chooseDesc}</p>
                </div>
                <button onClick={changeLang} style={{ flexShrink: 0, fontSize: 11, color: "#2d7a52", background: "rgba(52,139,93,0.08)", border: "1px solid rgba(52,139,93,0.2)", borderRadius: 6, padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>
                  <FlagImg code={LANGUAGES.find(l => l.id === langId)?.flagCode} size={14} />
                  {uiT.changeLanguage}
                </button>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={selectAll} style={{ fontSize: 12, color: "#2d7a52", background: "rgba(52,139,93,0.1)", border: "1px solid rgba(52,139,93,0.25)", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>{uiT.selectAll}</button>
                <button onClick={clearAll} style={{ fontSize: 12, color: "#7aab8a", background: "transparent", border: "1px solid rgba(52,139,93,0.15)", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>{uiT.clear}</button>
              </div>
            </div>
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              {DOMAIN_IDS.map(id => {
                const meta = DOMAIN_META[id];
                const info = uiT.domains[id];
                const selected = selectedDomains.includes(id);
                const rgb = colorRgb(meta.color);
                return (
                  <div key={id} className="card-hover" onClick={() => toggleDomain(id)}
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: selected ? `rgba(${rgb},0.08)` : "#ffffff", border: selected ? `1px solid ${meta.color}88` : "1px solid rgba(52,139,93,0.12)", boxShadow: selected ? `0 4px 16px rgba(${rgb},0.15)` : "0 1px 4px rgba(52,139,93,0.06)" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, border: selected ? `2px solid ${meta.color}` : "2px solid #c8e0ce", background: selected ? meta.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                      {selected && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(${rgb},0.12)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{meta.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: selected ? "#1a4d32" : "#2d5c3e", marginBottom: 2 }}>{info.label}</div>
                      <div style={{ fontSize: 12, color: "#7aab8a", lineHeight: 1.4 }}>{info.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "12px 24px 24px" }}>
              <button className="action-btn" onClick={startAssessment} disabled={selectedDomains.length === 0}
                style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", cursor: selectedDomains.length === 0 ? "not-allowed" : "pointer", background: selectedDomains.length === 0 ? "#d8eadc" : "linear-gradient(135deg, #2d7a52, #52c27a)", color: selectedDomains.length === 0 ? "#9dc0a8" : "#ffffff", fontSize: 15, fontWeight: 600, fontFamily: "Georgia,serif", boxShadow: selectedDomains.length > 0 ? "0 4px 16px rgba(52,139,93,0.3)" : "none" }}>
                {uiT.beginBtn(selectedDomains.length)}
              </button>
            </div>
          </div>
          <p style={{ marginTop: 14, fontSize: 11, color: "#7aab8a", textAlign: "center", lineHeight: 1.5 }}>
            {uiT.disclaimer} <strong style={{ color: "#2d7a52" }}>988</strong>.
          </p>
        </div>
      )}

      {/* ── CHAT SCREEN ── */}
      {(phase === "chat" || phase === "complete") && (
        <div style={{ width: "100%", maxWidth: 680, animation: "fadeSlideIn 0.4s ease" }}>
          {/* Domain pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12, justifyContent: "center" }}>
            {selectedDomains.map(id => {
              const meta = DOMAIN_META[id];
              const info = uiT.domains[id];
              const rgb = colorRgb(meta.color);
              return <span key={id} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `rgba(${rgb},0.12)`, border: `1px solid rgba(${rgb},0.35)`, color: "#2d5c3e" }}>{meta.icon} {info.label}</span>;
            })}
          </div>
          <div style={{ ...card, display: "flex", flexDirection: "column", height: 500 }}>
            {/* Status bar */}
            <div style={{ padding: "10px 18px", borderBottom: "1px solid rgba(52,139,93,0.1)", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: phase === "complete" ? "#f59e0b" : "#2d7a52", boxShadow: `0 0 6px ${phase === "complete" ? "#f59e0b" : "#52c27a"}` }} />
              <span style={{ fontSize: 12, color: "#7aab8a", fontFamily: "monospace" }}>{phase === "complete" ? uiT.assessmentComplete : uiT.sessionActive}</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                <button onClick={changeLang} style={{ fontSize: 11, color: "#7aab8a", background: "transparent", border: "1px solid rgba(52,139,93,0.2)", borderRadius: 6, padding: "3px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                  <FlagImg code={LANGUAGES.find(l => l.id === langId)?.flagCode} size={14} />
                  {uiT.changeLanguage}
                </button>
                <button onClick={restart} style={{ fontSize: 11, color: "#2d7a52", background: "transparent", border: "1px solid rgba(52,139,93,0.35)", borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>
                  {phase === "complete" ? uiT.startNew : uiT.changeAreas}
                </button>
              </div>
            </div>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px", background: "#f7fbf8" }}>
              {messages.map((m, i) => renderMessage(m, i))}
              {loading && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2d7a52, #52c27a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🩺</div>
                  <div style={{ display: "flex", gap: 5, padding: "12px 16px", background: "#ffffff", borderRadius: "4px 18px 18px 18px", border: "1px solid rgba(52,139,93,0.15)", boxShadow: "0 2px 8px rgba(52,139,93,0.08)" }}>
                    {[0,1,2].map(j => <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: "#52c27a", animation: `pulse 1.2s ease-in-out ${j*0.2}s infinite` }} />)}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            {/* Input */}
            <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(52,139,93,0.1)", display: "flex", gap: 10, alignItems: "flex-end", background: "#ffffff" }}>
              <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder={phase === "complete" ? uiT.placeholderDone : uiT.placeholder}
                disabled={phase === "complete" || loading} rows={1}
                style={{ flex: 1, background: "#f2f8f4", border: "1px solid rgba(52,139,93,0.2)", borderRadius: 12, padding: "10px 14px", color: "#1a4d32", fontSize: 14, fontFamily: "Georgia,serif", lineHeight: 1.5, maxHeight: 100, overflowY: "auto", opacity: phase === "complete" ? 0.5 : 1 }} />
              <button onClick={sendMessage} disabled={!input.trim() || loading || phase === "complete"}
                style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: !input.trim() || loading || phase === "complete" ? "#d8eadc" : "linear-gradient(135deg, #2d7a52, #52c27a)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "all 0.2s", boxShadow: input.trim() && !loading ? "0 4px 12px rgba(52,139,93,0.3)" : "none", color: !input.trim() || loading || phase === "complete" ? "#9dc0a8" : "#ffffff" }}>➤</button>
            </div>
          </div>
          <p style={{ marginTop: 14, fontSize: 11, color: "#7aab8a", textAlign: "center", lineHeight: 1.5 }}>
            {uiT.disclaimer} <strong style={{ color: "#2d7a52" }}>988</strong>.
          </p>
        </div>
      )}
    </div>
  );
}
