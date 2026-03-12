export interface Mood {
  id: string;
  emoji: string;
  label: string;
  color: string;
  response: string;
}

export const MOODS: Mood[] = [
  {
    id: "great",
    emoji: "\u{1F60A}",
    label: "Great",
    color: "bg-green-100 border-green-300 text-green-700 hover:bg-green-200",
    response:
      "That\u2019s wonderful to hear! It\u2019s important to acknowledge the good days. What\u2019s contributing to how you\u2019re feeling today? Recognizing positive moments helps build resilience in this challenging work.",
  },
  {
    id: "good",
    emoji: "\u{1F642}",
    label: "Good",
    color: "bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200",
    response:
      "Good to hear you\u2019re doing well. Working in domestic violence practice can be emotionally demanding, so it\u2019s great that you\u2019re in a positive space. Is there anything specific about your work today you\u2019d like to reflect on?",
  },
  {
    id: "okay",
    emoji: "\u{1F610}",
    label: "Okay",
    color: "bg-yellow-100 border-yellow-300 text-yellow-700 hover:bg-yellow-200",
    response:
      "Thank you for being honest. \u2018Okay\u2019 is a valid feeling \u2014 not every day needs to be great, especially in this line of work. Would you like to talk about what\u2019s weighing on you, or would you prefer some reflective exercises?",
  },
  {
    id: "struggling",
    emoji: "\u{1F614}",
    label: "Struggling",
    color: "bg-orange-100 border-orange-300 text-orange-700 hover:bg-orange-200",
    response:
      "I hear you, and I want you to know that struggling doesn\u2019t mean failing. DV casework is some of the most emotionally demanding work there is. You\u2019re carrying heavy stories every day. Let\u2019s take a moment together \u2014 would you like to talk about what\u2019s hard right now, or would you prefer a guided breathing exercise?",
  },
  {
    id: "crisis",
    emoji: "\u{1F198}",
    label: "In Crisis",
    color: "bg-red-100 border-red-300 text-red-700 hover:bg-red-200",
    response: "",
  },
];

export const WELLBEING_RESPONSES: { keywords: string[]; response: string }[] = [
  {
    keywords: ["tired", "exhausted", "burnout", "burnt out", "overwhelmed"],
    response:
      "Burnout is a real risk in DV practice, and recognizing it is the first step. Your body and mind are telling you something important. Some things that can help: setting clear boundaries between work and personal time, debriefing with a supervisor or peer, and remembering that you don\u2019t have to carry every case alone. What feels most manageable to try right now?",
  },
  {
    keywords: ["case", "family", "children", "child", "survivor"],
    response:
      "It\u2019s natural for cases to stay with you \u2014 it shows you care deeply about the families you serve. But carrying that weight without support isn\u2019t sustainable. Have you been able to debrief this case with your supervisor? Sometimes talking through the emotions separately from the practice decisions can help create healthy distance.",
  },
  {
    keywords: ["angry", "frustrated", "unfair", "system", "failed"],
    response:
      "Frustration with the system is one of the most common experiences in DV work. When you feel the system has failed a family, that anger comes from a place of care. Channel that energy where you can make a difference \u2014 in your direct practice, in advocating for change, and in supporting the families in front of you. What specific situation is driving this frustration?",
  },
  {
    keywords: ["sad", "crying", "emotional", "upset", "heartbroken"],
    response:
      "Your emotional response shows your humanity and your connection to this work. It\u2019s okay to feel sad \u2014 suppressing emotions leads to compassion fatigue over time. Consider: have you given yourself permission to feel this? Sometimes we need to process the grief of witnessing trauma before we can move forward. I\u2019m here if you want to talk through it.",
  },
  {
    keywords: ["scared", "afraid", "threat", "unsafe", "danger"],
    response:
      "Your safety matters. If you\u2019re feeling unsafe because of a case or a client interaction, please speak with your supervisor immediately. Your organization has protocols to protect workers. No case is worth risking your personal safety. Would you like to talk about what\u2019s making you feel this way?",
  },
];

