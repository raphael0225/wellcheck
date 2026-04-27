import { useState, useEffect } from "react";

// ─── Google Fonts ─────────────────────────────────────────────────────────────
const FONT_LINK = document.createElement("link");
FONT_LINK.rel = "stylesheet";
FONT_LINK.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Lora:ital,wght@0,500;1,400&display=swap";
document.head.appendChild(FONT_LINK);

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --sky:      #e8f4f8;
  --teal:     #3a9b8e;
  --teal2:    #2d7a6f;
  --coral:    #f07b5a;
  --sun:      #f9c74f;
  --bg:       #f6f9fb;
  --white:    #ffffff;
  --text:     #1e2d2b;
  --muted:    #6b8280;
  --border:   #ddeae8;
  --danger:   #e53935;
  --danger-bg:#fff3f3;
  --radius:   20px;
  --shadow:   0 4px 32px rgba(58,155,142,0.10), 0 1px 4px rgba(0,0,0,0.05);
}

.mc-root {
  font-family: 'Nunito', sans-serif;
  background: var(--bg);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 80px;
  color: var(--text);
}

/* CRISIS OVERLAY */
.mc-crisis-banner {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 20px;
}
.mc-crisis-box {
  background: var(--white);
  border-radius: var(--radius);
  padding: 36px 32px;
  max-width: 520px; width: 100%;
  border-top: 6px solid var(--danger);
  box-shadow: 0 8px 48px rgba(0,0,0,0.18);
  text-align: center;
}
.mc-crisis-icon { font-size: 2.8rem; margin-bottom: 12px; }
.mc-crisis-box h2 { font-size: 1.4rem; font-weight: 800; color: var(--danger); margin-bottom: 10px; }
.mc-crisis-box p { color: var(--muted); font-size: 0.95rem; line-height: 1.65; margin-bottom: 18px; }
.mc-crisis-number {
  display: inline-block;
  background: var(--danger); color: #fff;
  font-size: 1.7rem; font-weight: 900;
  padding: 10px 32px; border-radius: 100px;
  margin-bottom: 16px; letter-spacing: 1px;
}
.mc-crisis-links { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.mc-crisis-link {
  background: var(--danger-bg);
  border: 1.5px solid #ffcdd2;
  border-radius: 10px; padding: 10px 16px;
  font-size: 0.88rem; color: var(--danger);
  font-weight: 700; text-decoration: none;
}
.mc-crisis-continue {
  font-size: 0.8rem; color: var(--muted);
  cursor: pointer; background: none; border: none;
  font-family: 'Nunito', sans-serif; text-decoration: underline;
}

/* HEADER */
.mc-header {
  width: 100%; max-width: 600px;
  padding: 36px 0 0; text-align: center; margin-bottom: 8px;
}
.mc-logo {
  display: inline-flex; align-items: center; gap: 10px; margin-bottom: 6px;
}
.mc-logo-icon {
  width: 44px; height: 44px; background: var(--teal);
  border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;
}
.mc-logo h1 { font-size: 1.7rem; font-weight: 900; color: var(--teal2); letter-spacing: -0.5px; }
.mc-logo h1 span { color: var(--coral); }
.mc-tagline { color: var(--muted); font-size: 0.88rem; font-weight: 600; }

/* PROGRESS */
.mc-progress-wrap { width: 100%; max-width: 600px; margin: 20px 0 0; }
.mc-steps {
  display: flex; align-items: center; justify-content: center;
  gap: 6px; margin-bottom: 8px;
}
.mc-step-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--border); transition: all 0.3s;
}
.mc-step-dot.done { background: var(--teal); }
.mc-step-dot.active { background: var(--coral); width: 24px; border-radius: 100px; }
.mc-progress-label { text-align: center; font-size: 0.78rem; color: var(--muted); font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }

/* CARD */
.mc-card {
  background: var(--white); border-radius: var(--radius);
  padding: 36px 32px; max-width: 600px; width: 100%;
  box-shadow: var(--shadow); margin-top: 20px;
  animation: fadeUp 0.35s ease;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
.mc-card h2 { font-size: 1.45rem; font-weight: 800; margin-bottom: 8px; line-height: 1.3; }
.mc-sub { color: var(--muted); font-size: 0.93rem; line-height: 1.65; margin-bottom: 20px; font-weight: 600; }

/* BULLET LIST */
.mc-bullet-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.mc-bullet-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.9rem; font-weight: 600; }
.mc-bullet-list li .bicon {
  flex-shrink: 0; width: 26px; height: 26px; border-radius: 8px;
  background: var(--sky); display: flex; align-items: center; justify-content: center; font-size: 0.85rem;
}

