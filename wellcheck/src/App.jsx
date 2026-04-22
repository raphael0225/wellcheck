import { useState } from "react";

const DOMAINS = [
  { id:"general",      icon:"💊", label:"General Health",    color:"#2d7a52" },
  { id:"mental",       icon:"🧠", label:"Mental Health",     color:"#6366f1" },
  { id:"lifestyle",    icon:"🏃", label:"Lifestyle",         color:"#0891b2" },
  { id:"dietary",      icon:"🥗", label:"Dietary Health",    color:"#16a34a" },
  { id:"occupational", icon:"💼", label:"Occupational",      color:"#d97706" },
  { id:"financial",    icon:"💰", label:"Financial Health",  color:"#059669" },
];

const PERSONAL_QS = [
  { id:"p1", type:"text",   key:"name",      q:"Welcome! What is your first name?" },
  { id:"p2", type:"number", key:"age",       q:"How old are you?", placeholder:"e.g. 35" },
  { id:"p3", type:"number", key:"weight",    q:"What is your weight? (lbs)", placeholder:"e.g. 160" },
  { id:"p4", type:"choice", key:"gender",    q:"What is your biological sex?",
    options:["Male","Female","Intersex","Prefer not to say"], risk:[0,0,0,0] },
  { id:"p5", type:"choice", key:"employment",q:"What best describes your employment status?",
    options:["Full-time employed","Part-time employed","Self-employed / Freelance","Student","On leave / Between jobs","Retired"], risk:[0,0,0,0,0,0] },
];

