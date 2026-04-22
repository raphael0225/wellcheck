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
const FlagCN = () => <svg viewBox="0 0 60 30" width="36" height="20" style={{borderRadius:3,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}>
  <rect width="60" height="30" fill="#DE2910"/>
  <polygon points="8,3 9.2,7 13,7 10,9.5 11.2,13.5 8,11 4.8,13.5 6,9.5 3,7 6.8,7" fill="#FFDE00"/>
  <polygon points="16,1 17,4 20,4 17.5,5.8 18.5,9 16,7.2 13.5,9 14.5,5.8 12,4 15,4" fill="#FFDE00"/>
  <polygon points="20,6 21,9 24,9 21.5,10.8 22.5,14 20,12.2 17.5,14 18.5,10.8 16,9 19,9" fill="#FFDE00"/>
  <polygon points="20,13 21,16 24,16 21.5,17.8 22.5,21 20,19.2 17.5,21 18.5,17.8 16,16 19,16" fill="#FFDE00"/>
  <polygon points="16,18 17,21 20,21 17.5,22.8 18.5,26 16,24.2 13.5,26 14.5,22.8 12,21 15,21" fill="#FFDE00"/>
</svg>;
const FlagFR = () => <svg viewBox="0 0 60 30" width="36" height="20" style={{borderRadius:3,boxShadow:"0 1px 4px rgba(0,0,0,0.2)"}}>
  <rect width="20" height="30" fill="#002395"/>
  <rect x="20" width="20" height="30" fill="white"/>
  <rect x="40" width="20" height="30" fill="#ED2939"/>
</svg>;

const LANGUAGES = [
  { id:"en", native:"English",  country:"United States", Flag:FlagUS },
  { id:"tl", native:"Tagalog",  country:"Philippines",   Flag:FlagPH },
  { id:"es", native:"Español",  country:"Spain",         Flag:FlagES },
  { id:"ja", native:"日本語",    country:"Japan",         Flag:FlagJP },
  { id:"zh", native:"中文",      country:"China",         Flag:FlagCN },
  { id:"fr", native:"Français", country:"France",        Flag:FlagFR },
];

const DOMAINS = [
  { id:"general",      icon:"💊", label:{en:"General Health",   tl:"Pangkalahatang Kalusugan", es:"Salud General",      ja:"一般的な健康",   zh:"综合健康",    fr:"Santé Générale"   }, color:"#2d7a52" },
  { id:"mental",       icon:"🧠", label:{en:"Mental Health",    tl:"Kalusugang Pangkaisipan",  es:"Salud Mental",       ja:"メンタルヘルス", zh:"心理健康",    fr:"Santé Mentale"    }, color:"#6366f1" },
  { id:"lifestyle",    icon:"🏃", label:{en:"Lifestyle",        tl:"Pamumuhay",                es:"Estilo de Vida",     ja:"ライフスタイル", zh:"生活方式",    fr:"Mode de Vie"      }, color:"#0891b2" },
  { id:"dietary",      icon:"🥗", label:{en:"Dietary Health",   tl:"Kalusugan sa Pagkain",     es:"Salud Alimentaria",  ja:"食事の健康",     zh:"饮食健康",    fr:"Santé Alimentaire"}, color:"#16a34a" },
  { id:"occupational", icon:"💼", label:{en:"Occupational",     tl:"Kalusugan sa Trabaho",     es:"Salud Ocupacional",  ja:"職業的健康",     zh:"职业健康",    fr:"Santé au Travail" }, color:"#d97706" },
  { id:"financial",    icon:"💰", label:{en:"Financial Health", tl:"Pinansyal na Kalusugan",   es:"Salud Financiera",   ja:"財務的健康",     zh:"财务健康",    fr:"Santé Financière" }, color:"#059669" },
];

// Shorthand helpers for common option sets
const FREQ4 = {
  en:["Not at all","Several days","More than half the days","Nearly every day"],
  tl:["Hindi kailanman","Ilang araw","Higit sa kalahati ng mga araw","Halos araw-araw"],
  es:["Para nada","Varios días","Más de la mitad de los días","Casi todos los días"],
  ja:["全くない","数日","半分以上の日","ほぼ毎日"],
  zh:["完全没有","几天","超过一半的天数","几乎每天"],
  fr:["Pas du tout","Plusieurs jours","Plus de la moitié des jours","Presque tous les jours"]
};
const NEVER5 = {
  en:["Never","Rarely","Sometimes","Often","Always"],
  tl:["Hindi kailanman","Bihira","Minsan","Madalas","Lagi"],
  es:["Nunca","Raramente","A veces","A menudo","Siempre"],
  ja:["全くない","ほとんどない","時々","よく","常に"],
  zh:["从不","很少","有时","经常","总是"],
  fr:["Jamais","Rarement","Parfois","Souvent","Toujours"]
};
const EXCEL5 = {
  en:["Excellent","Good","Fair","Poor","Very poor"],
  tl:["Napakagaling","Magaling","Katamtaman","Masama","Napakasama"],
  es:["Excelente","Bueno","Regular","Malo","Muy malo"],
  ja:["非常に良い","良い","普通","悪い","非常に悪い"],
  zh:["非常好","好","一般","差","非常差"],
  fr:["Excellent","Bon","Passable","Mauvais","Très mauvais"]
};
const SAT5 = {
  en:["Very satisfied","Satisfied","Neutral","Dissatisfied","Very dissatisfied"],
  tl:["Napakasaya","Masaya","Walang pakiramdam","Hindi masaya","Napakahindi masaya"],
  es:["Muy satisfecho","Satisfecho","Neutral","Insatisfecho","Muy insatisfecho"],
  ja:["非常に満足","満足","普通","不満","非常に不満"],
  zh:["非常满意","满意","中立","不满意","非常不满意"],
  fr:["Très satisfait","Satisfait","Neutre","Insatisfait","Très insatisfait"]
};

const QUESTIONS = {
  personal:[
    {id:"p1",type:"text",  key:"name",   q:{en:"Welcome! What is your first name?",tl:"Maligayang pagdating! Ano ang iyong pangalan?",es:"¡Bienvenido! ¿Cuál es tu nombre?",ja:"ようこそ！お名前を教えてください",zh:"欢迎！您的名字是什么？",fr:"Bienvenue! Quel est votre prénom?"}},
    {id:"p2",type:"number",key:"age",    q:{en:"How old are you?",tl:"Ilang taon ka na?",es:"¿Cuántos años tienes?",ja:"年齢を教えてください",zh:"您多大了？",fr:"Quel âge avez-vous?"},placeholder:{en:"e.g. 35",tl:"hal. 35",es:"ej. 35",ja:"例：35",zh:"例：35",fr:"ex. 35"}},
    {id:"p3",type:"number",key:"weight", q:{en:"What is your weight? (lbs)",tl:"Ano ang iyong timbang? (lbs)",es:"¿Cuál es tu peso? (lbs)",ja:"体重（ポンド）を教えてください",zh:"您的体重是多少？（磅）",fr:"Quel est votre poids? (lbs)"},placeholder:{en:"e.g. 160",tl:"hal. 160",es:"ej. 160",ja:"例：160",zh:"例：160",fr:"ex. 160"}},
    {id:"p4",type:"choice",key:"gender", q:{en:"What is your biological sex?",tl:"Ano ang iyong biyolohikal na kasarian?",es:"¿Cuál es tu sexo biológico?",ja:"生物学的性別は？",zh:"您的生理性别是？",fr:"Quel est votre sexe biologique?"},
      options:{en:["Male","Female","Intersex","Prefer not to say"],tl:["Lalaki","Babae","Intersex","Mas gusto na huwag sabihin"],es:["Masculino","Femenino","Intersexual","Prefiero no decirlo"],ja:["男性","女性","インターセックス","答えたくない"],zh:["男性","女性","双性人","不想透露"],fr:["Masculin","Féminin","Intersexe","Préfère ne pas répondre"]},risk:[0,0,0,0]},
    {id:"p5",type:"choice",key:"ethnicity",q:{en:"What is your ethnicity? (optional)",tl:"Ano ang iyong etnisidad? (opsyonal)",es:"¿Cuál es tu etnia? (opcional)",ja:"民族性は？（任意）",zh:"您的族裔是什么？（可选）",fr:"Quelle est votre ethnicité? (optionnel)"},
      options:{en:["Asian / Pacific Islander","Black / African American","Hispanic / Latino","White / Caucasian","Multiracial","Other / Prefer not to say"],tl:["Asyano / Kapuluan ng Pasipiko","Itim / Aprikano-Amerikano","Hispanic / Latino","Puti / Caucasian","Multiracial","Iba pa / Mas gusto na huwag sabihin"],es:["Asiático / Isleño del Pacífico","Negro / Afroamericano","Hispano / Latino","Blanco / Caucásico","Multirracial","Otro / Prefiero no decirlo"],ja:["アジア人/太平洋諸島出身","黒人/アフリカ系アメリカ人","ヒスパニック/ラテン系","白人/コーカサス人","多民族","その他/答えたくない"],zh:["亚裔/太平洋岛民","黑人/非裔美国人","西班牙裔/拉丁裔","白人/高加索人","多种族","其他/不想透露"],fr:["Asiatique / Insulaire du Pacifique","Noir / Afro-Américain","Hispanique / Latino","Blanc / Caucasien","Multiracial","Autre / Préfère ne pas répondre"]},risk:[0,0,0,0,0,0]},
    {id:"p6",type:"choice",key:"employment",q:{en:"What best describes your employment status?",tl:"Ano ang pinaka-angkop na paglalarawan sa iyong katayuan sa trabaho?",es:"¿Qué describe mejor tu situación laboral?",ja:"雇用状況は？",zh:"您的就业状况如何？",fr:"Quelle est votre situation professionnelle?"},
      options:{en:["Full-time employed","Part-time employed","Self-employed / Freelance","Student","On leave / Between jobs","Retired"],tl:["Buong oras na trabaho","Bahagyang trabaho","Sariling negosyo / Freelance","Estudyante","Bakasyon / Walang trabaho","Retirado"],es:["Empleado tiempo completo","Empleado medio tiempo","Autónomo / Freelance","Estudiante","En descanso / Sin trabajo","Jubilado"],ja:["フルタイム雇用","パートタイム雇用","自営業/フリーランス","学生","休職中/無職","退職"],zh:["全职受雇","兼职受雇","自雇/自由职业","学生","休假中/在职间隔","退休"],fr:["Employé à temps plein","Employé à temps partiel","Travailleur indépendant","Étudiant","En congé / Entre deux emplois","Retraité"]},risk:[0,0,0,0,0,0]},
  ],
  general:[
    {id:"g4",type:"choice",key:"energy", q:{en:"How would you rate your energy levels lately?",tl:"Paano mo ilalarawan ang iyong antas ng enerhiya?",es:"¿Cómo calificarías tus niveles de energía?",ja:"最近のエネルギーレベルは？",zh:"您最近的能量水平如何？",fr:"Comment évalueriez-vous vos niveaux d'énergie récemment?"},
      options:{en:["Very high — great","Good — mostly energized","Average — up and down","Low — often tired","Very low — exhausted daily"],tl:["Napakataas","Magaling","Katamtaman","Mababa — madalas pagod","Napakababa"],es:["Muy alto","Bien","Regular","Bajo — a menudo cansado","Muy bajo"],ja:["非常に高い","良い","普通","低い","非常に低い"],zh:["非常高","良好","一般","低——经常疲倦","非常低"],fr:["Très élevé","Bon","Moyen","Faible — souvent fatigué","Très faible"]},risk:[0,0,1,1,2]},
    {id:"g5",type:"choice",key:"sleep",  q:{en:"How would you rate the overall quality and quantity of your sleep?",tl:"Paano mo ilalarawan ang kalidad at dami ng iyong tulog?",es:"¿Cómo calificarías la calidad y cantidad general de tu sueño?",ja:"睡眠の質と量を総合的にどう評価しますか？",zh:"您如何综合评价睡眠的质量和数量？",fr:"Comment évalueriez-vous la qualité et la quantité globales de votre sommeil?"},
      options:{en:["Excellent — 7–9 hrs, wake refreshed","Good — adequate sleep, mostly rested","Fair — not enough or poor quality","Poor — regularly tired, trouble sleeping","Very poor — chronic sleep problems"],tl:["Napakagaling — 7–9 oras, gising na sariwa","Magaling — sapat, karaniwang pahinga","Katamtaman","Masama — madalas pagod, hirap matulog","Napakasama — talamak na problema sa tulog"],es:["Excelente — 7–9 hrs, me despierto descansado","Bueno — sueño adecuado","Regular","Malo — cansado regularmente","Muy malo — problemas crónicos de sueño"],ja:["非常に良い — 7〜9時間、すっきり目覚める","良い — 十分な睡眠","普通","悪い — 常に疲れている","非常に悪い — 慢性的な睡眠問題"],zh:["非常好——7-9小时，醒来精神焕发","良好——睡眠充足","一般","差——经常疲倦，难以入睡","非常差——慢性睡眠问题"],fr:["Excellent — 7–9h, réveillé rafraîchi","Bon — sommeil adéquat","Passable","Mauvais — fatigué régulièrement","Très mauvais — problèmes chroniques"]},risk:[0,0,1,2,2]},
    {id:"g7",type:"choice",key:"checkup", q:{en:"When was your last medical check-up?",tl:"Kailan ang iyong huling medikal na check-up?",es:"¿Cuándo fue tu último chequeo médico?",ja:"最後の健康診断はいつ？",zh:"您上次体检是什么时候？",fr:"Quand était votre dernier bilan médical?"},
      options:{en:["Within last 6 months","6–12 months ago","1–2 years ago","Over 2 years ago","Never"],tl:["Sa nakaraang 6 na buwan","6–12 buwan","1–2 taon","Mahigit 2 taon","Hindi pa nagpapatingin"],es:["Últimos 6 meses","Hace 6–12 meses","Hace 1–2 años","Hace más de 2 años","Nunca"],ja:["過去6ヶ月以内","6〜12ヶ月前","1〜2年前","2年以上前","受けたことがない"],zh:["过去6个月内","6-12个月前","1-2年前","超过2年前","从未体检"],fr:["Dans les 6 derniers mois","Il y a 6–12 mois","Il y a 1–2 ans","Plus de 2 ans","Jamais"]},risk:[0,0,1,2,2]},
    {id:"g8",type:"choice",key:"pain",    q:{en:"Do you experience chronic pain or recurring physical symptoms?",tl:"Nakakaranas ka ba ng talamak na sakit?",es:"¿Experimentas dolor crónico o síntomas recurrentes?",ja:"慢性的な痛みや繰り返す身体症状はありますか？",zh:"您是否经历慢性疼痛或反复出现的身体症状？",fr:"Souffrez-vous de douleurs chroniques ou de symptômes récurrents?"},
      options:{en:["No pain or symptoms","Mild, rarely interferes","Moderate, sometimes limits me","Significant, often limits daily life","Severe, greatly impacts daily life"],tl:["Walang sakit","Banayad","Katamtaman","Malaki","Malubha"],es:["Sin dolor","Leve","Moderado","Significativo","Severo"],ja:["痛みなし","軽度","中程度","顕著","重度"],zh:["无疼痛或症状","轻微，很少干扰","中等，有时受限","明显，经常受限","严重，极大影响"],fr:["Aucune douleur","Légère","Modérée","Significative","Sévère"]},risk:[0,0,1,2,2]},
    {id:"g9",type:"choice",key:"medications",q:{en:"Are you taking prescribed medications regularly?",tl:"Umiinom ka ba ng iniresetang gamot nang regular?",es:"¿Tomas medicamentos recetados regularmente?",ja:"定期的に処方薬を服用していますか？",zh:"您是否定期服用处方药？",fr:"Prenez-vous des médicaments prescrits régulièrement?"},
      options:{en:["No medications","Yes, well-managed","Yes, sometimes miss doses","Yes, struggling to manage","Yes, without proper follow-up"],tl:["Walang gamot","Oo, maayos","Oo, minsan nakakalimot","Oo, nahihirapan","Oo, walang follow-up"],es:["Sin medicamentos","Sí, bien manejados","Sí, olvido a veces","Sí, con dificultad","Sí, sin seguimiento"],ja:["薬なし","管理できている","時々飲み忘れ","管理が難しい","適切なフォローなし"],zh:["不服药","是的，管理良好","是的，有时漏服","是的，难以管理","是的，没有随访"],fr:["Aucun médicament","Oui, bien géré","Oui, j'oublie parfois","Oui, difficile à gérer","Oui, sans suivi"]},risk:[0,0,1,2,2]},
    {id:"g10",type:"choice",key:"caregiver",q:{en:"Are you a caregiver for a family member or loved one?",tl:"Ikaw ba ay tagapag-alaga ng miyembro ng pamilya?",es:"¿Eres cuidador de un familiar o ser querido?",ja:"家族や愛する人の介護をしていますか？",zh:"您是否是家人或亲人的照顾者？",fr:"Êtes-vous aidant pour un membre de la famille ou un proche?"},
      options:{en:["No","Yes, manageable","Yes, somewhat stressful","Yes, very stressful","Yes, I'm overwhelmed"],tl:["Hindi","Oo, kayang-kaya","Oo, medyo stressful","Oo, napaka-stressful","Oo, nalulula na ako"],es:["No","Sí, manejable","Sí, algo estresante","Sí, muy estresante","Sí, me siento abrumado"],ja:["いいえ","はい、管理できる","はい、少しストレス","はい、非常にストレス","はい、圧倒されている"],zh:["不是","是的，可以管理","是的，有些压力","是的，压力很大","是的，不堪重负"],fr:["Non","Oui, gérable","Oui, un peu stressant","Oui, très stressant","Oui, je suis dépassé"]},risk:[0,0,1,2,2]},
    {id:"g11",type:"choice",key:"sexhealth",q:{en:"How would you rate your sexual and reproductive health awareness?",tl:"Paano mo ilalarawan ang iyong kaalaman sa sekswal na kalusugan?",es:"¿Cómo calificarías tu conocimiento sobre salud sexual y reproductiva?",ja:"性的・生殖的健康への意識は？",zh:"您对性健康和生殖健康的了解程度如何？",fr:"Comment évalueriez-vous votre connaissance de la santé sexuelle et reproductive?"},
      options:{en:["Very aware and proactive","Somewhat aware","Neutral","Not very aware","Not aware at all"],tl:["Napaka-mulat at aktibo","Medyo mulat","Neutral","Hindi masyadong mulat","Hindi mulat"],es:["Muy consciente","Algo consciente","Neutral","No muy consciente","Nada consciente"],ja:["非常に意識的","ある程度意識","普通","あまり意識していない","全く意識していない"],zh:["非常了解且积极","有一定了解","中立","了解不多","完全不了解"],fr:["Très conscient","Assez conscient","Neutre","Pas très conscient","Pas du tout conscient"]},risk:[0,0,1,1,2]},
    {id:"g12",type:"choice",key:"prevcare",q:{en:"How consistent are you with preventive screenings (dental, vision, cancer)?",tl:"Gaano ka konsistente sa mga preventive health screening?",es:"¿Qué tan consistente eres con los chequeos preventivos?",ja:"予防的スクリーニングを定期的に受けていますか？",zh:"您定期进行预防性检查吗？",fr:"Êtes-vous régulier dans les dépistages préventifs?"},
      options:{en:["Always up to date","Mostly up to date","Partially","Rarely","Never"],tl:["Lagi","Karaniwang","Bahagya","Bihira","Hindi kailanman"],es:["Siempre","Mayormente","Parcialmente","Raramente","Nunca"],ja:["常に最新","ほぼ最新","一部だけ","ほとんどしない","全くしない"],zh:["始终保持","大多数时候","部分","很少","从不"],fr:["Toujours","Généralement","Partiellement","Rarement","Jamais"]},risk:[0,0,1,2,2]},
  ],
  mental:[
    {id:"m1",type:"choice",key:"mood",        q:{en:"Over the past 2 weeks, how often felt down, depressed, or hopeless?",tl:"Sa nakaraang 2 linggo, gaano kadalas kang nakaramdam ng panglulumo?",es:"En las últimas 2 semanas, ¿con qué frecuencia te sentiste decaído o sin esperanza?",ja:"過去2週間、落ち込みや絶望感を感じましたか？",zh:"在过去2周内，您多久感到沮丧或绝望？",fr:"Au cours des 2 dernières semaines, combien de fois vous êtes-vous senti déprimé ou sans espoir?"},options:FREQ4,risk:[0,1,1,2]},
    {id:"m2",type:"choice",key:"anxiety",     q:{en:"How often do you feel nervous, anxious, or unable to stop worrying?",tl:"Gaano kadalas kang nakakaramdam ng kabahan o hindi mapigilan ang pag-aalala?",es:"¿Con qué frecuencia te sientes nervioso, ansioso o incapaz de dejar de preocuparte?",ja:"不安や心配が止まらないことはどのくらいありますか？",zh:"您多久感到紧张、焦虑或无法停止担忧？",fr:"À quelle fréquence vous sentez-vous nerveux, anxieux ou incapable d'arrêter de vous inquiéter?"},options:FREQ4,risk:[0,1,1,2]},
    {id:"m3",type:"choice",key:"stress",      q:{en:"How would you rate your overall stress level right now?",tl:"Paano mo ilalarawan ang iyong antas ng stress ngayon?",es:"¿Cómo calificarías tu nivel general de estrés ahora?",ja:"現在の全体的なストレスレベルは？",zh:"您现在的整体压力水平如何？",fr:"Comment évalueriez-vous votre niveau de stress global en ce moment?"},
      options:{en:["Very low","Manageable","Moderate","High","Overwhelming"],tl:["Napakababa","Makontrol","Katamtaman","Mataas","Napakalaki"],es:["Muy bajo","Manejable","Moderado","Alto","Abrumador"],ja:["非常に低い","管理できる","中程度","高い","圧倒的"],zh:["非常低","可控","中等","高","压倒性"],fr:["Très faible","Gérable","Modéré","Élevé","Écrasant"]},risk:[0,0,1,2,2]},
    {id:"m4",type:"choice",key:"interest",    q:{en:"Have you lost interest or pleasure in activities you used to enjoy?",tl:"Nawala ba ang iyong interes sa mga gawain na dati mong nagugustuhan?",es:"¿Has perdido interés o placer en actividades que antes disfrutabas?",ja:"以前楽しんでいた活動への興味を失いましたか？",zh:"您是否对以前喜欢的活动失去了兴趣或乐趣？",fr:"Avez-vous perdu l'intérêt ou le plaisir pour des activités que vous aimiez?"},options:FREQ4,risk:[0,1,2,2]},
    {id:"m5",type:"choice",key:"concentrate", q:{en:"How often do you have trouble concentrating or making decisions?",tl:"Gaano kadalas ka nahihirapang mag-concentrate o gumawa ng desisyon?",es:"¿Con qué frecuencia tienes dificultad para concentrarte o tomar decisiones?",ja:"集中力や意思決定に困ることはどのくらいありますか？",zh:"您多久有一次注意力或决策困难？",fr:"À quelle fréquence avez-vous du mal à vous concentrer ou à prendre des décisions?"},
      options:{en:["Rarely or never","Several days","More than half the days","Nearly every day"],tl:["Bihira o kailanman","Ilang araw","Higit sa kalahati","Halos araw-araw"],es:["Raramente","Varios días","Más de la mitad","Casi todos los días"],ja:["ほとんどない","数日","半分以上の日","ほぼ毎日"],zh:["很少或从不","几天","超过一半的天数","几乎每天"],fr:["Rarement","Plusieurs jours","Plus de la moitié","Presque tous les jours"]},risk:[0,1,2,2]},
    {id:"m6",type:"choice",key:"support",     q:{en:"Do you have people you can talk to when feeling overwhelmed?",tl:"Mayroon ka bang taong maaari kang kausapin kapag nalulula ka?",es:"¿Tienes personas con quienes hablar cuando te sientes abrumado?",ja:"辛いとき話せる人はいますか？",zh:"当您感到不知所措时，有可以倾诉的人吗？",fr:"Avez-vous des personnes à qui parler quand vous vous sentez dépassé?"},
      options:{en:["Yes, always","Usually yes","Sometimes","Rarely","No, I feel isolated"],tl:["Oo, lagi","Karaniwang oo","Minsan","Bihira","Hindi, nagigipit ako"],es:["Sí, siempre","Generalmente","A veces","Raramente","No, me siento aislado"],ja:["いつでもいる","大抵いる","時々いる","ほとんどいない","孤独を感じる"],zh:["是的，总有","通常有","有时","很少","没有，感到孤立"],fr:["Oui, toujours","Généralement","Parfois","Rarement","Non, je me sens isolé"]},risk:[0,0,1,2,2]},
    {id:"m7",type:"choice",key:"loneliness",  q:{en:"How often do you feel lonely or socially disconnected?",tl:"Gaano kadalas kang nakakaramdam ng kalungkutan?",es:"¿Con qué frecuencia te sientes solo o desconectado socialmente?",ja:"孤独感や社会的な孤立感を感じることはどのくらいありますか？",zh:"您多久感到孤独或社交脱节？",fr:"À quelle fréquence vous sentez-vous seul ou socialement déconnecté?"},options:NEVER5,risk:[0,0,1,2,2]},
    {id:"m8",type:"choice",key:"socialconn",  q:{en:"How satisfied are you with your social connections and relationships?",tl:"Gaano ka nasiyahan sa iyong mga relasyon sa lipunan?",es:"¿Qué tan satisfecho estás con tus conexiones sociales?",ja:"社会的なつながりや人間関係にどのくらい満足していますか？",zh:"您对您的社交关系和人际关系满意吗？",fr:"Êtes-vous satisfait de vos connexions sociales et relations?"},options:SAT5,risk:[0,0,1,2,2]},
    {id:"m9",type:"choice",key:"selfesteem",  q:{en:"How would you describe your overall self-esteem?",tl:"Paano mo ilalarawan ang iyong pagpapahalaga sa sarili?",es:"¿Cómo describirías tu autoestima general?",ja:"全体的な自己評価はいかがですか？",zh:"您如何描述您的整体自我评价？",fr:"Comment décririez-vous votre estime de vous en général?"},
      options:{en:["Very positive","Mostly positive","Neutral","Mostly negative","Very negative"],tl:["Napaka-positibo","Karaniwang positibo","Neutral","Karaniwang negatibo","Napaka-negatibo"],es:["Muy positiva","Mayormente positiva","Neutral","Mayormente negativa","Muy negativa"],ja:["非常にポジティブ","ほぼポジティブ","普通","ほぼネガティブ","非常にネガティブ"],zh:["非常积极","大多积极","中立","大多消极","非常消极"],fr:["Très positive","Plutôt positive","Neutre","Plutôt négative","Très négative"]},risk:[0,0,1,2,2]},
    {id:"m10",type:"choice",key:"therapy",    q:{en:"Have you ever sought or are you currently receiving mental health support?",tl:"Naghanap ka na ba ng suporta sa kalusugang pangkaisipan?",es:"¿Alguna vez has buscado o estás recibiendo apoyo en salud mental?",ja:"メンタルヘルスのサポートを求めたことはありますか？",zh:"您是否曾经寻求或目前正在接受心理健康支持？",fr:"Avez-vous déjà cherché ou recevez-vous actuellement un soutien en santé mentale?"},
      options:{en:["Yes, currently receiving","Yes, in the past","Considered but not started","No, but I'd like to","No, I don't need it"],tl:["Oo, kasalukuyang tumatanggap","Oo, noong nakaraan","Isinaalang-alang pero hindi pa","Hindi, pero gusto ko","Hindi, hindi ko kailangan"],es:["Sí, actualmente","Sí, en el pasado","Lo consideré pero no empecé","No, pero me gustaría","No, no lo necesito"],ja:["はい、現在受けている","はい、過去に","考えたがまだ","いいえ、でも受けたい","いいえ、必要ない"],zh:["是的，目前正在接受","是的，过去接受过","考虑过但未开始","没有，但我想要","没有，我不需要"],fr:["Oui, actuellement","Oui, dans le passé","Envisagé mais pas commencé","Non, mais j'aimerais","Non, je n'en ai pas besoin"]},risk:[0,0,1,1,2]},
  ],
  lifestyle:[
    {id:"l1",type:"choice",key:"exercise",   q:{en:"How often do you exercise per week?",tl:"Gaano kadalas kang nag-eehersisyo bawat linggo?",es:"¿Con qué frecuencia haces ejercicio por semana?",ja:"週に何回運動しますか？",zh:"您每周锻炼几次？",fr:"À quelle fréquence faites-vous de l'exercice par semaine?"},
      options:{en:["5+ days","3–4 days","1–2 days","Rarely","Never"],tl:["5+ araw","3–4 araw","1–2 araw","Bihira","Hindi kailanman"],es:["5+ días","3–4 días","1–2 días","Raramente","Nunca"],ja:["週5日以上","週3〜4日","週1〜2日","ほとんどしない","全くしない"],zh:["5天以上","3-4天","1-2天","很少","从不"],fr:["5+ jours","3–4 jours","1–2 jours","Rarement","Jamais"]},risk:[0,0,1,1,2]},
    {id:"l2",type:"choice",key:"extype",     q:{en:"What type of physical activity do you mostly do?",tl:"Anong uri ng pisikal na aktibidad ang karaniwang ginagawa mo?",es:"¿Qué tipo de actividad física realizas principalmente?",ja:"主にどのような身体活動をしていますか？",zh:"您主要进行什么类型的体育活动？",fr:"Quel type d'activité physique pratiquez-vous principalement?"},
      options:{en:["Cardio (running, cycling, swimming)","Strength training","Yoga/stretching/flexibility","Mixed activities","None"],tl:["Cardio (takbo, bisikleta, swimming)","Strength training","Yoga/stretching","Halo-halong aktibidad","Wala"],es:["Cardio","Entrenamiento de fuerza","Yoga/estiramiento","Mixto","Ninguna"],ja:["有酸素運動","筋トレ","ヨガ/ストレッチ","混合","なし"],zh:["有氧运动（跑步、骑车、游泳）","力量训练","瑜伽/伸展","混合活动","无"],fr:["Cardio","Musculation","Yoga/étirements","Mixte","Aucun"]},risk:[0,0,0,1,2]},
    {id:"l5",type:"choice",key:"smoking",    q:{en:"Do you currently smoke or use tobacco products?",tl:"Naninigarilyo ka ba o gumagamit ng tabako?",es:"¿Fumas o usas productos de tabaco actualmente?",ja:"現在、タバコや煙草製品を使用していますか？",zh:"您目前是否吸烟或使用烟草产品？",fr:"Fumez-vous ou utilisez-vous des produits du tabac actuellement?"},
      options:{en:["No, never","Quit more than 1 year ago","Quit less than 1 year ago","Occasionally","Daily"],tl:["Hindi, kailanman","Tumigil mahigit 1 taon","Tumigil wala pang 1 taon","Paminsan-minsan","Araw-araw"],es:["No, nunca","Dejé hace más de 1 año","Dejé hace menos de 1 año","Ocasionalmente","Diariamente"],ja:["いいえ、一度も","1年以上前に辞めた","1年未満前に辞めた","時々","毎日"],zh:["不，从未","超过1年前戒了","不到1年前戒了","偶尔","每天"],fr:["Non, jamais","Arrêté il y a plus d'1 an","Arrêté il y a moins d'1 an","Occasionnellement","Quotidiennement"]},risk:[0,0,1,1,2]},
    {id:"l6",type:"choice",key:"alcohol",    q:{en:"How often do you consume alcohol?",tl:"Gaano kadalas kang umiinom ng alak?",es:"¿Con qué frecuencia consumes alcohol?",ja:"どのくらいの頻度でアルコールを摂取しますか？",zh:"您多久喝一次酒？",fr:"À quelle fréquence consommez-vous de l'alcool?"},
      options:{en:["Never","Rarely (few times/year)","Occasionally (1–2x/month)","Regularly (1–2x/week)","Frequently (3+x/week)"],tl:["Hindi kailanman","Bihira (ilang beses/taon)","Paminsan-minsan (1–2x/buwan)","Regular (1–2x/linggo)","Madalas (3+x/linggo)"],es:["Nunca","Raramente","Ocasionalmente","Regularmente","Frecuentemente"],ja:["全くない","ほとんどない（年数回）","時々（月1〜2回）","定期的（週1〜2回）","頻繁に（週3回以上）"],zh:["从不","很少（每年几次）","偶尔（每月1-2次）","定期（每周1-2次）","频繁（每周3次以上）"],fr:["Jamais","Rarement","Occasionnellement","Régulièrement","Fréquemment"]},risk:[0,0,1,1,2]},
    {id:"l7",type:"choice",key:"substances", q:{en:"Do you use recreational drugs or non-prescribed substances?",tl:"Gumagamit ka ba ng recreational drugs o hindi iniresetang sangkap?",es:"¿Usas drogas recreativas o sustancias no recetadas?",ja:"娯楽用薬物や処方箋なしの物質を使用していますか？",zh:"您是否使用娱乐性药物或非处方物质？",fr:"Utilisez-vous des drogues récréatives ou des substances non prescrites?"},
      options:{en:["No, never","Tried once or twice","Occasionally (few times/year)","Monthly","Weekly or more"],tl:["Hindi, kailanman","Sinubukan isang o dalawang beses","Paminsan-minsan","Buwanan","Lingguhanan o mas madalas"],es:["No, nunca","Lo probé una o dos veces","Ocasionalmente","Mensualmente","Semanalmente o más"],ja:["いいえ、一度も","過去に1〜2回試した","時々（年数回）","毎月","毎週以上"],zh:["不，从未","尝试过一两次","偶尔（每年几次）","每月","每周或更多"],fr:["Non, jamais","Essayé une ou deux fois","Occasionnellement","Mensuellement","Hebdomadairement ou plus"]},risk:[0,0,1,2,2]},
    {id:"l8",type:"choice",key:"screentime", q:{en:"Hours per day on screens (outside work)?",tl:"Ilang oras bawat araw sa screen (labas ng trabaho)?",es:"¿Horas al día en pantallas (fuera del trabajo)?",ja:"仕事以外でスクリーンに何時間費やしていますか？",zh:"每天在屏幕前（工作以外）花多少时间？",fr:"Heures par jour sur les écrans (hors travail)?"},
      options:{en:["Less than 1 hour","1–2 hours","3–4 hours","5–6 hours","7+ hours"],tl:["Wala pang 1 oras","1–2 oras","3–4 oras","5–6 oras","7+ oras"],es:["Menos de 1 hora","1–2 horas","3–4 horas","5–6 horas","7+ horas"],ja:["1時間未満","1〜2時間","3〜4時間","5〜6時間","7時間以上"],zh:["不到1小时","1-2小时","3-4小时","5-6小时","7小时以上"],fr:["Moins d'1 heure","1–2 heures","3–4 heures","5–6 heures","7+ heures"]},risk:[0,0,1,2,2]},
    {id:"l9",type:"choice",key:"socialmedia",q:{en:"How does your social media use affect your mood?",tl:"Paano nakakaapekto ang iyong paggamit ng social media sa iyong mood?",es:"¿Cómo afecta tu uso de redes sociales a tu estado de ánimo?",ja:"ソーシャルメディアの使用はあなたの気分にどのように影響していますか？",zh:"您的社交媒体使用如何影响您的情绪？",fr:"Comment l'utilisation des réseaux sociaux affecte-t-elle votre humeur?"},
      options:{en:["Very positively","Mostly neutral","Sometimes negative","Often leaves me anxious","Very negatively"],tl:["Napaka-positibo","Karaniwang neutral","Minsan negatibo","Madalas nagdudulot ng pagkabalisa","Napaka-negatibo"],es:["Muy positivamente","Mayormente neutral","A veces negativo","A menudo ansioso","Muy negativamente"],ja:["非常にポジティブ","ほぼ中立","時々ネガティブ","よく不安を感じる","非常にネガティブ"],zh:["非常积极","大多中立","有时消极","经常让我感到焦虑","非常消极"],fr:["Très positivement","Plutôt neutre","Parfois négatif","Souvent anxieux","Très négativement"]},risk:[0,0,1,2,2]},
    {id:"l10",type:"choice",key:"outdoors",  q:{en:"How often do you spend time outdoors or in nature?",tl:"Gaano kadalas kang gumagugol ng oras sa labas ng bahay?",es:"¿Con qué frecuencia pasas tiempo al aire libre o en la naturaleza?",ja:"屋外や自然の中で過ごす時間はどのくらいありますか？",zh:"您多久在户外或大自然中度过时间？",fr:"À quelle fréquence passez-vous du temps en plein air ou dans la nature?"},
      options:{en:["Daily","Several times a week","Once a week","Rarely","Almost never"],tl:["Araw-araw","Ilang beses sa isang linggo","Isang beses sa isang linggo","Bihira","Halos hindi kailanman"],es:["Diariamente","Varias veces a la semana","Una vez a la semana","Raramente","Casi nunca"],ja:["毎日","週数回","週1回","ほとんどしない","ほぼしない"],zh:["每天","每周几次","每周一次","很少","几乎从不"],fr:["Quotidiennement","Plusieurs fois par semaine","Une fois par semaine","Rarement","Presque jamais"]},risk:[0,0,1,1,2]},
  ],
  occupational:[
    {id:"o1",type:"choice",key:"workload",    q:{en:"How manageable is your current workload?",tl:"Gaano mo nakokontrol ang iyong kasalukuyang trabaho?",es:"¿Qué tan manejable es tu carga de trabajo actual?",ja:"現在の仕事量は管理できていますか？",zh:"您当前的工作量是否可管理？",fr:"Dans quelle mesure votre charge de travail actuelle est-elle gérable?"},
      options:{en:["Very manageable","Mostly manageable","Sometimes overwhelming","Often overwhelming","Completely overwhelming"],tl:["Napakahusay","Karaniwang makontrol","Minsan napapalaki","Madalas napapalaki","Ganap na napapalaki"],es:["Muy manejable","Mayormente manejable","A veces abrumadora","A menudo abrumadora","Completamente abrumadora"],ja:["非常に管理できる","ほぼ管理できる","時々圧倒される","よく圧倒される","完全に圧倒されている"],zh:["非常可管理","大多可管理","有时不堪重负","经常不堪重负","完全不堪重负"],fr:["Très gérable","Principalement gérable","Parfois accablante","Souvent accablante","Complètement accablante"]},risk:[0,0,1,2,2]},
    {id:"o2",type:"choice",key:"balance",     q:{en:"How would you rate your work-life balance?",tl:"Paano mo ilalarawan ang iyong balanse sa trabaho at buhay?",es:"¿Cómo calificarías tu equilibrio trabajo-vida?",ja:"ワークライフバランスは？",zh:"您如何评价您的工作与生活平衡？",fr:"Comment évalueriez-vous votre équilibre travail-vie personnelle?"},options:EXCEL5,risk:[0,0,1,2,2]},
    {id:"o3",type:"choice",key:"burnout",     q:{en:"How often do you feel emotionally drained or burned out from work?",tl:"Gaano kadalas kang nakakaramdam ng pagod sa emosyon o burnout?",es:"¿Con qué frecuencia te sientes emocionalmente agotado o quemado?",ja:"仕事で感情的に疲弊したり燃え尽き感を感じることはどのくらいありますか？",zh:"您多久感到因工作而情绪疲惫或精力耗尽？",fr:"À quelle fréquence vous sentez-vous émotionnellement épuisé ou brûlé par le travail?"},options:NEVER5,risk:[0,0,1,2,2]},
    {id:"o4",type:"choice",key:"satisfaction",q:{en:"How satisfied are you with your job overall?",tl:"Gaano ka kasaya sa iyong trabaho sa kabuuan?",es:"¿Qué tan satisfecho estás con tu trabajo en general?",ja:"仕事全体にどのくらい満足していますか？",zh:"您对您的工作总体满意吗？",fr:"Dans l'ensemble, êtes-vous satisfait de votre travail?"},options:SAT5,risk:[0,0,1,2,2]},
    {id:"o5",type:"choice",key:"management",  q:{en:"How would you describe your relationship with your manager?",tl:"Paano mo ilalarawan ang iyong relasyon sa iyong manager?",es:"¿Cómo describirías tu relación con tu gerente?",ja:"上司との関係は？",zh:"您如何描述您与上司的关系？",fr:"Comment décririez-vous votre relation avec votre responsable?"},
      options:{en:["Very positive and supportive","Generally good","Neutral","Sometimes difficult","Very difficult or toxic"],tl:["Napaka-positibo at sumusuporta","Sa pangkalahatan ay mabuti","Neutral","Minsan mahirap","Napakahirap o toxic"],es:["Muy positiva","Generalmente buena","Neutral","A veces difícil","Muy difícil o tóxica"],ja:["非常にポジティブ","概ね良好","普通","時々難しい","非常に困難"],zh:["非常积极和支持","总体良好","中立","有时困难","非常困难或有毒"],fr:["Très positive","Généralement bonne","Neutre","Parfois difficile","Très difficile ou toxique"]},risk:[0,0,1,2,2]},
    {id:"o6",type:"choice",key:"colleagues",  q:{en:"How supportive is your team or coworker environment?",tl:"Gaano kasuportado ang iyong koponan o kasamahan?",es:"¿Qué tan solidario es tu entorno de compañeros?",ja:"チームや同僚の環境はどのくらいサポート的ですか？",zh:"您的团队或同事环境有多支持？",fr:"Votre environnement d'équipe ou de collègues est-il solidaire?"},
      options:{en:["Very supportive","Generally supportive","Neutral","Sometimes unsupportive","Very unsupportive or toxic"],tl:["Napaka-suportado","Sa pangkalahatan","Neutral","Minsan hindi suportado","Hindi suportado o toxic"],es:["Muy solidario","Generalmente","Neutral","A veces poco solidario","Muy poco o tóxico"],ja:["非常にサポート的","概ねサポート的","普通","時々サポートなし","全くサポートなし"],zh:["非常支持","总体支持","中立","有时不支持","非常不支持或有毒"],fr:["Très solidaire","Généralement solidaire","Neutre","Parfois peu solidaire","Très peu ou toxique"]},risk:[0,0,1,2,2]},
    {id:"o7",type:"choice",key:"purpose",     q:{en:"How meaningful or purposeful does your work feel?",tl:"Gaano ka-makabuluhan ang iyong trabaho?",es:"¿Qué tan significativo o con propósito se siente tu trabajo?",ja:"仕事にどのくらい意味や目的を感じていますか？",zh:"您的工作感觉有多大意义或目的性？",fr:"Dans quelle mesure votre travail vous semble-t-il significatif ou porteur de sens?"},
      options:{en:["Very meaningful","Somewhat meaningful","Neutral","Rarely meaningful","Not meaningful at all"],tl:["Napaka-makabuluhan","Medyo makabuluhan","Neutral","Bihirang makabuluhan","Hindi makabuluhan"],es:["Muy significativo","Algo","Neutral","Raramente","Nada"],ja:["非常に意味がある","ある程度意味がある","普通","ほとんど意味がない","全く意味がない"],zh:["非常有意义","有一定意义","中立","很少有意义","毫无意义"],fr:["Très significatif","Assez significatif","Neutre","Rarement","Pas du tout"]},risk:[0,0,1,2,2]},
    {id:"o8",type:"choice",key:"remotelife",  q:{en:"If remote/hybrid, how does it affect your wellbeing?",tl:"Kung nagtatrabaho ka nang remote o hybrid, paano ito nakakaapekto?",es:"Si trabajas remoto o híbrido, ¿cómo afecta tu bienestar?",ja:"リモート/ハイブリッドで働いている場合、ウェルビーイングにどう影響していますか？",zh:"如果远程/混合办公，它如何影响您的幸福感？",fr:"Si vous travaillez à distance/hybride, comment cela affecte-t-il votre bien-être?"},
      options:{en:["Positively — I prefer it","Mostly positive","Neutral/not applicable","Somewhat negatively","Very negatively — isolated"],tl:["Positibo","Karaniwang positibo","Neutral o hindi naaangkop","Medyo negatibo","Napaka-negatibo"],es:["Positivamente","Mayormente positivo","Neutral/no aplica","Algo negativo","Muy negativo"],ja:["ポジティブ","ほぼポジティブ","普通/該当なし","少しネガティブ","非常にネガティブ"],zh:["积极——我更喜欢","大多积极","中立/不适用","有些消极","非常消极——感到孤立"],fr:["Positivement","Plutôt positif","Neutre/non applicable","Un peu négativement","Très négativement"]},risk:[0,0,0,1,2]},
    {id:"o9",type:"choice",key:"boundaries",  q:{en:"How well do you set boundaries between work and personal time?",tl:"Gaano kahusay mong itakda ang mga hangganan sa pagitan ng trabaho at personal na oras?",es:"¿Qué tan bien estableces límites entre trabajo y tiempo personal?",ja:"仕事と個人の時間の境界をうまく設定できていますか？",zh:"您在工作和个人时间之间设定界限的能力如何？",fr:"Dans quelle mesure établissez-vous des limites entre travail et vie personnelle?"},
      options:{en:["Very well — strict boundaries","Mostly well","Somewhat","Poorly — work bleeds into personal life","Very poorly — no boundaries"],tl:["Napakagaling","Karaniwang mahusay","Medyo","Mahina","Napakahina — walang hangganan"],es:["Muy bien","Mayormente bien","Algo","Mal","Muy mal — sin límites"],ja:["非常にうまく","ほぼうまく","ある程度","あまりうまくない","全くできていない"],zh:["非常好——严格界限","大多很好","有些界限","差——工作侵入个人生活","很差——没有界限"],fr:["Très bien","Plutôt bien","Un peu","Mal","Très mal — aucune limite"]},risk:[0,0,1,2,2]},
    {id:"o10",type:"choice",key:"recognition",q:{en:"Do you feel recognized and valued for your contributions?",tl:"Nakakaramdam ka ba na kinikilala at pinahahalagahan ang iyong mga kontribusyon?",es:"¿Te sientes reconocido y valorado por tus contribuciones?",ja:"職場での貢献が認められ、評価されていると感じますか？",zh:"您是否感到您的贡献被认可和重视？",fr:"Vous sentez-vous reconnu et valorisé pour vos contributions?"},
      options:{en:["Yes, always","Usually yes","Sometimes","Rarely","No, never"],tl:["Oo, lagi","Karaniwang oo","Minsan","Bihira","Hindi, kailanman"],es:["Sí, siempre","Generalmente","A veces","Raramente","No, nunca"],ja:["はい、常に","大抵はい","時々","ほとんどない","いいえ"],zh:["是的，总是","通常是","有时","很少","不，从不"],fr:["Oui, toujours","Généralement","Parfois","Rarement","Non, jamais"]},risk:[0,0,1,2,2]},
    {id:"o11",type:"choice",key:"growth",     q:{en:"Do you have opportunities for professional growth?",tl:"Mayroon ka bang mga pagkakataon para sa propesyonal na paglago?",es:"¿Tienes oportunidades para el crecimiento profesional?",ja:"専門的な成長の機会はありますか？",zh:"您是否有专业成长的机会？",fr:"Avez-vous des opportunités de croissance professionnelle?"},
      options:{en:["Yes, many opportunities","Some opportunities","Limited opportunities","Very few","None at all"],tl:["Oo, maraming pagkakataon","Ilang pagkakataon","Limitadong pagkakataon","Napakakaunti","Wala talaga"],es:["Muchas oportunidades","Algunas","Limitadas","Muy pocas","Ninguna"],ja:["はい、多くの機会","いくつかの機会","限られた機会","ほとんどない","全くない"],zh:["是的，很多机会","一些机会","有限的机会","很少","根本没有"],fr:["Oui, beaucoup","Quelques-unes","Limitées","Très peu","Aucune"]},risk:[0,0,1,2,2]},
  ],
  financial:[
    {id:"f1",type:"choice",key:"fstress",    q:{en:"How stressed are you about your personal finances?",tl:"Gaano ka ka-stress sa iyong personal na pananalapi?",es:"¿Qué tan estresado estás por tus finanzas personales?",ja:"個人の財務についてどのくらいストレスを感じていますか？",zh:"您对个人财务有多大压力？",fr:"Dans quelle mesure êtes-vous stressé par vos finances personnelles?"},
      options:{en:["Not stressed at all","Slightly stressed","Moderately stressed","Very stressed","Extremely stressed"],tl:["Hindi na-stress","Kaunting stress","Katamtamang stress","Napaka-stress","Sobrang stress"],es:["Nada","Ligeramente","Moderadamente","Muy","Extremadamente"],ja:["全くストレスなし","少し","中程度","非常に","極度のストレス"],zh:["完全不紧张","略微紧张","中等紧张","非常紧张","极度紧张"],fr:["Pas du tout","Légèrement","Modérément","Très","Extrêmement"]},risk:[0,0,1,2,2]},
    {id:"f2",type:"choice",key:"expenses",   q:{en:"How confident are you in covering your monthly expenses?",tl:"Gaano ka ka-kumpiyansa sa pagbabayad ng iyong buwanang gastos?",es:"¿Qué tan seguro estás de cubrir tus gastos mensuales?",ja:"毎月の支出を賄えることにどのくらい自信がありますか？",zh:"您对支付每月开销有多大信心？",fr:"Dans quelle mesure êtes-vous confiant de couvrir vos dépenses mensuelles?"},
      options:{en:["Very confident","Confident","Somewhat confident","Not very confident","Not confident at all"],tl:["Napaka-kumpiyansa","Kumpiyansa","Medyo","Hindi masyadong","Hindi talaga"],es:["Muy seguro","Seguro","Algo","No muy","Para nada"],ja:["非常に自信がある","自信がある","少し自信がある","あまり自信がない","全く自信がない"],zh:["非常有信心","有信心","有些信心","不太有信心","完全没信心"],fr:["Très confiant","Confiant","Assez confiant","Pas très confiant","Pas du tout"]},risk:[0,0,1,2,2]},
    {id:"f3",type:"choice",key:"savings",    q:{en:"Do you have an emergency fund covering 3–6 months of expenses?",tl:"Mayroon ka bang emergency fund na sumasaklaw ng 3–6 buwang gastos?",es:"¿Tienes un fondo de emergencia que cubra 3–6 meses de gastos?",ja:"3〜6ヶ月分の緊急資金はありますか？",zh:"您是否有3-6个月支出的应急基金？",fr:"Avez-vous un fonds d'urgence couvrant 3–6 mois de dépenses?"},
      options:{en:["Yes, fully funded","Partially funded (1–2 months)","Working on it","No, but planning to","No, and not planning to"],tl:["Oo, buo na","Bahagyang naipon (1–2 buwan)","Nagtatrabaho dito","Wala, pero nagpaplano","Wala, at hindi nagpaplano"],es:["Sí, completo","Parcialmente (1–2 meses)","Trabajando en ello","No, pero planeo","No, y no planeo"],ja:["はい、完全に準備済み","部分的に（1〜2ヶ月分）","取り組んでいる","いいえ、でも計画中","いいえ、計画もない"],zh:["是的，完全准备好","部分准备（1-2个月）","正在努力","没有，但计划中","没有，也不计划"],fr:["Oui, complet","Partiellement (1–2 mois)","En cours","Non, mais je prévois","Non, et je ne prévois pas"]},risk:[0,0,1,1,2]},
    {id:"f4",type:"choice",key:"debt",       q:{en:"How manageable is your current debt situation?",tl:"Gaano kayang-kaya ang iyong kasalukuyang sitwasyon sa utang?",es:"¿Qué tan manejable es tu situación de deuda actual?",ja:"現在の借金状況はどのくらい管理できていますか？",zh:"您当前的债务状况是否可管理？",fr:"Dans quelle mesure votre situation d'endettement est-elle gérable?"},
      options:{en:["No debt","Manageable — on track","Somewhat challenging","Difficult — struggling","Very overwhelming"],tl:["Walang utang","Makontrol","Medyo mahirap","Mahirap","Napakalaking utang"],es:["Sin deuda","Manejable","Algo desafiante","Difícil","Muy abrumadora"],ja:["借金なし","管理できる","やや困難","難しい","非常に圧倒的"],zh:["没有债务","可管理——步入正轨","有些困难","困难——难以应对","非常不堪重负"],fr:["Aucune dette","Gérable","Assez difficile","Difficile","Très accablante"]},risk:[0,0,1,2,2]},
    {id:"f5",type:"choice",key:"budget",     q:{en:"Do you follow a regular budget or financial plan?",tl:"Sumusunod ka ba sa regular na badyet o plano sa pananalapi?",es:"¿Sigues un presupuesto regular o plan financiero?",ja:"定期的な予算や財務計画を立てていますか？",zh:"您是否遵循定期预算或财务计划？",fr:"Suivez-vous un budget régulier ou un plan financier?"},
      options:{en:["Yes, consistently","Mostly — with some exceptions","Occasionally","Rarely","No budget at all"],tl:["Oo, palagi","Karaniwang — may ilang pagbubukod","Paminsan-minsan","Bihira","Walang badyet"],es:["Sí, constantemente","Mayormente","Ocasionalmente","Raramente","Sin presupuesto"],ja:["はい、一貫して","ほぼ","時々","ほとんどしない","全く予算なし"],zh:["是的，一贯","大多数时候","偶尔","很少","完全没有预算"],fr:["Oui, constamment","Principalement","Occasionnellement","Rarement","Aucun budget"]},risk:[0,0,1,1,2]},
    {id:"f6",type:"choice",key:"retirement", q:{en:"Are you actively saving for retirement?",tl:"Aktibo ka bang nag-iipon para sa pagreretiro?",es:"¿Estás ahorrando activamente para la jubilación?",ja:"老後のために積極的に貯蓄していますか？",zh:"您是否积极为退休储蓄？",fr:"Épargnez-vous activement pour la retraite?"},
      options:{en:["Yes, maximizing contributions","Yes, contributing regularly","Yes, but not enough","No, but planning to start","No, not at all"],tl:["Oo, pina-maximize","Oo, regular na nag-aambag","Oo, pero hindi sapat","Hindi, pero nagpaplano","Hindi, talaga"],es:["Sí, maximizando","Sí, regularmente","Sí, pero no suficiente","No, pero planeo","No, en absoluto"],ja:["はい、最大限に","はい、定期的に","はい、でも不十分","いいえ、でも開始予定","いいえ、全く"],zh:["是的，最大化贡献","是的，定期贡献","是的，但不够","没有，但计划开始","没有，完全不"],fr:["Oui, au maximum","Oui, régulièrement","Oui, mais pas assez","Non, mais je prévois","Non, pas du tout"]},risk:[0,0,1,2,2]},
    {id:"f7",type:"choice",key:"benefits",   q:{en:"Are you using your employee financial benefits (401k, EAP, FSA)?",tl:"Ginagamit mo ba ang iyong mga benepisyo sa pananalapi ng empleyado?",es:"¿Utilizas tus beneficios financieros de empleado?",ja:"従業員の財務福利厚生（401k、EAP等）を活用していますか？",zh:"您是否使用员工财务福利（401k、EAP、FSA）？",fr:"Utilisez-vous vos avantages financiers d'employé (401k, PAE, FSA)?"},
      options:{en:["Yes, fully utilizing all","Using some but not all","Aware but not using","Somewhat aware","Not aware at all"],tl:["Oo, ganap na ginagamit lahat","Ginagamit ang ilan","Alam pero hindi ginagamit","Medyo alam","Hindi alam"],es:["Sí, todos","Algunos pero no todos","Consciente pero no uso","Algo consciente","Nada consciente"],ja:["はい、すべて活用","一部活用","知っているが使っていない","ある程度知っている","全く知らない"],zh:["是的，完全利用","使用部分","知道但不使用","有些了解","完全不知道"],fr:["Oui, tous","Quelques-uns seulement","Conscient mais n'utilise pas","Assez conscient","Pas du tout conscient"]},risk:[0,0,1,1,2]},
    {id:"f8",type:"choice",key:"insurance",  q:{en:"Do you feel adequately covered by your health insurance?",tl:"Nakakaramdam ka ba na sapat ang saklaw ng iyong health insurance?",es:"¿Te sientes adecuadamente cubierto por tu seguro médico?",ja:"健康保険で十分にカバーされていると感じていますか？",zh:"您是否感到健康保险覆盖充分？",fr:"Vous sentez-vous adéquatement couvert par votre assurance maladie?"},
      options:{en:["Yes, very well covered","Mostly covered","Somewhat covered","Not well covered","No health insurance"],tl:["Oo, napakagaling ang saklaw","Karaniwang saklaw","Medyo saklaw","Hindi mahusay na saklaw","Walang health insurance"],es:["Muy bien cubierto","Mayormente","Algo","No bien cubierto","Sin seguro"],ja:["はい、非常によくカバー","ほぼカバー","ある程度","あまりカバーされていない","健康保険なし"],zh:["是的，非常好的覆盖","大多数情况下","有些覆盖","覆盖不好","没有健康保险"],fr:["Oui, très bien couvert","Principalement","Assez","Pas bien couvert","Sans assurance"]},risk:[0,0,1,2,2]},
    {id:"f9",type:"choice",key:"finliteracy",q:{en:"How would you rate your overall financial literacy?",tl:"Paano mo ilalarawan ang iyong pangkalahatang kaalaman sa pananalapi?",es:"¿Cómo calificarías tu educación financiera general?",ja:"全体的な金融リテラシーはいかがですか？",zh:"您如何评价自己的整体财务知识？",fr:"Comment évalueriez-vous votre culture financière générale?"},
      options:{en:["Very high — confident in finances","Good — mostly understand","Average — some gaps","Low — often confused","Very low — need significant help"],tl:["Napakataas","Magaling","Katamtaman","Mababa","Napakababa"],es:["Muy alta","Buena","Promedio","Baja","Muy baja"],ja:["非常に高い","良い","普通","低い","非常に低い"],zh:["非常高——对财务有信心","良好","一般","低——经常困惑","非常低——需要大量帮助"],fr:["Très élevée","Bonne","Moyenne","Faible","Très faible"]},risk:[0,0,1,2,2]},
    {id:"f10",type:"choice",key:"fgoals",    q:{en:"Do you have clear financial goals for the next 1–5 years?",tl:"Mayroon ka bang malinaw na mga layunin sa pananalapi para sa susunod na 1–5 taon?",es:"¿Tienes metas financieras claras para los próximos 1–5 años?",ja:"今後1〜5年の明確な財務目標はありますか？",zh:"您是否有未来1-5年的明确财务目标？",fr:"Avez-vous des objectifs financiers clairs pour les 1–5 prochaines années?"},
      options:{en:["Yes, clear goals and a plan","Yes, goals but no plan","Vague goals","Thinking about it","No financial goals"],tl:["Oo, malinaw na mga layunin at plano","Oo, mga layunin pero walang plano","Malabong mga layunin","Nag-iisip pa","Walang mga layunin"],es:["Sí, metas y plan","Sí, metas sin plan","Metas vagas","Lo estoy pensando","Sin metas"],ja:["はい、明確な目標と計画","はい、目標はあるが計画なし","漠然とした目標","考え中","財務目標なし"],zh:["是的，明确目标和计划","是的，有目标但没计划","模糊的目标","还在考虑","没有财务目标"],fr:["Oui, objectifs et plan clairs","Oui, objectifs sans plan","Objectifs vagues","J'y réfléchis","Aucun objectif"]},risk:[0,0,1,1,2]},
  ],
  dietary:[
    {id:"d1",type:"choice",key:"meals",      q:{en:"How many balanced meals do you eat per day?",tl:"Ilang balanseng pagkain ang iyong kinakain sa isang araw?",es:"¿Cuántas comidas equilibradas comes al día?",ja:"1日に何回バランスの取れた食事をしていますか？",zh:"您每天吃几顿均衡的饭？",fr:"Combien de repas équilibrés mangez-vous par jour?"},
      options:{en:["3 meals + healthy snacks","3 regular meals","2 meals","1 meal","Irregular — skip meals often"],tl:["3 pagkain + malusog na meryenda","3 regular na pagkain","2 pagkain","1 pagkain","Hindi regular — madalas preskong kumain"],es:["3 comidas + snacks saludables","3 comidas regulares","2 comidas","1 comida","Irregular — salto comidas a menudo"],ja:["3食＋ヘルシースナック","3食定期的","2食","1食","不規則——よく食事を抜く"],zh:["3餐+健康零食","3餐规律","2餐","1餐","不规律——经常跳过餐食"],fr:["3 repas + collations saines","3 repas réguliers","2 repas","1 repas","Irrégulier — saute souvent des repas"]},risk:[0,0,1,2,2]},
    {id:"d2",type:"choice",key:"vegetables", q:{en:"How many servings of fruits and vegetables do you eat daily?",tl:"Ilang servings ng prutas at gulay ang iyong kinakain araw-araw?",es:"¿Cuántas porciones de frutas y verduras comes diariamente?",ja:"1日に何サービングの果物と野菜を食べていますか？",zh:"您每天吃几份水果和蔬菜？",fr:"Combien de portions de fruits et légumes mangez-vous quotidiennement?"},
      options:{en:["5+ servings","3–4 servings","2–3 servings","1 serving","Rarely eat fruits/vegetables"],tl:["5+ servings","3–4 servings","2–3 servings","1 serving","Bihirang kumain ng prutas/gulay"],es:["5+ porciones","3–4 porciones","2–3 porciones","1 porción","Raramente como frutas/verduras"],ja:["5サービング以上","3〜4サービング","2〜3サービング","1サービング","ほとんど食べない"],zh:["5份以上","3-4份","2-3份","1份","很少吃水果/蔬菜"],fr:["5+ portions","3–4 portions","2–3 portions","1 portion","Mange rarement des fruits/légumes"]},risk:[0,0,1,1,2]},
    {id:"d3",type:"choice",key:"protein",    q:{en:"How adequate is your daily protein intake?",tl:"Gaano kasapat ang iyong pang-araw-araw na pagkuha ng protina?",es:"¿Qué tan adecuada es tu ingesta diaria de proteínas?",ja:"毎日のタンパク質摂取量は十分ですか？",zh:"您每天的蛋白质摄入量是否充足？",fr:"Votre apport quotidien en protéines est-il adéquat?"},
      options:{en:["Very adequate — meet daily goals","Mostly adequate","Somewhat adequate","Often inadequate","Very inadequate"],tl:["Napaka-sapat","Karaniwang sapat","Medyo sapat","Madalas hindi sapat","Napaka-hindi sapat"],es:["Muy adecuada","Mayormente adecuada","Algo adecuada","A menudo inadecuada","Muy inadecuada"],ja:["非常に十分","ほぼ十分","ある程度十分","しばしば不十分","非常に不十分"],zh:["非常充足","大多充足","有些充足","经常不足","非常不足"],fr:["Très adéquat","Principalement adéquat","Assez adéquat","Souvent inadéquat","Très inadéquat"]},risk:[0,0,1,1,2]},
    {id:"d4",type:"choice",key:"processed",  q:{en:"How often do you consume processed or ultra-processed foods?",tl:"Gaano kadalas kang kumain ng processed o ultra-processed na pagkain?",es:"¿Con qué frecuencia consumes alimentos procesados o ultraprocesados?",ja:"加工食品や超加工食品をどのくらいの頻度で食べていますか？",zh:"您多久吃一次加工食品或超加工食品？",fr:"À quelle fréquence consommez-vous des aliments transformés ou ultra-transformés?"},
      options:{en:["Rarely — mostly whole foods","1–2 times per week","3–4 times per week","Daily","Multiple times daily"],tl:["Bihira — karaniwang buong pagkain","1–2 beses bawat linggo","3–4 beses bawat linggo","Araw-araw","Maraming beses sa isang araw"],es:["Raramente","1–2 veces/semana","3–4 veces/semana","Diariamente","Varias veces al día"],ja:["ほとんどない","週1〜2回","週3〜4回","毎日","1日複数回"],zh:["很少——主要吃天然食物","每周1-2次","每周3-4次","每天","每天多次"],fr:["Rarement","1–2 fois/semaine","3–4 fois/semaine","Quotidiennement","Plusieurs fois par jour"]},risk:[0,0,1,2,2]},
    {id:"d5",type:"choice",key:"sugar",      q:{en:"How would you describe your daily sugar and refined carb intake?",tl:"Paano mo ilalarawan ang iyong pang-araw-araw na paggamit ng asukal at pinong karbohidrat?",es:"¿Cómo describirías tu consumo diario de azúcar y carbohidratos refinados?",ja:"毎日の砂糖と精製炭水化物の摂取量はいかがですか？",zh:"您如何描述您每天的糖和精制碳水化合物摄入量？",fr:"Comment décririez-vous votre consommation quotidienne de sucre et de glucides raffinés?"},
      options:{en:["Very low — minimal sweets/refined carbs","Low","Moderate","High — daily sweets, white bread, soda","Very high — constant cravings"],tl:["Napakababa","Mababa","Katamtaman","Mataas — araw-araw na matamis","Napakataas"],es:["Muy bajo","Bajo","Moderado","Alto","Muy alto"],ja:["非常に低い","低い","中程度","高い","非常に高い"],zh:["非常低","低","中等","高——每天甜食/精制主食","非常高"],fr:["Très faible","Faible","Modéré","Élevé","Très élevé"]},risk:[0,0,1,2,2]},
    {id:"d6",type:"choice",key:"diettype",   q:{en:"Which best describes your diet pattern?",tl:"Alin ang pinakamaiangkop na paglalarawan sa iyong pattern ng pagkain?",es:"¿Cuál describe mejor tu patrón de dieta?",ja:"食事のパターンを最もよく表しているのはどれですか？",zh:"哪个最能描述您的饮食模式？",fr:"Lequel décrit le mieux votre régime alimentaire?"},
      options:{en:["Omnivore — eat everything","Flexitarian — mostly plant-based","Vegetarian","Vegan","Specific medical diet (diabetic, low-sodium, etc.)"],tl:["Omnivore — kumakain ng lahat","Flexitarian","Vegetarian","Vegan","Espesyal na medikal na diyeta"],es:["Omnívoro","Flexitariano","Vegetariano","Vegano","Dieta médica específica"],ja:["雑食","フレキシタリアン","ベジタリアン","ビーガン","特定の医療食"],zh:["杂食——什么都吃","弹性素食主义","素食者","纯素食者","特定医疗饮食"],fr:["Omnivore","Flexitarien","Végétarien","Végétalien","Régime médical spécifique"]},risk:[0,0,0,0,0]},
    {id:"d7",type:"choice",key:"mealprep",   q:{en:"How often do you cook or prepare your own meals at home?",tl:"Gaano kadalas kang nagluluto o naghahanda ng iyong sariling pagkain sa bahay?",es:"¿Con qué frecuencia cocinas o preparas tus propias comidas en casa?",ja:"自宅で料理や食事の準備をどのくらいの頻度でしていますか？",zh:"您多久在家自己做饭或准备餐食？",fr:"À quelle fréquence cuisinez-vous ou préparez-vous vos propres repas à la maison?"},
      options:{en:["Almost always","Most of the time","About half the time","Rarely — mostly eat out","Almost never — always eat out/takeout"],tl:["Halos palagi","Karaniwang oras","Humigit-kumulang kalahati ng oras","Bihira","Halos hindi kailanman"],es:["Casi siempre","La mayoría del tiempo","Aproximadamente la mitad","Raramente","Casi nunca"],ja:["ほぼ常に","ほとんどの場合","約半分","ほとんどしない","ほぼ外食"],zh:["几乎总是","大多数时候","大约一半时间","很少——主要外出就餐","几乎从不——总是外出/外卖"],fr:["Presque toujours","La plupart du temps","Environ la moitié","Rarement","Presque jamais"]},risk:[0,0,1,2,2]},
    {id:"d8",type:"choice",key:"foodsec",    q:{en:"Do you have consistent access to healthy, nutritious food?",tl:"Mayroon ka bang tuluy-tuloy na access sa malusog at masustansyang pagkain?",es:"¿Tienes acceso consistente a alimentos saludables y nutritivos?",ja:"健康的で栄養価の高い食事に常にアクセスできていますか？",zh:"您是否能持续获得健康、营养丰富的食物？",fr:"Avez-vous un accès constant à des aliments sains et nutritifs?"},
      options:{en:["Yes, always","Usually yes","Sometimes","Rarely","No — food insecurity is a concern"],tl:["Oo, lagi","Karaniwang oo","Minsan","Bihira","Hindi — food insecurity ang alalahanin"],es:["Sí, siempre","Generalmente","A veces","Raramente","No — inseguridad alimentaria"],ja:["はい、常に","大抵はい","時々","ほとんどない","いいえ — 食料不安がある"],zh:["是的，总是","通常是","有时","很少","没有——食品安全是个问题"],fr:["Oui, toujours","Généralement","Parfois","Rarement","Non — insécurité alimentaire"]},risk:[0,0,1,2,2]},
    {id:"d9",type:"choice",key:"supplements",q:{en:"Do you take vitamins or dietary supplements regularly?",tl:"Umiinom ka ba ng mga bitamina o dietary supplements nang regular?",es:"¿Tomas vitaminas o suplementos dietéticos regularmente?",ja:"定期的にビタミンやサプリメントを摂取していますか？",zh:"您是否定期服用维生素或膳食补充剂？",fr:"Prenez-vous des vitamines ou des compléments alimentaires régulièrement?"},
      options:{en:["Yes, prescribed by a doctor","Yes, self-prescribed","Occasionally","No, but considering it","No, not needed"],tl:["Oo, inireresetang ng doktor","Oo, sariling iniresetang","Paminsan-minsan","Hindi, pero isinasaalang-alang","Hindi, hindi kailangan"],es:["Sí, recetados por médico","Sí, autoprescritos","Ocasionalmente","No, pero lo considero","No, no es necesario"],ja:["はい、医師処方","はい、自己処方","時々","いいえ、検討中","いいえ、不要"],zh:["是的，医生开具","是的，自行服用","偶尔","没有，但在考虑","没有，不需要"],fr:["Oui, prescrits par médecin","Oui, auto-prescrits","Occasionnellement","Non, mais j'y pense","Non, pas nécessaire"]},risk:[0,0,0,1,0]},
    {id:"d10",type:"choice",key:"eating_habits",q:{en:"Do you notice any disordered eating patterns (skipping meals, binge eating, emotional eating)?",tl:"Napapansin mo ba ang anumang hindi maayos na gawi sa pagkain?",es:"¿Notas algún patrón alimentario desordenado (saltarte comidas, comer en exceso, comer emocionalmente)?",ja:"食事の乱れ（食事を抜く、過食、感情的な食事）に気づきますか？",zh:"您是否注意到任何饮食紊乱模式（跳餐、暴食、情绪化进食）？",fr:"Remarquez-vous des habitudes alimentaires désordonnées (sauter des repas, excès alimentaires, manger émotionnellement)?"},
      options:{en:["No, my eating habits are healthy","Occasionally skip meals","Sometimes overeat when stressed","Regularly eat emotionally or binge","Yes, significantly impacts my life"],tl:["Hindi, malusog ang aking gawi sa pagkain","Paminsan-minsan preskong kumain","Minsan sobrang kain kapag stressed","Regular na emosyonal na kumain","Oo, malaki ang epekto sa aking buhay"],es:["No, mis hábitos son saludables","Ocasionalmente salteo comidas","A veces como en exceso cuando estresado","Regularmente como emocionalmente","Sí, impacta significativamente mi vida"],ja:["いいえ、食習慣は健康的","時々食事を抜く","ストレス時に過食することがある","定期的に感情的な食事をする","はい、生活に大きく影響している"],zh:["没有，我的饮食习惯健康","偶尔跳过餐食","压力时有时暴食","经常情绪化进食或暴食","是的，严重影响我的生活"],fr:["Non, mes habitudes sont saines","Je saute occasionnellement des repas","Je mange parfois trop sous stress","Je mange régulièrement émotionnellement","Oui, impacte significativement ma vie"]},risk:[0,0,1,2,2]},
    {id:"d11",type:"choice",key:"hydration",  q:{en:"How much water do you drink daily?",tl:"Gaano karaming tubig ang iyong iniinom araw-araw?",es:"¿Cuánta agua bebes diariamente?",ja:"1日にどのくらい水を飲みますか？",zh:"您每天喝多少水？",fr:"Quelle quantité d'eau buvez-vous quotidiennement?"},
      options:{en:["8+ glasses","6–8 glasses","4–6 glasses","2–4 glasses","Less than 2 glasses"],tl:["8+ baso","6–8 baso","4–6 baso","2–4 baso","Wala pang 2 baso"],es:["8+ vasos","6–8 vasos","4–6 vasos","2–4 vasos","Menos de 2 vasos"],ja:["8杯以上","6〜8杯","4〜6杯","2〜4杯","2杯未満"],zh:["8杯以上","6-8杯","4-6杯","2-4杯","不到2杯"],fr:["8+ verres","6–8 verres","4–6 verres","2–4 verres","Moins de 2 verres"]},risk:[0,0,1,1,2]},
    {id:"d12",type:"choice",key:"dietgoal",   q:{en:"Do you have a specific dietary health goal?",tl:"Mayroon ka bang tiyak na layunin sa kalusugang pang-pagkain?",es:"¿Tienes un objetivo específico de salud alimentaria?",ja:"特定の食事の健康目標はありますか？",zh:"您有具体的饮食健康目标吗？",fr:"Avez-vous un objectif spécifique de santé alimentaire?"},
      options:{en:["Weight management","Improve energy levels","Manage a health condition (diabetes, heart disease)","Build muscle / athletic performance","General healthy eating","No specific goal"],tl:["Pamamahala ng timbang","Pagpapabuti ng antas ng enerhiya","Pamamahala ng kondisyong pangkalusugan","Pagbuo ng kalamnan","Pangkalahatang malusog na pagkain","Walang tiyak na layunin"],es:["Control de peso","Mejorar niveles de energía","Manejar una condición (diabetes, cardiopatía)","Músculo / rendimiento atlético","Alimentación saludable general","Sin objetivo específico"],ja:["体重管理","エネルギーレベルの向上","健康状態の管理","筋肉づくり/運動パフォーマンス","一般的な健康的な食事","特定の目標なし"],zh:["体重管理","提高能量水平","管理健康状况（糖尿病、心脏病）","增肌/运动表现","一般健康饮食","没有具体目标"],fr:["Gestion du poids","Améliorer les niveaux d'énergie","Gérer une condition (diabète, maladies cardiaques)","Musculation / performance athlétique","Alimentation saine générale","Pas d'objectif spécifique"]},risk:[0,0,0,0,0,0]},
  ],
};

const RISK_LABELS = {
  0:{en:"Low Risk",  tl:"Mababang Panganib", es:"Bajo Riesgo",  ja:"低リスク", zh:"低风险",  fr:"Faible Risque",  color:"#16a34a",bg:"#dcfce7",dot:"🟢"},
  1:{en:"Moderate",  tl:"Katamtaman",        es:"Moderado",     ja:"中程度",   zh:"中等风险", fr:"Modéré",         color:"#d97706",bg:"#fef3c7",dot:"🟡"},
  2:{en:"High Risk", tl:"Mataas na Panganib",es:"Alto Riesgo",  ja:"高リスク", zh:"高风险",  fr:"Risque Élevé",   color:"#dc2626",bg:"#fee2e2",dot:"🔴"},
};

const UI_TEXT = {
  en:{welcome:"Your confidential health check-in",next:"Next →",back:"← Back",submit:"See My Results",restart:"Start Over",selectLang:"Choose your language",selectDomains:"What would you like to assess today?",selectDomainsDesc:"Choose one or more areas. Your responses are completely confidential.",selectAll:"Select All",begin:"Begin",summary:"Your Wellness Report",disclaimer:"WellCheck is a wellness support tool, not a medical service. Crisis support: call or text 988.",quickAskTitle:"Just have a health question?",quickAskDesc:"Skip the full assessment and ask anything across all health domains. Get an instant personalized report.",quickAskPlaceholder:"e.g. How can I improve my sleep and reduce stress? or What should I focus on for better nutrition?",quickAskBtn:"✨ Get My Personalized Report"},
  tl:{welcome:"Ang iyong kumpidensyal na pagsusuri sa kalusugan",next:"Susunod →",back:"← Bumalik",submit:"Tingnan ang Aking Mga Resulta",restart:"Magsimula Muli",selectLang:"Pumili ng wika",selectDomains:"Ano ang nais mong suriin ngayon?",selectDomainsDesc:"Pumili ng isa o higit pang mga lugar. Ang iyong mga sagot ay ganap na kumpidensyal.",selectAll:"Piliin Lahat",begin:"Magsimula",summary:"Iyong Ulat sa Kalusugan",disclaimer:"Ang WellCheck ay isang tool sa suporta sa kalusugan. Krisis: tumawag o mag-text sa 988.",quickAskTitle:"Mayroon ka lang na tanong sa kalusugan?",quickAskDesc:"Laktawan ang buong pagtatasa at magtanong sa lahat ng larangan ng kalusugan.",quickAskPlaceholder:"hal. Paano ko mapapabuti ang aking tulog at mabawasan ang stress?",quickAskBtn:"✨ Makuha ang Aking Personalisadong Ulat"},
  es:{welcome:"Tu chequeo de salud confidencial",next:"Siguiente →",back:"← Atrás",submit:"Ver Mis Resultados",restart:"Comenzar de Nuevo",selectLang:"Elige tu idioma",selectDomains:"¿Qué te gustaría evaluar hoy?",selectDomainsDesc:"Elige una o más áreas. Tus respuestas son completamente confidenciales.",selectAll:"Seleccionar Todo",begin:"Comenzar",summary:"Tu Informe de Bienestar",disclaimer:"WellCheck es una herramienta de apoyo, no un servicio médico. Crisis: llama o envía texto al 988.",quickAskTitle:"¿Solo tienes una pregunta de salud?",quickAskDesc:"Omite la evaluación completa y pregunta sobre cualquier área de salud.",quickAskPlaceholder:"ej. ¿Cómo puedo mejorar mi sueño y reducir el estrés?",quickAskBtn:"✨ Obtener Mi Informe Personalizado"},
  ja:{welcome:"あなたの機密健康チェックイン",next:"次へ →",back:"← 戻る",submit:"結果を見る",restart:"最初からやり直す",selectLang:"言語を選択",selectDomains:"今日は何を評価しますか？",selectDomainsDesc:"1つ以上のエリアを選択してください。回答は完全に機密です。",selectAll:"すべて選択",begin:"開始",summary:"あなたのウェルネスレポート",disclaimer:"WellCheckはウェルネスサポートツールです。危機の場合：988に電話またはテキスト。",quickAskTitle:"健康に関する質問だけありますか？",quickAskDesc:"フル評価をスキップして、すべての健康領域について質問できます。",quickAskPlaceholder:"例：睡眠を改善してストレスを減らすにはどうすればいいですか？",quickAskBtn:"✨ 個別レポートを取得"},
  zh:{welcome:"您的保密健康检查",next:"下一步 →",back:"← 返回",submit:"查看我的结果",restart:"重新开始",selectLang:"选择您的语言",selectDomains:"您今天想评估什么？",selectDomainsDesc:"选择一个或多个区域。您的回答完全保密。",selectAll:"全选",begin:"开始",summary:"您的健康报告",disclaimer:"WellCheck是健康支持工具，不是医疗服务。危机支持：拨打或发短信至988。",quickAskTitle:"只有一个健康问题？",quickAskDesc:"跳过完整评估，就任何健康领域提问，获取即时个性化报告。",quickAskPlaceholder:"例：我如何改善睡眠和减轻压力？",quickAskBtn:"✨ 获取我的个性化报告"},
  fr:{welcome:"Votre bilan de santé confidentiel",next:"Suivant →",back:"← Retour",submit:"Voir Mes Résultats",restart:"Recommencer",selectLang:"Choisissez votre langue",selectDomains:"Que souhaitez-vous évaluer aujourd'hui?",selectDomainsDesc:"Choisissez un ou plusieurs domaines. Vos réponses sont entièrement confidentielles.",selectAll:"Tout Sélectionner",begin:"Commencer",summary:"Votre Rapport de Bien-être",disclaimer:"WellCheck est un outil de soutien, pas un service médical. Crise: appelez ou textez le 988.",quickAskTitle:"Vous avez juste une question de santé?",quickAskDesc:"Sautez l'évaluation complète et posez n'importe quelle question sur tous les domaines de santé.",quickAskPlaceholder:"ex. Comment améliorer mon sommeil et réduire le stress?",quickAskBtn:"✨ Obtenir Mon Rapport Personnalisé"},
};

function calcRisk(answers, domainId) {
  if (!QUESTIONS[domainId]) return 0;
  const qs = QUESTIONS[domainId].filter(q => q.type === "choice" && q.risk && q.risk.some(r => r > 0));
  if (!qs.length) return 0;
  const total = qs.reduce((sum, q) => {
    const idx = (q.options?.en || []).indexOf(answers[q.key] || "");
    return sum + (idx >= 0 ? (q.risk?.[idx] ?? 0) : 0);
  }, 0);
  const avg = total / qs.length;
  return avg < 0.5 ? 0 : avg < 1.2 ? 1 : 2;
}

export default function WellCheck() {
  const [phase, setPhase] = useState("lang");
  const [lang, setLang] = useState("en");
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [textInput, setTextInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [qaInput, setQaInput] = useState("");
  const [qaLoading, setQaLoading] = useState(false);
  const [qaReport, setQaReport] = useState(null);
  const [qaError, setQaError] = useState("");
  const [askOnlyInput, setAskOnlyInput] = useState("");

  const ui = UI_TEXT[lang];

  const toggleDomain = id => setSelectedDomains(prev =>
    prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
  );

  const startQuiz = () => {
    // Always prepend personal info questions
    const personalQs = QUESTIONS.personal;
    const domainQs = selectedDomains.flatMap(d => QUESTIONS[d]);
    setAllQuestions([...personalQs, ...domainQs]);
    setQIndex(0); setAnswers({});
    setSelected(null); setTextInput(""); setPhase("quiz");
  };

  const startAskOnly = () => {
    // Skip quiz — go straight to Q&A with all domains available
    setSelectedDomains(DOMAINS.map(d => d.id));
    setQaInput(askOnlyInput);
    setQaReport(null);
    setQaError("");
    setPhase("summary");
  };

  const startAskOnly = () => {
    const q = askOnlyInput.trim();
    if (!q) return;
    setSelectedDomains(DOMAINS.map(d => d.id));
    setQaInput(q);
    setQaReport(null);
    setQaError("");
    setPhase("summary");
    // Auto-submit immediately with the question value directly
    runQuestion(q, DOMAINS.map(d => d.id), {});
  };

  const currentQ = allQuestions[qIndex];
  const isLast = qIndex === allQuestions.length - 1;
  const progress = allQuestions.length ? (qIndex / allQuestions.length) * 100 : 0;

  const advance = (val) => {
    const newAnswers = { ...answers, [currentQ.key]: val };
    setAnswers(newAnswers);
    if (isLast) { setPhase("summary"); }
    else { setQIndex(i => i + 1); setSelected(null); setTextInput(""); }
  };

  const goBack = () => {
    if (qIndex === 0) { setPhase("domains"); return; }
    setQIndex(i => i - 1); setSelected(null); setTextInput("");
  };

  const runQuestion = async (question, domainIds, answerData) => {
    if (!question.trim() || qaLoading) return;
    setQaLoading(true);
    setQaError("");
    setQaReport(null);

    const allowedDomains = domainIds.map(id => DOMAINS.find(d => d.id === id)?.label?.en).filter(Boolean).join(", ");
    const hasAssessment = Object.keys(answerData).length > 0;

    const profileSummary = hasAssessment ? [
      answerData.name && `Name: ${answerData.name}`,
      answerData.age && `Age: ${answerData.age}`,
      answerData.weight && `Weight: ${answerData.weight} lbs`,
      answerData.gender && `Biological sex: ${answerData.gender}`,
      answerData.ethnicity && `Ethnicity: ${answerData.ethnicity}`,
      answerData.employment && `Employment: ${answerData.employment}`,
    ].filter(Boolean).join(" | ") : "No profile provided — respond generally";

    const riskSummary = hasAssessment && domainIds.length > 0
      ? domainIds.map(id => {
          const dom = DOMAINS.find(d => d.id === id);
          const risk = calcRisk(answerData, id);
          return `${dom?.label?.en}: ${["Low Risk","Moderate","High Risk"][risk]}`;
        }).join(" | ")
      : "No assessment completed — provide general evidence-based guidance";

    const systemPrompt = `You are WellCheck AI, a professional and compassionate workplace health advisor.
You ONLY answer questions related to these health domains: ${allowedDomains}.
If a question is clearly outside health topics, set outOfScope to true.

EMPLOYEE PROFILE: ${profileSummary}
ASSESSMENT RESULTS: ${riskSummary}

Respond ONLY with a valid JSON object, no markdown, no backticks, no extra text:
{"isHealthRelated":true,"outOfScope":false,"greeting":"string","summary":"string","highlights":["string","string","string"],"recommendations":[{"title":"string","detail":"string"},{"title":"string","detail":"string"},{"title":"string","detail":"string"}],"resources":["string","string","string"],"disclaimer":"string","declineMessage":""}`;

    try {
      // Use window.claude if available (artifact preview), otherwise use /api/chat (Vercel)
      let text = "";
      if (typeof window !== "undefined" && window.claude) {
        const result = await window.claude.complete({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1200,
          system: systemPrompt,
          messages: [{ role: "user", content: question.trim() }]
        });
        text = result?.content?.map(b => b.text || "").join("") || result || "";
      } else {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1200,
            system: systemPrompt,
            messages: [{ role: "user", content: question.trim() }]
          })
        });
        const data = await response.json();
        text = data.content?.map(b => b.text || "").join("") || "";
      }
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setQaReport(parsed);
    } catch (err) {
      console.error("WellCheck API error:", err);
      setQaError("Something went wrong generating your report. Please try again.");
    }
    setQaLoading(false);
  };

  const ALLOWED_DOMAINS_TEXT = selectedDomains.map(id => DOMAINS.find(d => d.id === id)?.label?.en).filter(Boolean).join(", ");

  const submitQuestion = async () => {
    if (!qaInput.trim() || qaLoading) return;
    await runQuestion(qaInput, selectedDomains, answers);
  };

  const domainRisks = phase === "summary" ? selectedDomains.map(id => ({ domain: id, risk: calcRisk(answers, id) })) : [];
  const name = answers.name || "";

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(145deg,#e8f5e9 0%,#f0faf4 50%,#e3f4ea 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif", padding:20 }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0}to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
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
        @media print {
          body * { visibility: hidden; }
          #wellcheck-report, #wellcheck-report * { visibility: visible; }
          #wellcheck-report { position: absolute; left: 0; top: 0; width: 100%; padding: 32px; box-shadow: none !important; border: none !important; border-radius: 0 !important; }
          button { display: none !important; }
        }
      `}</style>

      {/* LOGO */}
      <div style={{ textAlign:"center", marginBottom:24 }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10 }}>
          <div style={{ width:46, height:46, borderRadius:14, background:"linear-gradient(135deg,#2d7a52,#52c27a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, boxShadow:"0 4px 14px rgba(45,122,82,0.3)" }}>🩺</div>
          <h1 style={{ margin:0, fontSize:30, fontWeight:700, color:"#1a4d32", letterSpacing:"-0.5px" }}>Well<span style={{ color:"#2d7a52" }}>Check</span></h1>
        </div>
        {phase !== "lang" && <p style={{ margin:"4px 0 0", fontSize:12, color:"#7aab8a", letterSpacing:"0.1em", textTransform:"uppercase" }}>{ui.welcome}</p>}
      </div>

      {/* LANGUAGE SCREEN */}
      {phase === "lang" && (
        <div style={{ width:"100%", maxWidth:600, animation:"fadeIn 0.4s ease" }}>
          <div style={{ background:"#fff", borderRadius:20, padding:28, boxShadow:"0 8px 32px rgba(45,122,82,0.12)", border:"1px solid rgba(45,122,82,0.1)" }}>
            <p style={{ textAlign:"center", fontSize:16, color:"#2d5c3e", marginBottom:20, fontWeight:600 }}>🌐 {ui.selectLang}</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {LANGUAGES.map(({ id, native, country, Flag }) => (
                <div key={id} className="lang-card" onClick={() => { setLang(id); setPhase("domains"); }}
                  style={{ padding:"18px 12px", borderRadius:14, background:"#f7fbf8", border:"1px solid rgba(45,122,82,0.15)", boxShadow:"0 2px 8px rgba(45,122,82,0.08)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, textAlign:"center" }}>
                  <Flag />
                  <div>
                    <div style={{ fontSize:15, fontWeight:700, color:"#1a4d32" }}>{native}</div>
                    <div style={{ fontSize:11, color:"#7aab8a", marginTop:2 }}>{country}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p style={{ textAlign:"center", fontSize:11, color:"#9dc0a8", marginTop:14, lineHeight:1.6 }}>{UI_TEXT.en.disclaimer}</p>
        </div>
      )}

      {/* DOMAIN SELECTION */}
      {phase === "domains" && (
        <div style={{ width:"100%", maxWidth:560, animation:"fadeIn 0.4s ease" }}>

          {/* ── QUICK QUESTION BOX ── */}
          <div style={{ background:"#fff", borderRadius:20, padding:24, boxShadow:"0 8px 32px rgba(45,122,82,0.12)", border:"2px solid rgba(45,122,82,0.2)", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
              <div style={{ width:34, height:34, borderRadius:10, background:"linear-gradient(135deg,#2d7a52,#52c27a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>💬</div>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:"#1a4d32" }}>{ui.quickAskTitle}</div>
                <div style={{ fontSize:12, color:"#7aab8a", marginTop:1 }}>{ui.quickAskDesc}</div>
              </div>
            </div>
            <textarea
              value={askOnlyInput}
              onChange={e => setAskOnlyInput(e.target.value)}
              placeholder={ui.quickAskPlaceholder}
              rows={3}
              style={{ width:"100%", marginTop:12, padding:"12px 14px", borderRadius:12, border:"1.5px solid rgba(45,122,82,0.2)", fontSize:13, color:"#1a4d32", background:"#f7fbf8", fontFamily:"inherit", lineHeight:1.5, boxSizing:"border-box", resize:"vertical" }}
            />
            <button onClick={startAskOnly} disabled={!askOnlyInput.trim()}
              style={{ width:"100%", marginTop:10, padding:"11px", borderRadius:12, border:"none", background:askOnlyInput.trim() ? "linear-gradient(135deg,#2d7a52,#52c27a)" : "#d8eadc", color:askOnlyInput.trim() ? "#fff" : "#9dc0a8", fontSize:13, fontWeight:700, cursor:askOnlyInput.trim() ? "pointer" : "not-allowed", fontFamily:"inherit", transition:"all 0.2s", boxShadow:askOnlyInput.trim() ? "0 4px 14px rgba(45,122,82,0.3)" : "none" }}>
              {ui.quickAskBtn}
            </button>
          </div>

          {/* ── DIVIDER ── */}
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div style={{ flex:1, height:1, background:"rgba(45,122,82,0.12)" }} />
            <span style={{ fontSize:12, color:"#9dc0a8", fontWeight:600, whiteSpace:"nowrap" }}>— OR TAKE THE FULL ASSESSMENT —</span>
            <div style={{ flex:1, height:1, background:"rgba(45,122,82,0.12)" }} />
          </div>

          {/* ── FULL ASSESSMENT ── */}
          <div style={{ background:"#fff", borderRadius:20, padding:28, boxShadow:"0 8px 32px rgba(45,122,82,0.12)", border:"1px solid rgba(45,122,82,0.1)" }}>
            <h2 style={{ margin:"0 0 6px", fontSize:18, color:"#1a4d32", fontWeight:700 }}>{ui.selectDomains}</h2>
            <p style={{ margin:"0 0 18px", fontSize:13, color:"#6a9c7a", lineHeight:1.5 }}>{ui.selectDomainsDesc}</p>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              <button onClick={() => setSelectedDomains(DOMAINS.map(d => d.id))} style={{ fontSize:12, color:"#2d7a52", background:"rgba(45,122,82,0.08)", border:"1px solid rgba(45,122,82,0.2)", borderRadius:6, padding:"4px 12px", cursor:"pointer" }}>{ui.selectAll}</button>
              <button onClick={() => setSelectedDomains([])} style={{ fontSize:12, color:"#7aab8a", background:"transparent", border:"1px solid rgba(45,122,82,0.15)", borderRadius:6, padding:"4px 12px", cursor:"pointer" }}>Clear</button>
              <button onClick={() => setPhase("lang")} style={{ marginLeft:"auto", fontSize:12, color:"#7aab8a", background:"transparent", border:"none", cursor:"pointer" }}>🌐 {lang.toUpperCase()}</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {DOMAINS.map(d => {
                const sel = selectedDomains.includes(d.id);
                return (
                  <div key={d.id} className="dom-card" onClick={() => toggleDomain(d.id)}
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderRadius:12, background:sel?`${d.color}12`:"#f7fbf8", border:sel?`1.5px solid ${d.color}66`:"1.5px solid rgba(45,122,82,0.1)", boxShadow:sel?`0 2px 10px ${d.color}22`:"none" }}>
                    <div style={{ width:20, height:20, borderRadius:5, border:sel?`2px solid ${d.color}`:"2px solid #c8e0ce", background:sel?d.color:"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                      {sel && <span style={{ color:"#fff", fontSize:12, fontWeight:800 }}>✓</span>}
                    </div>
                    <span style={{ fontSize:20 }}>{d.icon}</span>
                    <span style={{ fontSize:14, fontWeight:sel?600:400, color:sel?"#1a4d32":"#4a7c5e" }}>{d.label[lang]}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={startQuiz} disabled={!selectedDomains.length}
              style={{ width:"100%", marginTop:20, padding:14, borderRadius:12, border:"none", background:selectedDomains.length?"linear-gradient(135deg,#2d7a52,#52c27a)":"#d8eadc", color:selectedDomains.length?"#fff":"#9dc0a8", fontSize:15, fontWeight:700, cursor:selectedDomains.length?"pointer":"not-allowed", boxShadow:selectedDomains.length?"0 4px 14px rgba(45,122,82,0.3)":"none", transition:"all 0.2s", fontFamily:"inherit" }}>
              {ui.begin} {selectedDomains.length > 0 ? `· ${selectedDomains.length} area${selectedDomains.length > 1 ? "s" : ""}` : ""}
            </button>
          </div>
          <p style={{ textAlign:"center", fontSize:11, color:"#9dc0a8", marginTop:14, lineHeight:1.6 }}>{ui.disclaimer}</p>
        </div>
      )}

      {/* QUIZ */}
      {phase === "quiz" && currentQ && (
        <div key={qIndex} style={{ width:"100%", maxWidth:580 }}>
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#7aab8a", marginBottom:6 }}>
              <span>{qIndex + 1} / {allQuestions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ height:6, background:"#d1e8d9", borderRadius:99 }}>
              <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#2d7a52,#52c27a)", borderRadius:99, transition:"width 0.3s ease" }} />
            </div>
          </div>

          <div style={{ animation:"slideUp 0.25s ease forwards", background:"#fff", borderRadius:20, padding:32, boxShadow:"0 8px 32px rgba(45,122,82,0.12)", border:"1px solid rgba(45,122,82,0.1)" }}>
            {(() => { const dom = DOMAINS.find(d => QUESTIONS[d.id]?.some(q => q.id === currentQ.id)); return dom ? (
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:`${dom.color}12`, border:`1px solid ${dom.color}33`, borderRadius:20, padding:"3px 12px", marginBottom:16, fontSize:12, color:dom.color, fontWeight:600 }}>
                {dom.icon} {dom.label[lang]}
              </div>
            ) : null; })()}

            <h2 style={{ margin:"0 0 24px", fontSize:20, color:"#1a4d32", fontWeight:700, lineHeight:1.4 }}>{currentQ.q[lang] || currentQ.q.en}</h2>

            {(currentQ.type === "text" || currentQ.type === "number") && (
              <div>
                <input type={currentQ.type === "number" ? "number" : "text"} value={textInput} onChange={e => setTextInput(e.target.value)}
                  placeholder={currentQ.placeholder?.[lang] || currentQ.placeholder?.en || ""}
                  style={{ width:"100%", padding:"14px 16px", borderRadius:12, border:"1.5px solid rgba(45,122,82,0.25)", fontSize:16, color:"#1a4d32", background:"#f7fbf8", boxSizing:"border-box", fontFamily:"inherit" }}
                  onKeyDown={e => { if (e.key === "Enter" && textInput.trim()) advance(textInput.trim()); }}
                />
                <button onClick={() => advance(textInput.trim())} disabled={!textInput.trim()}
                  style={{ width:"100%", marginTop:12, padding:13, borderRadius:12, border:"none", background:textInput.trim()?"linear-gradient(135deg,#2d7a52,#52c27a)":"#d8eadc", color:textInput.trim()?"#fff":"#9dc0a8", fontSize:15, fontWeight:700, cursor:textInput.trim()?"pointer":"not-allowed", fontFamily:"inherit", transition:"all 0.15s" }}>
                  {isLast ? ui.submit : ui.next}
                </button>
              </div>
            )}

            {currentQ.type === "choice" && (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {(currentQ.options[lang] || currentQ.options.en).map((opt, i) => {
                  const enOpt = currentQ.options.en[i];
                  const isSel = selected === enOpt;
                  return (
                    <div key={i} className="opt-btn" onClick={() => { setSelected(enOpt); advance(enOpt); }}
                      style={{ padding:"13px 18px", borderRadius:12, border:isSel?"2px solid #2d7a52":"1.5px solid rgba(45,122,82,0.18)", background:isSel?"linear-gradient(135deg,#2d7a52,#52c27a)":"#f7fbf8", color:isSel?"#fff":"#2d5c3e", fontSize:14, fontWeight:isSel?600:400, display:"flex", alignItems:"center", gap:12, boxShadow:isSel?"0 4px 14px rgba(45,122,82,0.25)":"0 1px 4px rgba(45,122,82,0.06)" }}>
                      <span style={{ width:22, height:22, borderRadius:"50%", border:isSel?"2px solid rgba(255,255,255,0.6)":"2px solid #c8e0ce", background:isSel?"rgba(255,255,255,0.25)":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:12, fontWeight:700, color:isSel?"#fff":"#7aab8a" }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <button onClick={goBack} style={{ marginTop:14, background:"transparent", border:"none", color:"#7aab8a", fontSize:13, cursor:"pointer", display:"block", margin:"14px auto 0", fontFamily:"inherit" }}>
            {ui.back}
          </button>
          <p style={{ textAlign:"center", fontSize:11, color:"#9dc0a8", marginTop:10, lineHeight:1.6 }}>{ui.disclaimer}</p>
        </div>
      )}

      {/* SUMMARY */}
      {phase === "summary" && (
        <div style={{ width:"100%", maxWidth:580, animation:"fadeIn 0.5s ease" }}>
          <div style={{ background:"#fff", borderRadius:20, padding:32, boxShadow:"0 8px 32px rgba(45,122,82,0.12)", border:"1px solid rgba(45,122,82,0.1)" }}>
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div style={{ fontSize:40, marginBottom:8 }}>📋</div>
              <h2 style={{ margin:0, fontSize:22, color:"#1a4d32", fontWeight:700 }}>{ui.summary}</h2>
              {name && <p style={{ margin:"6px 0 0", color:"#6a9c7a", fontSize:15 }}>Hi <strong>{name}</strong>! Here's your wellness snapshot.</p>}
              {!name && Object.keys(answers).length === 0 && <p style={{ margin:"6px 0 0", color:"#6a9c7a", fontSize:14 }}>Your personalized health report is ready below.</p>}
            </div>
            {(answers.age || answers.weight || answers.gender || answers.ethnicity || answers.employment) && (
              <div style={{ marginBottom:20, padding:"14px 18px", background:"#f7fbf8", borderRadius:14, border:"1px solid rgba(45,122,82,0.12)" }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#7aab8a", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>👤 Personal Profile</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {answers.age && <span style={{ padding:"5px 12px", background:"#fff", borderRadius:20, fontSize:12, color:"#2d5c3e", border:"1px solid rgba(45,122,82,0.2)" }}>🎂 Age: {answers.age}</span>}
                  {answers.weight && <span style={{ padding:"5px 12px", background:"#fff", borderRadius:20, fontSize:12, color:"#2d5c3e", border:"1px solid rgba(45,122,82,0.2)" }}>⚖️ {answers.weight} lbs</span>}
                  {answers.gender && <span style={{ padding:"5px 12px", background:"#fff", borderRadius:20, fontSize:12, color:"#2d5c3e", border:"1px solid rgba(45,122,82,0.2)" }}>🧬 {answers.gender}</span>}
                  {answers.ethnicity && <span style={{ padding:"5px 12px", background:"#fff", borderRadius:20, fontSize:12, color:"#2d5c3e", border:"1px solid rgba(45,122,82,0.2)" }}>🌍 {answers.ethnicity}</span>}
                  {answers.employment && <span style={{ padding:"5px 12px", background:"#fff", borderRadius:20, fontSize:12, color:"#2d5c3e", border:"1px solid rgba(45,122,82,0.2)" }}>💼 {answers.employment}</span>}
                </div>
              </div>
            )}
            {domainRisks.length > 0 && Object.keys(answers).length > 0 && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {domainRisks.map(({ domain, risk }) => {
                const dom = DOMAINS.find(d => d.id === domain);
                const rl = RISK_LABELS[risk];
                return (
                  <div key={domain} style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 18px", borderRadius:14, background:rl.bg, border:`1.5px solid ${rl.color}33` }}>
                    <span style={{ fontSize:24 }}>{dom.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:"#1a4d32" }}>{dom.label[lang]}</div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, background:"#fff", borderRadius:20, padding:"5px 12px", border:`1px solid ${rl.color}44` }}>
                      <span style={{ fontSize:14 }}>{rl.dot}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:rl.color }}>{rl[lang]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
            {domainRisks.length > 0 && Object.keys(answers).length > 0 && (() => {
              const avg = domainRisks.reduce((s, d) => s + d.risk, 0) / domainRisks.length;
              const overall = avg < 0.5 ? 0 : avg < 1.2 ? 1 : 2;
              const rl = RISK_LABELS[overall];
              return (
                <div style={{ marginTop:20, padding:"16px 20px", borderRadius:14, background:`${rl.color}10`, border:`2px solid ${rl.color}44`, textAlign:"center" }}>
                  <div style={{ fontSize:13, color:"#6a9c7a", marginBottom:4, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>Overall Wellness</div>
                  <div style={{ fontSize:28 }}>{rl.dot}</div>
                  <div style={{ fontSize:18, fontWeight:800, color:rl.color }}>{rl[lang]}</div>
                </div>
              );
            })()}
            {domainRisks.length > 0 && Object.keys(answers).length > 0 && domainRisks.some(d => d.risk === 2) && (
              <div style={{ marginTop:16, padding:"14px 18px", borderRadius:12, background:"#fff7ed", border:"1.5px solid #f59e0b44" }}>
                <p style={{ margin:0, fontSize:13, color:"#92400e", lineHeight:1.6 }}>
                  ⚠️ <strong>One or more areas flagged for follow-up.</strong> We recommend speaking with HR or your Employee Assistance Program (EAP). Crisis support: call or text <strong>988</strong>.
                </p>
              </div>
            )}
            <button onClick={() => { setPhase("lang"); setAnswers({}); setSelectedDomains([]); setQaReport(null); setQaInput(""); setAskOnlyInput(""); }}
              style={{ width:"100%", marginTop:20, padding:13, borderRadius:12, border:"1.5px solid rgba(45,122,82,0.25)", background:"transparent", color:"#2d7a52", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s" }}>
              {ui.restart}
            </button>
          </div>

          {/* ── Q&A SECTION ── */}
          <div style={{ background:"#fff", borderRadius:20, padding:28, boxShadow:"0 8px 32px rgba(45,122,82,0.12)", border:"1px solid rgba(45,122,82,0.1)", marginTop:16 }}>
            <div style={{ marginBottom:16 }}>
              <h3 style={{ margin:"0 0 4px", fontSize:16, color:"#1a4d32", fontWeight:700 }}>💬 Ask a Health Question</h3>
              <p style={{ margin:0, fontSize:12, color:"#7aab8a", lineHeight:1.5 }}>
                Ask anything related to your assessed areas: <em>{selectedDomains.map(id => DOMAINS.find(d => d.id === id)?.label?.en).join(", ")}</em>. Get a personalized, printable report.
              </p>
            </div>
            <textarea
              value={qaInput}
              onChange={e => setQaInput(e.target.value)}
              placeholder="e.g. What should I focus on most to improve my mental health? or How can I improve my sleep based on my results?"
              rows={3}
              style={{ width:"100%", padding:"12px 14px", borderRadius:12, border:"1.5px solid rgba(45,122,82,0.2)", fontSize:14, color:"#1a4d32", background:"#f7fbf8", fontFamily:"inherit", lineHeight:1.5, boxSizing:"border-box", resize:"vertical" }}
            />
            {qaError && <p style={{ color:"#dc2626", fontSize:12, margin:"6px 0 0" }}>{qaError}</p>}
            <button onClick={submitQuestion} disabled={!qaInput.trim() || qaLoading}
              style={{ width:"100%", marginTop:10, padding:"12px", borderRadius:12, border:"none", background:qaInput.trim() && !qaLoading ? "linear-gradient(135deg,#2d7a52,#52c27a)" : "#d8eadc", color:qaInput.trim() && !qaLoading ? "#fff" : "#9dc0a8", fontSize:14, fontWeight:700, cursor:qaInput.trim() && !qaLoading ? "pointer" : "not-allowed", fontFamily:"inherit", transition:"all 0.2s" }}>
              {qaLoading ? "Generating your personalized report..." : "✨ Generate Personalized Report"}
            </button>
          </div>

          {/* ── PRINTABLE REPORT ── */}
          {qaReport && (
            <div id="wellcheck-report" style={{ background:"#fff", borderRadius:20, padding:32, boxShadow:"0 8px 32px rgba(45,122,82,0.12)", border:"2px solid rgba(45,122,82,0.2)", marginTop:16, animation:"fadeIn 0.5s ease" }}>
              {qaReport.outOfScope || !qaReport.isHealthRelated ? (
                <div style={{ textAlign:"center", padding:"20px 0" }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>🚫</div>
                  <p style={{ color:"#6a9c7a", fontSize:14, lineHeight:1.6 }}>{qaReport.declineMessage}</p>
                </div>
              ) : (
                <>
                  {/* Report Header */}
                  <div style={{ borderBottom:"2px solid #e8f5e9", paddingBottom:16, marginBottom:20 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:"linear-gradient(135deg,#2d7a52,#52c27a)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🩺</div>
                      <div>
                        <div style={{ fontSize:18, fontWeight:800, color:"#1a4d32" }}>WellCheck Personalized Health Report</div>
                        <div style={{ fontSize:11, color:"#7aab8a" }}>{new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" })}</div>
                      </div>
                    </div>
                    <div style={{ background:"#f7fbf8", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#2d5c3e", fontStyle:"italic", lineHeight:1.6 }}>
                      {qaReport.greeting}
                    </div>
                  </div>

                  {/* Your Question */}
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#7aab8a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>📝 Your Question</div>
                    <div style={{ background:"#f0faf4", borderRadius:10, padding:"10px 14px", fontSize:13, color:"#1a4d32", lineHeight:1.6, borderLeft:"3px solid #2d7a52" }}>{qaInput}</div>
                  </div>

                  {/* Summary */}
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#7aab8a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>📊 Personalized Summary</div>
                    <p style={{ margin:0, fontSize:14, color:"#2d5c3e", lineHeight:1.7 }}>{qaReport.summary}</p>
                  </div>

                  {/* Highlights */}
                  {qaReport.highlights?.length > 0 && (
                    <div style={{ marginBottom:20 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:"#7aab8a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>✨ Key Highlights</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        {qaReport.highlights.map((h, i) => (
                          <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"10px 14px", background:"#f0faf4", borderRadius:10, border:"1px solid rgba(45,122,82,0.15)" }}>
                            <span style={{ color:"#2d7a52", fontWeight:800, fontSize:14, flexShrink:0 }}>★</span>
                            <span style={{ fontSize:13, color:"#2d5c3e", lineHeight:1.6 }}>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {qaReport.recommendations?.length > 0 && (
                    <div style={{ marginBottom:20 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:"#7aab8a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>🎯 Personalized Recommendations</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                        {qaReport.recommendations.map((r, i) => (
                          <div key={i} style={{ padding:"14px 16px", background:"#fff", borderRadius:12, border:"1.5px solid rgba(45,122,82,0.15)", boxShadow:"0 2px 8px rgba(45,122,82,0.06)" }}>
                            <div style={{ fontSize:13, fontWeight:700, color:"#1a4d32", marginBottom:4 }}>
                              <span style={{ display:"inline-block", width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#2d7a52,#52c27a)", color:"#fff", fontSize:11, fontWeight:800, textAlign:"center", lineHeight:"22px", marginRight:8 }}>{i+1}</span>
                              {r.title}
                            </div>
                            <div style={{ fontSize:13, color:"#4a7c5e", lineHeight:1.6, paddingLeft:30 }}>{r.detail}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {qaReport.resources?.length > 0 && (
                    <div style={{ marginBottom:20 }}>
                      <div style={{ fontSize:11, fontWeight:700, color:"#7aab8a", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>📚 Resources & Next Steps</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                        {qaReport.resources.map((r, i) => (
                          <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", fontSize:13, color:"#2d5c3e", lineHeight:1.6 }}>
                            <span style={{ color:"#2d7a52", flexShrink:0 }}>→</span>
                            {r}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div style={{ padding:"10px 14px", background:"#f7fbf8", borderRadius:10, fontSize:11, color:"#7aab8a", lineHeight:1.6, borderTop:"1px solid rgba(45,122,82,0.1)", marginBottom:16 }}>
                    ⚕️ {qaReport.disclaimer || "This report is for wellness support only and does not constitute medical advice. Please consult a qualified healthcare provider for medical concerns."}
                  </div>

                  {/* Print Button */}
                  <button onClick={() => window.print()}
                    style={{ width:"100%", padding:"13px", borderRadius:12, border:"none", background:"linear-gradient(135deg,#2d7a52,#52c27a)", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    🖨️ Print This Report
                  </button>
                </>
              )}
            </div>
          )}

          <p style={{ textAlign:"center", fontSize:11, color:"#9dc0a8", marginTop:14, lineHeight:1.6 }}>{ui.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