.mc-notice {
  background: #fff8e1; border: 1.5px solid #ffe082;
  border-radius: 12px; padding: 14px 16px;
  font-size: 0.85rem; color: #7a5c00; font-weight: 600;
  margin-bottom: 20px; line-height: 1.5;
}
.mc-notice strong { color: #5a4200; }

/* AGE SELECTOR */
.mc-age-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
.mc-age-btn {
  border: 2px solid var(--border); border-radius: 16px;
  background: var(--bg); padding: 20px 8px 14px;
  cursor: pointer; text-align: center; transition: all 0.2s;
  font-family: 'Nunito', sans-serif;
}
.mc-age-btn:hover { border-color: var(--teal); background: var(--sky); }
.mc-age-btn.selected { border-color: var(--teal); background: var(--sky); }
.mc-age-btn .age-illo { font-size: 2rem; display: block; margin-bottom: 6px; }
.mc-age-btn .age-range { font-size: 1rem; font-weight: 800; color: var(--teal2); }
.mc-age-btn .age-desc { font-size: 0.74rem; color: var(--muted); font-weight: 600; margin-top: 2px; }

/* CONSENT */
.mc-consent-checks { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.mc-check-row {
  display: flex; align-items: flex-start; gap: 12px;
  cursor: pointer; padding: 14px;
  border: 2px solid var(--border); border-radius: 12px; transition: border-color 0.2s;
}
.mc-check-row:hover { border-color: var(--teal); }
.mc-check-row.checked { border-color: var(--teal); background: var(--sky); }
.mc-check-box {
  width: 22px; height: 22px; border-radius: 6px;
  border: 2px solid var(--border); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; transition: all 0.15s; margin-top: 1px;
}
.mc-check-row.checked .mc-check-box { background: var(--teal); border-color: var(--teal); color: #fff; }
.mc-check-label { font-size: 0.88rem; font-weight: 600; line-height: 1.5; }

/* QUESTION */
.mc-q-section {
  font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--teal); margin-bottom: 8px;
}
.mc-q-text { font-size: 1.15rem; font-weight: 700; line-height: 1.5; margin-bottom: 6px; }
.mc-q-sub { font-size: 0.83rem; color: var(--muted); font-weight: 600; margin-bottom: 22px; line-height: 1.5; }
.mc-crisis-q {
  background: var(--danger-bg); border: 2px solid #ffcdd2;
  border-radius: 14px; padding: 16px 18px; margin-bottom: 8px;
  font-size: 0.9rem; color: #7a2020; font-weight: 700; line-height: 1.55;
}

/* OPTIONS */
.mc-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.mc-option {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 18px; border: 2px solid var(--border);
  border-radius: 14px; cursor: pointer; transition: all 0.15s;
  font-size: 0.95rem; font-weight: 700; background: var(--bg);
  color: var(--text); font-family: 'Nunito', sans-serif; text-align: left;
  width: 100%;
}
.mc-option:hover { border-color: var(--teal); background: var(--sky); }
.mc-option.selected { border-color: var(--teal); background: var(--sky); color: var(--teal2); }
.mc-option-icon { font-size: 1.3rem; flex-shrink: 0; width: 34px; text-align: center; }

/* EMOJI SCALE */
.mc-emoji-scale { display: flex; justify-content: space-between; gap: 6px; margin-bottom: 24px; }
.mc-emoji-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px;
  padding: 14px 4px 10px; border: 2px solid var(--border); border-radius: 14px;
  cursor: pointer; background: var(--bg); font-family: 'Nunito', sans-serif; transition: all 0.15s;
}
.mc-emoji-btn:hover { border-color: var(--teal); background: var(--sky); transform: scale(1.04); }
.mc-emoji-btn.selected { border-color: var(--teal); background: var(--sky); transform: scale(1.06); }
.mc-emoji-btn .big-emoji { font-size: 1.9rem; line-height: 1; }
.mc-emoji-btn .emoji-label { font-size: 0.7rem; font-weight: 800; color: var(--muted); text-align: center; }

/* RESULTS */
.mc-result-header { text-align: center; margin-bottom: 28px; }
.mc-result-illo { font-size: 3rem; margin-bottom: 8px; }
.mc-result-level {
  display: inline-block; padding: 6px 22px; border-radius: 100px;
  font-size: 0.82rem; font-weight: 800; letter-spacing: 0.06em;
  text-transform: uppercase; margin-bottom: 10px;
}
.level-low      { background: #e8f5e9; color: #2e7d32; }
.level-moderate { background: #fff8e1; color: #e65100; }
.level-high     { background: #fce4ec; color: #c62828; }
.level-urgent   { background: var(--danger); color: #fff; }

.mc-result-msg { font-family: 'Lora', serif; font-style: italic; font-size: 1.05rem; color: var(--muted); line-height: 1.65; }

.mc-domain-cards { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.mc-domain-card { border: 1.5px solid var(--border); border-radius: 14px; padding: 16px 18px; background: var(--bg); }
.mc-domain-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.mc-domain-name { font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; gap: 8px; }
.mc-domain-badge { font-size: 0.72rem; font-weight: 800; padding: 3px 10px; border-radius: 100px; }
.mc-bar-bg { height: 8px; background: var(--border); border-radius: 100px; overflow: hidden; }
.mc-bar-fill { height: 100%; border-radius: 100px; transition: width 0.9s ease; }
.fill-low      { background: #66bb6a; }
.fill-moderate { background: var(--sun); }
.fill-high     { background: var(--coral); }
.fill-urgent   { background: var(--danger); }

.mc-result-note {
  background: var(--sky); border-radius: 14px; padding: 18px 20px;
  font-size: 0.87rem; color: var(--teal2); font-weight: 700; line-height: 1.6; margin-bottom: 20px;
}

.mc-next-steps { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
.mc-next-step { display: flex; gap: 12px; align-items: flex-start; background: var(--white); border: 1.5px solid var(--border); border-radius: 14px; padding: 14px 16px; }
.mc-next-step .ns-icon { font-size: 1.3rem; flex-shrink: 0; width: 34px; text-align: center; }
.mc-next-step .ns-text { font-size: 0.87rem; font-weight: 600; line-height: 1.55; }

/* AI BOX */
.mc-ai-label { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal); margin-bottom: 10px; }
.mc-ai-box {
  background: linear-gradient(135deg, #eaf6f4 0%, #f0f4ff 100%);
  border: 1.5px solid var(--border); border-radius: 16px;
  padding: 20px 22px; font-size: 0.93rem; line-height: 1.75;
  white-space: pre-wrap; font-weight: 600;
}
.mc-loading { display: flex; gap: 6px; align-items: center; color: var(--muted); font-size: 0.88rem; font-weight: 700; padding: 16px 0; }
.mc-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--teal); animation: bdot 1.2s infinite; }
.mc-dot:nth-child(2) { animation-delay: 0.18s; }
.mc-dot:nth-child(3) { animation-delay: 0.36s; }
@keyframes bdot { 0%,80%,100% { transform: scale(0.6); opacity:0.3; } 40% { transform:scale(1); opacity:1; } }

/* TIPS */
.mc-tips { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.mc-tip { display: flex; gap: 12px; align-items: flex-start; padding: 13px 16px; background: var(--bg); border-radius: 12px; font-size: 0.87rem; font-weight: 600; line-height: 1.5; }
.mc-tip .tip-icon { font-size: 1.1rem; flex-shrink: 0; }

/* DIVIDER */
.mc-divider { border: none; border-top: 1.5px solid var(--border); margin: 24px 0; }

/* BUTTONS */
.mc-btn-row { display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; margin-top: 8px; }
.mc-btn {
  padding: 13px 28px; border-radius: 12px; border: none;
  cursor: pointer; font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.95rem;
  transition: all 0.18s; display: inline-flex; align-items: center; gap: 6px;
}
.mc-btn-primary { background: var(--teal); color: #fff; }
.mc-btn-primary:hover { background: var(--teal2); transform: translateY(-1px); }
.mc-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
.mc-btn-outline { background: transparent; border: 2px solid var(--border); color: var(--muted); }
.mc-btn-outline:hover { border-color: var(--teal); color: var(--teal); }

.mc-disclaimer {
  max-width: 600px; text-align: center; font-size: 0.76rem;
  color: var(--muted); font-weight: 600; margin-top: 28px; line-height: 1.6; padding: 0 8px;
}
`;

// ─── Age Bands ────────────────────────────────────────────────────────────────
const AGE_BANDS = [
  { id: "10-12", label: "10–12", desc: "Grades 5–7", illo: "🌱" },
  { id: "13-15", label: "13–15", desc: "Grades 8–10", illo: "🌿" },
  { id: "16-17", label: "16–17", desc: "Grades 11–12", illo: "🌳" },
];

// ─── Frequency Option Sets ────────────────────────────────────────────────────
const FREQ = {
  "10-12": [
    { label: "Never",         icon: "😊", score: 0 },
    { label: "Sometimes",     icon: "😐", score: 1 },
    { label: "A lot",         icon: "😟", score: 2 },
    { label: "Almost always", icon: "😢", score: 3 },
  ],
  "13-15": [
    { label: "Not at all",               icon: "🟢", score: 0 },
    { label: "Several days",             icon: "🟡", score: 1 },
    { label: "More than half the days",  icon: "🟠", score: 2 },
    { label: "Nearly every day",         icon: "🔴", score: 3 },
  ],
  "16-17": [
    { label: "Not at all",               icon: "🟢", score: 0 },
    { label: "Several days",             icon: "🟡", score: 1 },
    { label: "More than half the days",  icon: "🟠", score: 2 },
    { label: "Nearly every day",         icon: "🔴", score: 3 },
  ],
};

// ─── PHQ-A Questions ──────────────────────────────────────────────────────────
const PHQ = [
  { id: "phq1", section: "How you've been feeling", isCrisis: false,
    text: { "10-12": "Have you felt sad, down, or like nothing is fun anymore?", "13-15": "Have you had little interest or pleasure in doing things?", "16-17": "Little interest or pleasure in doing things?" } },
  { id: "phq2", section: "How you've been feeling", isCrisis: false,
    text: { "10-12": "Have you felt sad, hopeless, or like things won't get better?", "13-15": "Have you felt down, depressed, or hopeless?", "16-17": "Feeling down, depressed, or hopeless?" } },
  { id: "phq3", section: "Sleep & energy", isCrisis: false,
    text: { "10-12": "Has it been hard to fall asleep, stay asleep, or do you sleep way too much?", "13-15": "Trouble falling or staying asleep, or sleeping too much?", "16-17": "Trouble falling or staying asleep, or sleeping too much?" } },
  { id: "phq4", section: "Sleep & energy", isCrisis: false,
    text: { "10-12": "Have you felt really tired or like you had no energy at all?", "13-15": "Feeling tired or having little energy?", "16-17": "Feeling tired or having little energy?" } },
  { id: "phq5", section: "Eating & body", isCrisis: false,
    text: { "10-12": "Have you not felt like eating, or eaten way more than usual?", "13-15": "Poor appetite or overeating?", "16-17": "Poor appetite or overeating?" } },
  { id: "phq6", section: "How you feel about yourself", isCrisis: false,
    text: { "10-12": "Have you felt bad about yourself, like you mess up a lot or let people down?", "13-15": "Feeling bad about yourself — or that you are a failure or have let your family down?", "16-17": "Feeling bad about yourself — or that you are a failure or have let yourself or your family down?" } },
  { id: "phq7", section: "Concentration", isCrisis: false,
    text: { "10-12": "Has it been really hard to focus in school or on things you're doing?", "13-15": "Trouble concentrating on things, such as reading or watching TV?", "16-17": "Trouble concentrating on things, such as homework, reading, or watching TV?" } },
  { id: "phq8", section: "Moving & speaking", isCrisis: false,
    text: { "10-12": "Have you felt really slow and draggy, or really restless and fidgety — more than normal?", "13-15": "Moving or speaking so slowly others noticed? Or being so restless you couldn't stay still?", "16-17": "Moving or speaking so slowly that other people could have noticed? Or being so fidgety or restless that you moved around a lot more than usual?" } },
  { id: "phq9", section: "Safety", isCrisis: true,
    text: { "10-12": "Have you had thoughts of hurting yourself, or that things would be better if you weren't around?", "13-15": "Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?", "16-17": "Thoughts that you would be better off dead, or of hurting yourself in some way?" } },
];

// ─── GAD-7 Questions ──────────────────────────────────────────────────────────
const GAD = [
  { id: "gad1", section: "Worry & anxiety", isCrisis: false,
    text: { "10-12": "Have you felt nervous, worried, or scared — more than you wanted to?", "13-15": "Feeling nervous, anxious, or on edge?", "16-17": "Feeling nervous, anxious, or on edge?" } },
  { id: "gad2", section: "Worry & anxiety", isCrisis: false,
    text: { "10-12": "Have you had a really hard time stopping yourself from worrying?", "13-15": "Not being able to stop or control worrying?", "16-17": "Not being able to stop or control worrying?" } },
  { id: "gad3", section: "Worry & anxiety", isCrisis: false,
    text: { "10-12": "Have you worried about lots of different things — school, friends, family?", "13-15": "Worrying too much about different things?", "16-17": "Worrying too much about different things?" } },
  { id: "gad4", section: "Worry & anxiety", isCrisis: false,
    text: { "10-12": "Have you had trouble relaxing or calming yourself down?", "13-15": "Trouble relaxing?", "16-17": "Trouble relaxing?" } },
  { id: "gad5", section: "Worry & anxiety", isCrisis: false,
    text: { "10-12": "Have you felt so restless inside that it was hard to sit still?", "13-15": "Being so restless that it is hard to sit still?", "16-17": "Being so restless that it's hard to sit still?" } },
  { id: "gad6", section: "Worry & anxiety", isCrisis: false,
    text: { "10-12": "Have you felt easily annoyed or frustrated by things?", "13-15": "Becoming easily annoyed or irritable?", "16-17": "Becoming easily annoyed or irritable?" } },
  { id: "gad7", section: "Worry & anxiety", isCrisis: false,
    text: { "10-12": "Have you felt so scared that something really bad was about to happen?", "13-15": "Feeling afraid, as if something awful might happen?", "16-17": "Feeling afraid as if something awful might happen?" } },
];

// ─── Sleep / Stress / Social Questions ───────────────────────────────────────
const EXTRA = [
  { id: "sleep1", section: "Sleep", isCrisis: false,
    text: { "10-12": "How often do you wake up feeling rested?", "13-15": "How often do you feel rested after sleeping?", "16-17": "How often do you wake up feeling rested and ready for the day?" },
    opts: {
      "10-12": [{ label:"Most nights", icon:"😴", score:0 },{ label:"Some nights", icon:"🌙", score:1 },{ label:"Not many", icon:"😮‍💨", score:2 },{ label:"Hardly ever", icon:"😩", score:3 }],
      "13-15": [{ label:"Most nights", icon:"😴", score:0 },{ label:"Some nights", icon:"🌙", score:1 },{ label:"Rarely", icon:"😮‍💨", score:2 },{ label:"Hardly ever", icon:"😩", score:3 }],
      "16-17": [{ label:"Most nights", icon:"😴", score:0 },{ label:"Sometimes", icon:"🌙", score:1 },{ label:"Rarely", icon:"😮‍💨", score:2 },{ label:"Almost never", icon:"😩", score:3 }],
    }},
  { id: "stress1", section: "Stress at school or home", isCrisis: false,
    text: { "10-12": "How often does school or home stuff make you feel really stressed out?", "13-15": "How often does stress at school or home feel overwhelming?", "16-17": "How often does stress from school or home feel overwhelming or unmanageable?" },
    opts: {
      "10-12": [{ label:"Not much", icon:"😊", score:0 },{ label:"Sometimes", icon:"😐", score:1 },{ label:"Pretty often", icon:"😬", score:2 },{ label:"All the time", icon:"😰", score:3 }],
      "13-15": [{ label:"Rarely", icon:"😊", score:0 },{ label:"Sometimes", icon:"😐", score:1 },{ label:"Often", icon:"😬", score:2 },{ label:"Almost daily", icon:"😰", score:3 }],
      "16-17": [{ label:"Rarely", icon:"😊", score:0 },{ label:"Sometimes", icon:"😐", score:1 },{ label:"Often", icon:"😬", score:2 },{ label:"Almost daily", icon:"😰", score:3 }],
    }},
  { id: "bully1", section: "Social safety", isCrisis: false,
    text: { "10-12": "Has anyone at school or online been mean, left you out, or made you feel unsafe?", "13-15": "Have you experienced bullying, harassment, or feeling unsafe at school or online?", "16-17": "Have you experienced bullying, harassment, or feeling socially unsafe (in person or online)?" },
    opts: {
      "10-12": [{ label:"No, I feel safe", icon:"🛡️", score:0 },{ label:"A little", icon:"😕", score:1 },{ label:"Yes, a fair bit", icon:"😟", score:2 },{ label:"Yes, a lot", icon:"😔", score:3 }],
      "13-15": [{ label:"No", icon:"🛡️", score:0 },{ label:"A little", icon:"😕", score:1 },{ label:"Yes, sometimes", icon:"😟", score:2 },{ label:"Yes, frequently", icon:"😔", score:3 }],
      "16-17": [{ label:"No", icon:"🛡️", score:0 },{ label:"Occasionally", icon:"😕", score:1 },{ label:"Yes, sometimes", icon:"😟", score:2 },{ label:"Yes, frequently", icon:"😔", score:3 }],
    }},
  { id: "safety1", section: "Home safety", isCrisis: false,
    text: { "10-12": "Do you feel safe and cared for at home?", "13-15": "Do you feel safe and supported at home?", "16-17": "Do you generally feel safe and supported in your home environment?" },
    opts: {
      "10-12": [{ label:"Yes, always", icon:"🏡", score:0 },{ label:"Mostly", icon:"🙂", score:1 },{ label:"Not always", icon:"😐", score:2 },{ label:"Not really", icon:"😢", score:3 }],
      "13-15": [{ label:"Yes, always", icon:"🏡", score:0 },{ label:"Mostly", icon:"🙂", score:1 },{ label:"Sometimes not", icon:"😐", score:2 },{ label:"Often not", icon:"😢", score:3 }],
      "16-17": [{ label:"Yes, consistently", icon:"🏡", score:0 },{ label:"Mostly yes", icon:"🙂", score:1 },{ label:"Sometimes no", icon:"😐", score:2 },{ label:"Often no", icon:"😢", score:3 }],
    }},
];

const ALL_Q = [...PHQ, ...GAD, ...EXTRA];
const TOTAL  = ALL_Q.length;

// ─── Scoring ──────────────────────────────────────────────────────────────────
const sum = (qs, ans) => qs.reduce((s, q) => s + (ans[q.id] ?? 0), 0);
const level = (score, max) => {
  const p = score / max;
  if (p < 0.20) return "low";
  if (p < 0.45) return "moderate";
  if (p < 0.70) return "high";
  return "urgent";
};
const LABEL = { low:"Doing Well", moderate:"Mild Concern", high:"Needs Support", urgent:"Urgent Support Needed" };
const ILLO  = { low:"🌤️", moderate:"🌥️", high:"🌧️", urgent:"⛈️" };
const LC    = { low:"level-low", moderate:"level-moderate", high:"level-high", urgent:"level-urgent" };
const BC    = { low:"fill-low",  moderate:"fill-moderate",  high:"fill-high",  urgent:"fill-urgent" };

const COPING = {
  depression: [
    { icon:"🚶", text:"Even a 10-minute walk outside can lift your mood — sunlight and movement really do help." },
    { icon:"📓", text:"Try writing down one thing that went okay today, even something small." },
    { icon:"🎵", text:"Music that matches — or gently lifts — your mood can be a quick reset." },
  ],
  anxiety: [
    { icon:"🫁", text:"Box breathing: breathe in 4 counts, hold 4, out 4, hold 4. Repeat 4 times." },
    { icon:"🧊", text:"Name 5 things you can see right now. It helps your brain slow down." },
    { icon:"📅", text:"Write your worry down and schedule a 10-minute 'worry time' later — it frees your mind now." },
  ],
  sleep: [
    { icon:"📵", text:"Try putting your phone away 30 minutes before bed — the blue light keeps your brain awake." },
    { icon:"🌙", text:"A consistent bedtime, even on weekends, helps your body clock reset." },
  ],
  stress: [
    { icon:"✅", text:"Break big tasks into tiny steps. Checking even one small thing off feels surprisingly good." },
    { icon:"💬", text:"Talking to someone you trust — a friend, family member, or counselor — can lift a huge weight." },
  ],
};

const NEXT_STEPS = {
  low: [
    { icon:"💚", text:"Your responses suggest you're generally coping well. Keep doing what's working — staying connected, sleeping, moving your body." },
    { icon:"📅", text:"Check in with yourself regularly. If things change, reach out to a trusted adult or school counselor." },
  ],
  moderate: [
    { icon:"💛", text:"Some of your responses suggest you may be going through a tough stretch. That's okay — it happens to everyone, and asking for help is a strength." },
    { icon:"🗣️", text:"Talk to a school counselor, trusted adult, or doctor about how you're feeling. You don't have to figure this out alone." },
    { icon:"📋", text:"Consider printing or saving this summary to share with a parent, counselor, or doctor." },
  ],
  high: [
    { icon:"🧡", text:"Your responses suggest you may be experiencing significant distress. Please reach out to a school counselor, doctor, or trusted adult soon — they want to help." },
    { icon:"📞", text:"988 Suicide & Crisis Lifeline — call or text 988 any time, 24/7. Chat at 988lifeline.org." },
    { icon:"👨‍👩‍👧", text:"Show this summary to a parent, guardian, or counselor — they can help connect you to the right support." },
  ],
  urgent: [
    { icon:"🚨", text:"Some of your answers suggest you need support right away. Please tell a trusted adult immediately." },
    { icon:"📞", text:"988 Suicide & Crisis Lifeline — call or text 988 now, 24/7. Chat available at 988lifeline.org." },
    { icon:"🏥", text:"If you feel you might hurt yourself or someone else, call 911 or go to your nearest emergency room." },
  ],
};

// ─── Claude API ───────────────────────────────────────────────────────────────
async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 700,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text ?? "";
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const STEPS = ["welcome", "age", "consent", "questions", "results"];

export default function MindCheck() {
  const [step, setStep]           = useState("welcome");
  const [ageBand, setAgeBand]     = useState(null);
  const [consents, setConsents]   = useState({ privacy: false, notDiag: false, crisis: false });
  const [qIndex, setQIndex]       = useState(0);
  const [answers, setAnswers]     = useState({});
  const [showCrisis, setShowCrisis] = useState(false);
  const [aiText, setAiText]       = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.textContent = CSS;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const allConsented = consents.privacy && consents.notDiag && consents.crisis;
  const stepIdx = STEPS.indexOf(step);

  const answerQ = (qId, score) => {
    const updated = { ...answers, [qId]: score };
    setAnswers(updated);
    const q = ALL_Q[qIndex];
    if (q.isCrisis && score >= 1) setShowCrisis(true);
    if (qIndex < TOTAL - 1) {
      setQIndex(i => i + 1);
    } else {
      finishAssessment(updated);
    }
  };

  const finishAssessment = async (final) => {
    setStep("results");
    setAiLoading(true);
    const phqS  = sum(PHQ, final);
    const gadS  = sum(GAD, final);
    const extraS = sum(EXTRA, final);
    const phqL  = level(phqS, PHQ.length * 3);
    const gadL  = level(gadS, GAD.length * 3);
    const crisis = (final["phq9"] ?? 0) >= 1;
    const tones = {
      "10-12": "a friendly, warm, simple tone for a 10–12 year old — use short sentences and everyday words",
      "13-15": "a supportive, understanding tone for a 13–15 year old",
      "16-17": "a respectful, direct, honest tone for a 16–17 year old",
    };
    const prompt = `You are MindCheck, a compassionate youth mental wellness screening tool. A young person age ${ageBand} just completed a check-in.

PHQ-A score: ${phqS}/27 — ${phqL}
GAD-7 score: ${gadS}/21 — ${gadL}
Sleep/stress/social score: ${extraS}/12
Crisis item triggered: ${crisis ? "Yes" : "No"}

Write a warm, personalized 3-paragraph plain-language summary using ${tones[ageBand]}:
Paragraph 1: Thank them for completing the check-in and validate that it takes courage to be honest.
Paragraph 2: Reflect what their responses suggest — use phrases like "your responses suggest you may be experiencing…" Never say "you have depression" or give any diagnosis.
Paragraph 3: 1–2 encouragements and a gentle reminder that talking to a trusted adult, school counselor, or doctor is a great next step.${crisis ? "\nAlso: Gently but clearly encourage them to reach out to a trusted adult right away, and mention 988 is available 24/7." : ""}
Under 200 words. No bullet points. Warm and human.`;

    const resp = await callClaude(prompt);
    setAiText(resp);
    setAiLoading(false);
  };

  const restart = () => {
    setStep("welcome"); setAgeBand(null);
    setConsents({ privacy:false, notDiag:false, crisis:false });
    setQIndex(0); setAnswers({}); setAiText(""); setShowCrisis(false);
  };

  // current question
  const q = ALL_Q[qIndex];

  // results calcs
  const phqScore   = sum(PHQ, answers);
  const gadScore   = sum(GAD, answers);
  const extraScore = sum(EXTRA, answers);
  const phqL   = level(phqScore,   PHQ.length * 3);
  const gadL   = level(gadScore,   GAD.length * 3);
  const extraL = level(extraScore, EXTRA.length * 3);
  const overall = ["urgent","high","moderate","low"].find(l =>
    [phqL, gadL, extraL].includes(l)
  ) || "low";

  // coping selection
  const tips = [
    ...(phqL !== "low" ? COPING.depression.slice(0,2) : []),
    ...(gadL !== "low" ? COPING.anxiety.slice(0,2) : []),
    ...(extraScore > 3 ? COPING.sleep.slice(0,1) : []),
    ...COPING.stress.slice(0,1),
  ].slice(0,4);

  return (
    <div className="mc-root">

      {/* Crisis overlay */}
      {showCrisis && (
        <div className="mc-crisis-banner">
          <div className="mc-crisis-box">
            <div className="mc-crisis-icon">💙</div>
            <h2>You're not alone</h2>
            <p>
              Thank you for being honest. What you shared tells us you might be having some really hard thoughts right now.<br /><br />
              <strong>You deserve help — please reach out right now:</strong>
            </p>
            <div className="mc-crisis-number">📞 988</div>
            <div className="mc-crisis-links">
              <a className="mc-crisis-link" href="https://988lifeline.org/chat/" target="_blank" rel="noreferrer">💬 Chat at 988lifeline.org (24/7)</a>
              <a className="mc-crisis-link" href="sms:988">📱 Text 988</a>
              <a className="mc-crisis-link" href="https://www.crisistextline.org/" target="_blank" rel="noreferrer">✉️ Crisis Text Line — Text HOME to 741741</a>
            </div>
            <p style={{ fontSize:"0.82rem" }}>You can finish the check-in when you're ready. Your answers are private.</p>
            <button className="mc-crisis-continue" onClick={() => setShowCrisis(false)}>I've seen this — continue check-in</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mc-header">
        <div className="mc-logo">
          <div className="mc-logo-icon">🧠</div>
          <h1>Mind<span>Check</span></h1>
        </div>
        <div className="mc-tagline">Youth Mental Wellness Check-In · Ages 10–17</div>
      </div>

      {/* Progress */}
      {step !== "welcome" && (
        <div className="mc-progress-wrap">
          <div className="mc-steps">
            {STEPS.filter(s => s !== "welcome").map((s, i) => (
              <div key={s} className={`mc-step-dot ${stepIdx > i+1 ? "done" : stepIdx === i+1 ? "active" : ""}`} />
            ))}
          </div>
          {step === "questions" && (
            <div className="mc-progress-label">Question {qIndex+1} of {TOTAL}</div>
          )}
        </div>
      )}

      {/* ── WELCOME ── */}
      {step === "welcome" && (
        <div className="mc-card">
          <div style={{ fontSize:"3.6rem", textAlign:"center", marginBottom:16 }}>👋</div>
          <h2>Hey! Welcome to MindCheck</h2>
          <p className="mc-sub">This is a safe, private space to check in on how you've been feeling — emotionally, mentally, and socially.</p>
          <ul className="mc-bullet-list">
            <li><span className="bicon">🔒</span>Your answers are private and not shared without your permission.</li>
            <li><span className="bicon">⏱️</span>Takes about 5–8 minutes to complete.</li>
            <li><span className="bicon">📋</span>This is a wellness screener — not a diagnosis. Real professionals review any concerns.</li>
            <li><span className="bicon">💙</span>If you're in crisis at any point, we'll connect you to help immediately.</li>
          </ul>
          <div className="mc-notice">
            <strong>Important:</strong> MindCheck is a screening tool, not a medical diagnosis. If you're having thoughts of hurting yourself right now, please call or text <strong>988</strong>.
          </div>
          <div className="mc-btn-row" style={{ justifyContent:"center" }}>
            <button className="mc-btn mc-btn-primary" onClick={() => setStep("age")}>Get started →</button>
          </div>
        </div>
      )}

      {/* ── AGE ── */}
      {step === "age" && (
        <div className="mc-card">
          <h2>How old are you?</h2>
          <p className="mc-sub">We'll adjust the language so the questions feel natural and easy to understand for your age group.</p>
          <div className="mc-age-grid">
            {AGE_BANDS.map(b => (
              <div key={b.id} className={`mc-age-btn${ageBand === b.id ? " selected" : ""}`} onClick={() => setAgeBand(b.id)}>
                <span className="age-illo">{b.illo}</span>
                <div className="age-range">{b.label}</div>
                <div className="age-desc">{b.desc}</div>
              </div>
            ))}
          </div>
          <div className="mc-btn-row">
            <button className="mc-btn mc-btn-outline" onClick={() => setStep("welcome")}>Back</button>
            <button className="mc-btn mc-btn-primary" disabled={!ageBand} onClick={() => setStep("consent")}>Continue →</button>
          </div>
        </div>
      )}

      {/* ── CONSENT ── */}
      {step === "consent" && (
        <div className="mc-card">
          <h2>Before we start</h2>
          <p className="mc-sub">A parent or guardian should read and agree to the following. If you're doing this on your own, please ask a trusted adult to review this with you.</p>
          <div className="mc-consent-checks">
            {[
              { key:"privacy",  label:"I understand that answers are kept private and will not be sold or shared with advertisers. A parent/guardian or clinician may view a summary report." },
              { key:"notDiag",  label:"I understand this is a wellness screener — not a medical diagnosis. A licensed professional should be consulted for any clinical concerns." },
              { key:"crisis",   label:"I understand that if answers suggest the young person may be at risk, the tool will immediately display crisis resources including the 988 Lifeline." },
            ].map(c => (
              <div key={c.key} className={`mc-check-row${consents[c.key] ? " checked" : ""}`}
                onClick={() => setConsents(p => ({ ...p, [c.key]: !p[c.key] }))}>
                <div className="mc-check-box">{consents[c.key] ? "✓" : ""}</div>
                <div className="mc-check-label">{c.label}</div>
              </div>
            ))}
          </div>
          <div className="mc-btn-row">
            <button className="mc-btn mc-btn-outline" onClick={() => setStep("age")}>Back</button>
            <button className="mc-btn mc-btn-primary" disabled={!allConsented} onClick={() => setStep("questions")}>I agree — Start check-in →</button>
          </div>
        </div>
      )}

      {/* ── QUESTIONS ── */}
      {step === "questions" && ageBand && (
        <div className="mc-card">
          <div className="mc-q-section">{q.section}</div>

          {q.isCrisis
            ? <div className="mc-crisis-q">💙 {q.text[ageBand]}</div>
            : <div className="mc-q-text">{q.text[ageBand]}</div>
          }

          <div className="mc-q-sub">
            {ageBand === "10-12"
              ? "Think about the last 2 weeks. Pick the one that fits best."
              : "Over the last 2 weeks, how often have you been bothered by this?"}
          </div>

          {q.opts ? (
            <div className="mc-options">
              {q.opts[ageBand].map((opt, i) => (
                <button key={i}
                  className={`mc-option${answers[q.id] === opt.score ? " selected" : ""}`}
                  onClick={() => answerQ(q.id, opt.score)}>
                  <span className="mc-option-icon">{opt.icon}</span>{opt.label}
                </button>
              ))}
            </div>
          ) : ageBand === "10-12" ? (
            <div className="mc-emoji-scale">
              {FREQ["10-12"].map((opt, i) => (
                <button key={i}
                  className={`mc-emoji-btn${answers[q.id] === opt.score ? " selected" : ""}`}
                  onClick={() => answerQ(q.id, opt.score)}>
                  <span className="big-emoji">{opt.icon}</span>
                  <span className="emoji-label">{opt.label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="mc-options">
              {FREQ[ageBand].map((opt, i) => (
                <button key={i}
                  className={`mc-option${answers[q.id] === opt.score ? " selected" : ""}`}
                  onClick={() => answerQ(q.id, opt.score)}>
                  <span className="mc-option-icon">{opt.icon}</span>{opt.label}
                </button>
              ))}
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:8 }}>
            {qIndex > 0
              ? <button className="mc-btn mc-btn-outline" style={{ padding:"9px 18px", fontSize:"0.85rem" }} onClick={() => setQIndex(i => i-1)}>← Back</button>
              : <div />}
            <div style={{ fontSize:"0.78rem", color:"var(--muted)", fontWeight:700 }}>{qIndex+1} / {TOTAL}</div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {step === "results" && (
        <>
          <div className="mc-card">
            <div className="mc-result-header">
              <div className="mc-result-illo">{ILLO[overall]}</div>
              <div className={`mc-result-level ${LC[overall]}`}>{LABEL[overall]}</div>
              <p className="mc-result-msg">
                {overall === "low"      && "Your responses suggest you're generally coping well. Keep taking care of yourself."}
                {overall === "moderate" && "Your responses suggest you may be experiencing some challenges worth paying attention to."}
                {overall === "high"     && "Your responses suggest a significant level of distress. You deserve support — please reach out."}
                {overall === "urgent"   && "Your responses suggest you need support right away. Please talk to a trusted adult immediately."}
              </p>
            </div>
            <hr className="mc-divider" />

            <div className="mc-domain-cards">
              {[
                { label:"Depression (PHQ-A)",     icon:"💭", score:phqScore,   max:PHQ.length*3,   lv:phqL   },
                { label:"Anxiety (GAD-7)",         icon:"😰", score:gadScore,   max:GAD.length*3,   lv:gadL   },
                { label:"Sleep · Stress · Social", icon:"🌙", score:extraScore, max:EXTRA.length*3, lv:extraL },
              ].map(d => (
                <div key={d.label} className="mc-domain-card">
                  <div className="mc-domain-top">
                    <div className="mc-domain-name">{d.icon} {d.label}</div>
                    <div className={`mc-domain-badge ${LC[d.lv]}`}>{LABEL[d.lv]}</div>
                  </div>
                  <div className="mc-bar-bg">
                    <div className={`mc-bar-fill ${BC[d.lv]}`} style={{ width:`${Math.round(d.score/d.max*100)}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mc-result-note">
              ⚠️ These results are <strong>not a diagnosis</strong>. They reflect patterns in your responses over the past two weeks. A licensed professional should evaluate any concerns.
            </div>

            <div>
              <div className="mc-ai-label">🤖 Personalized message from MindCheck</div>
              {aiLoading
                ? <div className="mc-loading"><div className="mc-dot"/><div className="mc-dot"/><div className="mc-dot"/> Generating your personalized summary…</div>
                : <div className="mc-ai-box">{aiText}</div>
              }
            </div>
          </div>

          <div className="mc-card">
            <h2 style={{ marginBottom:16 }}>Suggested next steps</h2>
            <div className="mc-next-steps">
              {(NEXT_STEPS[overall] || NEXT_STEPS.low).map((s, i) => (
                <div key={i} className="mc-next-step">
                  <span className="ns-icon">{s.icon}</span>
                  <div className="ns-text">{s.text}</div>
                </div>
              ))}
            </div>
            <hr className="mc-divider" />
            <h2 style={{ marginBottom:12, fontSize:"1.1rem" }}>Coping strategies to try this week</h2>
            <div className="mc-tips">
              {tips.map((t, i) => (
                <div key={i} className="mc-tip">
                  <span className="tip-icon">{t.icon}</span><span>{t.text}</span>
                </div>
              ))}
            </div>
            <div className="mc-btn-row" style={{ justifyContent:"center", marginTop:20 }}>
              <button className="mc-btn mc-btn-outline" onClick={restart}>Start over</button>
              <button className="mc-btn mc-btn-primary" onClick={() => window.print()}>🖨️ Print summary</button>
            </div>
          </div>

          {/* Always-visible crisis card */}
          <div className="mc-card" style={{ borderTop:"4px solid var(--danger)" }}>
            <h2 style={{ color:"var(--danger)", marginBottom:8, fontSize:"1.1rem" }}>988 Suicide &amp; Crisis Lifeline</h2>
            <p style={{ fontSize:"0.88rem", color:"var(--muted)", fontWeight:600, marginBottom:16, lineHeight:1.6 }}>
              If you or someone you know is in crisis — call, text, or chat 988. Available 24 hours a day, 7 days a week. Free and confidential.
            </p>
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {[
                { href:"tel:988",                                        label:"📞 Call 988",     primary:true  },
                { href:"sms:988",                                        label:"📱 Text 988",     primary:false },
                { href:"https://988lifeline.org/chat/", target:"_blank", label:"💬 Chat online",  primary:false },
              ].map((b, i) => (
                <a key={i} href={b.href} target={b.target || undefined} rel={b.target ? "noreferrer" : undefined}
                  style={{ flex:1, minWidth:130, background: b.primary ? "var(--danger)" : "var(--danger-bg)",
                    color: b.primary ? "#fff" : "var(--danger)",
                    border: b.primary ? "none" : "2px solid #ffcdd2",
                    padding:"12px 16px", borderRadius:12, fontWeight:800, fontSize:"0.92rem",
                    textAlign:"center", textDecoration:"none", display:"block" }}>
                  {b.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mc-disclaimer">
        MindCheck is a wellness screening tool for educational and informational purposes only.<br />
        It is not a substitute for professional mental health evaluation, diagnosis, or treatment.<br />
        If you are in crisis, contact 988 or call 911 immediately.
      </div>
    </div>
  );
}
