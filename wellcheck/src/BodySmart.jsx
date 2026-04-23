import { useState, useEffect, useRef, useCallback } from "react";

// ── LANGUAGE CONFIG ────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English",  flag: "🇺🇸" },
  { code: "es", label: "Español",  flag: "🇪🇸" },
  { code: "tl", label: "Tagalog",  flag: "🇵🇭" },
];

const LANG_NAMES = { en: "English", es: "Spanish", tl: "Tagalog/Filipino" };

// ── TRANSLATION HOOK ───────────────────────────────────────────────────────────
function useTranslation(lang) {
  const cacheRef = useRef({});
  const inFlight = useRef(new Set());
  const [tick, setTick] = useState(0);
  const langRef = useRef(lang);
  useEffect(() => { langRef.current = lang; }, [lang]);

  const translate = useCallback(async (strings) => {
    const currentLang = langRef.current;
    if (currentLang === "en") return;

    const missing = strings.filter(s => {
      if (!s) return false;
      const key = `${currentLang}|${s}`;
      return !(key in cacheRef.current) && !inFlight.current.has(key);
    });
    if (missing.length === 0) return;

    missing.forEach(s => inFlight.current.add(`${currentLang}|${s}`));

    try {
      const prompt = `Translate the following JSON array of strings from English to ${LANG_NAMES[currentLang]}.
Keep emojis exactly as-is. Keep proper nouns (organization names, URLs) untouched.
Return ONLY a valid JSON array of translated strings in the same order. No explanation, no markdown fences.

${JSON.stringify(missing)}`;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "[]";
      const clean = text.replace(/```json|```/g, "").trim();
      const translated = JSON.parse(clean);
      missing.forEach((s, i) => {
        cacheRef.current[`${currentLang}|${s}`] = translated[i] ?? s;
        inFlight.current.delete(`${currentLang}|${s}`);
      });
    } catch (err) {
      console.error("Translation error:", err);
      missing.forEach(s => {
        cacheRef.current[`${currentLang}|${s}`] = s;
        inFlight.current.delete(`${currentLang}|${s}`);
      });
    }
    setTick(n => n + 1);
  }, []);

  const t = (s) => {
    if (!s || lang === "en") return s;
    return cacheRef.current[`${lang}|${s}`] || s;
  };

  return { t, translate };
}

// ── BRAND COLORS ──────────────────────────────────────────────────────────────
const C = {
  red:    "#E63329",
  yellow: "#F7C234",
  blue:   "#1B5EA6",
  orange: "#F58220",
  white:  "#FFFFFF",
  bg:     "#FFF8E7",
};

// ── SHUFFLE HELPER ──────────────────────────────────────────────────────────
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const pick = (arr, n) => shuffle(arr).slice(0, n);

