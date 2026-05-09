import { useState, useEffect } from "react";

// ── FONT INJECTION ────────────────────────────────────────────────────────────
// @import doesn't work in dynamically injected style tags — must use a <link> element
if (!document.head.querySelector('[data-bodysmart-link]')) {
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap";
  fontLink.setAttribute("data-bodysmart-link", "true");
  document.head.appendChild(fontLink);
}

const fontStyle = document.createElement("style");
fontStyle.textContent = `
  * { box-sizing: border-box; }

  body, #root {
    font-family: 'Fredoka One', cursive, sans-serif !important;
  }

  .bs-app * {
    font-family: 'Fredoka One', cursive, sans-serif !important;
  }

  .btn { cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; }
  .btn:hover { transform: translateY(-2px); }
  .btn:active { transform: scale(0.97); }

  .opt:hover { transform: translateX(4px); box-shadow: 0 6px 20px rgba(0,0,0,0.12); }

  @keyframes pop-in {
    0% { opacity: 0; transform: scale(0.88) translateY(12px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .pop { animation: pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .float { animation: float 3s ease-in-out infinite; }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-8deg); }
    75% { transform: rotate(8deg); }
  }
  .wiggle { animation: wiggle 0.6s ease-in-out; }

  @keyframes bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-14px) scale(1.08); }
  }
  .bounce { animation: bounce 0.7s ease-in-out infinite; }

  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.15); }
  }
  .sparkle { animation: sparkle 1.5s ease-in-out infinite; }

  .topic-card {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .topic-card:hover {
    transform: translateY(-4px) scale(1.02);
  }

`;
if (!document.head.querySelector('[data-bodysmart-font]')) {
  fontStyle.setAttribute('data-bodysmart-font', 'true');
  document.head.appendChild(fontStyle);
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

// ── SHUFFLE HELPER ────────────────────────────────────────────────────────────
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const pick = (arr, n) => shuffle(arr).slice(0, n);

// ── TOPICS ────────────────────────────────────────────────────────────────────
const TOPICS = [
  { id:"body", emoji:"🫀", label:"My Body", color:C.red, bg:"#FDE8E7",
    desc:"Learn about your amazing body!",
    source:"National Institutes of Health (NIH) · KidsHealth.org · Cleveland Clinic",
    sourceUrl:"https://kidshealth.org",
    facts:[
      {emoji:"❤️",title:"Your Heart",text:"Your heart is a muscle that pumps blood all around your body. It goes thump-thump all day and all night!",fun:"Put your hand on your chest — feel that? That's your heart saying hi! 👋"},
      {emoji:"🫁",title:"Your Lungs",text:"You have two lungs inside your chest. When you breathe in, they puff up big like balloons!",fun:"Take the biggest breath you can — your lungs are amazing balloon muscles! 💨"},
      {emoji:"🧠",title:"Your Brain",text:"Your brain lives inside your head and tells your whole body what to do. It's like the boss of you!",fun:"Your brain never goes to sleep — it makes your dreams at night! 🌙"},
      {emoji:"🦷",title:"Your Teeth",text:"Your first teeth are called baby teeth. When you get bigger, stronger grown-up teeth come in!",fun:"Count your teeth with your tongue — most kindergarteners have 20! 😁"},
      {emoji:"🦴",title:"Your Bones",text:"Bones hold your body up like a frame. Without bones you would be as wiggly as jello!",fun:"Babies have more bones than grown-ups — some bones squish together as you grow! 🦴"},
      {emoji:"💪",title:"Your Muscles",text:"Muscles help you run, jump, hug, and smile! They are all over your body under your skin.",fun:"It takes more muscles to frown than to smile — smiling is easier! 😄"},
      {emoji:"👁️",title:"Your Eyes",text:"Your eyes let you see all the beautiful colors and shapes in the world around you!",fun:"Your eyes can see millions of different colors — even colors that don't have names! 🌈"},
      {emoji:"👂",title:"Your Ears",text:"Your ears catch sound waves so you can hear music, voices, and silly noises!",fun:"Your ears never stop working — even when you are fast asleep they listen! 🎵"},
      {emoji:"👃",title:"Your Nose",text:"Your nose lets you smell yummy food, flowers, and even warn you if something is yucky!",fun:"You can smell cookies baking from really far away! 🍪"},
      {emoji:"👅",title:"Your Tongue",text:"Your tongue helps you taste sweet, salty, sour, and yummy food! It also helps you talk.",fun:"Tiny taste buds all over your tongue send taste messages to your brain! 😋"},
      {emoji:"🩸",title:"Your Blood",text:"Blood travels through your body and brings food and air to every part of you. It also fights germs!",fun:"Your blood is red because it carries special stuff that loves to grab oxygen! 🩸"},
      {emoji:"🖐️",title:"Your Hands",text:"Your hands can hold, squeeze, draw, clap, wave, and do so many amazing things every day!",fun:"Your fingernails grow a little bit every single month! 💅"},
      {emoji:"🦶",title:"Your Feet",text:"Your feet carry you everywhere you go — running, jumping, dancing, and tiptoeing!",fun:"You will walk a LOT of miles in your lifetime — like going around the whole Earth! 🌍"},
      {emoji:"🧬",title:"Your Skin",text:"Your skin covers your whole body and keeps all your insides safe and protected!",fun:"Your skin grows new cells all the time so it always stays fresh! 🌟"},
      {emoji:"🫃",title:"Your Tummy",text:"Your tummy (stomach) breaks down food into tiny pieces so your body can use it for energy!",fun:"Your tummy makes a growling sound when it is empty and hungry! 🐛"},
    ],
    quiz:[
      {q:"What goes thump-thump inside your chest?",options:["🧠 Your brain","❤️ Your heart","🦷 A tooth","🦴 A bone"],answer:1},
      {q:"What do you use to breathe?",options:["🦷 Teeth","🦴 Bones","🫁 Lungs","👅 Tongue"],answer:2},
      {q:"What is the boss of your whole body?",options:["Your tummy","Your feet","Your hands","🧠 Your brain"],answer:3},
      {q:"What holds your body up like a frame?",options:["🩸 Blood","🦴 Bones","👁️ Eyes","💪 Muscles"],answer:1},
      {q:"What helps you taste yummy food?",options:["👂 Ears","👃 Nose","👁️ Eyes","👅 Tongue"],answer:3},
      {q:"What covers and protects your whole body?",options:["Your hair","Your skin","Your nails","Your shoes"],answer:1},
      {q:"What do muscles help you do?",options:["Sleep all day","Run and jump","Taste food","See colors"],answer:1},
      {q:"What makes a growling sound when you are hungry?",options:["Your heart","Your brain","Your tummy","Your lungs"],answer:2},
      {q:"What do your eyes help you do?",options:["Hear sounds","Smell flowers","See colors","Taste cookies"],answer:2},
      {q:"What carries food and air to all parts of your body?",options:["🦴 Bones","💪 Muscles","🩸 Blood","🦷 Teeth"],answer:2},
    ]
  },
  { id:"food", emoji:"🥦", label:"Healthy Eating", color:C.orange, bg:"#FEF0E0",
    desc:"Food gives you energy to play and grow!",
    source:"USDA MyPlate · Academy of Nutrition & Dietetics · WHO Nutrition",
    sourceUrl:"https://www.myplate.gov",
    facts:[
      {emoji:"🥦",title:"Eat Your Veggies!",text:"Vegetables like broccoli and carrots have special powers that help your body grow big and strong!",fun:"Carrots can help your eyes see really well — even in the dark! 🥕👀"},
      {emoji:"🍎",title:"Fruits Are Yummy!",text:"Fruits like apples, bananas, and strawberries give your body energy to run and play all day!",fun:"Bananas have something special inside that can help you feel happy! 🍌😊"},
      {emoji:"💧",title:"Drink Water!",text:"Water helps every single part of your body work the right way. Drink it all day long!",fun:"More than half your body is made of water — you are mostly water! 💧"},
      {emoji:"🥛",title:"Milk Makes Bones Strong!",text:"Milk, cheese, and yogurt have something called calcium that makes your bones and teeth very strong!",fun:"Drinking milk helps your bones grow so big and strong they won't bend! 💪"},
      {emoji:"🥚",title:"Eggs and Beans!",text:"Eggs, beans, and chicken help your muscles grow. They are like tiny builders for your body!",fun:"Every bite of egg or bean helps build your muscles! 🏋️"},
      {emoji:"🍞",title:"Bread Gives Energy!",text:"Bread, rice, and pasta give your body the fuel it needs to run, jump, and play all day!",fun:"Whole grain bread is like a slow-burning fire — it keeps your energy going! 🔥"},
      {emoji:"🌈",title:"Eat the Rainbow!",text:"Different colored fruits and veggies give your body different things it needs. Try every color!",fun:"The more colors on your plate, the more good stuff your body gets! 🎨"},
      {emoji:"🍳",title:"Breakfast Is Super Important!",text:"Eating breakfast is like putting gas in a car — your body and brain need fuel to start the day!",fun:"Kids who eat breakfast feel happier and learn better at school! 📚"},
      {emoji:"🍬",title:"Not Too Much Sugar!",text:"Candy and cookies taste great but too much sugar can hurt your teeth and make you feel tired.",fun:"Sugar is a fun treat — but only a little bit at a time! 😬"},
      {emoji:"🫐",title:"Berries Are Special!",text:"Blueberries, strawberries, and raspberries are tiny little superfoods that protect your body!",fun:"Blueberries are sometimes called brain berries because they help you think! 🔵"},
      {emoji:"🥕",title:"Crunchy Foods Are Fun!",text:"Crunchy veggies and fruits like apples and carrots even help clean your teeth while you munch!",fun:"Apples are like nature's toothbrush! 🪥"},
      {emoji:"🐟",title:"Fish Is Brain Food!",text:"Fish like salmon and tuna have special stuff inside that helps your brain grow nice and healthy!",fun:"Salmon is pink because of the food it eats — just like flamingos! 🐠"},
      {emoji:"🍊",title:"Oranges Help You Heal!",text:"Oranges and lemons have vitamin C inside them. Vitamin C helps cuts heal and keeps you healthy!",fun:"Vitamin C also helps you not get sick as much! 🌟"},
      {emoji:"🫘",title:"Beans Are Tiny Powerhouses!",text:"Beans are amazing — they have protein AND fiber AND iron all in one tiny little package!",fun:"Beans were one of the very first foods people ever grew on farms — thousands of years ago! 🌱"},
      {emoji:"🍽️",title:"Eat Slowly!",text:"Eating slowly gives your tummy time to tell your brain when you are full. No rush!",fun:"It takes about 20 minutes for your tummy to tell your brain it is full! ⏰"},
    ],
    quiz:[
      {q:"What food helps your eyes see in the dark?",options:["🍕 Pizza","🍰 Cake","🥕 Carrot","🍟 Fries"],answer:2},
      {q:"What makes your bones super strong?",options:["🍬 Candy","🥤 Soda","🥛 Milk","🍟 Chips"],answer:2},
      {q:"What should you drink most every day?",options:["🧃 Juice","🥤 Soda","🍵 Tea","💧 Water"],answer:3},
      {q:"Which meal gives your brain fuel to start the day?",options:["No meal needed","🍽️ Breakfast","Lunch","Dinner"],answer:1},
      {q:"What color foods are the best for your body?",options:["Only white","Only brown","Many colors! 🌈","Only yellow"],answer:2},
      {q:"What do eggs and beans help you build?",options:["Taller hair","💪 Strong muscles","Better eyesight","Bigger ears"],answer:1},
      {q:"Which snack is a tiny superfood for your brain?",options:["🍩 Donut","🍟 Fries","🫐 Blueberries","🍭 Lollipop"],answer:2},
      {q:"Why should you eat slowly?",options:["To look fancy","So your tummy can tell your brain you are full","To make food taste bad","To fall asleep faster"],answer:1},
      {q:"What does bread and pasta give your body?",options:["Stronger bones","Better hearing","Energy to play","Taller height"],answer:2},
      {q:"What happens when you eat too much sugar?",options:["You get superpowers","Your teeth can hurt and you feel tired","You grow taller","You run faster"],answer:1},
    ]
  },
  { id:"hygiene", emoji:"🧼", label:"Staying Clean", color:C.blue, bg:"#E7EFF9",
    desc:"Washing up keeps germs away!",
    source:"CDC Hygiene Guidelines · WHO Handwashing Guidelines · ADA",
    sourceUrl:"https://www.cdc.gov/hygiene",
    facts:[
      {emoji:"🙌",title:"Wash Your Hands!",text:"Washing your hands with soap keeps tiny germs from making you sick. Scrub scrub scrub!",fun:"Sing Happy Birthday TWICE while washing — that is just the right amount of time! 🎵🎂"},
      {emoji:"🪥",title:"Brush Your Teeth!",text:"Brush your teeth in the morning and at night to get rid of the tiny sugar bugs that cause cavities!",fun:"Sugar bugs try to eat your teeth — but your toothbrush scares them away! 🦷"},
      {emoji:"🛁",title:"Bath Time Is Important!",text:"Taking a bath or shower washes away all the dirt and germs you picked up during the day!",fun:"Your skin is your biggest organ — keep it clean and happy! 🛡️"},
      {emoji:"🤧",title:"Sneeze into Your Elbow!",text:"When you sneeze or cough, put your elbow in front of your face — like a superhero cape!",fun:"A sneeze zooms out of your nose faster than a car drives! 💨"},
      {emoji:"🚿",title:"Wash Your Hair!",text:"Washing your hair gets rid of dirt and oils that collect on your head when you play outside!",fun:"Your hair grows a little bit every single week! 💇"},
      {emoji:"🦶",title:"Don't Forget Your Feet!",text:"Feet can get super smelly! Wash them with soap in the bath so they stay fresh and happy.",fun:"Each foot has tons of tiny sweat glands — that is why socks get smelly! 😅"},
      {emoji:"✂️",title:"Keep Nails Short and Clean!",text:"Keeping your fingernails short means germs can't hide under them and get into your mouth!",fun:"Fingernails grow a tiny bit every month — just enough to need trimming! ✋"},
      {emoji:"👕",title:"Wear Clean Clothes!",text:"Clean clothes every day keep you smelling fresh and feeling good! Dirty clothes can spread germs.",fun:"Putting on fresh clothes is like a fresh start for the whole day! 🧺"},
      {emoji:"🧻",title:"Use a Tissue!",text:"When your nose is runny, use a tissue and throw it away. Don't use your hand or sleeve!",fun:"One sneeze can spread a LOT of tiny germ drops into the air! 💦"},
      {emoji:"🫧",title:"Soap is Super!",text:"Soap has a special power — it breaks apart germs and washes them right down the drain!",fun:"Soap was invented thousands and thousands of years ago by very clever people! 🧙"},
      {emoji:"🛏️",title:"Keep Your Space Tidy!",text:"Picking up your room means less dust and dirt, which means fewer things to make you sneeze!",fun:"A tidy room helps you sleep better and feel calmer! 🌙"},
      {emoji:"💤",title:"Sleep Helps Fight Germs!",text:"When you sleep, your body works super hard to fight germs and help you heal. Rest is medicine!",fun:"Kids who sleep enough get sick way less often! 😴"},
      {emoji:"🧼",title:"Germs Are Invisible!",text:"You can't see germs but they are everywhere! Washing your hands is your best superpower against them.",fun:"There are more germs on some phones than on a toilet seat — yikes! 📱"},
      {emoji:"☀️",title:"Fresh Air Is Great!",text:"Going outside for fresh air and opening windows helps keep the air in your home clean and healthy!",fun:"Sunlight actually helps kill some germs outside! ☀️"},
      {emoji:"🪥",title:"Brush for Two Minutes!",text:"Brushing for two whole minutes makes sure you clean all of your teeth — front, back, and sides!",fun:"You can play a song while you brush to make sure you go long enough! 🎶"},
    ],
    quiz:[
      {q:"How long should you wash your hands?",options:["Super fast 🏃","One second","Sing Happy Birthday TWICE","All day long"],answer:2},
      {q:"How many times a day do you brush your teeth?",options:["Never 🙈","One time","Two times ✌️","Ten times"],answer:2},
      {q:"Where should you sneeze?",options:["On your friend","Into the air","In your hands","Into your elbow 💪"],answer:3},
      {q:"What does soap do to germs?",options:["Makes them bigger","Makes them angry","Breaks them apart and washes them away","Turns them into pets"],answer:2},
      {q:"Why do we take baths?",options:["Just for fun","To wash away dirt and germs","To get our clothes wet","To cool down only"],answer:1},
      {q:"What should you use when your nose is runny?",options:["Your sleeve","Your hand","A tissue 🧻","Your shirt"],answer:2},
      {q:"Why should you wear clean clothes?",options:["To look fancy only","To keep germs away and smell fresh","Clothes don't matter","To make laundry"],answer:1},
      {q:"What helps your body fight germs while you sleep?",options:["Nothing happens","Your body works extra hard fighting germs","You shrink","Germs get bigger"],answer:1},
      {q:"Why should you keep your nails short?",options:["Long nails are safer","Short nails look prettier","Germs can't hide under short nails","Nails grow slower when short"],answer:2},
      {q:"What is your best superpower against invisible germs?",options:["Running fast","Hiding","🙌 Washing your hands","Eating candy"],answer:2},
    ]
  },
  { id:"feelings", emoji:"💛", label:"My Feelings", color:"#E8A200", bg:"#FEFAE0",
    desc:"All feelings are okay — let's talk about them!",
    source:"American Psychological Association · CDC Children's Mental Health · NIMH",
    sourceUrl:"https://www.cdc.gov/childrensmentalhealth",
    facts:[
      {emoji:"😊",title:"Happy!",text:"Happy is the warm, sunny feeling you get when something good happens — like getting a hug or playing with a friend!",fun:"Smiling actually makes your brain feel even MORE happy! Try it right now 😊"},
      {emoji:"😢",title:"Sad",text:"Everybody feels sad sometimes. When you feel sad, it helps to talk to a grown-up you love and trust.",fun:"Crying is actually healthy — tears help your body let out big feelings! 💧"},
      {emoji:"😡",title:"Angry",text:"Feeling angry is totally normal! When you feel mad, try taking 3 big deep breaths. It really works!",fun:"Big slow breaths send a calm-down message straight to your brain! 🧘"},
      {emoji:"😨",title:"Scared",text:"Everyone feels scared sometimes — even grown-ups! Talk to someone you trust and you won't feel alone.",fun:"Being brave means doing something even when you ARE scared — that's the real definition! 🦁"},
      {emoji:"😳",title:"Embarrassed",text:"Embarrassed is that hot, squirmy feeling when something awkward happens. Everyone feels it — it passes fast!",fun:"Even the bravest adults get embarrassed. It's totally normal! 😅"},
      {emoji:"😤",title:"Frustrated",text:"Frustrated means something feels really hard. It's okay! Take a break, breathe, and try again.",fun:"Most really cool inventions happened after LOTS of frustration — keep trying! 💡"},
      {emoji:"🤩",title:"Excited!",text:"Excited is that bubbly, fizzy, can't-sit-still feeling before something really fun is about to happen!",fun:"Your heart actually beats a little faster when you feel excited! ⚡"},
      {emoji:"😎",title:"Proud!",text:"Pride is the wonderful feeling you get after working hard and doing something great. You earned it!",fun:"Feeling proud tells your brain to keep trying new things! 🌟"},
      {emoji:"🥰",title:"Loved",text:"Love makes you feel safe, warm, and cozy inside. You can feel love for family, friends, and pets.",fun:"Scientists say hugging someone for 20 seconds releases happy feelings in your brain! 🤗"},
      {emoji:"😟",title:"Worried",text:"Worry means you're thinking about something that might go wrong. Talking about worries makes them smaller!",fun:"Writing your worry down on paper can help make it feel less scary! ✏️"},
      {emoji:"😌",title:"Calm",text:"Calm is that peaceful, quiet feeling when everything feels okay. It's a really nice feeling to practice!",fun:"Slow deep breaths can switch your brain into calm mode like magic! 🌊"},
      {emoji:"🌈",title:"Feelings Change!",text:"No feeling lasts forever. Even the hardest feelings — like clouds — always move away and change.",fun:"Every feeling you have passes and something new comes! ⏱️"},
      {emoji:"💪",title:"Talk About Feelings!",text:"Talking about your feelings is one of the bravest and smartest things you can ever do!",fun:"Sharing a feeling with a friend actually makes the feeling feel smaller! 🧠"},
      {emoji:"🎨",title:"Draw Your Feelings!",text:"If you can't find the words, draw a picture of how you feel! Art is a great way to share big emotions.",fun:"Doctors and teachers use drawing to help kids share their feelings all the time! 🖌️"},
      {emoji:"🫶",title:"You Are Loved!",text:"No matter what you are feeling today, there are people who love you very, very much.",fun:"Feeling loved makes your body and brain healthier — love is real medicine! ❤️"},
    ],
    quiz:[
      {q:"What should you do when you feel sad?",options:["Hide under your bed","Hurt someone","Talk to a grown-up you love","Scream forever"],answer:2},
      {q:"What helps calm your body when you feel angry?",options:["Break something","Take deep breaths 🧘","Eat lots of candy","Run away"],answer:1},
      {q:"Is it okay to feel scared?",options:["No, never","Only babies feel scared","Yes! Everyone does 🦁","Only at night"],answer:2},
      {q:"What is that bubbly can't-sit-still feeling called?",options:["Sad","Angry","Sleepy","😊 Excited"],answer:3},
      {q:"What is a great way to share feelings you can't find words for?",options:["Ignore them","Yell really loud","🎨 Draw a picture","Go to sleep"],answer:2},
      {q:"What does it mean to feel PROUD?",options:["You are hungry","You feel scared","You worked hard and did great 😎","You want to cry"],answer:2},
      {q:"What should you do when feelings feel TOO big?",options:["Keep them secret","Ask a grown-up for help 🫶","Pretend they're not there","Eat candy"],answer:1},
      {q:"How long do feelings last?",options:["Feelings never change","Feelings last exactly one week","Feelings always stay forever","Feelings change — like clouds 🌈"],answer:3},
      {q:"What does talking about your feelings do?",options:["Makes you weak","Makes feelings bigger","Is really brave and smart 💪","Is not allowed"],answer:2},
      {q:"What is that warm cozy feeling of being safe called?",options:["Angry","Worried","😨 Scared","🥰 Loved"],answer:3},
    ]
  },
  { id:"dental", emoji:"🦷", label:"Dental Hygiene", color:"#9B59B6", bg:"#F5EEF8",
    desc:"Keep your smile bright and healthy!",
    source:"American Dental Association (ADA) · CDC Oral Health · AAP",
    sourceUrl:"https://www.ada.org",
    facts:[
      {emoji:"🪥",title:"Brush Twice a Day!",text:"Brush your teeth every morning when you wake up and every night before bed. Two times a day!",fun:"Brushing for 2 minutes is as long as your favorite short song! 🎵"},
      {emoji:"🧵",title:"Floss is a Secret Weapon!",text:"Floss cleans between your teeth where your toothbrush can't reach. Germs love to hide in there!",fun:"Flossing is like giving your teeth a tiny hug in between! 🤗"},
      {emoji:"🍬",title:"Sugar Causes Cavities!",text:"Tiny germs in your mouth LOVE sugar. They eat it and then make holes in your teeth called cavities!",fun:"Sour candy is even sneakier than regular candy — it has extra acid! 😮"},
      {emoji:"🦷",title:"Visit the Dentist!",text:"Going to the dentist is like a check-up for your smile! They make sure your teeth are happy and healthy.",fun:"Dentists use a tiny mirror to peek at the back of your teeth! 🔍"},
      {emoji:"💧",title:"Water After Meals!",text:"Drinking water after you eat washes away sugar and bits of food so they can't hurt your teeth!",fun:"Water is the only drink that is 100% safe for your teeth! 💙"},
      {emoji:"🦴",title:"Teeth Are Super Hard!",text:"Your teeth are the hardest things in your whole body — even harder than your bones!",fun:"The outside of your tooth (enamel) is harder than almost anything your body makes! 💎"},
      {emoji:"😁",title:"Baby Teeth Matter!",text:"Your baby teeth hold the space open for your bigger grown-up teeth. They are very important!",fun:"Your grown-up teeth start coming in around age 6 and need to last forever! 🌱"},
      {emoji:"🥛",title:"Dairy Protects Teeth!",text:"Milk, cheese, and yogurt have calcium that makes your tooth enamel tough and hard to hurt!",fun:"Cheese actually helps protect your teeth from sugar acid — it's a tooth shield! 🧀"},
      {emoji:"🍎",title:"Crunchy Snacks Clean Teeth!",text:"Crunchy foods like apples and carrots actually scrub the surface of your teeth while you eat them!",fun:"Apples are called nature's toothbrush! 🪥"},
      {emoji:"🌙",title:"Night Brushing is Most Important!",text:"Brushing before bed is extra important because less spit is made at night and germs get cozy!",fun:"Your mouth makes less spit while you sleep so brushing before bed protects you all night! 😴"},
      {emoji:"⏰",title:"Brush for Two Minutes!",text:"Most people brush too fast! Count to 120 or play a song to make sure you brush long enough.",fun:"Most kids only brush for 45 seconds — dentists want 2 full minutes! ⏰"},
      {emoji:"🎯",title:"Brush Every Surface!",text:"Don't forget the front, back, and top of every tooth — and brush your tongue too for fresh breath!",fun:"Your tongue has germs on it too — give it a little brush! 👅"},
      {emoji:"🛡️",title:"Mouth Guards Protect Teeth!",text:"When you play sports, a mouth guard protects your teeth from bumps, falls, and accidents!",fun:"Sports cause millions of tooth injuries every year — protect yours! ⚽"},
      {emoji:"😊",title:"A Healthy Smile!",text:"When you take care of your teeth, your smile shines bright and you feel great and confident!",fun:"A smile is one of the first things people notice about you — make it sparkle! 🌟"},
      {emoji:"🚿",title:"Clean Your Toothbrush!",text:"Rinse your toothbrush with water after using it and let it dry in the open air!",fun:"A wet covered toothbrush can grow more bacteria — let it air dry! 🦠"},
    ],
    quiz:[
      {q:"How long should you brush your teeth?",options:["2 seconds","Brush super fast","2 whole minutes ⏰","Only on weekends"],answer:2},
      {q:"What are holes in your teeth called?",options:["Freckles","🦷 Cavities","Dimples","Bubbles"],answer:1},
      {q:"How many times a day should you brush?",options:["Never","Once a week","Two times — morning and night ✌️","Twenty times"],answer:2},
      {q:"What is 100% safe for your teeth to drink?",options:["🧃 Juice","🥤 Soda","🍵 Tea","💧 Water"],answer:3},
      {q:"What do germs love to eat that makes cavities?",options:["🥦 Broccoli","💧 Water","🍬 Sugar","🥕 Carrots"],answer:2},
      {q:"What food makes your tooth enamel tough and strong?",options:["🍭 Lollipops","🧁 Cupcakes","🥛 Milk and dairy","🍟 French fries"],answer:2},
      {q:"When is the most important time to brush?",options:["After lunch","Before breakfast","Right at noon","🌙 Before bed"],answer:3},
      {q:"What does a dentist do when you visit?",options:["Cut your hair","Check that your teeth are happy and healthy 🦷","Give you candy","Measure how tall you are"],answer:1},
      {q:"What snack acts like a natural toothbrush?",options:["🍫 Chocolate","🍭 Candy","🍎 Apple","🍕 Pizza"],answer:2},
      {q:"Why should you wear a mouth guard in sports?",options:["It looks cool","To run faster","To protect your teeth 🛡️","Dentists make you"],answer:2},
    ]
  },
  { id:"fitness", emoji:"🏃", label:"Physical Fitness", color:"#27AE60", bg:"#E9F7EF",
    desc:"Move your body and be strong!",
    source:"CDC Physical Activity Guidelines · American Heart Association · WHO",
    sourceUrl:"https://www.cdc.gov/physicalactivity",
    facts:[
      {emoji:"💪",title:"Exercise Makes You Strong!",text:"Running, jumping, dancing, and playing make your muscles bigger and your heart super strong!",fun:"Your muscles get stronger every time you use them — like charging a battery! ⚡"},
      {emoji:"🧠",title:"Exercise Helps Your Brain!",text:"Moving your body helps your brain work better! Kids who play and move a lot do great in school.",fun:"Exercise makes your brain release happy chemicals so you smile more! 😊"},
      {emoji:"⏰",title:"Move for 60 Minutes!",text:"Kids should be active for at least 60 minutes every day! Playing outside totally counts!",fun:"Playing tag, riding bikes, or dancing ALL count as exercise! 🚴"},
      {emoji:"🧘",title:"Stretch After Playing!",text:"After running and jumping, stretching keeps your muscles from feeling sore and stiff.",fun:"Your muscles actually grow and get stronger while you sleep! 😴"},
      {emoji:"❤️",title:"A Strong Heart!",text:"Running and jumping make your heart muscle stronger so it can do its pumping job more easily!",fun:"A strong heart is a happy heart — take care of it! 💓"},
      {emoji:"🦴",title:"Strong Bones!",text:"Running, jumping, and hopping help your bones grow really dense and strong as you grow!",fun:"Active kids grow up with stronger bones that protect them their whole life! 🦴"},
      {emoji:"😴",title:"Sleep Better!",text:"Kids who run and play during the day fall asleep faster and sleep more soundly at night!",fun:"Playing hard during the day is the best recipe for a great night's sleep! 🌙"},
      {emoji:"😊",title:"Happy Chemicals!",text:"When you exercise, your brain makes special chemicals that make you feel happy and calm!",fun:"Even a short 10-minute walk can make you feel better for hours! ⏰"},
      {emoji:"🤸",title:"Stretching Keeps You Bendy!",text:"Doing stretches and gymnastics keeps your muscles and joints nice and flexible so you don't get hurt!",fun:"Flexible bodies are less likely to get ouchies — stretch every day! 🧘"},
      {emoji:"🏊",title:"Swimming Is Amazing!",text:"Swimming works almost every muscle in your whole body at the same time — it's a super sport!",fun:"Swimmers use muscles from head to toe with every stroke! 🌊"},
      {emoji:"⚽",title:"Team Sports Are Fun!",text:"Playing on a team teaches you how to work together, cheer for friends, and be a great sport!",fun:"Kids who play team sports make friends more easily! 🏆"},
      {emoji:"🚴",title:"Bike Riding!",text:"Riding a bike builds strong legs, helps your balance, and is super fun exercise for your heart!",fun:"Riding a bike is great for your heart and the planet — no gas needed! 🚵"},
      {emoji:"💧",title:"Drink Water When You Play!",text:"When you run and play, your body sweats. Drink water to stay cool and keep going strong!",fun:"You can lose lots of water when you sweat — keep drinking! 💦"},
      {emoji:"🌿",title:"Play Outside!",text:"Playing outside in nature is extra good for you — fresh air, sunshine, and green things make you feel great!",fun:"Just 5 minutes of playing in nature can boost your mood! 🌳"},
      {emoji:"👫",title:"Exercise With Friends!",text:"Playing and exercising with friends is even more fun and you keep going longer because you're having a blast!",fun:"People exercise way longer when they do it with a friend — play together! 🤝"},
    ],
    quiz:[
      {q:"How long should kids be active every day?",options:["5 minutes","10 minutes","60 minutes ⏰","All day and night"],answer:2},
      {q:"What does exercise do for your brain?",options:["Turns it off","Makes it smaller","Helps it work better and feel happier 🧠","Makes it sleepy"],answer:2},
      {q:"What should you do after running and jumping?",options:["Eat lots of candy","🧘 Stretch your muscles","Watch TV for hours","Skip dinner"],answer:1},
      {q:"What does exercise do for your heart?",options:["Makes it weaker","Makes it smaller","Has no effect","Makes it stronger 💪"],answer:3},
      {q:"Why should you drink water when you play?",options:["To gain weight","To replace water you lose when you sweat 💧","To slow down","To make exercise harder"],answer:1},
      {q:"What does running and jumping help your BONES do?",options:["Get smaller","Stay the same","Get soft","Grow strong and dense 🦴"],answer:3},
      {q:"Which sport works almost every muscle all at once?",options:["♟️ Chess","🏊 Swimming","📚 Reading","😴 Napping"],answer:1},
      {q:"What happens when you exercise a lot during the day?",options:["You can't sleep","You sleep better at night 😴","You grow shorter","You feel angry"],answer:1},
      {q:"What do the happy chemicals from exercise do?",options:["Make you tired","Make you hungry","Make you happy and calm 😊","Make you angry"],answer:2},
      {q:"What is BETTER — exercise a tiny bit every day OR a LOT once a week?",options:["A lot once a week","A tiny bit every day 🌟","Both are exactly the same","Neither works"],answer:1},
    ]
  },

  // ── NEW: SLEEP ──────────────────────────────────────────────────────────────
  { id:"sleep", emoji:"😴", label:"Sleep & Rest", color:"#5B4FCF", bg:"#EEEAFF",
    desc:"Sleep helps your body and brain grow!",
    source:"American Academy of Pediatrics (AAP) · CDC Sleep Guidelines · National Sleep Foundation",
    sourceUrl:"https://www.aap.org",
    facts:[
      {emoji:"🌙",title:"Sleep is Super Important!",text:"When you sleep, your body grows, your brain sorts memories, and your whole self gets recharged for the next day!",fun:"Growing happens mostly at night while you sleep — sleep is like a magic growth potion! 🧪"},
      {emoji:"⏰",title:"How Long Should You Sleep?",text:"Kids ages 6 to 9 need 9 to 12 hours of sleep every night to feel their very best!",fun:"That means almost half your whole day should be spent sleeping! Wow! 😲"},
      {emoji:"🧠",title:"Sleep Helps You Learn!",text:"While you sleep, your brain saves everything you learned that day — like a computer saving a file!",fun:"Kids who sleep well remember things from school WAY better the next day! 📚"},
      {emoji:"😊",title:"Sleep Makes You Happy!",text:"When you get enough sleep you feel happier, calmer, and ready to have fun with your friends!",fun:"Tired brains have a much harder time feeling cheerful — sleep is a happiness boost! 🌟"},
      {emoji:"🦠",title:"Sleep Fights Germs!",text:"While you rest, your body builds special germ-fighters called antibodies. Sleep is your shield!",fun:"Kids who sleep well get sick less often than kids who don't sleep enough! 🛡️"},
      {emoji:"🌟",title:"Your Body Grows at Night!",text:"Growth hormones — the tiny chemical messengers that make you taller — are released mostly during deep sleep!",fun:"You literally grow while you dream — sleep is the secret ingredient! 💫"},
      {emoji:"📺",title:"Screens Before Bed!",text:"Screens like tablets and TVs trick your brain into thinking it is daytime! Turn them off 1 hour before bed.",fun:"The light from screens tells your brain to WAKE UP — not helpful at bedtime! 💡"},
      {emoji:"🌡️",title:"Cool Rooms Help You Sleep!",text:"Your body sleeps best when the room is a little cool — like a cozy cave! Not too hot, not too cold.",fun:"Your body temperature drops a little when you fall asleep — a cool room helps that happen! ❄️"},
      {emoji:"📖",title:"A Bedtime Routine Helps!",text:"Doing the same calm things every night — like reading or taking a bath — tells your brain it's sleep time!",fun:"Routines are like a bedtime lullaby for your brain! 🎵"},
      {emoji:"😴",title:"What Are Dreams?",text:"Dreams happen when your brain is busy sorting through everything that happened during your day!",fun:"Even your brain needs to 'clean up' — dreams are like brain housekeeping! 🧹"},
      {emoji:"🥱",title:"Yawning Is Normal!",text:"Yawning is your body's way of saying — hey, I need more oxygen and it's getting sleepy in here!",fun:"Yawning is actually contagious — seeing someone yawn makes you want to yawn too! 🫁"},
      {emoji:"🛏️",title:"Your Bed Is for Sleeping!",text:"Using your bed only for sleep helps your brain learn — bed means sleep time! It's a super helpful habit.",fun:"Your brain is always learning patterns — even bedtime patterns! 🧠"},
      {emoji:"🌿",title:"Quiet Helps You Sleep!",text:"Loud noises can wake up your sleeping brain. A quiet, dark room is the perfect sleep cave!",fun:"Some kids sleep better with a tiny bit of gentle sound — like rain or soft music! 🌧️"},
      {emoji:"💤",title:"Naps Are Great Too!",text:"Short naps during the day can help younger kids feel refreshed and ready to play and learn again!",fun:"Even some grown-ups take naps — scientists say naps boost creativity! 🎨"},
      {emoji:"🌄",title:"Wake Up at the Same Time!",text:"Going to bed AND waking up at the same time every day keeps your body clock happy and healthy!",fun:"Your body has its very own clock inside — it loves a routine! ⏰"},
    ],
    quiz:[
      {q:"How many hours of sleep do kids ages 6–9 need?",options:["3–4 hours","5–6 hours","9–12 hours 😴","20 hours"],answer:2},
      {q:"What does your brain do with memories while you sleep?",options:["Deletes them all","Saves and sorts them 🧠","Does nothing","Makes them bigger"],answer:1},
      {q:"What should you turn off 1 hour before bed?",options:["Your imagination","📺 Screens and tablets","Your nightlight","The sun"],answer:1},
      {q:"What kind of room helps you sleep best?",options:["Hot and loud","Very bright","A little cool and quiet 🌙","Outside in the cold"],answer:2},
      {q:"Why is sleep important for growing?",options:["You grow from eating only","Growth happens only during school","Growth hormones come out during sleep 🌟","Growing only happens in summer"],answer:2},
      {q:"What do dreams do?",options:["They are scary always","They help your brain sort through your day 💤","They give you superpowers","They mean you're sick"],answer:1},
      {q:"What is a bedtime ROUTINE?",options:["Eating candy before bed","Doing the same calm things every night to help your brain know it's sleep time","Staying up as late as you can","Watching TV until you fall asleep"],answer:1},
      {q:"What does sleep do to help you fight germs?",options:["Nothing","Sleep makes you weaker","Your body builds germ-fighters while you sleep 🛡️","Germs go to sleep too"],answer:2},
      {q:"Why do tired kids feel grumpy?",options:["They ate too much","Tired brains have a harder time feeling happy 😊","They are pretending","Grumpiness has nothing to do with sleep"],answer:1},
      {q:"What is the BEST time to go to bed?",options:["Any random time","As late as possible","At the same time every night ⏰","Only when you feel very tired"],answer:2},
    ]
  },  ,
  { id:"habits", emoji:"✨", label:"Healthy Habits", color:"#E91E8C", bg:"#FDE8F4",
    desc:"Small habits make a big difference!",
    source:"CDC Healthy Living · American Academy of Pediatrics · WHO Child Health",
    sourceUrl:"https://www.cdc.gov/healthyliving",
    facts:[
      {emoji:"☀️",title:"Start the Day Right!",text:"Waking up at the same time every day helps your body know when to feel awake and when to sleep!",fun:"Your body has its own alarm clock built right inside it! ⏰"},
      {emoji:"🚰",title:"Drink Water First Thing!",text:"After sleeping all night, your body is thirsty! Drinking water first thing in the morning wakes you right up!",fun:"You lose water just by breathing at night — water is the best wake-up drink! 💧"},
      {emoji:"📚",title:"Read Every Day!",text:"Reading even for just 15 minutes a day makes your brain stronger and your imagination bigger!",fun:"Kids who read every day know thousands more words than kids who don't! 🌟"},
      {emoji:"🧹",title:"Tidy Up Your Space!",text:"Keeping your room and desk tidy helps your brain feel calm and makes it easier to focus and learn!",fun:"A messy space can make your brain feel stressed — tidying up is a superpower! 🧠"},
      {emoji:"🙏",title:"Say Thank You!",text:"Saying thank you and being grateful actually makes YOU feel happier and healthier every day!",fun:"Grateful kids have been shown to sleep better and feel more cheerful! 😊"},
      {emoji:"📵",title:"Take Breaks from Screens!",text:"Giving your eyes a rest from screens every hour keeps them healthy and helps your brain recharge!",fun:"Every 20 minutes, look at something 20 feet away for 20 seconds — the 20-20-20 rule! 👁️"},
      {emoji:"🌿",title:"Spend Time Outside!",text:"Fresh air and nature help your brain calm down, boost your mood, and keep you feeling your best!",fun:"Just 5 minutes of playing in nature can make you feel happier! 🌳"},
      {emoji:"🤝",title:"Be Kind Every Day!",text:"Doing something kind for someone else — like sharing or helping — actually makes YOU feel great too!",fun:"Scientists found that being kind releases happy chemicals in your own brain! 💛"},
      {emoji:"🎨",title:"Be Creative!",text:"Drawing, building, singing, or dancing every day keeps your brain sharp and your feelings healthy!",fun:"Creative kids are better at solving problems — art makes you smarter! 🌈"},
      {emoji:"💬",title:"Talk to Someone You Trust!",text:"Sharing your day — the good parts AND the hard parts — with a grown-up you love keeps you feeling connected!",fun:"Talking about your day actually helps your brain process and remember things better! 🧠"},
      {emoji:"🦷",title:"Brush Before Bed!",text:"Brushing your teeth every single night before bed is one of the most important habits you can have!",fun:"Nighttime brushing is more important than morning brushing because germs love to work while you sleep! 🌙"},
      {emoji:"😴",title:"Wind Down Before Bed!",text:"Doing calm things before bed — like reading or drawing — tells your brain it is almost sleep time!",fun:"Kids who have a calming bedtime routine fall asleep faster and sleep better! zzz 😴"},
      {emoji:"🥗",title:"Eat at the Table!",text:"Sitting down to eat — without screens — helps your tummy know how much food it needs and makes meals more fun!",fun:"Families who eat together tend to be healthier and happier! 🍽️"},
      {emoji:"🏃",title:"Move a Little Every Hour!",text:"Getting up and moving around every hour keeps your blood flowing and your brain feeling fresh!",fun:"Sitting too long can make it harder to concentrate — moving fixes it fast! ⚡"},
      {emoji:"🌙",title:"Same Bedtime Every Night!",text:"Going to bed at the same time every night helps your body clock stay healthy and makes mornings easier!",fun:"Kids who have a regular bedtime are less tired and happier during the day! ⭐"},
    ],
    quiz:[
      {q:"What is a great thing to drink first thing in the morning?",options:["🧃 Juice","🥤 Soda","💧 Water","☕ Coffee"],answer:2},
      {q:"How often should you take a break from screens?",options:["Never","Only on weekends","Every hour 👁️","Once a day"],answer:2},
      {q:"What does being kind to others do to YOUR brain?",options:["Nothing","Makes you tired","Releases happy chemicals 💛","Makes you hungry"],answer:2},
      {q:"How many minutes of reading a day makes your brain stronger?",options:["0 minutes","Just 15 minutes! 📚","5 hours","Only at school"],answer:1},
      {q:"What does going to bed at the same time every night help?",options:["Makes mornings harder","Your body clock stays healthy ⭐","Makes you dream more","Has no effect"],answer:1},
      {q:"What does spending time in nature do?",options:["Makes you cold","Boosts your mood and calms your brain 🌿","Makes you tired","Only helps animals"],answer:1},
      {q:"Why should you tidy up your space?",options:["Just to make adults happy","It has no effect","Helps your brain feel calm and focused 🧠","Makes it harder to find things"],answer:2},
      {q:"What does saying thank you do?",options:["Nothing special","Makes you feel happier and healthier 🙏","Only helps other people","Makes you seem weak"],answer:1},
      {q:"When should you brush your teeth?",options:["Only in the morning","Only when they feel dirty","Every morning AND night 🦷","Once a week"],answer:2},
      {q:"What does moving around every hour do for your brain?",options:["Makes it tired","Has no effect","Helps you concentrate better ⚡","Makes you dizzy"],answer:2},
    ]
  }
];

// ── STAR RATING ───────────────────────────────────────────────────────────────
function Stars({ count }) {
  return (
    <div style={{ display:"flex", gap:6, justifyContent:"center" }}>
      {[...Array(3)].map((_,i) => (
        <span key={i} style={{ fontSize:34, filter:i<count?"none":"grayscale(1) opacity(0.3)", transition:"all 0.3s", animationDelay:`${i*0.1}s` }}>⭐</span>
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

  useEffect(() => {
    setBounce(true);
    const t = setTimeout(() => setBounce(false), 600);
    return () => clearTimeout(t);
  }, [screen]);

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

  const finalScore = () => {
    const lastCorrect = selected === activeQuiz[quizIdx]?.answer ? 1 : 0;
    return screen === "result" ? score : score + lastCorrect;
  };

  // ── SHARED FONT STYLE ──
  const font = { fontFamily: "'Fredoka One', cursive, sans-serif" };

  return (
    <div className="bs-app" style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg, #FFF8E7 0%, #FFF0D6 100%)`,
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      padding:"0 0 40px 0",
      ...font,
    }}>

      {/* ── HEADER / BANNER (restored original style) ── */}
      <div style={{ width:"100%", maxWidth:640, marginBottom:20 }}>
        <div style={{ background:"#FFFFFF", padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
          <img src="data:image/jpeg;base64,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" alt="The LAB Project" style={{ height:90, objectFit:"contain", maxWidth:"85%" }} />
          {screen !== "home" && (
            <button onClick={goHome} className="btn" style={{ position:"absolute", right:16, background:C.red, border:"2px solid rgba(255,255,255,0.7)", borderRadius:20, padding:"8px 14px", color:C.white, fontSize:14, fontWeight:700, cursor:"pointer", ...font }}>
              🏠 Home
            </button>
          )}
        </div>
        <div style={{ background:C.blue, padding:"10px 20px", borderRadius:"0 0 20px 20px", textAlign:"center" }}>
          <div style={{ color:C.white, fontWeight:900, fontSize:22, letterSpacing:1, ...font }}>
            🌟 BodySmart Kids 🌟
          </div>
          <div style={{ color:C.yellow, fontSize:15, fontWeight:700, ...font }}>Explore · Learn · Stay Healthy!</div>
        </div>
      </div>

      <div style={{ width:"100%", maxWidth:640, padding:"0 16px" }}>

        {/* ── HOME SCREEN ── */}
        {screen==="home" && !showAbout && (
          <div className="pop">
            <div style={{ textAlign:"center", marginBottom:24 }}>
              <div className="float" style={{ fontSize:72, lineHeight:1, marginBottom:10 }}>🌈</div>
              <div style={{ fontSize:30, fontWeight:900, color:C.blue, marginBottom:6, ...font }}>Pick a Topic to Explore!</div>
              <div style={{ fontSize:20, color:"#666", ...font }}>Tap a picture to start learning 👇</div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {TOPICS.map((t, i) => (
                <div key={t.id} className="btn pop topic-card" onClick={() => pickTopic(t)}
                  style={{ background:t.bg, borderRadius:24, padding:"24px 16px", textAlign:"center", border:`4px solid ${t.color}`, boxShadow:`0 8px 20px ${t.color}44`, animationDelay:`${i*0.07}s`, position:"relative", cursor:"pointer" }}>
                  {stars[t.id] && (
                    <div style={{ position:"absolute", top:10, right:10, fontSize:16 }}>
                      {"⭐".repeat(stars[t.id])}
                    </div>
                  )}
                  <div style={{ fontSize:58, marginBottom:10, lineHeight:1 }}>{t.emoji}</div>
                  <div style={{ fontSize:20, fontWeight:900, color:t.color, marginBottom:6, ...font }}>{t.label}</div>
                  <div style={{ fontSize:16, color:"#555", lineHeight:1.5, ...font }}>{t.desc}</div>
                </div>
              ))}
            </div>

            {Object.keys(stars).length > 0 && (
              <div style={{ marginTop:24, background:C.yellow, borderRadius:20, padding:"18px 24px", textAlign:"center", border:`3px solid ${C.orange}` }}>
                <div style={{ fontSize:18, fontWeight:900, color:C.blue, ...font }}>⭐ Your Stars ⭐</div>
                <div style={{ display:"flex", justifyContent:"center", gap:18, marginTop:10, flexWrap:"wrap" }}>
                  {TOPICS.filter(t=>stars[t.id]).map(t=>(
                    <div key={t.id} style={{ textAlign:"center" }}>
                      <div style={{ fontSize:24 }}>{t.emoji}</div>
                      <div style={{ fontSize:15, fontWeight:700, color:t.color, ...font }}>{"⭐".repeat(stars[t.id])}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => setShowAbout(true)} className="btn"
              style={{ width:"100%", marginTop:20, padding:"15px", borderRadius:16, border:`2.5px solid ${C.blue}`, background:"transparent", color:C.blue, fontSize:16, fontWeight:700, cursor:"pointer", ...font }}>
              📚 About This App &amp; Our Sources
            </button>
          </div>
        )}

        {/* ── ABOUT SCREEN ── */}
        {showAbout && (
          <div className="pop">
            <div style={{ background:"#fff", borderRadius:24, padding:30, boxShadow:"0 8px 32px rgba(0,0,0,0.1)", border:`3px solid ${C.blue}`, marginBottom:16 }}>
              <div style={{ textAlign:"center", marginBottom:22 }}>
                <div style={{ fontSize:44, marginBottom:10 }}>📚</div>
                <h2 style={{ margin:0, fontSize:22, color:C.blue, fontWeight:900, ...font }}>About BodySmart Kids</h2>
                <p style={{ margin:"10px 0 0", fontSize:15, color:"#555", lineHeight:1.7, ...font }}>
                  All health facts in this app are based on evidence from trusted, peer-reviewed medical and public health organizations. Content is reviewed and aligned with national pediatric health guidelines.
                </p>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {TOPICS.map(t => (
                  <div key={t.id} style={{ background:t.bg, borderRadius:16, padding:"16px 18px", border:`2px solid ${t.color}33` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                      <span style={{ fontSize:24 }}>{t.emoji}</span>
                      <span style={{ fontSize:16, fontWeight:900, color:t.color, ...font }}>{t.label}</span>
                    </div>
                    <div style={{ fontSize:13, color:"#444", lineHeight:1.7, ...font }}>
                      <strong>📖 Sources:</strong> {t.source}
                    </div>
                    {t.sourceUrl && (
                      <div style={{ fontSize:12, color:"#888", marginTop:4, ...font }}>
                        🌐 Learn more: <span style={{ color:C.blue }}>{t.sourceUrl}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ marginTop:22, padding:"16px 18px", background:"#f0f7ff", borderRadius:14, border:"1px solid #cce0ff" }}>
                <div style={{ fontSize:13, color:"#333", lineHeight:1.8, ...font }}>
                  <strong>🏥 Key Organizations Referenced:</strong><br/>
                  • <strong>CDC</strong> — Centers for Disease Control and Prevention<br/>
                  • <strong>NIH</strong> — National Institutes of Health<br/>
                  • <strong>WHO</strong> — World Health Organization<br/>
                  • <strong>ADA</strong> — American Dental Association<br/>
                  • <strong>APA</strong> — American Psychological Association<br/>
                  • <strong>AHA</strong> — American Heart Association<br/>
                  • <strong>USDA</strong> — MyPlate Nutrition Guidelines<br/>
                  • <strong>AAP</strong> — American Academy of Pediatrics<br/>
                  • <strong>NSF</strong> — National Sleep Foundation<br/>
                  • <strong>KidsHealth.org</strong> — Nemours Children's Health
                </div>
              </div>

              <div style={{ marginTop:16, padding:"14px 18px", background:"#fff8e7", borderRadius:14, border:`1px solid ${C.orange}44`, fontSize:13, color:"#555", lineHeight:1.7, ...font }}>
                ⚠️ <strong>Disclaimer:</strong> This app is an educational tool designed for children. It is not intended to replace advice from a licensed healthcare professional. Always consult your doctor or pediatrician for personal health guidance.
              </div>
            </div>

            <button onClick={() => setShowAbout(false)} className="btn"
              style={{ width:"100%", padding:"16px", borderRadius:16, border:"none", background:C.blue, color:"#fff", fontSize:18, fontWeight:900, cursor:"pointer", boxShadow:`0 4px 14px ${C.blue}55`, ...font }}>
              🏠 Back to Topics
            </button>
          </div>
        )}

        {/* ── TOPIC SCREEN ── */}
        {screen==="topic" && topic && (
          <div className="pop">
            <div style={{ background:`linear-gradient(135deg, ${topic.color}, ${topic.color}cc)`, borderRadius:24, padding:28, textAlign:"center", marginBottom:20, boxShadow:`0 8px 28px ${topic.color}55` }}>
              <div className="wiggle" style={{ fontSize:80, lineHeight:1, marginBottom:12 }}>{topic.emoji}</div>
              <div style={{ fontSize:32, fontWeight:900, color:C.white, marginBottom:8, ...font }}>{topic.label}</div>
              <div style={{ fontSize:20, color:"rgba(255,255,255,0.95)", ...font }}>{topic.desc}</div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <button onClick={startLearn} className="btn" style={{ background:C.blue, border:"none", borderRadius:18, padding:"20px 24px", color:C.white, fontSize:23, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 18px ${C.blue}55`, display:"flex", alignItems:"center", justifyContent:"center", gap:12, ...font }}>
                📖 Learn Fun Facts!
              </button>
              <button onClick={startQuiz} className="btn" style={{ background:C.orange, border:"none", borderRadius:18, padding:"20px 24px", color:C.white, fontSize:23, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 18px ${C.orange}55`, display:"flex", alignItems:"center", justifyContent:"center", gap:12, ...font }}>
                🎯 Take the Quiz!
              </button>
            </div>

            {stars[topic.id] && (
              <div style={{ marginTop:20, textAlign:"center" }}>
                <div style={{ fontSize:16, color:"#666", marginBottom:6, ...font }}>Your best score:</div>
                <Stars count={stars[topic.id]} />
              </div>
            )}
          </div>
        )}

        {/* ── LEARN SCREEN ── */}
        {screen==="learn" && topic && (
          <div className="pop">
            {/* Progress dots */}
            <div style={{ display:"flex", justifyContent:"center", gap:10, marginBottom:18 }}>
              {activeFacts.map((_,i) => (
                <div key={i} style={{ width:14, height:14, borderRadius:"50%", background:i<=factIdx?topic.color:"#ddd", transition:"all 0.3s", transform:i===factIdx?"scale(1.4)":"scale(1)" }}/>
              ))}
            </div>

            {/* Fact card */}
            <div key={factIdx} className="pop" style={{ background:topic.bg, borderRadius:26, padding:32, border:`4px solid ${topic.color}`, boxShadow:`0 10px 28px ${topic.color}33`, marginBottom:18 }}>
              <div style={{ fontSize:68, textAlign:"center", marginBottom:14, lineHeight:1 }}>{activeFacts[factIdx].emoji}</div>
              <div style={{ fontSize:28, fontWeight:900, color:topic.color, textAlign:"center", marginBottom:14, ...font }}>{activeFacts[factIdx].title}</div>
              <div style={{ fontSize:21, color:"#333", lineHeight:1.9, textAlign:"center", marginBottom:18, ...font }}>{activeFacts[factIdx].text}</div>
              <div style={{ background:C.yellow, borderRadius:16, padding:"14px 18px", border:`2px solid ${C.orange}` }}>
                <div style={{ fontSize:17, fontWeight:900, color:C.orange, marginBottom:6, ...font }}>🤩 Fun Fact!</div>
                <div style={{ fontSize:19, color:"#333", lineHeight:1.8, ...font }}>{activeFacts[factIdx].fun}</div>
              </div>
              {topic.source && (
                <div style={{ marginTop:12, padding:"10px 14px", background:"#f7f7f7", borderRadius:12, border:"1px solid #e0e0e0" }}>
                  <div style={{ fontSize:11, color:"#888", lineHeight:1.6, ...font }}>
                    📚 <strong>Evidence-based source:</strong> {topic.source}
                  </div>
                </div>
              )}
            </div>

            <button onClick={nextFact} className="btn" style={{ width:"100%", background:topic.color, border:"none", borderRadius:18, padding:"20px", color:C.white, fontSize:23, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 18px ${topic.color}55`, ...font }}>
              {factIdx < activeFacts.length - 1 ? "Next Fact! →" : "I'm Ready! ✅"}
            </button>
          </div>
        )}

        {/* ── QUIZ SCREEN ── */}
        {screen==="quiz" && topic && (
          <div className="pop">
            {/* Score & progress */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
              <div style={{ background:C.yellow, borderRadius:24, padding:"8px 18px", fontWeight:900, color:C.blue, fontSize:20, border:`2px solid ${C.orange}`, ...font }}>
                ⭐ {score}/{activeQuiz.length}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {activeQuiz.map((_,i)=>(
                  <div key={i} style={{ width:16, height:16, borderRadius:"50%", background:i<quizIdx?topic.color:i===quizIdx?"#fff":C.white, border:`3px solid ${topic.color}`, transition:"all 0.3s" }}/>
                ))}
              </div>
            </div>

            {/* Question */}
            <div key={quizIdx} className="pop" style={{ background:topic.bg, borderRadius:26, padding:"28px 24px", border:`4px solid ${topic.color}`, boxShadow:`0 10px 28px ${topic.color}33`, marginBottom:18 }}>
              <div style={{ fontSize:18, fontWeight:700, color:topic.color, marginBottom:14, textAlign:"center", ...font }}>
                Question {quizIdx+1} of {activeQuiz.length}
              </div>
              <div style={{ fontSize:26, fontWeight:900, color:"#222", textAlign:"center", lineHeight:1.5, marginBottom:22, ...font }}>
                {activeQuiz[quizIdx].q}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {activeQuiz[quizIdx].options.map((opt,i) => {
                  const isCorrect = i === activeQuiz[quizIdx].answer;
                  const isSelected = i === selected;
                  let bg = C.white, border = `3px solid #ddd`, color = "#333";
                  if (showAns && isCorrect) { bg="#d4edda"; border=`3px solid #28a745`; color="#155724"; }
                  else if (showAns && isSelected && !isCorrect) { bg="#f8d7da"; border=`3px solid #dc3545`; color="#721c24"; }
                  return (
                    <div key={i} className={showAns?"":"opt"} onClick={()=>pickAnswer(i)}
                      style={{ background:bg, border, borderRadius:16, padding:"16px 20px", fontSize:21, fontWeight:700, color, display:"flex", alignItems:"center", gap:12, transition:"all 0.2s", cursor:showAns?"default":"pointer", boxShadow:isSelected&&showAns?"0 4px 14px rgba(0,0,0,0.15)":"none", ...font }}>
                      <span style={{ width:34, height:34, borderRadius:"50%", background:showAns&&isCorrect?"#28a745":showAns&&isSelected?"#dc3545":topic.color, color:C.white, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15, flexShrink:0 }}>
                        {showAns && isCorrect ? "✓" : showAns && isSelected ? "✗" : String.fromCharCode(65+i)}
                      </span>
                      {opt}
                    </div>
                  );
                })}
              </div>

              {showAns && (
                <div className="pop" style={{ marginTop:18, padding:"14px 18px", borderRadius:16, background:selected===activeQuiz[quizIdx].answer?"#d4edda":"#fff3cd", border:`2px solid ${selected===activeQuiz[quizIdx].answer?"#28a745":"#ffc107"}`, textAlign:"center", fontSize:21, fontWeight:700, color:"#333", ...font }}>
                  {selected===activeQuiz[quizIdx].answer ? "🎉 Amazing! You got it right!" : `💡 The answer is: ${activeQuiz[quizIdx].options[activeQuiz[quizIdx].answer]}`}
                </div>
              )}
            </div>

            {showAns && (
              <button onClick={nextQuiz} className="btn" style={{ width:"100%", background:topic.color, border:"none", borderRadius:18, padding:"20px", color:C.white, fontSize:23, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 18px ${topic.color}55`, ...font }}>
                {quizIdx < activeQuiz.length-1 ? "Next Question! →" : "See My Stars! ⭐"}
              </button>
            )}
          </div>
        )}

        {/* ── RESULT SCREEN ── */}
        {screen==="result" && topic && (
          <div className="pop" style={{ textAlign:"center" }}>
            <div style={{ background:`linear-gradient(135deg, ${C.yellow}, ${C.orange})`, borderRadius:26, padding:36, border:`4px solid ${C.orange}`, boxShadow:`0 10px 36px ${C.orange}55`, marginBottom:18 }}>
              <div className="bounce" style={{ fontSize:90, lineHeight:1, marginBottom:14 }}>
                {finalScore()===activeQuiz.length?"🏆":finalScore()>=2?"🌟":"😊"}
              </div>
              <div style={{ fontSize:34, fontWeight:900, color:C.blue, marginBottom:10, ...font }}>
                {finalScore()===activeQuiz.length?"PERFECT!":finalScore()>=2?"Great Job!":"Good Try!"}
              </div>
              <div style={{ fontSize:23, color:"#333", marginBottom:18, fontWeight:700, ...font }}>
                You got {finalScore()} out of {activeQuiz.length} right!
              </div>
              <Stars count={stars[topic.id]||1} />
              <div style={{ marginTop:18, fontSize:20, color:"#444", lineHeight:1.7, ...font }}>
                {finalScore()===activeQuiz.length
                  ? "You are a Health Explorer Champion! 🦸"
                  : finalScore()>=2
                  ? "You know so much about your health! Keep learning!"
                  : "Keep practicing — you're getting smarter every day! 💪"}
              </div>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <button onClick={startQuiz} className="btn" style={{ background:C.blue, border:"none", borderRadius:18, padding:"18px", color:C.white, fontSize:22, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 18px ${C.blue}55`, ...font }}>
                🔄 Try the Quiz Again!
              </button>
              <button onClick={startLearn} className="btn" style={{ background:topic.color, border:"none", borderRadius:18, padding:"18px", color:C.white, fontSize:22, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 18px ${topic.color}55`, ...font }}>
                📖 Read the Facts Again
              </button>
              <button onClick={goHome} className="btn" style={{ background:C.orange, border:"none", borderRadius:18, padding:"18px", color:C.white, fontSize:22, fontWeight:900, cursor:"pointer", boxShadow:`0 6px 18px ${C.orange}55`, ...font }}>
                🏠 Pick Another Topic!
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop:28, textAlign:"center", fontSize:13, color:"#999", lineHeight:2, ...font }}>
          <div>Made with ❤️ by <strong style={{ color:C.red }}>The LAB Project</strong></div>
          <div>BodySmart Kids · Powered by <a href="http://www.thelabprojectofficial.org" target="_blank" rel="noopener noreferrer" style={{ color:C.red, fontWeight:700, textDecoration:"none" }}>The LAB Project</a> 🌈</div>
        </div>

      </div>
    </div>
  );
}
