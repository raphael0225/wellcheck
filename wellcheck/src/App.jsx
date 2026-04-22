import { useState } from "react";

// ── FLAG SVGs ──────────────────────────────────────────────────────────────────
const FlagUS = () => <svg viewBox="0 0 60 30" width="36" height="20" style={{borderRadius:3,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}>
  <rect width="60" height="30" fill="#B22234"/>
  <rect y="2.3" width="60" height="2.3" fill="white"/><rect y="6.9" width="60" height="2.3" fill="white"/>
  <rect y="11.5" width="60" height="2.3" fill="white"/><rect y="16.1" width="60" height="2.3" fill="white"/>
  <rect y="20.7" width="60" height="2.3" fill="white"/><rect y="25.3" width="60" height="2.3" fill="white"/>
  <rect width="24" height="16.2" fill="#3C3B6E"/>
  <circle cx="2" cy="1.4" r="0.9" fill="white"/><circle cx="6" cy="1.4" r="0.9" fill="white"/><circle cx="10" cy="1.4" r="0.9" fill="white"/><circle cx="14" cy="1.4" r="0.9" fill="white"/><circle cx="18" cy="1.4" r="0.9" fill="white"/><circle cx="22" cy="1.4" r="0.9" fill="white"/>
  <circle cx="4" cy="3.7" r="0.9" fill="white"/><circle cx="8" cy="3.7" r="0.9" fill="white"/><circle cx="12" cy="3.7" r="0.9" fill="white"/><circle cx="16" cy="3.7" r="0.9" fill="white"/><circle cx="20" cy="3.7" r="0.9" fill="white"/>
  <circle cx="2" cy="6" r="0.9" fill="white"/><circle cx="6" cy="6" r="0.9" fill="white"/><circle cx="10" cy="6" r="0.9" fill="white"/><circle cx="14" cy="6" r="0.9" fill="white"/><circle cx="18" cy="6" r="0.9" fill="white"/><circle cx="22" cy="6" r="0.9" fill="white"/>
  <circle cx="4" cy="8.3" r="0.9" fill="white"/><circle cx="8" cy="8.3" r="0.9" fill="white"/><circle cx="12" cy="8.3" r="0.9" fill="white"/><circle cx="16" cy="8.3" r="0.9" fill="white"/><circle cx="20" cy="8.3" r="0.9" fill="white"/>
  <circle cx="2" cy="10.6" r="0.9" fill="white"/><circle cx="6" cy="10.6" r="0.9" fill="white"/><circle cx="10" cy="10.6" r="0.9" fill="white"/><circle cx="14" cy="10.6" r="0.9" fill="white"/><circle cx="18" cy="10.6" r="0.9" fill="white"/><circle cx="22" cy="10.6" r="0.9" fill="white"/>
  <circle cx="4" cy="12.9" r="0.9" fill="white"/><circle cx="8" cy="12.9" r="0.9" fill="white"/><circle cx="12" cy="12.9" r="0.9" fill="white"/><circle cx="16" cy="12.9" r="0.9" fill="white"/><circle cx="20" cy="12.9" r="0.9" fill="white"/>
  <circle cx="2" cy="15.2" r="0.9" fill="white"/><circle cx="6" cy="15.2" r="0.9" fill="white"/><circle cx="10" cy="15.2" r="0.9" fill="white"/><circle cx="14" cy="15.2" r="0.9" fill="white"/><circle cx="18" cy="15.2" r="0.9" fill="white"/><circle cx="22" cy="15.2" r="0.9" fill="white"/>
</svg>;
const FlagPH = () => <svg viewBox="0 0 60 30" width="36" height="20" style={{borderRadius:3,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}>
  <rect width="60" height="15" fill="#0038A8"/><rect y="15" width="60" height="15" fill="#CE1126"/>
  <polygon points="0,0 27,15 0,30" fill="white"/>
  <circle cx="5" cy="7" r="2" fill="#FCD116"/><circle cx="5" cy="23" r="2" fill="#FCD116"/><circle cx="13" cy="15" r="2" fill="#FCD116"/>
  <polygon points="9,15 10.5,10 12,15 7,12 14,12" fill="#FCD116"/>
</svg>;
const FlagES = () => <svg viewBox="0 0 60 30" width="36" height="20" style={{borderRadius:3,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}>
  <rect width="60" height="7.5" fill="#c60b1e"/><rect y="7.5" width="60" height="15" fill="#ffc400"/><rect y="22.5" width="60" height="7.5" fill="#c60b1e"/>
</svg>;
const FlagJP = () => <svg viewBox="0 0 60 30" width="36" height="20" style={{borderRadius:3,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}>
  <rect width="60" height="30" fill="white"/><circle cx="30" cy="15" r="9" fill="#BC002D"/>
</svg>;

// ── LANGUAGES ──────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { id: "en", native: "English",  country: "United States", Flag: FlagUS },
  { id: "tl", native: "Tagalog",  country: "Philippines",   Flag: FlagPH },
  { id: "es", native: "Español",  country: "Spain",         Flag: FlagES },
  { id: "ja", native: "日本語",    country: "Japan",         Flag: FlagJP },
];

// ── DOMAIN CONFIG ──────────────────────────────────────────────────────────────
const DOMAINS = [
  { id: "general",      icon: "💊", label: { en: "General Health",    tl: "Pangkalahatang Kalusugan", es: "Salud General",       ja: "一般的な健康"       }, color: "#2d7a52" },
  { id: "mental",       icon: "🧠", label: { en: "Mental Health",     tl: "Kalusugang Pangkaisipan",  es: "Salud Mental",        ja: "メンタルヘルス"      }, color: "#6366f1" },
  { id: "lifestyle",    icon: "🏃", label: { en: "Lifestyle",         tl: "Pamumuhay",                es: "Estilo de Vida",       ja: "ライフスタイル"      }, color: "#0891b2" },
  { id: "occupational", icon: "💼", label: { en: "Occupational",      tl: "Kalusugan sa Trabaho",     es: "Salud Ocupacional",    ja: "職業的健康"         }, color: "#d97706" },
  { id: "financial",    icon: "💰", label: { en: "Financial Health",  tl: "Pinansyal na Kalusugan",   es: "Salud Financiera",     ja: "財務的健康"         }, color: "#059669" },
];

// ── QUESTIONS ──────────────────────────────────────────────────────────────────
const QUESTIONS = {
  general: [
    { id: "g1", type: "text",   key: "name",    q: { en: "What is your first name?", tl: "Ano ang iyong pangalan?", es: "¿Cuál es tu nombre?", ja: "お名前を教えてください" } },
    { id: "g2", type: "number", key: "age",     q: { en: "How old are you?", tl: "Ilang taon ka na?", es: "¿Cuántos años tienes?", ja: "年齢を教えてください" }, placeholder: { en: "e.g. 35", tl: "hal. 35", es: "ej. 35", ja: "例：35" } },
    { id: "g3", type: "number", key: "weight",  q: { en: "What is your weight? (lbs)", tl: "Ano ang iyong timbang? (lbs)", es: "¿Cuál es tu peso? (lbs)", ja: "体重を教えてください（ポンド）" }, placeholder: { en: "e.g. 160", tl: "hal. 160", es: "ej. 160", ja: "例：160" } },
    { id: "g4", type: "choice", key: "energy",  q: { en: "How would you rate your energy levels lately?", tl: "Paano mo ilalarawan ang iyong antas ng enerhiya?", es: "¿Cómo calificarías tus niveles de energía?", ja: "最近のエネルギーレベルはいかがですか？" },
      options: { en: ["Very high — I feel great", "Good — mostly energized", "Average — up and down", "Low — often tired", "Very low — exhausted daily"],
                 tl: ["Napakataas — magaling ako", "Magaling — karaniwang may lakas", "Katamtaman — pabago-bago", "Mababa — madalas pagod", "Napakababa — napagod araw-araw"],
                 es: ["Muy alto — me siento genial", "Bien — mayormente energizado", "Regular — sube y baja", "Bajo — a menudo cansado", "Muy bajo — agotado diariamente"],
                 ja: ["非常に高い — とても元気", "良い — ほとんど元気", "普通 — 波がある", "低い — よく疲れる", "非常に低い — 毎日疲弊している"] },
      risk: [0,0,1,1,2] },
    { id: "g5", type: "choice", key: "sleep",   q: { en: "How many hours of sleep do you typically get per night?", tl: "Ilang oras ka karaniwang natutulog gabi-gabi?", es: "¿Cuántas horas duermes típicamente por noche?", ja: "一晩に何時間寝ていますか？" },
      options: { en: ["8+ hours", "7–8 hours", "6–7 hours", "5–6 hours", "Less than 5 hours"],
                 tl: ["8+ oras", "7–8 oras", "6–7 oras", "5–6 oras", "Wala pang 5 oras"],
                 es: ["8+ horas", "7–8 horas", "6–7 horas", "5–6 horas", "Menos de 5 horas"],
                 ja: ["8時間以上", "7〜8時間", "6〜7時間", "5〜6時間", "5時間未満"] },
      risk: [0,0,1,1,2] },
    { id: "g6", type: "choice", key: "checkup", q: { en: "When was your last medical check-up?", tl: "Kailan ang iyong huling medikal na check-up?", es: "¿Cuándo fue tu último chequeo médico?", ja: "最後に健康診断を受けたのはいつですか？" },
      options: { en: ["Within the last 6 months", "6–12 months ago", "1–2 years ago", "Over 2 years ago", "Never had one"],
                 tl: ["Sa nakaraang 6 na buwan", "6–12 buwan na ang nakalipas", "1–2 taon na ang nakalipas", "Mahigit 2 taon na ang nakalipas", "Hindi pa nagpapatingin"],
                 es: ["En los últimos 6 meses", "Hace 6–12 meses", "Hace 1–2 años", "Hace más de 2 años", "Nunca he tenido uno"],
                 ja: ["過去6ヶ月以内", "6〜12ヶ月前", "1〜2年前", "2年以上前", "受けたことがない"] },
      risk: [0,0,1,2,2] },
  ],
  mental: [
    { id: "m1", type: "choice", key: "mood",    q: { en: "Over the past 2 weeks, how often have you felt down or hopeless?", tl: "Sa nakaraang 2 linggo, gaano kadalas kang nakaramdam ng panglulumo?", es: "En las últimas 2 semanas, ¿con qué frecuencia te has sentido decaído o sin esperanza?", ja: "過去2週間、落ち込みや絶望感を感じることはありましたか？" },
      options: { en: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
                 tl: ["Hindi kailanman", "Ilang araw", "Higit sa kalahati ng mga araw", "Halos araw-araw"],
                 es: ["Para nada", "Varios días", "Más de la mitad de los días", "Casi todos los días"],
                 ja: ["全くない", "数日", "半分以上の日", "ほぼ毎日"] },
      risk: [0,1,1,2] },
    { id: "m2", type: "choice", key: "anxiety", q: { en: "How often do you feel nervous, anxious, or on edge?", tl: "Gaano kadalas kang nakakaramdam ng kabahan o pagkabalisa?", es: "¿Con qué frecuencia te sientes nervioso, ansioso o al límite?", ja: "不安や緊張を感じることはどのくらいありますか？" },
      options: { en: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
                 tl: ["Hindi kailanman", "Ilang araw", "Higit sa kalahati ng mga araw", "Halos araw-araw"],
                 es: ["Para nada", "Varios días", "Más de la mitad de los días", "Casi todos los días"],
                 ja: ["全くない", "数日", "半分以上の日", "ほぼ毎日"] },
      risk: [0,1,1,2] },
    { id: "m3", type: "choice", key: "stress",  q: { en: "How would you rate your overall stress level?", tl: "Paano mo ilalarawan ang iyong antas ng stress?", es: "¿Cómo calificarías tu nivel general de estrés?", ja: "全体的なストレスレベルはいかがですか？" },
      options: { en: ["Very low", "Manageable", "Moderate", "High", "Overwhelming"],
                 tl: ["Napakababa", "Makontrol", "Katamtaman", "Mataas", "Napakalaki"],
                 es: ["Muy bajo", "Manejable", "Moderado", "Alto", "Abrumador"],
                 ja: ["非常に低い", "管理できる", "普通", "高い", "圧倒的"] },
      risk: [0,0,1,2,2] },
    { id: "m4", type: "choice", key: "support", q: { en: "Do you have people you can talk to when feeling overwhelmed?", tl: "Mayroon ka bang taong maaari kang kausapin kapag nalulula ka?", es: "¿Tienes personas con quienes hablar cuando te sientes abrumado?", ja: "辛いとき話せる人はいますか？" },
      options: { en: ["Yes, always", "Usually yes", "Sometimes", "Rarely", "No, I feel isolated"],
                 tl: ["Oo, lagi", "Karaniwang oo", "Minsan", "Bihira", "Hindi, nagigipit ako"],
                 es: ["Sí, siempre", "Generalmente sí", "A veces", "Raramente", "No, me siento aislado"],
                 ja: ["いつでもいる", "大抵いる", "時々いる", "ほとんどいない", "いない、孤独を感じる"] },
      risk: [0,0,1,2,2] },
  ],
  lifestyle: [
    { id: "l1", type: "choice", key: "exercise", q: { en: "How often do you exercise per week?", tl: "Gaano kadalas kang nag-eehersisyo bawat linggo?", es: "¿Con qué frecuencia haces ejercicio por semana?", ja: "週に何回運動しますか？" },
      options: { en: ["5+ days", "3–4 days", "1–2 days", "Rarely", "Never"],
                 tl: ["5+ araw", "3–4 araw", "1–2 araw", "Bihira", "Hindi kailanman"],
                 es: ["5+ días", "3–4 días", "1–2 días", "Raramente", "Nunca"],
                 ja: ["週5日以上", "週3〜4日", "週1〜2日", "ほとんどしない", "全くしない"] },
      risk: [0,0,1,1,2] },
    { id: "l2", type: "choice", key: "diet",    q: { en: "How would you describe your diet?", tl: "Paano mo ilalarawan ang iyong pagkain?", es: "¿Cómo describirías tu dieta?", ja: "食生活はいかがですか？" },
      options: { en: ["Very healthy — balanced & nutritious", "Mostly healthy", "Mixed — some good, some bad", "Mostly unhealthy", "Poor — mostly fast food/processed"],
                 tl: ["Napakagaling — balanse at masustansya", "Karaniwang malusog", "Halo-halo", "Karaniwang hindi malusog", "Masama — karaniwang fast food"],
                 es: ["Muy saludable — equilibrada y nutritiva", "Mayormente saludable", "Mixta", "Mayormente poco saludable", "Deficiente — principalmente comida rápida"],
                 ja: ["非常に健康的 — バランスが良い", "ほぼ健康的", "まちまち", "あまり健康的でない", "良くない — ほぼジャンクフード"] },
      risk: [0,0,1,1,2] },
    { id: "l3", type: "choice", key: "water",   q: { en: "How much water do you drink daily?", tl: "Gaano karaming tubig ang iyong iniinom araw-araw?", es: "¿Cuánta agua bebes diariamente?", ja: "1日にどのくらい水を飲みますか？" },
      options: { en: ["8+ glasses", "6–8 glasses", "4–6 glasses", "2–4 glasses", "Less than 2 glasses"],
                 tl: ["8+ baso", "6–8 baso", "4–6 baso", "2–4 baso", "Wala pang 2 baso"],
                 es: ["8+ vasos", "6–8 vasos", "4–6 vasos", "2–4 vasos", "Menos de 2 vasos"],
                 ja: ["8杯以上", "6〜8杯", "4〜6杯", "2〜4杯", "2杯未満"] },
      risk: [0,0,1,1,2] },
    { id: "l4", type: "choice", key: "smoking", q: { en: "Do you smoke or use tobacco products?", tl: "Naninigarilyo ka ba o gumagamit ng tabako?", es: "¿Fumas o usas productos de tabaco?", ja: "タバコや煙草製品を使用していますか？" },
      options: { en: ["No, never", "Quit more than 1 year ago", "Quit less than 1 year ago", "Occasionally", "Daily"],
                 tl: ["Hindi, hindi kailanman", "Tumigil mahigit 1 taon na ang nakalipas", "Tumigil wala pang 1 taon", "Paminsan-minsan", "Araw-araw"],
                 es: ["No, nunca", "Dejé hace más de 1 año", "Dejé hace menos de 1 año", "Ocasionalmente", "Diariamente"],
                 ja: ["いいえ、一度も", "1年以上前に辞めた", "1年未満前に辞めた", "時々", "毎日"] },
      risk: [0,0,1,1,2] },
  ],
  occupational: [
    { id: "o1", type: "choice", key: "workload", q: { en: "How manageable is your workload?", tl: "Gaano mo nakokontrol ang iyong trabaho?", es: "¿Qué tan manejable es tu carga de trabajo?", ja: "仕事量は管理できていますか？" },
      options: { en: ["Very manageable", "Mostly manageable", "Sometimes overwhelming", "Often overwhelming", "Completely overwhelming"],
                 tl: ["Napakahusay na makontrol", "Karaniwang makontrol", "Minsan napapalaki", "Madalas napapalaki", "Ganap na napapalaki"],
                 es: ["Muy manejable", "Mayormente manejable", "A veces abrumadora", "A menudo abrumadora", "Completamente abrumadora"],
                 ja: ["非常に管理できる", "ほぼ管理できる", "時々圧倒される", "よく圧倒される", "完全に圧倒されている"] },
      risk: [0,0,1,2,2] },
    { id: "o2", type: "choice", key: "balance",  q: { en: "How would you rate your work-life balance?", tl: "Paano mo ilalarawan ang iyong balanse sa trabaho at buhay?", es: "¿Cómo calificarías tu equilibrio trabajo-vida?", ja: "ワークライフバランスはいかがですか？" },
      options: { en: ["Excellent", "Good", "Fair", "Poor", "Very poor"],
                 tl: ["Napakagaling", "Magaling", "Katamtaman", "Masama", "Napakasama"],
                 es: ["Excelente", "Bueno", "Regular", "Malo", "Muy malo"],
                 ja: ["非常に良い", "良い", "普通", "悪い", "非常に悪い"] },
      risk: [0,0,1,2,2] },
    { id: "o3", type: "choice", key: "burnout",  q: { en: "How often do you feel burned out from work?", tl: "Gaano kadalas kang nakakaramdam ng burnout sa trabaho?", es: "¿Con qué frecuencia te sientes agotado por el trabajo?", ja: "仕事で燃え尽き感を感じることはどのくらいありますか？" },
      options: { en: ["Never", "Rarely", "Sometimes", "Often", "Always"],
                 tl: ["Hindi kailanman", "Bihira", "Minsan", "Madalas", "Lagi"],
                 es: ["Nunca", "Raramente", "A veces", "A menudo", "Siempre"],
                 ja: ["全くない", "ほとんどない", "時々ある", "よくある", "常にある"] },
      risk: [0,0,1,2,2] },
    { id: "o4", type: "choice", key: "satisfaction", q: { en: "How satisfied are you with your job overall?", tl: "Gaano ka kasaya sa iyong trabaho sa kabuuan?", es: "¿Qué tan satisfecho estás con tu trabajo en general?", ja: "仕事全体にどのくらい満足していますか？" },
      options: { en: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
                 tl: ["Napakasaya", "Masaya", "Walang pakiramdam", "Hindi masaya", "Napakahindi masaya"],
                 es: ["Muy satisfecho", "Satisfecho", "Neutral", "Insatisfecho", "Muy insatisfecho"],
                 ja: ["非常に満足", "満足", "普通", "不満", "非常に不満"] },
      risk: [0,0,1,2,2] },
  ],
  financial: [
    { id: "f1", type: "choice", key: "fstress",  q: { en: "How stressed are you about your finances?", tl: "Gaano ka ka-stress sa iyong pananalapi?", es: "¿Qué tan estresado estás por tus finanzas?", ja: "財務についてどのくらいストレスを感じていますか？" },
      options: { en: ["Not stressed at all", "Slightly stressed", "Moderately stressed", "Very stressed", "Extremely stressed"],
                 tl: ["Hindi na-stress", "Kaunting stress", "Katamtamang stress", "Napaka-stress", "Sobrang stress"],
                 es: ["Nada estresado", "Ligeramente estresado", "Moderadamente estresado", "Muy estresado", "Extremadamente estresado"],
                 ja: ["全くストレスなし", "少しストレス", "中程度のストレス", "非常にストレス", "極度のストレス"] },
      risk: [0,0,1,2,2] },
    { id: "f2", type: "choice", key: "expenses", q: { en: "How confident are you in covering your monthly expenses?", tl: "Gaano ka ka-kumpiyansa sa pagbabayad ng iyong buwanang gastos?", es: "¿Qué tan seguro estás de cubrir tus gastos mensuales?", ja: "毎月の支出を賄えることにどのくらい自信がありますか？" },
      options: { en: ["Very confident", "Confident", "Somewhat confident", "Not very confident", "Not confident at all"],
                 tl: ["Napaka-kumpiyansa", "Kumpiyansa", "Medyo kumpiyansa", "Hindi masyadong kumpiyansa", "Hindi talaga kumpiyansa"],
                 es: ["Muy seguro", "Seguro", "Algo seguro", "No muy seguro", "Para nada seguro"],
                 ja: ["非常に自信がある", "自信がある", "少し自信がある", "あまり自信がない", "全く自信がない"] },
      risk: [0,0,1,2,2] },
    { id: "f3", type: "choice", key: "savings",  q: { en: "Do you have an emergency fund (3–6 months of expenses)?", tl: "Mayroon ka bang emergency fund (3–6 buwang gastos)?", es: "¿Tienes un fondo de emergencia (3–6 meses de gastos)?", ja: "緊急資金（3〜6ヶ月分の支出）はありますか？" },
      options: { en: ["Yes, fully funded", "Partially funded", "Working on it", "No, but planning to", "No, and not planning to"],
                 tl: ["Oo, buo na", "Bahagyang naipon", "Nagtatrabaho dito", "Wala, pero nagpaplano", "Wala, at hindi nagpaplano"],
                 es: ["Sí, completamente financiado", "Parcialmente financiado", "Trabajando en ello", "No, pero planeo hacerlo", "No, y no planeo hacerlo"],
                 ja: ["はい、完全に準備済み", "部分的に準備", "取り組んでいる", "いいえ、でも計画中", "いいえ、計画もない"] },
      risk: [0,0,1,1,2] },
    { id: "f4", type: "choice", key: "benefits", q: { en: "Are you aware of your employee financial benefits (401k, EAP, etc.)?", tl: "Alam mo ba ang iyong mga benepisyo sa pananalapi (401k, EAP, atbp.)?", es: "¿Conoces tus beneficios financieros como empleado (401k, EAP, etc.)?", ja: "従業員の財務福利厚生（401k、EAPなど）を知っていますか？" },
      options: { en: ["Yes, fully utilizing them", "Aware but not fully using", "Somewhat aware", "Not really aware", "Not aware at all"],
                 tl: ["Oo, ganap na ginagamit", "Alam pero hindi ganap na ginagamit", "Medyo alam", "Hindi masyadong alam", "Hindi alam"],
                 es: ["Sí, los utilizo plenamente", "Consciente pero no los uso completamente", "Algo consciente", "No muy consciente", "No consciente en absoluto"],
                 ja: ["はい、十分に活用している", "知っているが十分に使っていない", "ある程度知っている", "あまり知らない", "全く知らない"] },
      risk: [0,0,1,1,2] },
  ],
};

// ── RISK LABELS ───────────────────────────────────────────────────────────────
const RISK_LABELS = {
  0: { en: "Low Risk",      tl: "Mababang Panganib",   es: "Bajo Riesgo",    ja: "低リスク",   color: "#16a34a", bg: "#dcfce7", dot: "🟢" },
  1: { en: "Moderate",      tl: "Katamtaman",           es: "Moderado",       ja: "中程度",     color: "#d97706", bg: "#fef3c7", dot: "🟡" },
  2: { en: "High Risk",     tl: "Mataas na Panganib",   es: "Alto Riesgo",    ja: "高リスク",   color: "#dc2626", bg: "#fee2e2", dot: "🔴" },
};

const UI_TEXT = {
  en: { welcome: "Your confidential health check-in", start: "Begin Assessment", next: "Next →", back: "← Back", submit: "See My Results", restart: "Start Over", selectLang: "Choose your language", selectDomains: "What would you like to assess today?", selectDomainsDesc: "Choose one or more areas. Your responses are completely confidential.", selectAll: "Select All", begin: "Begin", summary: "Your Wellness Report", domain: "Domain", risk: "Risk Level", disclaimer: "WellCheck is a wellness support tool, not a medical service. Crisis support: call or text 988." },
  tl: { welcome: "Ang iyong kumpidensyal na pagsusuri sa kalusugan", start: "Simulan ang Pagtatasa", next: "Susunod →", back: "← Bumalik", submit: "Tingnan ang Aking Mga Resulta", restart: "Magsimula Muli", selectLang: "Pumili ng wika", selectDomains: "Ano ang nais mong suriin ngayon?", selectDomainsDesc: "Pumili ng isa o higit pang mga lugar. Ang iyong mga sagot ay ganap na kumpidensyal.", selectAll: "Piliin Lahat", begin: "Magsimula", summary: "Iyong Ulat sa Kalusugan", domain: "Larangan", risk: "Antas ng Panganib", disclaimer: "Ang WellCheck ay isang tool sa suporta sa kalusugan. Krisis: tumawag o mag-text sa 988." },
  es: { welcome: "Tu chequeo de salud confidencial", start: "Iniciar Evaluación", next: "Siguiente →", back: "← Atrás", submit: "Ver Mis Resultados", restart: "Comenzar de Nuevo", selectLang: "Elige tu idioma", selectDomains: "¿Qué te gustaría evaluar hoy?", selectDomainsDesc: "Elige una o más áreas. Tus respuestas son completamente confidenciales.", selectAll: "Seleccionar Todo", begin: "Comenzar", summary: "Tu Informe de Bienestar", domain: "Dominio", risk: "Nivel de Riesgo", disclaimer: "WellCheck es una herramienta de apoyo, no un servicio médico. Crisis: llama o envía texto al 988." },
  ja: { welcome: "あなたの機密健康チェックイン", start: "評価を開始", next: "次へ →", back: "← 戻る", submit: "結果を見る", restart: "最初からやり直す", selectLang: "言語を選択", selectDomains: "今日は何を評価しますか？", selectDomainsDesc: "1つ以上のエリアを選択してください。回答は完全に機密です。", selectAll: "すべて選択", begin: "開始", summary: "あなたのウェルネスレポート", domain: "ドメイン", risk: "リスクレベル", disclaimer: "WellCheckはウェルネスサポートツールです。危機の場合：988に電話またはテキスト。" },
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function calcRisk(answers, domainId) {
  const qs = QUESTIONS[domainId].filter(q => q.type === "choice");
  if (!qs.length) return 0;
  const total = qs.reduce((sum, q) => {
    const idx = (q.options?.en || []).indexOf(answers[q.key] || "");
    return sum + (idx >= 0 ? (q.risk?.[idx] ?? 0) : 0);
  }, 0);
  const avg = total / qs.length;
  return avg < 0.5 ? 0 : avg < 1.2 ? 1 : 2;
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function WellCheck() {
  const [phase, setPhase] = useState("lang");      // lang | domains | quiz | summary
  const [lang, setLang] = useState("en");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textInput, setTextInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [visible, setVisible] = useState(true);

  const ui = UI_TEXT[lang];

  const toggleDomain = id => setSelectedDomains(prev =>
    prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
  );

  const startQuiz = () => {
    const qs = selectedDomains.flatMap(d => QUESTIONS[d]);
    setAllQuestions(qs);
    setQIndex(0);
    setAnswers({});
    setSelected(null);
    setTextInput("");
    setPhase("quiz");
  };

  const currentQ = allQuestions[qIndex];
  const isLast = qIndex === allQuestions.length - 1;
  const progress = allQuestions.length ? ((qIndex) / allQuestions.length) * 100 : 0;

  const [visible, setVisible] = useState(true);

  const advance = (val) => {
    const newAnswers = { ...answers, [currentQ.key]: val };
    setAnswers(newAnswers);
    setVisible(false);
    setTimeout(() => {
      if (isLast) { setPhase("summary"); }
      else { setQIndex(i => i + 1); setSelected(null); setTextInput(""); setVisible(true); }
    }, 220);
  };

  const goBack = () => {
    if (qIndex === 0) { setPhase("domains"); return; }
    setVisible(false);
    setTimeout(() => { setQIndex(i => i - 1); setSelected(null); setTextInput(""); setVisible(true); }, 220);
  };

  const domainRisks = selectedDomains.map(id => ({ domain: id, risk: calcRisk(answers, id) }));
  const name = answers.name || "";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #e8f5e9 0%, #f0faf4 50%, #e3f4ea 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif", padding: 20 }}>
      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-16px); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .slide-in { animation: slideIn 0.3s ease forwards; }
        .slide-out { animation: slideOut 0.2s ease forwards; }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        .opt-btn:hover { transform: translateX(4px); }
        .opt-btn { transition: all 0.15s ease; cursor: pointer; }
        .lang-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(45,122,82,0.18) !important; }
        .lang-card { transition: all 0.2s ease; cursor: pointer; }
        .dom-card:hover { transform: translateY(-2px); }
        .dom-card { transition: all 0.15s ease; cursor: pointer; }
        textarea:focus, input:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(45,122,82,0.2); border-radius: 2px; }
      `}</style>

      {/* ── LOGO ── */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg, #2d7a52, #52c27a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, boxShadow: "0 4px 14px rgba(45,122,82,0.3)" }}>🩺</div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#1a4d32", letterSpacing: "-0.5px" }}>Well<span style={{ color: "#2d7a52" }}>Check</span></h1>
        </div>
        {phase !== "lang" && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#7aab8a", letterSpacing: "0.1em", textTransform: "uppercase" }}>{ui.welcome}</p>}
      </div>

      {/* ── LANGUAGE SCREEN ── */}
      {phase === "lang" && (
        <div style={{ width: "100%", maxWidth: 500, animation: "fadeIn 0.4s ease" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 8px 32px rgba(45,122,82,0.12)", border: "1px solid rgba(45,122,82,0.1)" }}>
            <p style={{ textAlign: "center", fontSize: 16, color: "#2d5c3e", marginBottom: 20, fontWeight: 600 }}>🌐 {ui.selectLang}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {LANGUAGES.map(({ id, native, country, Flag }) => (
                <div key={id} className="lang-card" onClick={() => { setLang(id); setPhase("domains"); }}
                  style={{ padding: "20px 16px", borderRadius: 14, background: "#f7fbf8", border: "1px solid rgba(45,122,82,0.15)", boxShadow: "0 2px 8px rgba(45,122,82,0.08)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center" }}>
                  <Flag />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1a4d32" }}>{native}</div>
                    <div style={{ fontSize: 11, color: "#7aab8a", marginTop: 2 }}>{country}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "#9dc0a8", marginTop: 14, lineHeight: 1.6 }}>{UI_TEXT.en.disclaimer}</p>
        </div>
      )}

      {/* ── DOMAIN SELECTION ── */}
      {phase === "domains" && (
        <div style={{ width: "100%", maxWidth: 560, animation: "fadeIn 0.4s ease" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, boxShadow: "0 8px 32px rgba(45,122,82,0.12)", border: "1px solid rgba(45,122,82,0.1)" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 18, color: "#1a4d32", fontWeight: 700 }}>{ui.selectDomains}</h2>
            <p style={{ margin: "0 0 18px", fontSize: 13, color: "#6a9c7a", lineHeight: 1.5 }}>{ui.selectDomainsDesc}</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button onClick={() => setSelectedDomains(DOMAINS.map(d => d.id))} style={{ fontSize: 12, color: "#2d7a52", background: "rgba(45,122,82,0.08)", border: "1px solid rgba(45,122,82,0.2)", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>{ui.selectAll}</button>
              <button onClick={() => setSelectedDomains([])} style={{ fontSize: 12, color: "#7aab8a", background: "transparent", border: "1px solid rgba(45,122,82,0.15)", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>Clear</button>
              <button onClick={() => setPhase("lang")} style={{ marginLeft: "auto", fontSize: 12, color: "#7aab8a", background: "transparent", border: "none", cursor: "pointer" }}>🌐 {lang.toUpperCase()}</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {DOMAINS.map(d => {
                const sel = selectedDomains.includes(d.id);
                return (
                  <div key={d.id} className="dom-card" onClick={() => toggleDomain(d.id)}
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: sel ? `${d.color}12` : "#f7fbf8", border: sel ? `1.5px solid ${d.color}66` : "1.5px solid rgba(45,122,82,0.1)", boxShadow: sel ? `0 2px 10px ${d.color}22` : "none" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, border: sel ? `2px solid ${d.color}` : "2px solid #c8e0ce", background: sel ? d.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                      {sel && <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>✓</span>}
                    </div>
                    <span style={{ fontSize: 20 }}>{d.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? "#1a4d32" : "#4a7c5e" }}>{d.label[lang]}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={startQuiz} disabled={!selectedDomains.length}
              style={{ width: "100%", marginTop: 20, padding: "14px", borderRadius: 12, border: "none", background: selectedDomains.length ? "linear-gradient(135deg, #2d7a52, #52c27a)" : "#d8eadc", color: selectedDomains.length ? "#fff" : "#9dc0a8", fontSize: 15, fontWeight: 700, cursor: selectedDomains.length ? "pointer" : "not-allowed", boxShadow: selectedDomains.length ? "0 4px 14px rgba(45,122,82,0.3)" : "none", transition: "all 0.2s", fontFamily: "inherit" }}>
              {ui.begin} {selectedDomains.length > 0 ? `· ${selectedDomains.length} area${selectedDomains.length > 1 ? "s" : ""}` : ""}
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "#9dc0a8", marginTop: 14, lineHeight: 1.6 }}>{ui.disclaimer}</p>
        </div>
      )}

      {/* ── QUIZ ── */}
      {phase === "quiz" && currentQ && (
        <div style={{ width: "100%", maxWidth: 580 }}>
          {/* Progress bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#7aab8a", marginBottom: 6 }}>
              <span>{qIndex + 1} / {allQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 6, background: "#d1e8d9", borderRadius: 99 }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #2d7a52, #52c27a)", borderRadius: 99, transition: "width 0.3s ease" }} />
            </div>
          </div>

          <div style={{ transition: "opacity 0.2s ease, transform 0.2s ease", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 8px 32px rgba(45,122,82,0.12)", border: "1px solid rgba(45,122,82,0.1)" }}>
            {/* Domain tag */}
            {(() => { const dom = DOMAINS.find(d => QUESTIONS[d.id]?.some(q => q.id === currentQ.id)); return dom ? (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${dom.color}12`, border: `1px solid ${dom.color}33`, borderRadius: 20, padding: "3px 12px", marginBottom: 16, fontSize: 12, color: dom.color, fontWeight: 600 }}>
                {dom.icon} {dom.label[lang]}
              </div>
            ) : null; })()}

            <h2 style={{ margin: "0 0 24px", fontSize: 20, color: "#1a4d32", fontWeight: 700, lineHeight: 1.4 }}>{currentQ.q[lang]}</h2>

            {/* TEXT / NUMBER INPUT */}
            {(currentQ.type === "text" || currentQ.type === "number") && (
              <div>
                <input type={currentQ.type === "number" ? "number" : "text"} value={textInput} onChange={e => setTextInput(e.target.value)}
                  placeholder={currentQ.placeholder?.[lang] || ""}
                  style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1.5px solid rgba(45,122,82,0.25)", fontSize: 16, color: "#1a4d32", background: "#f7fbf8", boxSizing: "border-box", fontFamily: "inherit" }}
                  onKeyDown={e => { if (e.key === "Enter" && textInput.trim()) advance(textInput.trim()); }}
                />
                <button onClick={() => advance(textInput.trim())} disabled={!textInput.trim()}
                  style={{ width: "100%", marginTop: 12, padding: "13px", borderRadius: 12, border: "none", background: textInput.trim() ? "linear-gradient(135deg, #2d7a52, #52c27a)" : "#d8eadc", color: textInput.trim() ? "#fff" : "#9dc0a8", fontSize: 15, fontWeight: 700, cursor: textInput.trim() ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.15s" }}>
                  {isLast ? ui.submit : ui.next}
                </button>
              </div>
            )}

            {/* CHOICE OPTIONS */}
            {currentQ.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {currentQ.options[lang].map((opt, i) => {
                  const enOpt = currentQ.options.en[i];
                  const isSel = selected === enOpt;
                  return (
                    <div key={i} className="opt-btn" onClick={() => { setSelected(enOpt); setTimeout(() => advance(enOpt), 180); }}
                      style={{ padding: "13px 18px", borderRadius: 12, border: isSel ? "2px solid #2d7a52" : "1.5px solid rgba(45,122,82,0.18)", background: isSel ? "linear-gradient(135deg, #2d7a52, #52c27a)" : "#f7fbf8", color: isSel ? "#fff" : "#2d5c3e", fontSize: 14, fontWeight: isSel ? 600 : 400, display: "flex", alignItems: "center", gap: 12, boxShadow: isSel ? "0 4px 14px rgba(45,122,82,0.25)" : "0 1px 4px rgba(45,122,82,0.06)" }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", border: isSel ? "2px solid rgba(255,255,255,0.6)" : "2px solid #c8e0ce", background: isSel ? "rgba(255,255,255,0.25)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 700, color: isSel ? "#fff" : "#7aab8a" }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Back button */}
          <button onClick={goBack} style={{ marginTop: 14, background: "transparent", border: "none", color: "#7aab8a", fontSize: 13, cursor: "pointer", display: "block", margin: "14px auto 0", fontFamily: "inherit" }}>
            {ui.back}
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: "#9dc0a8", marginTop: 10, lineHeight: 1.6 }}>{ui.disclaimer}</p>
        </div>
      )}

      {/* ── SUMMARY ── */}
      {phase === "summary" && (
        <div style={{ width: "100%", maxWidth: 580, animation: "fadeIn 0.5s ease" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 8px 32px rgba(45,122,82,0.12)", border: "1px solid rgba(45,122,82,0.1)" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
              <h2 style={{ margin: 0, fontSize: 22, color: "#1a4d32", fontWeight: 700 }}>{ui.summary}</h2>
              {name && <p style={{ margin: "6px 0 0", color: "#6a9c7a", fontSize: 14 }}>Hi {name}! Here's your wellness snapshot.</p>}
            </div>

            {/* Info row */}
            {(answers.age || answers.weight) && (
              <div style={{ display: "flex", gap: 10, marginBottom: 20, justifyContent: "center" }}>
                {answers.age && <div style={{ padding: "8px 16px", background: "#f0faf4", borderRadius: 20, fontSize: 13, color: "#2d5c3e", border: "1px solid rgba(45,122,82,0.15)" }}>🎂 Age: {answers.age}</div>}
                {answers.weight && <div style={{ padding: "8px 16px", background: "#f0faf4", borderRadius: 20, fontSize: 13, color: "#2d5c3e", border: "1px solid rgba(45,122,82,0.15)" }}>⚖️ Weight: {answers.weight} lbs</div>}
              </div>
            )}

            {/* Risk cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {domainRisks.map(({ domain, risk }) => {
                const dom = DOMAINS.find(d => d.id === domain);
                const rl = RISK_LABELS[risk];
                return (
                  <div key={domain} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, background: rl.bg, border: `1.5px solid ${rl.color}33` }}>
                    <span style={{ fontSize: 24 }}>{dom.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1a4d32" }}>{dom.label[lang]}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", borderRadius: 20, padding: "5px 12px", border: `1px solid ${rl.color}44` }}>
                      <span style={{ fontSize: 14 }}>{rl.dot}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: rl.color }}>{rl[lang]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Overall */}
            {(() => {
              const avg = domainRisks.reduce((s, d) => s + d.risk, 0) / domainRisks.length;
              const overall = avg < 0.5 ? 0 : avg < 1.2 ? 1 : 2;
              const rl = RISK_LABELS[overall];
              return (
                <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 14, background: `${rl.color}10`, border: `2px solid ${rl.color}44`, textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#6a9c7a", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Overall Wellness</div>
                  <div style={{ fontSize: 28 }}>{rl.dot}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: rl.color }}>{rl[lang]}</div>
                </div>
              );
            })()}

            {/* High risk note */}
            {domainRisks.some(d => d.risk === 2) && (
              <div style={{ marginTop: 16, padding: "14px 18px", borderRadius: 12, background: "#fff7ed", border: "1.5px solid #f59e0b44" }}>
                <p style={{ margin: 0, fontSize: 13, color: "#92400e", lineHeight: 1.6 }}>
                  ⚠️ <strong>One or more areas flagged for follow-up.</strong> We recommend speaking with HR or your Employee Assistance Program (EAP) for additional support. Crisis support: call or text <strong>988</strong>.
                </p>
              </div>
            )}

            <button onClick={() => { setPhase("lang"); setAnswers({}); setSelectedDomains([]); }}
              style={{ width: "100%", marginTop: 20, padding: "13px", borderRadius: 12, border: "1.5px solid rgba(45,122,82,0.25)", background: "transparent", color: "#2d7a52", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
              {ui.restart}
            </button>
          </div>
          <p style={{ textAlign: "center", fontSize: 11, color: "#9dc0a8", marginTop: 14, lineHeight: 1.6 }}>{ui.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