export const GENERAL_WELLBEING: string[] = [
  "Thank you for sharing that. Your feelings are valid, and this is a safe space to process them. What would be most helpful for you right now \u2014 talking it through, a reflective exercise, or just some quiet acknowledgment?",
  "I appreciate you opening up. Working in DV practice means you\u2019re regularly exposed to trauma narratives, and that takes a toll. How are you taking care of yourself outside of work? Even small acts of self-care compound over time.",
  "Remember, seeking support isn\u2019t weakness \u2014 it\u2019s professional practice. The most effective caseworkers are the ones who actively manage their own well-being. What does your self-care routine look like at the moment?",
];

export const CRISIS_TRIGGERS = [
  /i('m| am) not safe/i,
  /i want to (hurt|harm|kill) (myself|my self)/i,
  /i can'?t (do|take) this (anymore|any more)/i,
  /suicid/i,
  /end (it|my life|everything)/i,
  /self[- ]?harm/i,
  /i('m| am) (in )?danger/i,
  /emergency/i,
  /help me/i,
];

export interface CrisisResource {
  name: string;
  phone: string;
  description: string;
  category: "A" | "B" | "C";
}

export interface JurisdictionResources {
  name: string;
  flag: string;
  resources: CrisisResource[];
}

export const CRISIS_RESOURCES: JurisdictionResources[] = [
  {
    name: "Scotland",
    flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
    resources: [
      {
        name: "Police Scotland",
        phone: "999",
        description: "Immediate danger \u2014 emergency services",
        category: "A",
      },
      {
        name: "Scottish Women\u2019s Aid",
        phone: "0800 027 1234",
        description: "24-hour domestic abuse helpline",
        category: "A",
      },
      {
        name: "Samaritans",
        phone: "116 123",
        description: "24/7 emotional support \u2014 free to call",
        category: "B",
      },
      {
        name: "Breathing Space",
        phone: "0800 83 85 87",
        description: "Mental health helpline for Scotland",
        category: "B",
      },
      {
        name: "ChildLine Scotland",
        phone: "0800 1111",
        description: "Support for children and young people",
        category: "C",
      },
      {
        name: "Scottish Child Protection",
        phone: "0800 022 3222",
        description: "Report concerns about a child",
        category: "C",
      },
    ],
  },
  {
    name: "New Zealand",
    flag: "\u{1F1F3}\u{1F1FF}",
    resources: [
      {
        name: "NZ Police",
        phone: "111",
        description: "Immediate danger \u2014 emergency services",
        category: "A",
      },
      {
        name: "Women\u2019s Refuge Crisis Line",
        phone: "0800 733 843",
        description: "24-hour domestic violence helpline",
        category: "A",
      },
      {
        name: "1737 Helpline",
        phone: "1737",
        description: "Free call or text \u2014 mental health support",
        category: "B",
      },
      {
        name: "Lifeline Aotearoa",
        phone: "0800 543 354",
        description: "24/7 counselling and support",
        category: "B",
      },
      {
        name: "Oranga Tamariki",
        phone: "0508 326 459",
        description: "Report concerns about a child",
        category: "C",
      },
      {
        name: "KidsCan",
        phone: "0800 543 7226",
        description: "Support for vulnerable children",
        category: "C",
      },
    ],
  },
  {
    name: "Australia",
    flag: "\u{1F1E6}\u{1F1FA}",
    resources: [
      {
        name: "Triple Zero",
        phone: "000",
        description: "Immediate danger \u2014 emergency services",
        category: "A",
      },
      {
        name: "1800 RESPECT",
        phone: "1800 737 732",
        description: "24-hour DV & sexual assault helpline",
        category: "A",
      },
      {
        name: "Lifeline Australia",
        phone: "13 11 14",
        description: "24/7 crisis support and suicide prevention",
        category: "B",
      },
      {
        name: "Beyond Blue",
        phone: "1300 22 4636",
        description: "Anxiety, depression, and mental health",
        category: "B",
      },
      {
        name: "Child Protection Helpline",
        phone: "132 111",
        description: "Report concerns about a child (NSW)",
        category: "C",
      },
      {
        name: "Kids Helpline",
        phone: "1800 55 1800",
        description: "24/7 support for young people",
        category: "C",
      },
    ],
  },
];