// ── TOPICS ────────────────────────────────────────────────────────────────────
const TOPICS = [
  { id:"body", emoji:"🫀", label:"My Body", color:C.red, bg:"#FDE8E7",
    desc:"Learn about your amazing body!",
    source:"National Institutes of Health (NIH) · KidsHealth.org · Cleveland Clinic",
    sourceUrl:"https://kidshealth.org",
    facts:[
      {emoji:"❤️",title:"Your Heart",text:"Your heart pumps blood around your whole body and beats about 100,000 times a day!",fun:"Put your hand on your chest — feel it? That's your heart saying hi! 👋"},
      {emoji:"🫁",title:"Your Lungs",text:"You have two lungs that fill up with air like balloons when you breathe in.",fun:"Take a big breath and let it out slowly — your lungs are working hard! 💨"},
      {emoji:"🧠",title:"Your Brain",text:"Your brain is the boss of your body! It controls everything you do, think, and feel.",fun:"Your brain never sleeps — it makes your dreams at night! 🌙"},
      {emoji:"🦷",title:"Your Teeth",text:"You get two sets of teeth — 20 baby teeth fall out and stronger adult teeth grow in.",fun:"Count your teeth with your tongue — most kids have 20! 😁"},
      {emoji:"🦴",title:"Your Bones",text:"You have 206 bones that hold your body up and protect your organs.",fun:"Babies are born with 270 bones — some fuse together as you grow! 🦴"},
      {emoji:"💪",title:"Your Muscles",text:"You have over 600 muscles! They help you move, breathe, and even smile.",fun:"It takes 17 muscles just to smile — and 43 to frown! Smiling is easier! 😄"},
      {emoji:"👁️",title:"Your Eyes",text:"Your eyes take in light and send pictures to your brain so you can see.",fun:"Your eyes can see about 10 million different colors! 🌈"},
      {emoji:"👂",title:"Your Ears",text:"Your ears collect sound waves and send them to your brain so you can hear.",fun:"Your ears never stop working — even when you are asleep! 🎵"},
      {emoji:"👃",title:"Your Nose",text:"Your nose filters air and lets you smell thousands of different things.",fun:"You can smell over 1 trillion different smells! 🌸"},
      {emoji:"👅",title:"Your Tongue",text:"Your tongue helps you taste, swallow, and talk. It is covered in tiny taste buds.",fun:"You have about 10,000 taste buds on your tongue! 😋"},
      {emoji:"🩸",title:"Your Blood",text:"Blood carries oxygen and food to every part of your body. It also fights germs!",fun:"You have about 5 liters of blood — that's like 10 water bottles! 🩸"},
      {emoji:"🦷",title:"Your Jaw",text:"Your jaw is the strongest bone in your face and helps you chew food.",fun:"Chewing sends a signal to your tummy to get ready for food! 🍎"},
      {emoji:"🖐️",title:"Your Hands",text:"Your hands have 27 bones each and can do very detailed, tricky movements.",fun:"Fingernails grow about 3 millimeters every month! 💅"},
      {emoji:"🦶",title:"Your Feet",text:"Each foot has 26 bones, 33 joints, and over 100 muscles. They carry you everywhere!",fun:"You will walk about 100,000 miles in your lifetime — that's around the Earth 4 times! 🌍"},
      {emoji:"🫀",title:"Your Veins",text:"Veins and arteries are like roads that carry blood all around your body.",fun:"If you laid out all your blood vessels end to end, they would circle Earth 2.5 times! 🌎"},
      {emoji:"🧬",title:"Your Skin",text:"Skin is your body's biggest organ! It protects you, regulates temperature, and senses touch.",fun:"You shed and regrow your outer skin every 2-4 weeks! 🌟"},
      {emoji:"💧",title:"Your Kidneys",text:"Your two kidneys clean your blood and remove waste, making urine.",fun:"Your kidneys filter 200 liters of blood every single day! 💧"},
      {emoji:"🟢",title:"Your Liver",text:"Your liver has over 500 jobs — it cleans blood, makes bile, and stores energy.",fun:"The liver is the only organ that can completely regrow itself! 🌱"},
      {emoji:"🫃",title:"Your Stomach",text:"Your stomach uses acid to break down food into tiny pieces your body can use.",fun:"Your stomach growls when it is empty and moving around! 🐛"},
      {emoji:"🦠",title:"Good Germs",text:"Not all germs are bad! Good bacteria in your gut help you digest food and stay healthy.",fun:"You have more bacteria in your body than you have human cells! 🦠"},
      {emoji:"🔬",title:"Your Cells",text:"Your body is made of trillions of tiny cells — each one has its own special job.",fun:"Every second, your body makes about 25 million new cells! ✨"},
      {emoji:"⚡",title:"Your Nerves",text:"Nerves send messages between your brain and the rest of your body super fast.",fun:"Nerve signals travel up to 268 miles per hour — faster than a race car! 🏎️"},
      {emoji:"🫁",title:"Your Diaphragm",text:"The diaphragm is a muscle under your lungs that helps you breathe in and out.",fun:"Hiccups happen when your diaphragm gets the hiccups — just like you! 😂"},
      {emoji:"🦻",title:"Your Balance",text:"Tiny parts inside your ears help you balance so you don't fall over!",fun:"Astronauts in space can't use their ear balance — they have to learn to float! 🚀"},
      {emoji:"🌡️",title:"Your Temperature",text:"Your body stays at about 98.6°F. When you're sick it goes up to fight germs.",fun:"Shivering is your body shaking to make heat when you are cold! 🥶"},
    ],
    quiz:[
      {q:"What pumps blood around your body?",options:["🧠 Brain","❤️ Heart","🦷 Teeth","🫁 Lungs"],answer:1},
      {q:"What do your lungs do?",options:["Help you run","Help you think","Help you breathe","Help you eat"],answer:2},
      {q:"Which part of your body is the boss?",options:["Your hands","Your feet","Your tummy","🧠 Your brain"],answer:3},
      {q:"How many bones do you have?",options:["10 bones","100 bones","206 bones","500 bones"],answer:2},
      {q:"What is your body's biggest organ?",options:["Your brain","Your heart","Your skin","Your liver"],answer:2},
      {q:"What do your kidneys do?",options:["Help you breathe","Clean your blood","Pump your heart","Make your bones"],answer:1},
      {q:"How many muscles do you have?",options:["Over 600","Just 10","About 50","Exactly 100"],answer:0},
      {q:"What are the tiny bumps on your tongue called?",options:["Smell buds","Taste buds","Touch buds","Sound buds"],answer:1},
      {q:"What happens when you shiver?",options:["You get sleepy","You get hungry","Your body makes heat","You grow taller"],answer:2},
      {q:"What organ can completely regrow itself?",options:["Brain","Heart","Liver","Lungs"],answer:2},
    ]
  },
  { id:"food", emoji:"🥦", label:"Healthy Eating", color:C.orange, bg:"#FEF0E0",
    desc:"Food gives you energy to play and grow!",
    source:"USDA MyPlate · Academy of Nutrition & Dietetics · WHO Nutrition",
    sourceUrl:"https://www.myplate.gov",
    facts:[
      {emoji:"🥦",title:"Eat Your Veggies!",text:"Vegetables like broccoli, carrots, and spinach are packed with vitamins that help your body grow strong.",fun:"Carrots help your eyes see better — especially in the dark! 🥕👀"},
      {emoji:"🍎",title:"Fruits Are Nature's Candy!",text:"Fruits like apples, bananas, and berries give your body energy and vitamins.",fun:"Bananas have a special nutrient that helps you feel happy! 🍌😊"},
      {emoji:"💧",title:"Drink Water!",text:"Water keeps your whole body working. Your brain, muscles, and skin all need water every day.",fun:"Your body is 60% water — you are basically a walking water balloon! 💧"},
      {emoji:"🥛",title:"Dairy Makes Bones Strong!",text:"Milk, cheese, and yogurt have calcium that makes your bones and teeth hard and strong.",fun:"The calcium in milk is what stops your bones from bending! 💪"},
      {emoji:"🥚",title:"Protein Builds Muscles!",text:"Eggs, beans, chicken, and fish have protein that builds and repairs your muscles.",fun:"Your muscles are mostly made of protein — every bite helps! 🏋️"},
      {emoji:"🍞",title:"Grains Give You Energy!",text:"Bread, rice, oats, and pasta give your body the fuel it needs to run and play all day.",fun:"Whole grains are like slow-burning logs — they keep your energy going longer! 🔥"},
      {emoji:"🌈",title:"Eat the Rainbow!",text:"Different colored fruits and veggies have different vitamins. Try to eat many colors each day!",fun:"The more colors on your plate, the more vitamins your body gets! 🎨"},
      {emoji:"🍳",title:"Breakfast Is Important!",text:"Eating breakfast gives your brain and body the fuel they need to start the day strong.",fun:"Kids who eat breakfast do better in school and feel happier all day! 📚"},
      {emoji:"🍬",title:"Less Sugar Please!",text:"Too much sugar can hurt your teeth and make you feel tired. Save sweets for special treats!",fun:"The average child eats 17 teaspoons of sugar a day — that is way too much! 😬"},
      {emoji:"🥜",title:"Healthy Fats Are Good!",text:"Nuts, avocados, and olive oil have healthy fats that help your brain grow and work.",fun:"Your brain is 60% fat — the good kind that comes from healthy foods! 🧠"},
      {emoji:"🫐",title:"Berries Are Superfoods!",text:"Blueberries, strawberries, and raspberries are full of antioxidants that protect your body.",fun:"Blueberries are called brain berries because they help you think better! 🔵"},
      {emoji:"🥕",title:"Fiber Keeps You Healthy!",text:"Fiber in veggies, fruits, and whole grains keeps your tummy working well.",fun:"Fiber is like a broom for your insides — it cleans everything out! 🧹"},
      {emoji:"🐟",title:"Fish Is Brain Food!",text:"Fish like salmon and tuna have omega-3 fats that help your brain grow and stay healthy.",fun:"Salmon gets its pink color from the food it eats — you are what you eat! 🐠"},
      {emoji:"🧄",title:"Garlic Fights Germs!",text:"Garlic has special powers that help your immune system fight off germs and sickness.",fun:"Garlic has been used as medicine for over 5,000 years! 🌿"},
      {emoji:"🍊",title:"Vitamin C Heals You!",text:"Oranges, lemons, and peppers have vitamin C that helps cuts heal and keeps you from getting sick.",fun:"Sailors used to eat limes on ships to stay healthy during long voyages! 🚢"},
      {emoji:"🥑",title:"Avocados Are Amazing!",text:"Avocados have healthy fats, vitamins, and fiber all in one green package!",fun:"Avocados are technically a fruit — they grow on trees just like apples! 🌳"},
      {emoji:"🌽",title:"Corn Is a Vegetable!",text:"Corn has fiber, vitamins, and natural sugar that give you quick energy.",fun:"Corn is the only vegetable that is also used to make fuel for cars! ⛽"},
      {emoji:"🍠",title:"Sweet Potatoes Are Super!",text:"Sweet potatoes are full of vitamin A which helps your eyes and skin stay healthy.",fun:"Sweet potatoes were eaten by astronauts on some NASA missions! 🚀"},
      {emoji:"🥗",title:"Salad Is Cool!",text:"Eating leafy greens like lettuce and spinach gives you iron that helps your blood carry oxygen.",fun:"Spinach made Popeye strong — and it really does have iron in it! 💪"},
      {emoji:"🫘",title:"Beans Are Powerful!",text:"Beans have protein, fiber, and iron all in one small package. They keep you full and strong.",fun:"Beans were one of the first crops ever grown by humans — over 7,000 years ago! 🌱"},
      {emoji:"🧃",title:"Watch Out for Juice!",text:"Fruit juice can have as much sugar as soda. Eating whole fruit is much better for you!",fun:"A glass of orange juice takes about 3-4 whole oranges — all the sugar, less fiber! 🍊"},
      {emoji:"🍽️",title:"Eat Slowly!",text:"Eating slowly helps your brain know when you are full so you don't overeat.",fun:"It takes 20 minutes for your tummy to tell your brain it is full — slow down! ⏰"},
      {emoji:"🌿",title:"Herbs Are Healthy!",text:"Herbs like basil, mint, and parsley add flavor AND vitamins to your food.",fun:"Fresh mint can help settle an upset tummy — nature's medicine! 💚"},
      {emoji:"🫙",title:"Fermented Foods Help!",text:"Yogurt and fermented foods have good bacteria that help your gut stay healthy.",fun:"Your gut has its own brain — scientists call it the second brain! 🧠"},
      {emoji:"💊",title:"Food is Medicine!",text:"Eating healthy foods every day is one of the best ways to stay healthy and feel great.",fun:"Hippocrates, the father of medicine, said: Let food be thy medicine! 🌟"},
    ],
    quiz:[
      {q:"Which food helps your eyes see better?",options:["🍕 Pizza","🍰 Cake","🥕 Carrot","🍟 Fries"],answer:2},
      {q:"How many glasses of water should you drink daily?",options:["1 glass","3 glasses","6-8 glasses","10 glasses"],answer:2},
      {q:"What makes your bones strong?",options:["Soda","🥛 Milk & dairy","Candy","Chips"],answer:1},
      {q:"What does protein help your body do?",options:["Make you sleepy","Build muscles","Turn food to water","Make you shorter"],answer:1},
      {q:"Why is breakfast important?",options:["It isn't important","It gives your brain fuel","It makes you tired","It helps you grow shorter"],answer:1},
      {q:"What is a superfood full of antioxidants?",options:["Candy bar","French fries","🫐 Blueberries","Soda"],answer:2},
      {q:"What vitamin helps cuts heal?",options:["Vitamin A","Vitamin B","Vitamin C","Vitamin D"],answer:2},
      {q:"Eating what color foods gives you the most vitamins?",options:["Only white foods","Only brown foods","Only red foods","Many colors!"],answer:3},
      {q:"What does fiber do for your body?",options:["Keeps your tummy healthy","Makes you shorter","Turns food blue","Makes you sleepy"],answer:0},
      {q:"Why should you eat slowly?",options:["To look fancy","So your brain knows when you're full","To make food taste bad","To fall asleep faster"],answer:1},
    ]
  },
  { id:"hygiene", emoji:"🧼", label:"Staying Clean", color:C.blue, bg:"#E7EFF9",
    desc:"Washing up keeps germs away!",
    source:"CDC Hygiene Guidelines · WHO Handwashing Guidelines · ADA",
    sourceUrl:"https://www.cdc.gov/hygiene",
    facts:[
      {emoji:"🙌",title:"Wash Your Hands!",text:"Washing hands with soap for 20 seconds kills germs before they can make you sick.",fun:"Sing Happy Birthday TWICE while washing — that is exactly 20 seconds! 🎵🎂"},
      {emoji:"🪥",title:"Brush Your Teeth!",text:"Brush teeth twice a day — morning and night — to remove germs and prevent cavities.",fun:"If you don't brush, tiny sugar bugs eat your teeth! Yikes! 🦷"},
      {emoji:"🛁",title:"Bath Time!",text:"Bathing washes away dirt, sweat, and germs. Clean skin is healthy and happy skin!",fun:"Your skin is your body's biggest organ — keep it clean and protected! 🛡️"},
      {emoji:"🤧",title:"Sneeze into Your Elbow!",text:"Sneezing or coughing into your elbow stops germs from spreading through the air.",fun:"A sneeze travels at 100 miles per hour — super speedy germs! 💨"},
      {emoji:"🚿",title:"Wash Your Hair!",text:"Washing your hair removes dirt, oil, and germs that collect on your scalp.",fun:"Your hair grows about 6 inches every year — keep it clean and healthy! 💇"},
      {emoji:"🧴",title:"Moisturize Your Skin!",text:"Lotion helps keep your skin soft and healthy, especially in cold dry weather.",fun:"Your skin sheds 30,000-40,000 dead skin cells every hour! 🌟"},
      {emoji:"🦶",title:"Wash Your Feet!",text:"Feet can get very smelly! Washing them with soap keeps germs and fungus away.",fun:"Each foot has about 250,000 sweat glands — no wonder they get smelly! 😅"},
      {emoji:"✂️",title:"Trim Your Nails!",text:"Keeping nails short and clean stops germs from hiding under them.",fun:"Fingernails grow faster than toenails — and your right hand nails grow faster if you're right-handed! ✋"},
      {emoji:"👕",title:"Wear Clean Clothes!",text:"Changing into clean clothes every day keeps bacteria and smells away.",fun:"Wearing dirty clothes can cause skin irritation and spread germs! 🧺"},
      {emoji:"🪒",title:"Change Your Toothbrush!",text:"Replace your toothbrush every 3 months or after being sick — old brushes harbor bacteria.",fun:"Your toothbrush can hold 10 million bacteria — change it often! 🦠"},
      {emoji:"💦",title:"Rinse After Eating!",text:"Rinsing your mouth with water after eating removes food bits that cause bacteria.",fun:"The bacteria in your mouth start making acid within 20 minutes of eating! 🕐"},
      {emoji:"🧽",title:"Clean Surfaces Help!",text:"Wiping down surfaces like tables and doorknobs stops germs from spreading to your hands.",fun:"Doorknobs can have more germs than a toilet seat! 😱"},
      {emoji:"🛏️",title:"Clean Your Room!",text:"Keeping your space clean reduces dust, allergens, and germs that can make you sick.",fun:"Dust is mostly made of dead skin cells — your room is a museum of you! 😂"},
      {emoji:"👓",title:"Don't Share Personal Items!",text:"Sharing combs, towels, or cups can spread germs from one person to another.",fun:"Even sharing earphones can spread ear infections! 🎧"},
      {emoji:"🌬️",title:"Fresh Air Is Healthy!",text:"Opening windows lets fresh air in and pushes stale germ-filled air out.",fun:"Indoor air can be 2-5 times more polluted than outdoor air! 🪟"},
      {emoji:"🧻",title:"Use Tissues!",text:"Using a tissue for your nose and throwing it away stops germs from spreading.",fun:"One sneeze without a tissue can spread 100,000 germ droplets! 💦"},
      {emoji:"🧣",title:"Cover Up in Cold!",text:"Dressing warmly keeps your immune system strong so it can fight germs better.",fun:"Being cold doesn't CAUSE a cold — but it can weaken your defenses! 🤧"},
      {emoji:"🫧",title:"Soap Is Magic!",text:"Soap breaks apart the outer layer of germs and washes them down the drain.",fun:"Soap was invented over 4,500 years ago by the ancient Babylonians! 🧙"},
      {emoji:"💤",title:"Sleep Fights Germs!",text:"When you sleep, your immune system releases proteins that fight infections.",fun:"Kids who sleep enough get sick less often — sleep is medicine! 😴"},
      {emoji:"🥤",title:"Your Own Water Bottle!",text:"Using your own water bottle prevents sharing germs while staying hydrated.",fun:"Reusable water bottles that aren't cleaned can grow 40,000 times more bacteria! 🦠"},
      {emoji:"🧼",title:"Germs Are Invisible!",text:"You can't see germs, but they're everywhere! Regular handwashing is your best defense.",fun:"There are more germs on your phone screen than on a toilet seat! 📱"},
      {emoji:"☀️",title:"Sunshine Kills Germs!",text:"Sunlight is a natural disinfectant — it actually kills many types of bacteria and viruses.",fun:"Hanging laundry in the sun to dry actually disinfects it! ☀️"},
      {emoji:"🧹",title:"Clean Hands Save Lives!",text:"Handwashing is one of the most important health habits ever discovered.",fun:"Regular handwashing could save over a million lives every year! 🌍"},
      {emoji:"🪥",title:"Two-Minute Rule!",text:"Brushing for 2 full minutes reaches all surfaces of your teeth — most people rush!",fun:"Most people only brush for 45 seconds — but dentists recommend 2 minutes! ⏰"},
      {emoji:"🫶",title:"Hygiene Is Caring!",text:"Staying clean is a way of taking care of yourself AND protecting the people around you.",fun:"Good hygiene habits learned young last a lifetime! 🌟"},
    ],
    quiz:[
      {q:"How long should you wash your hands?",options:["2 seconds","5 seconds","20 seconds","1 minute"],answer:2},
      {q:"How many times a day should you brush your teeth?",options:["Never","Once","Twice","Five times"],answer:2},
      {q:"Where should you sneeze?",options:["In your hands","Into the air","Into your elbow","On your friend"],answer:2},
      {q:"How often should you change your toothbrush?",options:["Every week","Every 3 months","Every year","Never"],answer:1},
      {q:"What does soap do to germs?",options:["Makes them bigger","Breaks them apart and washes them away","Turns them green","Makes them invisible"],answer:1},
      {q:"Why is sleep good for fighting germs?",options:["It isn't","Your immune system releases germ-fighting proteins","You sweat germs out","Germs hate darkness"],answer:1},
      {q:"How many germ droplets can one sneeze spread without a tissue?",options:["Just 1","About 10","100,000","Zero"],answer:2},
      {q:"What is the best defense against invisible germs?",options:["Hiding","Regular handwashing","Wearing a hat","Eating candy"],answer:1},
      {q:"Why should you not share personal items like towels?",options:["They're expensive","It can spread germs","They'll get dirty","It's unfriendly"],answer:1},
      {q:"How long should you brush your teeth for?",options:["10 seconds","30 seconds","2 minutes","10 minutes"],answer:2},
    ]
  },
  { id:"feelings", emoji:"💛", label:"My Feelings", color:C.yellow, bg:"#FEFAE0",
    desc:"All feelings are okay — let's talk about them!",
    source:"American Psychological Association · CDC Children's Mental Health · NIMH",
    sourceUrl:"https://www.cdc.gov/childrensmentalhealth",
    facts:[
      {emoji:"😊",title:"Happy!",text:"When something good happens, you feel happy. Your face smiles and your heart feels warm!",fun:"Smiling actually makes your brain feel even happier! Try it right now 😊"},
      {emoji:"😢",title:"Sad",text:"Everyone feels sad sometimes. When you're sad it helps to talk to a grown-up you trust.",fun:"Crying is healthy! Tears help your body let out big feelings. 💧"},
      {emoji:"😡",title:"Angry",text:"Anger is normal. Try 3 deep breaths or counting to 10 when you feel mad.",fun:"Deep breaths tell your brain to calm down — it works like magic! 🧘"},
      {emoji:"😨",title:"Scared",text:"Feeling scared is okay! Talk to a trusted grown-up — you are never alone.",fun:"Being brave means doing something even when you ARE scared! 🦁"},
      {emoji:"😳",title:"Embarrassed",text:"Everyone feels embarrassed sometimes. It usually passes quickly — everyone makes mistakes!",fun:"Even the bravest adults get embarrassed. It's totally normal! 😅"},
      {emoji:"😤",title:"Frustrated",text:"Frustration means something is hard. Take a break, breathe, then try again!",fun:"Most great inventions happened after LOTS of frustration — keep trying! 💡"},
      {emoji:"🤩",title:"Excited!",text:"Excitement makes your heart beat faster and gives you lots of energy to do things!",fun:"Excitement and nervousness feel the same in your body — choose excitement! ⚡"},
      {emoji:"😴",title:"Tired Feelings",text:"When you're tired, feelings can feel bigger. Getting rest helps you handle emotions better.",fun:"Tired people are 60% more likely to feel sad — sleep is mood medicine! 😴"},
      {emoji:"😎",title:"Proud!",text:"Feeling proud after working hard is wonderful! It tells your brain to keep trying new things.",fun:"Pride makes your brain release happy chemicals that feel amazing! 🌟"},
      {emoji:"🥰",title:"Love",text:"Love makes you feel warm and safe. You can feel love for family, friends, and pets.",fun:"Scientists found that hugging someone for 20 seconds releases happy hormones! 🤗"},
      {emoji:"😟",title:"Worried",text:"Worry means you're thinking about something that might go wrong. Talk about it — it helps!",fun:"Writing down your worries can make them feel 50% smaller! ✏️"},
      {emoji:"😌",title:"Calm",text:"When you feel calm, your body is relaxed and your mind is clear. It's a great feeling!",fun:"Taking slow deep breaths changes your brain waves to calm mode! 🌊"},
      {emoji:"🫂",title:"Lonely",text:"Feeling lonely means you want connection. Reach out to a friend or family member!",fun:"Even talking to a pet can help lonely feelings — animals are great listeners! 🐕"},
      {emoji:"😲",title:"Surprised!",text:"Surprise can be fun or scary depending on if it's a good or bad thing.",fun:"Your eyes get bigger when surprised to let in more light so you can see better! 👀"},
      {emoji:"🎉",title:"Gratitude",text:"Feeling grateful — thankful for good things — actually makes you happier and healthier!",fun:"Writing 3 things you're grateful for every day can boost happiness by 25%! 📝"},
      {emoji:"🌈",title:"Feelings Change!",text:"No feeling lasts forever. Even the hardest feelings pass — like clouds in the sky.",fun:"The average human feeling lasts only 90 seconds on its own! ⏱️"},
      {emoji:"💪",title:"Feelings Are Brave!",text:"Talking about your feelings is one of the bravest and smartest things you can do.",fun:"Sharing feelings with a friend actually reduces the size of the feeling in your brain! 🧠"},
      {emoji:"🎨",title:"Draw Your Feelings!",text:"Drawing or painting how you feel is a great way to express emotions you can't put into words.",fun:"Art therapy is used by doctors to help people feel better! 🖌️"},
      {emoji:"🏃",title:"Move Your Feelings!",text:"When emotions feel big, moving your body — running, dancing, jumping — helps release them.",fun:"Exercise is as effective as medicine for mild depression! 🌟"},
      {emoji:"📚",title:"Name Your Feeling!",text:"When you can name exactly how you feel, it becomes less scary and easier to handle.",fun:"Scientists call it name it to tame it — naming emotions calms the brain! 🔤"},
      {emoji:"🤝",title:"Feelings Are Clues!",text:"Your feelings give you information. Scared means be careful. Happy means keep doing this!",fun:"Even animals have feelings — elephants cry and laugh just like people! 🐘"},
      {emoji:"🧩",title:"Everyone Has Feelings!",text:"Every single person in the world has feelings — even teachers, parents, and kings!",fun:"Feelings are the one thing every human on Earth has in common! 🌍"},
      {emoji:"🌟",title:"It's Okay Not to Be Okay!",text:"Some days are hard. That's perfectly normal. Tomorrow is a new day!",fun:"Even the happiest people in the world have 3 bad days a week! 📅"},
      {emoji:"🫶",title:"Ask for Help!",text:"When feelings feel too big, asking for help from a grown-up is the smartest thing to do.",fun:"Asking for help is a sign of strength, not weakness — superheroes have teammates! 🦸"},
      {emoji:"💙",title:"You Are Loved!",text:"No matter how you feel, there are people who love and care about you very much.",fun:"Scientists found feeling loved actually makes your body physically healthier! ❤️"},
    ],
    quiz:[
      {q:"What should you do when you feel sad?",options:["Hide alone","Hurt someone","Talk to a grown-up","Scream forever"],answer:2},
      {q:"What helps calm your body when you're angry?",options:["Run away","Take deep breaths","Eat candy","Break things"],answer:1},
      {q:"Is it okay to feel scared sometimes?",options:["No, never","Yes, everyone does!","Only babies feel scared","Only at night"],answer:1},
      {q:"How long does the average feeling last on its own?",options:["All day","Forever","90 seconds","3 hours"],answer:2},
      {q:"What is a great way to express feelings you can't describe?",options:["Ignore them","Yell loudly","Draw or paint","Go to sleep"],answer:2},
      {q:"What does feeling grateful do for you?",options:["Makes you tired","Makes you hungrier","Makes you happier and healthier","Makes you sad"],answer:2},
      {q:"What should you do when feelings feel too big?",options:["Keep them secret","Ask a grown-up for help","Pretend they don't exist","Eat candy"],answer:1},
      {q:"Why is naming your feeling helpful?",options:["It isn't","It makes feelings bigger","It calms your brain","It makes you forget"],answer:2},
      {q:"What does exercise do for big emotions?",options:["Makes them bigger","Has no effect","Helps release them","Makes you angrier"],answer:2},
      {q:"What can hugging someone for 20 seconds do?",options:["Make you cold","Release happy hormones","Make you hungry","Give you germs"],answer:1},
    ]
  },
  { id:"dental", emoji:"🦷", label:"Dental Hygiene", color:"#9B59B6", bg:"#F5EEF8",
    desc:"Keep your smile bright and healthy!",
    source:"American Dental Association (ADA) · CDC Oral Health · AAP",
    sourceUrl:"https://www.ada.org",
    facts:[
      {emoji:"🪥",title:"Brush Twice a Day!",text:"Brush every morning and every night for 2 minutes to remove sugar bugs and keep teeth healthy.",fun:"You should brush for 2 minutes — that is as long as your favorite song! 🎵"},
      {emoji:"🧵",title:"Floss Every Day!",text:"Flossing cleans between teeth where toothbrush bristles can't reach. Germs love hiding there!",fun:"Flossing is like giving your teeth a hug — it cleans the parts you can't see! 🤗"},
      {emoji:"🍬",title:"Sugar Causes Cavities!",text:"Germs in your mouth eat sugar and make acid that creates holes called cavities.",fun:"Sour candy is MORE harmful than regular candy — the acid is extra sneaky! 😮"},
      {emoji:"🦷",title:"Visit the Dentist!",text:"Visiting the dentist twice a year lets them catch tiny problems before they get big.",fun:"Dentists use a tiny mirror to see all sides of your teeth — even the hidden ones! 🔍"},
      {emoji:"💧",title:"Drink Water After Meals!",text:"Rinsing with water after eating washes away sugar and acid before they can hurt your teeth.",fun:"Water is the only drink that is 100% safe for your teeth! 💙"},
      {emoji:"🦴",title:"Teeth Are Bones-ish!",text:"Teeth are not exactly bones but they are the hardest things in your body — stronger than bone!",fun:"The outer layer of your tooth (enamel) is the hardest substance your body makes! 💎"},
      {emoji:"😁",title:"Baby Teeth Matter!",text:"Even though baby teeth fall out, they hold space for adult teeth and help you chew and talk.",fun:"You start getting adult teeth around age 6 — and they need to last your whole life! 🌱"},
      {emoji:"🥛",title:"Calcium Protects Teeth!",text:"Milk, cheese, and yogurt have calcium that keeps your tooth enamel strong and hard.",fun:"Cheese actually helps neutralize acid in your mouth after eating — a yummy protector! 🧀"},
      {emoji:"🍎",title:"Crunchy Foods Clean Teeth!",text:"Crunchy foods like apples and carrots scrub the surface of your teeth while you eat them!",fun:"Apples are called nature's toothbrush — they clean as you munch! 🪥"},
      {emoji:"🌊",title:"Fluoride Protects Teeth!",text:"Fluoride in toothpaste makes tooth enamel harder and more resistant to acid attacks.",fun:"Fluoride actually helps repair tiny damage to your teeth before it becomes a cavity! ✨"},
      {emoji:"🧃",title:"Juice Can Hurt Teeth!",text:"Fruit juice has lots of sugar and acid — it can damage teeth just like soda.",fun:"Even 100% natural fruit juice can cause cavities if you drink it all day! 🍊"},
      {emoji:"🦠",title:"Mouth Bacteria",text:"Your mouth has billions of bacteria — brushing and flossing keeps the bad ones in check.",fun:"There are more bacteria in one mouth than there are people on Earth! 🌍"},
      {emoji:"🌙",title:"Night Brushing Is Most Important!",text:"Brushing before bed is most important because saliva decreases at night leaving teeth vulnerable.",fun:"Saliva is your mouth's natural cleaner — and it stops working while you sleep! 😴"},
      {emoji:"🎯",title:"Brush Every Surface!",text:"Make sure to brush the front, back, and top of every tooth — and brush your tongue too!",fun:"Your tongue holds almost as many bacteria as your teeth — brush it! 👅"},
      {emoji:"⏰",title:"Two-Minute Rule!",text:"Most people brush for only 45 seconds. Dentists want you to brush for a full 2 minutes!",fun:"Use a timer or song to make sure you brush long enough every time! 🎶"},
      {emoji:"🏒",title:"Mouth Guards Protect!",text:"Wearing a mouth guard during sports protects your teeth from injury and cracks.",fun:"Sports cause more than 5 million lost teeth every year — protect yours! ⚽"},
      {emoji:"💊",title:"Medicine Can Affect Teeth!",text:"Some medicines make your mouth dry which raises your cavity risk — drink more water!",fun:"Some antibiotics can even affect the color of developing teeth in young children! 😮"},
      {emoji:"🌿",title:"Chewing Gum Can Help!",text:"Sugar-free gum after meals increases saliva flow which washes away acid and food bits.",fun:"The chewing motion actually tells your brain you are eating — saliva time! 💦"},
      {emoji:"🚿",title:"Clean Your Toothbrush!",text:"Rinse your toothbrush after use and let it air dry upright to stop bacteria growing.",fun:"Covering your toothbrush traps moisture which actually grows MORE bacteria! 🦠"},
      {emoji:"🌡️",title:"Hot and Cold Sensitivity",text:"If teeth hurt with hot or cold foods, that is a sign to visit the dentist right away.",fun:"Tooth sensitivity affects 1 in 8 people — the dentist can fix it easily! ❄️"},
      {emoji:"😬",title:"Grinding Hurts Teeth!",text:"Some people grind their teeth at night which wears them down. Dentists can help with this.",fun:"Grinding teeth is called bruxism and can be caused by stress or misaligned teeth! 😮"},
      {emoji:"🫧",title:"Mouthwash Helps!",text:"Mouthwash can reach bacteria in places your brush misses and makes your breath fresh.",fun:"Mouthwash should be the LAST step — after brushing and flossing! 🌊"},
      {emoji:"🥦",title:"Veggies Protect Teeth!",text:"Vegetables high in water and fiber increase saliva flow and scrub teeth naturally.",fun:"Celery is basically a natural dental floss — it gets between teeth! 🌿"},
      {emoji:"💪",title:"Enamel Can't Regrow!",text:"Unlike bones, tooth enamel cannot regenerate — so take care of it now while you can!",fun:"This is why dentists say prevention is SO important — protect what you have! 🛡️"},
      {emoji:"😊",title:"Smile Power!",text:"A healthy smile makes you feel confident and happy — and it makes others happy too!",fun:"People who smile more are seen as more trustworthy and likeable! 🌟"},
    ],
    quiz:[
      {q:"How long should you brush your teeth?",options:["10 seconds","30 seconds","2 minutes","10 minutes"],answer:2},
      {q:"What are holes in your teeth called?",options:["Freckles","Cavities","Dimples","Bubbles"],answer:1},
      {q:"How often should you visit the dentist?",options:["Never","Once every 5 years","Twice a year","Every week"],answer:2},
      {q:"What is the hardest substance your body makes?",options:["Bone","Fingernail","Tooth enamel","Hair"],answer:2},
      {q:"Which drink is 100% safe for your teeth?",options:["Juice","Soda","Milk","Water"],answer:3},
      {q:"What does calcium in milk do for teeth?",options:["Makes them yellow","Keeps enamel strong","Makes them fall out","Makes them grow faster"],answer:1},
      {q:"What is the most important time to brush?",options:["After lunch","Before breakfast","Before bed","During dinner"],answer:2},
      {q:"What does sugar-free gum do after meals?",options:["Causes cavities","Hurts your jaw","Increases saliva to clean teeth","Has no effect"],answer:2},
      {q:"What is brushing your teeth for only 45 seconds a problem?",options:["It's perfect","It misses lots of surfaces","It's too long","It's only a problem for adults"],answer:1},
      {q:"Why should you wear a mouth guard in sports?",options:["It looks cool","It makes you run faster","It protects your teeth from injury","All dentists recommend it for fun"],answer:2},
    ]
  },
  { id:"fitness", emoji:"🏃", label:"Physical Fitness", color:"#27AE60", bg:"#E9F7EF",
    desc:"Move your body and be strong!",
    source:"CDC Physical Activity Guidelines · American Heart Association · WHO",
    sourceUrl:"https://www.cdc.gov/physicalactivity",
    facts:[
      {emoji:"💪",title:"Exercise Makes You Strong!",text:"Running, jumping, dancing, and sports make muscles bigger and hearts stronger.",fun:"Your muscles get stronger every time you use them — like charging a battery! ⚡"},
      {emoji:"🧠",title:"Exercise Helps Your Brain!",text:"Moving your body helps your brain work better! Kids who exercise do better in school.",fun:"Exercise makes your brain release happy chemicals so you smile more! 😊"},
      {emoji:"⏰",title:"Move for 60 Minutes!",text:"Kids should be active for at least 60 minutes every day. It doesn't need to be all at once!",fun:"Playing tag, riding bikes, or dancing all count as exercise! 🚴"},
      {emoji:"🧘",title:"Rest and Stretch!",text:"After exercising, stretching keeps muscles flexible and sleep helps them grow stronger.",fun:"Your muscles actually grow while you're sleeping! 😴"},
      {emoji:"❤️",title:"Strong Heart!",text:"Exercise makes your heart muscle stronger so it can pump blood more easily around your body.",fun:"A fit heart beats slower because it pumps more blood with each beat — it's more efficient! 💓"},
      {emoji:"🦴",title:"Strong Bones!",text:"Weight-bearing exercises like running and jumping help build dense strong bones.",fun:"Kids who are active have stronger bones than inactive kids — and it lasts their whole life! 🦴"},
      {emoji:"😴",title:"Sleep Better!",text:"Kids who exercise during the day fall asleep faster and sleep more deeply at night.",fun:"Exercise can reduce the time it takes to fall asleep by 50%! 🌙"},
      {emoji:"🌈",title:"Happy Chemicals!",text:"Exercise releases endorphins — chemicals that make you feel happy, calm, and energized.",fun:"A 10-minute walk can improve your mood for up to 2 hours! ⏰"},
      {emoji:"🤸",title:"Flexibility Matters!",text:"Stretching and activities like gymnastics and yoga keep your muscles and joints flexible.",fun:"Flexible people are less likely to get injured — stretch every day! 🧘"},
      {emoji:"🏊",title:"Swimming Is Amazing!",text:"Swimming works almost every muscle in your body at the same time — it's a super sport!",fun:"Swimming burns more calories per minute than running! 🌊"},
      {emoji:"⚽",title:"Team Sports Teach Life Skills!",text:"Playing team sports teaches cooperation, communication, and how to win and lose graciously.",fun:"Kids who play team sports are more likely to be leaders as adults! 🏆"},
      {emoji:"🚴",title:"Bike Riding!",text:"Cycling builds leg muscles, improves balance, and is great cardio for your heart.",fun:"Cycling is 3x more efficient than walking the same distance! 🚵"},
      {emoji:"🤾",title:"Coordination Grows!",text:"Practicing sports and movement activities improves how well your brain and body work together.",fun:"Learning new physical skills creates new pathways in your brain! 🧠"},
      {emoji:"🏋️",title:"Strength Training!",text:"Exercises that use your own bodyweight like push-ups build strength safely for kids.",fun:"Push-ups actually work over 12 different muscles at once! 💪"},
      {emoji:"🌿",title:"Exercise Outside!",text:"Exercising outdoors in nature reduces stress even more than exercising indoors.",fun:"Just 5 minutes of exercise in nature can boost your mood and self-esteem! 🌳"},
      {emoji:"💧",title:"Drink Water While Active!",text:"Your body sweats when exercising and needs water to stay cool and keep working.",fun:"You can lose 1-2 liters of water per hour of intense exercise — drink up! 💦"},
      {emoji:"🥗",title:"Fuel for Exercise!",text:"Eating healthy foods gives your body the energy it needs to exercise well.",fun:"Carbohydrates are your body's favorite fuel for exercise — that's why pasta is popular! 🍝"},
      {emoji:"🏃",title:"Warm Up First!",text:"Warming up before exercise gets blood flowing to muscles so they don't get hurt.",fun:"Cold muscles are like cold rubber bands — they can snap! Warm up first! 🌡️"},
      {emoji:"🎯",title:"Set Goals!",text:"Setting fitness goals — like running a little farther each week — keeps you motivated.",fun:"Writing down goals makes you 42% more likely to achieve them! ✍️"},
      {emoji:"🌟",title:"Any Movement Counts!",text:"Taking the stairs, walking to school, and playing at recess all count as physical activity.",fun:"Fidgeting (moving around in your chair) can burn up to 350 extra calories a day! 😄"},
      {emoji:"🧗",title:"Try New Activities!",text:"Trying different sports and activities helps you find what you love AND builds different muscles.",fun:"Kids who try many activities are more likely to stay active as adults! 🌈"},
      {emoji:"🤼",title:"Exercise Reduces Stress!",text:"Physical activity is one of the best stress relievers available — and it's completely free!",fun:"Just 20 minutes of exercise can reduce anxiety for up to 4 hours! 🧘"},
      {emoji:"🏅",title:"Consistency Beats Intensity!",text:"Exercising a little every day is much better than exercising a lot just once a week.",fun:"It takes about 21 days of daily activity for it to become a habit! 📅"},
      {emoji:"👫",title:"Exercise With Friends!",text:"Exercising with friends makes it more fun and you are more likely to keep doing it.",fun:"People who exercise with a friend work out 200% longer than people who go alone! 🤝"},
      {emoji:"🌍",title:"Active Kids Are Healthier Adults!",text:"Children who are physically active grow up healthier, happier, and live longer lives.",fun:"Being active as a child sets up healthy habits that last a lifetime! 🌟"},
    ],
    quiz:[
      {q:"How many minutes should kids be active every day?",options:["10 minutes","30 minutes","60 minutes","5 minutes"],answer:2},
      {q:"What does exercise help your brain do?",options:["Sleep all day","Work better and feel happier","Grow bigger","Turn off"],answer:1},
      {q:"What should you do after exercising?",options:["Eat lots of candy","Watch TV for hours","Stretch and rest","Skip dinner"],answer:2},
      {q:"What do endorphins do?",options:["Make you tired","Make you hungry","Make you happy and calm","Make you angry"],answer:2},
      {q:"Why is warming up before exercise important?",options:["It isn't important","It makes you sweat more","It gets blood to muscles to prevent injury","It makes you look cool"],answer:2},
      {q:"What does exercise do for your heart?",options:["Weakens it","Makes it pump less blood","Makes it stronger and more efficient","Has no effect"],answer:2},
      {q:"Which sport works almost every muscle at the same time?",options:["Chess","Swimming","Reading","Napping"],answer:1},
      {q:"How long can a 10-minute walk improve your mood?",options:["Just 1 minute","30 minutes","Up to 2 hours","It doesn't"],answer:2},
      {q:"Why should you drink water during exercise?",options:["To gain weight","To replace water lost through sweating","To slow down","To make exercise harder"],answer:1},
      {q:"What is better — exercising a lot once a week or a little every day?",options:["A lot once a week","A little every day","Both are exactly the same","Neither works"],answer:1},
    ]
  },
];