const DOMAIN_QS = {
  general:[
    { id:"g1", key:"energy",     q:"How would you rate your energy levels lately?",
      options:["Very high — great","Good — mostly energized","Average — up and down","Low — often tired","Very low — exhausted daily"], risk:[0,0,1,1,2] },
    { id:"g2", key:"sleep",      q:"How would you rate the quality and quantity of your sleep?",
      options:["Excellent — wake refreshed","Good — mostly rested","Fair — sometimes tired","Poor — rarely rested","Very poor — chronic problems"], risk:[0,0,1,2,2] },
    { id:"g3", key:"checkup",    q:"When was your last medical check-up?",
      options:["Within last 6 months","6–12 months ago","1–2 years ago","Over 2 years ago","Never"], risk:[0,0,1,2,2] },
    { id:"g4", key:"pain",       q:"Do you experience chronic pain or recurring physical symptoms?",
      options:["No pain or symptoms","Mild, rarely interferes","Moderate, sometimes limits me","Significant, often limits daily life","Severe, greatly impacts daily life"], risk:[0,0,1,2,2] },
    { id:"g5", key:"medications",q:"Are you taking prescribed medications regularly?",
      options:["No medications","Yes, well-managed","Yes, sometimes miss doses","Yes, struggling to manage","Yes, without proper follow-up"], risk:[0,0,1,2,2] },
    { id:"g6", key:"caregiver",  q:"Are you a caregiver for a family member or loved one?",
      options:["No","Yes, manageable","Yes, somewhat stressful","Yes, very stressful","Yes, I'm overwhelmed"], risk:[0,0,1,2,2] },
    { id:"g7", key:"prevcare",   q:"How consistent are you with preventive screenings?",
      options:["Always up to date","Mostly up to date","Partially","Rarely","Never"], risk:[0,0,1,2,2] },
  ],
  mental:[
    { id:"m1", key:"mood",       q:"Over the past 2 weeks, how often felt down, depressed, or hopeless?",
      options:["Not at all","Several days","More than half the days","Nearly every day"], risk:[0,1,1,2] },
    { id:"m2", key:"anxiety",    q:"How often do you feel nervous, anxious, or unable to stop worrying?",
      options:["Not at all","Several days","More than half the days","Nearly every day"], risk:[0,1,1,2] },
    { id:"m3", key:"stress",     q:"How would you rate your overall stress level right now?",
      options:["Very low","Manageable","Moderate","High","Overwhelming"], risk:[0,0,1,2,2] },
    { id:"m4", key:"interest",   q:"Have you lost interest or pleasure in activities you used to enjoy?",
      options:["Not at all","Several days","More than half the days","Nearly every day"], risk:[0,1,2,2] },
    { id:"m5", key:"support",    q:"Do you have people you can talk to when feeling overwhelmed?",
      options:["Yes, always","Usually yes","Sometimes","Rarely","No, I feel isolated"], risk:[0,0,1,2,2] },
    { id:"m6", key:"loneliness", q:"How often do you feel lonely or socially disconnected?",
      options:["Never","Rarely","Sometimes","Often","Almost always"], risk:[0,0,1,2,2] },
    { id:"m7", key:"selfesteem", q:"How would you describe your overall self-esteem?",
      options:["Very positive","Mostly positive","Neutral","Mostly negative","Very negative"], risk:[0,0,1,2,2] },
    { id:"m8", key:"therapy",    q:"Have you ever sought or are you receiving mental health support?",
      options:["Yes, currently receiving","Yes, in the past","Considered but not started","No, but I'd like to","No, I don't need it"], risk:[0,0,1,1,2] },
  ],
  lifestyle:[
    { id:"l1", key:"exercise",   q:"How often do you exercise per week?",
      options:["5+ days","3–4 days","1–2 days","Rarely","Never"], risk:[0,0,1,1,2] },
    { id:"l2", key:"smoking",    q:"Do you currently smoke or use tobacco products?",
      options:["No, never","Quit more than 1 year ago","Quit less than 1 year ago","Occasionally","Daily"], risk:[0,0,1,1,2] },
    { id:"l3", key:"alcohol",    q:"How often do you consume alcohol?",
      options:["Never","Rarely (few times/year)","Occasionally (1–2x/month)","Regularly (1–2x/week)","Frequently (3+x/week)"], risk:[0,0,1,1,2] },
    { id:"l4", key:"substances", q:"Do you use recreational drugs or non-prescribed substances?",
      options:["No, never","Tried once or twice","Occasionally","Monthly","Weekly or more"], risk:[0,0,1,2,2] },
    { id:"l5", key:"screentime", q:"Hours per day on screens outside of work?",
      options:["Less than 1 hour","1–2 hours","3–4 hours","5–6 hours","7+ hours"], risk:[0,0,1,2,2] },
    { id:"l6", key:"outdoors",   q:"How often do you spend time outdoors or in nature?",
      options:["Daily","Several times a week","Once a week","Rarely","Almost never"], risk:[0,0,1,1,2] },
  ],
  dietary:[
    { id:"d1", key:"meals",         q:"How many balanced meals do you eat per day?",
      options:["3 meals + healthy snacks","3 regular meals","2 meals","1 meal","Irregular — skip meals often"], risk:[0,0,1,2,2] },
    { id:"d2", key:"vegetables",    q:"How many servings of fruits and vegetables do you eat daily?",
      options:["5+ servings","3–4 servings","2–3 servings","1 serving","Rarely eat fruits/vegetables"], risk:[0,0,1,1,2] },
    { id:"d3", key:"water",         q:"How much water do you drink daily?",
      options:["8+ glasses","6–8 glasses","4–6 glasses","2–4 glasses","Less than 2 glasses"], risk:[0,0,1,1,2] },
    { id:"d4", key:"processed",     q:"How often do you consume processed or ultra-processed foods?",
      options:["Rarely — mostly whole foods","1–2 times per week","3–4 times per week","Daily","Multiple times daily"], risk:[0,0,1,2,2] },
    { id:"d5", key:"eating_habits", q:"Do you notice any disordered eating patterns?",
      options:["No, eating habits are healthy","Occasionally skip meals","Sometimes overeat when stressed","Regularly eat emotionally or binge","Yes, significantly impacts my life"], risk:[0,0,1,2,2] },
    { id:"d6", key:"foodsec",       q:"Do you have consistent access to healthy, nutritious food?",
      options:["Yes, always","Usually yes","Sometimes","Rarely","No — food insecurity is a concern"], risk:[0,0,1,2,2] },
  ],
  occupational:[
    { id:"o1", key:"workload",    q:"How manageable is your current workload?",
      options:["Very manageable","Mostly manageable","Sometimes overwhelming","Often overwhelming","Completely overwhelming"], risk:[0,0,1,2,2] },
    { id:"o2", key:"balance",     q:"How would you rate your work-life balance?",
      options:["Excellent","Good","Fair","Poor","Very poor"], risk:[0,0,1,2,2] },
    { id:"o3", key:"burnout",     q:"How often do you feel emotionally drained or burned out from work?",
      options:["Never","Rarely","Sometimes","Often","Always"], risk:[0,0,1,2,2] },
    { id:"o4", key:"satisfaction",q:"How satisfied are you with your job overall?",
      options:["Very satisfied","Satisfied","Neutral","Dissatisfied","Very dissatisfied"], risk:[0,0,1,2,2] },
    { id:"o5", key:"management",  q:"How would you describe your relationship with your manager?",
      options:["Very positive and supportive","Generally good","Neutral","Sometimes difficult","Very difficult or toxic"], risk:[0,0,1,2,2] },
    { id:"o6", key:"recognition", q:"Do you feel recognized and valued for your contributions?",
      options:["Yes, always","Usually yes","Sometimes","Rarely","No, never"], risk:[0,0,1,2,2] },
  ],
  financial:[
    { id:"f1", key:"fstress",  q:"How stressed are you about your personal finances?",
      options:["Not stressed at all","Slightly stressed","Moderately stressed","Very stressed","Extremely stressed"], risk:[0,0,1,2,2] },
    { id:"f2", key:"expenses", q:"How confident are you in covering your monthly expenses?",
      options:["Very confident","Confident","Somewhat confident","Not very confident","Not confident at all"], risk:[0,0,1,2,2] },
    { id:"f3", key:"savings",  q:"Do you have an emergency fund covering 3–6 months of expenses?",
      options:["Yes, fully funded","Partially funded","Working on it","No, but planning to","No, and not planning to"], risk:[0,0,1,1,2] },
    { id:"f4", key:"debt",     q:"How manageable is your current debt situation?",
      options:["No debt","Manageable — on track","Somewhat challenging","Difficult — struggling","Very overwhelming"], risk:[0,0,1,2,2] },
    { id:"f5", key:"benefits", q:"Are you using your employee financial benefits (401k, EAP, FSA)?",
      options:["Yes, fully using all","Using some but not all","Aware but not using","Somewhat aware","Not aware at all"], risk:[0,0,1,1,2] },
  ],
};

