export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
  textColor: string;
  initial: string;
  scenario: string;
  dialogues: { userPrompt: string; personaResponse: string; coachNote: string }[];
  debrief: {
    score: number;
    strengths: string[];
    improvements: string[];
    keyTakeaway: string;
  };
}

export const PERSONAS: Persona[] = [
  {
    id: "survivor",
    name: "Maria Santos",
    role: "Domestic Violence Survivor",
    description:
      "Maria is a mother of two seeking help after years of coercive control. She's cautious, protective of her children, and uncertain about the system.",
    difficulty: "Intermediate",
    color: "bg-purple-100",
    textColor: "text-purple-600",
    initial: "M",
    scenario:
      "Maria has been referred to your agency after a police call-out. She is hesitant to engage and worried about losing custody of her children.",
    dialogues: [
      {
        userPrompt:
          "Hi Maria, thank you for coming in today. I'd like to understand your situation better.",
        personaResponse:
          "I... I'm not sure why I'm here exactly. The police said I had to come. I don't want any trouble. I just want to keep my kids safe.",
        coachNote:
          "Good opener — non-threatening. Watch for opportunities to validate her protective instincts.",
      },
      {
        userPrompt:
          "I can see keeping your kids safe is really important to you. Can you tell me a bit about what's been happening at home?",
        personaResponse:
          "It's not that bad, really. Marco just... he gets angry sometimes. He controls the money, checks my phone. But he's never hit the kids. He says I'm a bad mother, that I can't cope without him. Maybe he's right.",
        coachNote:
          "She's minimizing and internalizing blame — common with coercive control. Good S&T practice: identify the perpetrator's pattern (financial control, surveillance, emotional abuse).",
      },
      {
        userPrompt:
          "It sounds like Marco does a number of things to control the household. The phone checking, controlling money, the criticism of your parenting — those form a pattern. What you're describing takes a lot of strength to manage.",
        personaResponse:
          "A pattern? I... I never thought of it like that. I always thought it was just arguments. You really think I'm being strong? Most days I feel like I'm failing.",
        coachNote:
          "Excellent S&T practice — naming the pattern and recognizing survivor strength. She's beginning to reframe.",
      },
      {
        userPrompt:
          "You're not failing. You're parenting under very difficult circumstances that Marco has created. Tell me about how you keep the children safe day to day.",
        personaResponse:
          "I... I make sure they're fed, get to school on time. When Marco starts shouting, I take them to their room and read to them. I try to keep things normal. I didn't think that counted as anything.",
        coachNote:
          "Outstanding — centering the survivor's protective actions and reframing her efforts as meaningful. This is core S&T.",
      },
      {
        userPrompt:
          "Those are all protective actions, Maria. Getting them to school, feeding them, shielding them from the shouting — you're actively keeping them safe.",
        personaResponse:
          "No one has ever said that to me before. Everyone always asks why I don't just leave. They don't understand... he said he'd take the kids if I left. I'm scared of what he'd do.",
        coachNote:
          "She's disclosing a threat — document this as part of the perpetrator's pattern. Using children as leverage is a key coercive control tactic.",
      },
    ],
    debrief: {
      score: 92,
      strengths: [
        "Named the perpetrator's pattern of behavior clearly",
        "Validated the survivor's protective actions",
        "Used empowering, non-blaming language throughout",
        "Allowed the survivor to share at her own pace",
        "Centered the conversation on perpetrator accountability",
      ],
      improvements: [
        "Could have explored the specific impact on children's daily functioning earlier",
        "Consider documenting the threat to take children as an escalation indicator",
      ],
      keyTakeaway:
        "Strong S&T-aligned conversation. You successfully helped the survivor reframe her experiences and recognize her own protective capacity.",
    },
  },
  {
    id: "judge",
    name: "Judge Campbell",
    role: "Family Court Judge",
    description:
      "Judge Campbell is reviewing a custody case and tends to focus on 'both sides.' You need to present your S&T-informed assessment clearly.",
    difficulty: "Advanced",
    color: "bg-amber-100",
    textColor: "text-amber-700",
    initial: "J",
    scenario:
      "You're presenting your case assessment in a family court hearing. Judge Campbell wants to understand why you recommend the children remain with the mother.",
    dialogues: [
      {
        userPrompt:
          "Your Honour, I'd like to present our assessment of the family situation and our recommendations for the children's placement.",
        personaResponse:
          "Go ahead. But I want to understand both parents' behaviour. I've seen the father's statement saying the mother is unstable and neglectful. What's your assessment?",
        coachNote:
          "The judge is framing it as 'both sides' — use S&T framing to redirect to perpetrator pattern and evidence.",
      },
      {
        userPrompt:
          "Your Honour, our assessment documents a pattern of coercive controlling behaviour by the father. This includes financial control, isolation from family support, monitoring the mother's movements, and using threats regarding custody to maintain control.",
        personaResponse:
          "A pattern, you say. But these sound like he-said-she-said disputes. What evidence do you have that this is a 'pattern' and not just a difficult relationship?",
        coachNote:
          "Good — presenting as a pattern. Now back it up with specific documented evidence and timeline.",
      },
      {
        userPrompt:
          "We've documented 14 separate incidents over 3 years that demonstrate an escalating pattern. These include police call-outs, GP records noting anxiety consistent with coercive control, school records showing the children's attendance dropped during escalation periods, and financial records showing the mother had no independent access to funds.",
        personaResponse:
          "That's more substantive. And the father's claim about the mother's neglect?",
        coachNote:
          "Excellent evidence-based presentation. Now reframe the 'neglect' allegation through the S&T lens.",
      },
      {
        userPrompt:
          "Your Honour, the alleged 'neglect' is actually the impact of the father's coercive control on the mother's capacity to parent. Despite this, she has consistently ensured the children attend school, maintained their medical appointments, and provided emotional stability. These are documented protective actions.",
        personaResponse:
          "I see. So you're saying the father's behaviour is the root cause, and the mother is actually doing well under the circumstances?",
        coachNote:
          "The judge is starting to see through the S&T lens — perpetrator as root cause, survivor as protective.",
      },
    ],
    debrief: {
      score: 88,
      strengths: [
        "Presented perpetrator behavior as a documented pattern with evidence",
        "Successfully reframed 'neglect' allegations through S&T lens",
        "Used specific, concrete evidence to support claims",
        "Maintained professional tone under pressure",
      ],
      improvements: [
        "Could strengthen the connection between perpetrator behavior and direct impact on children",
        "Consider addressing the father's use of court proceedings as a continuation of control",
        "Include specific risk assessment indicators for future proceedings",
      ],
      keyTakeaway:
        "Strong court presentation. Focus on always connecting perpetrator behavior directly to child impact for maximum judicial impact.",
    },
  },
  {
    id: "police",
    name: "Officer Davies",
    role: "Responding Police Officer",
    description:
      "Officer Davies has responded to a domestic incident and is initially dismissive, viewing it as a 'domestic dispute.' You need to help reframe.",
    difficulty: "Intermediate",
    color: "bg-blue-100",
    textColor: "text-blue-600",
    initial: "D",
    scenario:
      "Officer Davies has attended a call-out and is briefing you. He sees it as a minor domestic and is unsure about further action.",
    dialogues: [
      {
        userPrompt:
          "Officer Davies, thanks for the briefing. Can you walk me through what you observed at the scene?",
        personaResponse:
          "Pretty standard domestic, to be honest. The couple were arguing, neighbours called it in. No visible injuries. The wife seemed upset but said everything was fine. The husband was calm, cooperative. I'm not sure there's much for us here.",
        coachNote:
          "The officer is using 'standard domestic' framing and reading the perpetrator's calm demeanor as positive. Watch for opportunities to reframe.",
      },
      {
        userPrompt:
          "I appreciate your observations. Can I ask — when you say the husband was calm and cooperative, and the wife said 'everything's fine,' what was the wife's demeanor? Was she making eye contact with her partner while speaking?",
        personaResponse:
          "Now you mention it, she kept looking at him before answering. She seemed nervous. And the kids were very quiet — unusually quiet for their age, actually. Almost like they knew to stay out of the way.",
        coachNote:
          "Good questioning — drawing out behavioral indicators the officer noticed but didn't interpret. Children's behavior is a key S&T indicator.",
      },
      {
        userPrompt:
          "Those are really important observations. A partner who looks to the other person before speaking, children who've learned to 'stay out of the way' — these can indicate an ongoing pattern of control, not just a one-off argument. Has this address come up before?",
        personaResponse:
          "Actually, yes. I checked and there have been three previous call-outs in the last 18 months. Different officers each time. No arrests — each time it was recorded as a verbal domestic with no further action.",
        coachNote:
          "Excellent — establishing the pattern across multiple incidents. The 'no further action' pattern is exactly what S&T practice aims to change.",
      },
    ],
    debrief: {
      score: 85,
      strengths: [
        "Asked specific behavioral observation questions",
        "Helped the officer reinterpret 'calm and cooperative' perpetrator behavior",
        "Drew attention to children's behavior as an indicator",
        "Established pattern across multiple incidents",
      ],
      improvements: [
        "Could discuss the risk implications of repeat call-outs with no action",
        "Consider asking about specific safety planning for the survivor",
        "Address the systemic issue of different officers not connecting incidents",
      ],
      keyTakeaway:
        "Effective multi-agency collaboration. You helped the officer see beyond surface observations to the underlying pattern of control.",
    },
  },
  {
    id: "supervisor",
    name: "Team Lead Chen",
    role: "Practice Supervisor",
    description:
      "Team Lead Chen is reviewing your case documentation and asking about your S&T alignment. A supportive but thorough review.",
    difficulty: "Beginner",
    color: "bg-green-100",
    textColor: "text-green-600",
    initial: "C",
    scenario:
      "Your supervisor is reviewing your recent case notes and wants to discuss your assessment approach and documentation quality.",
    dialogues: [
      {
        userPrompt:
          "Hi, I've prepared the case notes for the Morrison family for your review.",
        personaResponse:
          "Thanks. I've had a look through. Your documentation of the children's situation is solid, but I noticed your assessment focuses quite heavily on what the mother should be doing differently. Can you talk me through your thinking?",
        coachNote:
          "The supervisor is flagging a drift toward survivor-blame. This is a supportive correction — respond with self-reflection.",
      },
      {
        userPrompt:
          "You're right, and I appreciate you flagging that. Looking back at it, I think I inadvertently shifted focus to the mother's actions instead of the father's pattern. I should have centered the assessment on his behavior.",
        personaResponse:
          "Good self-awareness. That's a really common drift, especially in complex cases. So if you were to rewrite that section, how would you reframe it using the S&T model?",
        coachNote:
          "Excellent self-reflection. Now demonstrate S&T reframing ability.",
      },
      {
        userPrompt:
          "I would start with the father's pattern of behavior — the financial control, the isolation from her family, the verbal degradation. Then I'd show how those behaviors have impacted her parenting capacity, and document what she IS doing to protect the children despite those constraints.",
        personaResponse:
          "That's exactly right. The shift from 'what she should do' to 'what he's doing and how she's coping despite it' is fundamental. Your instincts are good — you just need to catch the language drift earlier. Shall we go through it section by section?",
        coachNote:
          "Great reframing demonstration. The supervisor is supportive — this shows healthy professional development.",
      },
    ],
    debrief: {
      score: 90,
      strengths: [
        "Demonstrated strong self-awareness about practice drift",
        "Articulated S&T reframing clearly and correctly",
        "Was receptive to feedback without defensiveness",
        "Showed understanding of perpetrator-pattern documentation",
      ],
      improvements: [
        "Practice catching language drift in real-time before submission",
        "Consider using a pre-submission S&T alignment checklist",
      ],
      keyTakeaway:
        "Excellent supervisory interaction. Self-awareness and openness to feedback are key to maintaining S&T practice fidelity.",
    },
  },
];