// ── STAR RATING ───────────────────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div style={{ display:"flex", gap:4, justifyContent:"center" }}>
      {[...Array(3)].map((_,i) => (
        <span key={i} style={{ fontSize:28, filter:i<count?"none":"grayscale(1) opacity(0.3)", transition:"all 0.3s", animationDelay:`${i*0.1}s` }}>⭐</span>
      ))}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function LabHealthLiteracy() {
  const [screen, setScreen]   = useState("home");
  const [topic, setTopic]     = useState(null);
  const [activeFacts, setActiveFacts] = useState([]);
  const [activeQuiz, setActiveQuiz]   = useState([]);
  const [factIdx, setFactIdx] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [score, setScore]     = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAns, setShowAns] = useState(false);
  const [stars, setStars]     = useState({});
  const [bounce, setBounce]   = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [lang, setLang]       = useState("en");
  const { t, translate }      = useTranslation(lang);

  useEffect(() => {
    setBounce(true);
    const timer = setTimeout(() => setBounce(false), 600);
    return () => clearTimeout(timer);
  }, [screen]);

  // Translate home screen topic labels/descs when language changes
  useEffect(() => {
    if (lang === "en") return;
    const homeStrings = [
      "Pick a Topic to Explore!",
      "Tap a picture to start learning 👇",
      "⭐ Your Stars ⭐",
      "📚 About This App & Our Sources",
      "Learn Fun Facts!",
      "Take the Quiz!",
      "Your best score:",
      "Next Fact! →",
      "I'm Ready! ✅",
      "Next Question! →",
      "See My Stars! ⭐",
      "🏠 Home",
      "🔄 Try the Quiz Again!",
      "📖 Read the Facts Again",
      "🏠 Pick Another Topic!",
      "Question", "of",
      "Amazing! You got it right!",
      "The answer is:",
      "PERFECT!", "Great Job!", "Good Try!",
      "You got", "out of", "right!",
      "You are a Health Explorer Champion! 🦸",
      "Keep practicing — you're getting smarter every day! 💪",
      "You know so much about your health! Keep learning!",
      "🤩 Fun Fact!",
      "📚 Evidence-based source:",
      "📖 Learn Fun Facts!",
      "🎯 Take the Quiz!",
      "About BodySmart Kids",
      ...TOPICS.map(tp => tp.label),
      ...TOPICS.map(tp => tp.desc),
    ];
    translate(homeStrings);
  }, [lang, translate]);

  // Translate current fact when it changes
  useEffect(() => {
    if (lang === "en" || !activeFacts[factIdx]) return;
    const f = activeFacts[factIdx];
    translate([f.title, f.text, f.fun]);
  }, [lang, factIdx, activeFacts, translate]);

  // Translate current quiz question when it changes
  useEffect(() => {
    if (lang === "en" || !activeQuiz[quizIdx]) return;
    const q = activeQuiz[quizIdx];
    translate([q.q, ...q.options]);
  }, [lang, quizIdx, activeQuiz, translate]);

  const goHome = () => { setScreen("home"); setTopic(null); setFactIdx(0); setQuizIdx(0); setScore(0); setSelected(null); setShowAns(false); };
  const pickTopic = (t) => {
    setTopic(t);
    setActiveFacts(pick(t.facts, 10));
    setActiveQuiz(pick(t.quiz, 5));
    setScreen("topic");
  };
  const startLearn = () => { setFactIdx(0); setActiveFacts(pick(topic.facts, 10)); setScreen("learn"); };
  const startQuiz  = () => { setQuizIdx(0); setScore(0); setSelected(null); setShowAns(false); setActiveQuiz(pick(topic.quiz, 5)); setScreen("quiz"); };

  const nextFact = () => {
    if (factIdx < activeFacts.length - 1) setFactIdx(i => i+1);
    else setScreen("topic");
  };

  const pickAnswer = (i) => {
    if (showAns) return;
    setSelected(i);
    setShowAns(true);
    if (i === activeQuiz[quizIdx].answer) setScore(s => s+1);
  };

  const nextQuiz = () => {
    setSelected(null); setShowAns(false);
    if (quizIdx < activeQuiz.length - 1) setQuizIdx(i => i+1);
    else {
      const earned = score + (selected === activeQuiz[quizIdx].answer ? 1 : 0);
      const s = earned === activeQuiz.length ? 3 : earned >= 2 ? 2 : 1;
      setStars(prev => ({ ...prev, [topic.id]: Math.max(prev[topic.id]||0, s) }));
      setScreen("result");
    }
  };

  const finalScore = () => score + (showAns && selected === activeQuiz[quizIdx].answer ? 1 : 0);

  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(135deg, #FFF8E7 0%, #FFF0D6 100%)`, fontFamily:"Georgia, 'Times New Roman', serif", display:"flex", flexDirection:"column", alignItems:"center", padding:"16px 12px" }}>
      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-5deg)}75%{transform:rotate(5deg)}}
        @keyframes pop{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .bounce{animation:bounce 0.6s ease}
        .wiggle{animation:wiggle 0.5s ease}
        .pop{animation:pop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards}
        .float{animation:float 3s ease-in-out infinite}
        .btn:hover{transform:scale(1.05) translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.2)!important}
        .btn{transition:all 0.2s ease;cursor:pointer}
        .opt:hover{transform:scale(1.02)}
        .opt{transition:all 0.15s ease;cursor:pointer}
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ width:"100%", maxWidth:600, marginBottom:16 }}>
        {/* LAB Project Header */}
        <div style={{ background:"#ffffff", borderRadius:"20px 20px 0 0", padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"center", borderBottom:"3px solid #F58220", position:"relative" }}>
          <img src="data:image/jpeg;base64,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" alt="The LAB Project" style={{ height:90, objectFit:"contain", maxWidth:"85%" }} />
          {screen !== "home" && (
            <button onClick={goHome} className="btn" style={{ position:"absolute", right:16, background:C.red, border:"none", borderRadius:20, padding:"8px 14px", color:C.white, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:"0 4px 10px rgba(230,51,41,0.4)" }}>
              🏠 Home
            </button>
          )}
        </div>
        {/* App title bar */}
        <div style={{ background:C.blue, padding:"10px 20px", borderRadius:"0 0 20px 20px", textAlign:"center", position:"relative" }}>
          <div style={{ color:C.white, fontWeight:900, fontSize:18, letterSpacing:1 }}>
            🌟 BodySmart Kids 🌟
          </div>
          <div style={{ color:C.yellow, fontSize:12, fontWeight:700 }}>Explore · Learn · Stay Healthy!</div>
          {/* Language selector */}
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:8 }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => setLang(l.code)} className="btn"
                style={{
                  padding:"4px 10px", borderRadius:20, border:`2px solid ${lang===l.code ? C.yellow : "rgba(255,255,255,0.3)"}`,
                  background: lang===l.code ? C.yellow : "rgba(255,255,255,0.1)",
                  color: lang===l.code ? C.blue : C.white,
                  fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Georgia, serif",
                  transition:"all 0.2s",
                }}>
                {l.flag} {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOME SCREEN ── */}
      {screen==="home" && !showAbout && (
        <div className="pop" style={{ width:"100%", maxWidth:600 }}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div className="float" style={{ fontSize:64, lineHeight:1, marginBottom:8 }}>🌈</div>
            <div style={{ fontSize:22, fontWeight:900, color:C.blue, marginBottom:4 }}>{t("Pick a Topic to Explore!")}</div>
            <div style={{ fontSize:14, color:"#666" }}>{t("Tap a picture to start learning 👇")}</div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {TOPICS.map((tp, i) => (
              <div key={tp.id} className="btn pop" onClick={() => pickTopic(tp)}
                style={{ background:tp.bg, borderRadius:20, padding:"20px 14px", textAlign:"center", border:`4px solid ${tp.color}`, boxShadow:`0 6px 16px ${tp.color}44`, animationDelay:`${i*0.1}s`, position:"relative" }}>
                {stars[tp.id] && (
                  <div style={{ position:"absolute", top:8, right:8, fontSize:14 }}>
                    {"⭐".repeat(stars[tp.id])}
                  </div>
                )}
                <div style={{ fontSize:52, marginBottom:8, lineHeight:1 }}>{tp.emoji}</div>
                <div style={{ fontSize:16, fontWeight:900, color:tp.color, marginBottom:4 }}>{t(tp.label)}</div>
                <div style={{ fontSize:12, color:"#555", lineHeight:1.4 }}>{t(tp.desc)}</div>
              </div>
            ))}
          </div>

          {Object.keys(stars).length > 0 && (
            <div style={{ marginTop:20, background:C.yellow, borderRadius:16, padding:"14px 20px", textAlign:"center", border:`3px solid ${C.orange}` }}>
              <div style={{ fontSize:16, fontWeight:900, color:C.blue }}>{t("⭐ Your Stars ⭐")}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:8, flexWrap:"wrap" }}>
                {TOPICS.filter(tp=>stars[tp.id]).map(tp=>(
                  <div key={tp.id} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:20 }}>{tp.emoji}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:tp.color }}>{"⭐".repeat(stars[tp.id])}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About button */}
          <button onClick={() => setShowAbout(true)} className="btn"
            style={{ width:"100%", marginTop:16, padding:"12px", borderRadius:14, border:`2px solid ${C.blue}`, background:"transparent", color:C.blue, fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"Georgia, serif" }}>
            📚 {t("About This App & Our Sources")}
          </button>
        </div>
      )}

      {/* ── ABOUT SCREEN ── */}
      {showAbout && (
        <div className="pop" style={{ width:"100%", maxWidth:600 }}>
          <div style={{ background:"#fff", borderRadius:20, padding:28, boxShadow:"0 8px 32px rgba(0,0,0,0.1)", border:`3px solid ${C.blue}`, marginBottom:14 }}>
            <div style={{ textAlign:"center", marginBottom:20 }}>
              <div style={{ fontSize:40, marginBottom:8 }}>📚</div>
              <h2 style={{ margin:0, fontSize:20, color:C.blue, fontWeight:900 }}>{t("About BodySmart Kids")}</h2>
              <p style={{ margin:"8px 0 0", fontSize:13, color:"#555", lineHeight:1.6 }}>
                All health facts in this app are based on evidence from trusted, peer-reviewed medical and public health organizations. Content is reviewed and aligned with national pediatric health guidelines.
              </p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {TOPICS.map(t => (
                <div key={t.id} style={{ background:t.bg, borderRadius:14, padding:"14px 16px", border:`2px solid ${t.color}33` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                    <span style={{ fontSize:22 }}>{t.emoji}</span>
                    <span style={{ fontSize:15, fontWeight:900, color:t.color }}>{t.label}</span>
                  </div>
                  <div style={{ fontSize:12, color:"#444", lineHeight:1.6 }}>
                    <strong>📖 Sources:</strong> {t.source}
                  </div>
                  {t.sourceUrl && (
                    <div style={{ fontSize:11, color:"#888", marginTop:4 }}>
                      🌐 Learn more: <span style={{ color:C.blue }}>{t.sourceUrl}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop:20, padding:"14px 16px", background:"#f0f7ff", borderRadius:12, border:"1px solid #cce0ff" }}>
              <div style={{ fontSize:12, color:"#333", lineHeight:1.7 }}>
                <strong>🏥 Key Organizations Referenced:</strong><br/>
                • <strong>CDC</strong> — Centers for Disease Control and Prevention<br/>
                • <strong>NIH</strong> — National Institutes of Health<br/>
                • <strong>WHO</strong> — World Health Organization<br/>
                • <strong>ADA</strong> — American Dental Association<br/>
                • <strong>APA</strong> — American Psychological Association<br/>
                • <strong>AHA</strong> — American Heart Association<br/>
                • <strong>USDA</strong> — MyPlate Nutrition Guidelines<br/>
                • <strong>AAP</strong> — American Academy of Pediatrics<br/>
                • <strong>KidsHealth.org</strong> — Nemours Children's Health
              </div>
            </div>

            <div style={{ marginTop:14, padding:"12px 16px", background:"#fff8e7", borderRadius:12, border:`1px solid ${C.orange}44`, fontSize:12, color:"#555", lineHeight:1.6 }}>
              ⚠️ <strong>Disclaimer:</strong> This app is an educational tool designed for children. It is not intended to replace advice from a licensed healthcare professional. Always consult your doctor or pediatrician for personal health guidance.
            </div>
          </div>

          <button onClick={() => setShowAbout(false)} className="btn"
            style={{ width:"100%", padding:"14px", borderRadius:14, border:"none", background:C.blue, color:"#fff", fontSize:16, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 4px 14px ${C.blue}55` }}>
            🏠 {t("Back to Topics")}
          </button>
        </div>
      )}

      {/* ── TOPIC SCREEN ── */}
      {screen==="topic" && topic && (
        <div className="pop" style={{ width:"100%", maxWidth:600 }}>
          <div style={{ background:`linear-gradient(135deg, ${topic.color}, ${topic.color}cc)`, borderRadius:20, padding:24, textAlign:"center", marginBottom:16, boxShadow:`0 8px 24px ${topic.color}55` }}>
            <div className="wiggle" style={{ fontSize:72, lineHeight:1, marginBottom:10 }}>{topic.emoji}</div>
            <div style={{ fontSize:26, fontWeight:900, color:C.white, marginBottom:6 }}>{topic.label}</div>
            <div style={{ fontSize:15, color:"rgba(255,255,255,0.9)" }}>{topic.desc}</div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <button onClick={startLearn} className="btn" style={{ background:C.blue, border:"none", borderRadius:16, padding:"18px 24px", color:C.white, fontSize:18, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 6px 16px ${C.blue}55`, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              📖 {t("Learn Fun Facts!")}
            </button>
            <button onClick={startQuiz} className="btn" style={{ background:C.orange, border:"none", borderRadius:16, padding:"18px 24px", color:C.white, fontSize:18, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 6px 16px ${C.orange}55`, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
              🎯 {t("Take the Quiz!")}
            </button>
          </div>

          {stars[topic.id] && (
            <div style={{ marginTop:16, textAlign:"center" }}>
              <div style={{ fontSize:14, color:"#666", marginBottom:4 }}>{t("Your best score:")}</div>
              <Stars count={stars[topic.id]} />
            </div>
          )}
        </div>
      )}

      {/* ── LEARN SCREEN ── */}
      {screen==="learn" && topic && (
        <div className="pop" style={{ width:"100%", maxWidth:600 }}>
          {/* Progress dots */}
          <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16 }}>
            {activeFacts.map((_,i) => (
              <div key={i} style={{ width:12, height:12, borderRadius:"50%", background:i<=factIdx?topic.color:"#ddd", transition:"all 0.3s", transform:i===factIdx?"scale(1.3)":"scale(1)" }}/>
            ))}
          </div>

          {/* Fact card */}
          <div key={factIdx} className="pop" style={{ background:topic.bg, borderRadius:24, padding:28, border:`4px solid ${topic.color}`, boxShadow:`0 8px 24px ${topic.color}33`, marginBottom:16 }}>
            <div style={{ fontSize:60, textAlign:"center", marginBottom:12, lineHeight:1 }}>{activeFacts[factIdx].emoji}</div>
            <div style={{ fontSize:22, fontWeight:900, color:topic.color, textAlign:"center", marginBottom:12 }}>{t(activeFacts[factIdx].title)}</div>
            <div style={{ fontSize:16, color:"#333", lineHeight:1.7, textAlign:"center", marginBottom:16 }}>{t(activeFacts[factIdx].text)}</div>
            <div style={{ background:C.yellow, borderRadius:14, padding:"12px 16px", border:`2px solid ${C.orange}` }}>
              <div style={{ fontSize:13, fontWeight:900, color:C.orange, marginBottom:4 }}>🤩 {t("Fun Fact!")}</div>
              <div style={{ fontSize:14, color:"#333", lineHeight:1.6 }}>{t(activeFacts[factIdx].fun)}</div>
            </div>
            {topic.source && (
              <div style={{ marginTop:10, padding:"8px 12px", background:"#f7f7f7", borderRadius:10, border:"1px solid #e0e0e0" }}>
                <div style={{ fontSize:10, color:"#888", lineHeight:1.5 }}>
                  📚 <strong>{t("Evidence-based source:")}</strong> {topic.source}
                </div>
              </div>
            )}
          </div>

          <button onClick={nextFact} className="btn" style={{ width:"100%", background:topic.color, border:"none", borderRadius:16, padding:"18px", color:C.white, fontSize:18, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 6px 16px ${topic.color}55` }}>
            {factIdx < activeFacts.length - 1 ? t("Next Fact! →") : t("I'm Ready! ✅")}
          </button>
        </div>
      )}

      {/* ── QUIZ SCREEN ── */}
      {screen==="quiz" && topic && (
        <div className="pop" style={{ width:"100%", maxWidth:600 }}>
          {/* Score & progress */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div style={{ background:C.yellow, borderRadius:20, padding:"6px 16px", fontWeight:900, color:C.blue, fontSize:15, border:`2px solid ${C.orange}` }}>
              ⭐ {score}/{activeQuiz.length}
            </div>
            <div style={{ display:"flex", gap:6 }}>
              {activeQuiz.map((_,i)=>(
                <div key={i} style={{ width:14, height:14, borderRadius:"50%", background:i<quizIdx?topic.color:i===quizIdx?"#fff":C.white, border:`3px solid ${topic.color}`, transition:"all 0.3s" }}/>
              ))}
            </div>
          </div>

          {/* Question */}
          <div key={quizIdx} className="pop" style={{ background:topic.bg, borderRadius:24, padding:"24px 20px", border:`4px solid ${topic.color}`, boxShadow:`0 8px 24px ${topic.color}33`, marginBottom:16 }}>
            <div style={{ fontSize:14, fontWeight:700, color:topic.color, marginBottom:12, textAlign:"center" }}>
              {t("Question")} {quizIdx+1} {t("of")} {activeQuiz.length}
            </div>
            <div style={{ fontSize:20, fontWeight:900, color:"#222", textAlign:"center", lineHeight:1.4, marginBottom:20 }}>
              {t(activeQuiz[quizIdx].q)}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {activeQuiz[quizIdx].options.map((opt,i) => {
                const isCorrect = i === activeQuiz[quizIdx].answer;
                const isSelected = i === selected;
                let bg = C.white, border = `3px solid #ddd`, color = "#333";
                if (showAns && isCorrect) { bg="#d4edda"; border=`3px solid #28a745`; color="#155724"; }
                else if (showAns && isSelected && !isCorrect) { bg="#f8d7da"; border=`3px solid #dc3545`; color="#721c24"; }
                else if (!showAns) { bg=C.white; }
                return (
                  <div key={i} className={showAns?"":"opt"} onClick={()=>pickAnswer(i)}
                    style={{ background:bg, border, borderRadius:14, padding:"14px 18px", fontSize:16, fontWeight:700, color, display:"flex", alignItems:"center", gap:10, transition:"all 0.2s", cursor:showAns?"default":"pointer", boxShadow:isSelected&&showAns?"0 4px 12px rgba(0,0,0,0.15)":"none" }}>
                    <span style={{ width:30, height:30, borderRadius:"50%", background:showAns&&isCorrect?"#28a745":showAns&&isSelected?"#dc3545":topic.color, color:C.white, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, flexShrink:0 }}>
                      {showAns && isCorrect ? "✓" : showAns && isSelected ? "✗" : String.fromCharCode(65+i)}
                    </span>
                    {t(opt)}
                  </div>
                );
              })}
            </div>

            {showAns && (
              <div className="pop" style={{ marginTop:16, padding:"12px 16px", borderRadius:14, background:selected===activeQuiz[quizIdx].answer?"#d4edda":"#fff3cd", border:`2px solid ${selected===activeQuiz[quizIdx].answer?"#28a745":"#ffc107"}`, textAlign:"center", fontSize:16, fontWeight:700, color:"#333" }}>
                {selected===activeQuiz[quizIdx].answer
                  ? t("🎉 Amazing! You got it right!")
                  : `💡 ${t("The answer is:")} ${t(activeQuiz[quizIdx].options[activeQuiz[quizIdx].answer])}`}
              </div>
            )}
          </div>

          {showAns && (
            <button onClick={nextQuiz} className="btn" style={{ width:"100%", background:topic.color, border:"none", borderRadius:16, padding:"18px", color:C.white, fontSize:18, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 6px 16px ${topic.color}55` }}>
              {quizIdx < activeQuiz.length-1 ? t("Next Question! →") : t("See My Stars! ⭐")}
            </button>
          )}
        </div>
      )}

      {/* ── RESULT SCREEN ── */}
      {screen==="result" && topic && (
        <div className="pop" style={{ width:"100%", maxWidth:600, textAlign:"center" }}>
          <div style={{ background:`linear-gradient(135deg, ${C.yellow}, ${C.orange})`, borderRadius:24, padding:32, border:`4px solid ${C.orange}`, boxShadow:`0 8px 32px ${C.orange}55`, marginBottom:16 }}>
            <div className="bounce" style={{ fontSize:80, lineHeight:1, marginBottom:12 }}>
              {finalScore()===activeQuiz.length?"🏆":finalScore()>=2?"🌟":"😊"}
            </div>
            <div style={{ fontSize:26, fontWeight:900, color:C.blue, marginBottom:8 }}>
              {finalScore()===activeQuiz.length?t("PERFECT!"):finalScore()>=2?t("Great Job!"):t("Good Try!")}
            </div>
            <div style={{ fontSize:18, color:"#333", marginBottom:16, fontWeight:700 }}>
              {t("You got")} {finalScore()} {t("out of")} {activeQuiz.length} {t("right!")}
            </div>
            <Stars count={stars[topic.id]||1} />
            <div style={{ marginTop:16, fontSize:15, color:"#444", lineHeight:1.6 }}>
              {finalScore()===activeQuiz.length
                ? t("You are a Health Explorer Champion! 🦸")
                : finalScore()>=2
                ? t("You know so much about your health! Keep learning!")
                : t("Keep practicing — you're getting smarter every day! 💪")}
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <button onClick={startQuiz} className="btn" style={{ background:C.blue, border:"none", borderRadius:16, padding:"16px", color:C.white, fontSize:17, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 6px 16px ${C.blue}55` }}>
              🔄 {t("Try the Quiz Again!")}
            </button>
            <button onClick={startLearn} className="btn" style={{ background:topic.color, border:"none", borderRadius:16, padding:"16px", color:C.white, fontSize:17, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 6px 16px ${topic.color}55` }}>
              📖 {t("Read the Facts Again")}
            </button>
            <button onClick={goHome} className="btn" style={{ background:C.orange, border:"none", borderRadius:16, padding:"16px", color:C.white, fontSize:17, fontWeight:900, cursor:"pointer", fontFamily:"Georgia, serif", boxShadow:`0 6px 16px ${C.orange}55` }}>
              🏠 {t("Pick Another Topic!")}
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop:24, textAlign:"center", fontSize:11, color:"#999", lineHeight:1.8 }}>
        <div>Made with ❤️ by <strong style={{ color:C.red }}>The LAB Project</strong></div>
        <div>BodySmart Kids · Powered by <a href="http://www.thelabprojectofficial.org" target="_blank" rel="noopener noreferrer" style={{ color:C.red, fontWeight:700, textDecoration:"none" }}>The LAB Project</a> 🌈</div>
      </div>
    </div>
  );
}