const RL = {
  0:{ label:"Low Risk",  color:"#16a34a", bg:"#dcfce7", dot:"🟢" },
  1:{ label:"Moderate",  color:"#d97706", bg:"#fef3c7", dot:"🟡" },
  2:{ label:"High Risk", color:"#dc2626", bg:"#fee2e2", dot:"🔴" },
};

function calcRisk(answers, domainId) {
  const qs = (DOMAIN_QS[domainId]||[]).filter(q=>q.risk?.some(r=>r>0));
  if (!qs.length) return 0;
  const total = qs.reduce((s,q)=>{
    const idx=(q.options||[]).indexOf(answers[q.key]||"");
    return s+(idx>=0?(q.risk[idx]??0):0);
  },0);
  const avg=total/qs.length;
  return avg<0.5?0:avg<1.2?1:2;
}

export default function WellCheck() {
  const [phase, setPhase]   = useState("domains");
  const [selDomains, setSelDomains] = useState([]);
  const [allQs, setAllQs]   = useState([]);
  const [qi, setQi]         = useState(0);
  const [answers, setAnswers]= useState({});
  const [textInput, setTextInput] = useState("");
  const [askInput, setAskInput]   = useState("");
  const [qaInput, setQaInput]     = useState("");
  const [qaLoading, setQaLoading] = useState(false);
  const [qaReport, setQaReport]   = useState(null);
  const [qaError, setQaError]     = useState("");

  const tog = id => setSelDomains(p=>p.includes(id)?p.filter(d=>d!==id):[...p,id]);

  const startQuiz = () => {
    setAllQs([...PERSONAL_QS, ...selDomains.flatMap(d=>DOMAIN_QS[d]||[])]);
    setQi(0); setAnswers({}); setTextInput(""); setPhase("quiz");
  };

  const startAskOnly = () => {
    const q=askInput.trim(); if(!q) return;
    setSelDomains(DOMAINS.map(d=>d.id));
    setQaInput(q); setPhase("summary");
    runQ(q, DOMAINS.map(d=>d.id), {});
  };

  const curQ = allQs[qi];
  const isLast = qi===allQs.length-1;
  const pct = allQs.length?(qi/allQs.length)*100:0;

  const advance = val => {
    const na={...answers,[curQ.key]:val};
    setAnswers(na);
    if(isLast) setPhase("summary");
    else { setQi(i=>i+1); setTextInput(""); }
  };

  const goBack = () => {
    if(qi===0){setPhase("domains");return;}
    setQi(i=>i-1); setTextInput("");
  };

  const runQ = async (question, domainIds, ans) => {
    if(!question.trim()||qaLoading) return;
    setQaLoading(true); setQaError(""); setQaReport(null);
    const has = Object.keys(ans).length>0;
    const profile = has
      ? [ans.name&&`Name: ${ans.name}`, ans.age&&`Age: ${ans.age}`, ans.weight&&`Weight: ${ans.weight}lbs`].filter(Boolean).join(", ")
      : "No profile";
    const risks = has
      ? domainIds.map(id=>`${DOMAINS.find(d=>d.id===id)?.label}: ${["Low","Moderate","High"][calcRisk(ans,id)]}`).join(", ")
      : "No prior assessment";
    const prompt=`You are WellCheck AI, a compassionate health and wellness advisor. Answer any health or wellness question helpfully and thoroughly.

Employee profile: ${profile}
Assessment results: ${risks}
Question: ${question}

Reply with ONLY a raw JSON object, no markdown, no code fences, no extra text:
{"greeting":"Hi [name or friend]!","summary":"2-3 sentence answer","highlights":["point 1","point 2","point 3"],"recommendations":[{"title":"Action 1","detail":"specific advice"},{"title":"Action 2","detail":"specific advice"},{"title":"Action 3","detail":"specific advice"}],"resources":["tip or resource 1","tip or resource 2","tip or resource 3"],"disclaimer":"Wellness information only, not medical advice. Please consult a healthcare provider for medical concerns."}`;
    try {
    const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY || "",
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true"
        },
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:prompt}]})
      });
      const data=await res.json();
      const raw=data?.content?.[0]?.text||"";
      const s=raw.indexOf("{"),e=raw.lastIndexOf("}");
      if(s===-1||e===-1) throw new Error("No JSON in response");
      setQaReport(JSON.parse(raw.slice(s,e+1)));
    } catch(err) {
      console.error(err);
      setQaError("Unable to generate report. Please try again.");
    }
    setQaLoading(false);
  };

  const submitQ = ()=>runQ(qaInput, selDomains, answers);
  const dRisks = phase==="summary"?selDomains.map(id=>({id,risk:calcRisk(answers,id)})):[];
  const name = answers.name||"";

  const C={
    card:{background:"#fff",borderRadius:20,padding:28,boxShadow:"0 8px 32px rgba(45,122,82,0.1)",border:"1px solid rgba(45,122,82,0.12)"},
    btn:(on)=>({width:"100%",padding:13,borderRadius:12,border:"none",background:on?"linear-gradient(135deg,#2d7a52,#52c27a)":"#d8eadc",color:on?"#fff":"#9dc0a8",fontSize:14,fontWeight:700,cursor:on?"pointer":"not-allowed",fontFamily:"inherit",transition:"all 0.2s",boxShadow:on?"0 4px 14px rgba(45,122,82,0.3)":"none"}),
    inp:{width:"100%",padding:"12px 14px",borderRadius:12,border:"1.5px solid rgba(45,122,82,0.2)",fontSize:14,color:"#1a4d32",background:"#f7fbf8",fontFamily:"inherit",lineHeight:1.5,boxSizing:"border-box"},
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(145deg,#e8f5e9,#f0faf4,#e3f4ea)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"Georgia,serif",padding:20}}>
      <style>{`
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        .fade{animation:fadeIn 0.35s ease forwards}
        .opt{transition:all 0.15s;cursor:pointer} .opt:hover{transform:translateX(4px)}
        .dc{transition:all 0.15s;cursor:pointer} .dc:hover{transform:translateY(-1px)}
        input:focus,textarea:focus{outline:none}
        @media print{body *{visibility:hidden}#rpt,#rpt *{visibility:visible}#rpt{position:absolute;left:0;top:0;width:100%;padding:32px}button{display:none!important}}
      `}</style>

      {/* Logo */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:10}}>
          <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#2d7a52,#52c27a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,boxShadow:"0 4px 14px rgba(45,122,82,0.3)"}}>🩺</div>
          <h1 style={{margin:0,fontSize:28,fontWeight:700,color:"#1a4d32"}}>Well<span style={{color:"#2d7a52"}}>Check</span></h1>
        </div>
        <p style={{margin:"4px 0 0",fontSize:11,color:"#7aab8a",letterSpacing:"0.1em",textTransform:"uppercase"}}>Employee Health & Wellness</p>
      </div>

      {/* DOMAINS */}
      {phase==="domains"&&(
        <div className="fade" style={{width:"100%",maxWidth:560}}>
          {/* Quick Ask */}
          <div style={{...C.card,border:"2px solid rgba(45,122,82,0.25)",marginBottom:14}}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:12}}>
              <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2d7a52,#52c27a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>💬</div>
              <div>
                <div style={{fontSize:15,fontWeight:700,color:"#1a4d32"}}>Just have a health question?</div>
                <div style={{fontSize:12,color:"#7aab8a",marginTop:2}}>Skip the assessment — ask anything and get an instant personalized report.</div>
              </div>
            </div>
            <textarea value={askInput} onChange={e=>setAskInput(e.target.value)} rows={3}
              placeholder="e.g. How can I get rid of back pain? What helps with anxiety? How do I sleep better?"
              style={{...C.inp,resize:"vertical"}}/>
            <button onClick={startAskOnly} disabled={!askInput.trim()} style={{...C.btn(!!askInput.trim()),marginTop:10}}>
              ✨ Get My Personalized Report
            </button>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
            <div style={{flex:1,height:1,background:"rgba(45,122,82,0.12)"}}/>
            <span style={{fontSize:11,color:"#9dc0a8",fontWeight:600,whiteSpace:"nowrap"}}>— OR TAKE THE FULL ASSESSMENT —</span>
            <div style={{flex:1,height:1,background:"rgba(45,122,82,0.12)"}}/>
          </div>

          <div style={C.card}>
            <h2 style={{margin:"0 0 6px",fontSize:17,color:"#1a4d32",fontWeight:700}}>Choose your assessment areas</h2>
            <p style={{margin:"0 0 14px",fontSize:13,color:"#6a9c7a"}}>Select one or more areas. Your responses are completely confidential.</p>
            <div style={{display:"flex",gap:8,marginBottom:14}}>
              <button onClick={()=>setSelDomains(DOMAINS.map(d=>d.id))} style={{fontSize:12,color:"#2d7a52",background:"rgba(45,122,82,0.08)",border:"1px solid rgba(45,122,82,0.2)",borderRadius:6,padding:"4px 12px",cursor:"pointer"}}>Select All</button>
              <button onClick={()=>setSelDomains([])} style={{fontSize:12,color:"#7aab8a",background:"transparent",border:"1px solid rgba(45,122,82,0.15)",borderRadius:6,padding:"4px 12px",cursor:"pointer"}}>Clear</button>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {DOMAINS.map(d=>{const sel=selDomains.includes(d.id);return(
                <div key={d.id} className="dc" onClick={()=>tog(d.id)}
                  style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,background:sel?`${d.color}12`:"#f7fbf8",border:sel?`1.5px solid ${d.color}66`:"1.5px solid rgba(45,122,82,0.1)"}}>
                  <div style={{width:20,height:20,borderRadius:5,border:sel?`2px solid ${d.color}`:"2px solid #c8e0ce",background:sel?d.color:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.15s"}}>
                    {sel&&<span style={{color:"#fff",fontSize:11,fontWeight:800}}>✓</span>}
                  </div>
                  <span style={{fontSize:20}}>{d.icon}</span>
                  <span style={{fontSize:14,fontWeight:sel?600:400,color:sel?"#1a4d32":"#4a7c5e"}}>{d.label}</span>
                </div>
              );})}
            </div>
            <button onClick={startQuiz} disabled={!selDomains.length} style={{...C.btn(!!selDomains.length),marginTop:18}}>
              Begin Assessment {selDomains.length>0?`· ${selDomains.length} area${selDomains.length>1?"s":""}` : ""}
            </button>
          </div>
          <p style={{textAlign:"center",fontSize:11,color:"#9dc0a8",marginTop:12,lineHeight:1.5}}>WellCheck is a wellness support tool, not a medical service. Crisis support: call or text 988.</p>
        </div>
      )}

      {/* QUIZ */}
      {phase==="quiz"&&curQ&&(
        <div key={qi} style={{width:"100%",maxWidth:580}}>
          <div style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#7aab8a",marginBottom:6}}>
              <span>{qi+1} / {allQs.length}</span><span>{Math.round(pct)}%</span>
            </div>
            <div style={{height:6,background:"#d1e8d9",borderRadius:99}}>
              <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#2d7a52,#52c27a)",borderRadius:99,transition:"width 0.3s"}}/>
            </div>
          </div>
          <div style={{...C.card,animation:"slideUp 0.25s ease forwards"}}>
            {(()=>{const dom=DOMAINS.find(d=>DOMAIN_QS[d.id]?.some(q=>q.id===curQ.id));return dom?(
              <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${dom.color}12`,border:`1px solid ${dom.color}33`,borderRadius:20,padding:"3px 12px",marginBottom:14,fontSize:12,color:dom.color,fontWeight:600}}>
                {dom.icon} {dom.label}
              </div>
            ):null;})()}
            <h2 style={{margin:"0 0 22px",fontSize:19,color:"#1a4d32",fontWeight:700,lineHeight:1.4}}>{curQ.q}</h2>
            {(curQ.type==="text"||curQ.type==="number")&&(
              <div>
                <input type={curQ.type==="number"?"number":"text"} value={textInput}
                  onChange={e=>setTextInput(e.target.value)} placeholder={curQ.placeholder||""} style={C.inp}
                  onKeyDown={e=>{if(e.key==="Enter"&&textInput.trim())advance(textInput.trim());}}/>
                <button onClick={()=>advance(textInput.trim())} disabled={!textInput.trim()} style={{...C.btn(!!textInput.trim()),marginTop:10}}>
                  {isLast?"See My Results →":"Next →"}
                </button>
              </div>
            )}
            {curQ.type!=="text"&&curQ.type!=="number"&&(
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {curQ.options.map((opt,i)=>(
                  <div key={i} className="opt" onClick={()=>advance(opt)}
                    style={{padding:"12px 18px",borderRadius:12,border:"1.5px solid rgba(45,122,82,0.18)",background:"#f7fbf8",color:"#2d5c3e",fontSize:14,display:"flex",alignItems:"center",gap:12,boxShadow:"0 1px 4px rgba(45,122,82,0.06)"}}>
                    <span style={{width:22,height:22,borderRadius:"50%",border:"2px solid #c8e0ce",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,fontWeight:700,color:"#7aab8a"}}>
                      {String.fromCharCode(65+i)}
                    </span>
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={goBack} style={{marginTop:12,background:"transparent",border:"none",color:"#7aab8a",fontSize:13,cursor:"pointer",display:"block",margin:"12px auto 0",fontFamily:"inherit"}}>← Back</button>
          <p style={{textAlign:"center",fontSize:11,color:"#9dc0a8",marginTop:10}}>WellCheck is a wellness support tool, not a medical service. Crisis: call or text 988.</p>
        </div>
      )}

      {/* SUMMARY */}
      {phase==="summary"&&(
        <div className="fade" style={{width:"100%",maxWidth:580}}>
          {Object.keys(answers).length>0&&(
            <div style={{...C.card,marginBottom:14}}>
              <div style={{textAlign:"center",marginBottom:18}}>
                <div style={{fontSize:34,marginBottom:6}}>📋</div>
                <h2 style={{margin:0,fontSize:20,color:"#1a4d32",fontWeight:700}}>Your Wellness Report</h2>
                {name&&<p style={{margin:"5px 0 0",color:"#6a9c7a",fontSize:14}}>Hi <strong>{name}</strong>! Here's your snapshot.</p>}
              </div>
              {(answers.age||answers.weight||answers.gender)&&(
                <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14}}>
                  {answers.age&&<span style={{padding:"4px 12px",background:"#f0faf4",borderRadius:20,fontSize:12,color:"#2d5c3e",border:"1px solid rgba(45,122,82,0.2)"}}>🎂 Age: {answers.age}</span>}
                  {answers.weight&&<span style={{padding:"4px 12px",background:"#f0faf4",borderRadius:20,fontSize:12,color:"#2d5c3e",border:"1px solid rgba(45,122,82,0.2)"}}>⚖️ {answers.weight} lbs</span>}
                  {answers.gender&&<span style={{padding:"4px 12px",background:"#f0faf4",borderRadius:20,fontSize:12,color:"#2d5c3e",border:"1px solid rgba(45,122,82,0.2)"}}>🧬 {answers.gender}</span>}
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {dRisks.map(({id,risk})=>{
                  const dom=DOMAINS.find(d=>d.id===id);const rl=RL[risk];
                  return(
                    <div key={id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:12,background:rl.bg,border:`1.5px solid ${rl.color}33`}}>
                      <span style={{fontSize:22}}>{dom.icon}</span>
                      <span style={{flex:1,fontSize:14,fontWeight:600,color:"#1a4d32"}}>{dom.label}</span>
                      <span style={{fontSize:12,fontWeight:700,color:rl.color,background:"#fff",borderRadius:20,padding:"4px 12px",border:`1px solid ${rl.color}44`}}>{rl.dot} {rl.label}</span>
                    </div>
                  );
                })}
              </div>
              {dRisks.length>0&&(()=>{
                const avg=dRisks.reduce((s,d)=>s+d.risk,0)/dRisks.length;
                const rl=RL[avg<0.5?0:avg<1.2?1:2];
                return(
                  <div style={{marginTop:14,padding:"14px 20px",borderRadius:12,background:`${rl.color}10`,border:`2px solid ${rl.color}44`,textAlign:"center"}}>
                    <div style={{fontSize:11,color:"#6a9c7a",marginBottom:4,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>Overall Wellness</div>
                    <div style={{fontSize:24}}>{rl.dot}</div>
                    <div style={{fontSize:16,fontWeight:800,color:rl.color}}>{rl.label}</div>
                  </div>
                );
              })()}
              {dRisks.some(d=>d.risk===2)&&(
                <div style={{marginTop:12,padding:"12px 16px",borderRadius:10,background:"#fff7ed",border:"1.5px solid #f59e0b44",fontSize:13,color:"#92400e",lineHeight:1.6}}>
                  ⚠️ <strong>One or more areas flagged.</strong> We recommend speaking with HR or your EAP. Crisis: call or text <strong>988</strong>.
                </div>
              )}
              <button onClick={()=>{setPhase("domains");setAnswers({});setSelDomains([]);setQaReport(null);setQaInput("");setAskInput("");}}
                style={{...C.btn(false),marginTop:14,background:"transparent",color:"#2d7a52",border:"1.5px solid rgba(45,122,82,0.25)"}}>
                Start Over
              </button>
            </div>
          )}

          {/* Q&A */}
          <div style={C.card}>
            <h3 style={{margin:"0 0 4px",fontSize:16,color:"#1a4d32",fontWeight:700}}>💬 Ask Any Health Question</h3>
            <p style={{margin:"0 0 12px",fontSize:12,color:"#7aab8a"}}>Ask anything about health and wellness — get a personalized, printable report.</p>
            <textarea value={qaInput} onChange={e=>setQaInput(e.target.value)} rows={3}
              placeholder="e.g. How can I get rid of back pain? What foods help with stress? How do I improve my sleep?"
              style={{...C.inp,resize:"vertical"}}/>
            {qaError&&<p style={{color:"#dc2626",fontSize:12,margin:"6px 0 0"}}>{qaError}</p>}
            <button onClick={submitQ} disabled={!qaInput.trim()||qaLoading} style={{...C.btn(!!(qaInput.trim()&&!qaLoading)),marginTop:10}}>
              {qaLoading?"Generating your personalized report...":"✨ Generate Personalized Report"}
            </button>
          </div>

          {/* Report */}
          {qaReport&&(
            <div id="rpt" style={{...C.card,border:"2px solid rgba(45,122,82,0.2)",marginTop:14,animation:"fadeIn 0.5s ease"}}>
              <div style={{borderBottom:"2px solid #e8f5e9",paddingBottom:14,marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                  <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#2d7a52,#52c27a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🩺</div>
                  <div>
                    <div style={{fontSize:16,fontWeight:800,color:"#1a4d32"}}>WellCheck Personalized Health Report</div>
                    <div style={{fontSize:11,color:"#7aab8a"}}>{new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</div>
                  </div>
                </div>
                <div style={{background:"#f7fbf8",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#2d5c3e",fontStyle:"italic",lineHeight:1.6}}>{qaReport.greeting}</div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:"#7aab8a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6}}>📝 Your Question</div>
                <div style={{background:"#f0faf4",borderRadius:10,padding:"10px 14px",fontSize:13,color:"#1a4d32",lineHeight:1.6,borderLeft:"3px solid #2d7a52"}}>{qaInput}</div>
              </div>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:"#7aab8a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>📊 Summary</div>
                <p style={{margin:0,fontSize:14,color:"#2d5c3e",lineHeight:1.7}}>{qaReport.summary}</p>
              </div>
              {qaReport.highlights?.length>0&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#7aab8a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>✨ Key Highlights</div>
                  {qaReport.highlights.map((h,i)=>(
                    <div key={i} style={{display:"flex",gap:10,padding:"9px 14px",background:"#f0faf4",borderRadius:10,border:"1px solid rgba(45,122,82,0.15)",marginBottom:6,fontSize:13,color:"#2d5c3e",lineHeight:1.6}}>
                      <span style={{color:"#2d7a52",fontWeight:800,flexShrink:0}}>★</span>{h}
                    </div>
                  ))}
                </div>
              )}
              {qaReport.recommendations?.length>0&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#7aab8a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>🎯 Recommendations</div>
                  {qaReport.recommendations.map((r,i)=>(
                    <div key={i} style={{padding:"12px 16px",background:"#fff",borderRadius:12,border:"1.5px solid rgba(45,122,82,0.15)",marginBottom:8,boxShadow:"0 2px 8px rgba(45,122,82,0.06)"}}>
                      <div style={{fontSize:13,fontWeight:700,color:"#1a4d32",marginBottom:4}}>
                        <span style={{display:"inline-block",width:20,height:20,borderRadius:"50%",background:"linear-gradient(135deg,#2d7a52,#52c27a)",color:"#fff",fontSize:10,fontWeight:800,textAlign:"center",lineHeight:"20px",marginRight:8}}>{i+1}</span>
                        {r.title}
                      </div>
                      <div style={{fontSize:13,color:"#4a7c5e",lineHeight:1.6,paddingLeft:28}}>{r.detail}</div>
                    </div>
                  ))}
                </div>
              )}
              {qaReport.resources?.length>0&&(
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#7aab8a",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>📚 Resources & Next Steps</div>
                  {qaReport.resources.map((r,i)=>(
                    <div key={i} style={{display:"flex",gap:8,fontSize:13,color:"#2d5c3e",lineHeight:1.6,marginBottom:6}}>
                      <span style={{color:"#2d7a52",flexShrink:0}}>→</span>{r}
                    </div>
                  ))}
                </div>
              )}
              <div style={{padding:"10px 14px",background:"#f7fbf8",borderRadius:10,fontSize:11,color:"#7aab8a",lineHeight:1.6,marginBottom:12}}>
                ⚕️ {qaReport.disclaimer}
              </div>
              <button onClick={()=>window.print()} style={{...C.btn(true),display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                🖨️ Print This Report
              </button>
            </div>
          )}
          <p style={{textAlign:"center",fontSize:11,color:"#9dc0a8",marginTop:12,lineHeight:1.5}}>WellCheck is a wellness support tool, not a medical service. Crisis support: call or text 988.</p>
        </div>
      )}
    </div>
  );
}
