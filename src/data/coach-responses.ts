export interface CoachResponse {
  text: string;
  category: string;
}

// Fidelity drift triggers — if user message contains these phrases, redirect
export const DRIFT_TRIGGERS: { pattern: RegExp; response: string }[] = [
  {
    pattern: /why didn'?t she leave|why does she stay|she (chose|chooses) to stay/i,
    response:
      "I notice you're framing this around the survivor's choices. The S&T model asks us to shift focus: What is the perpetrator doing that makes leaving dangerous or difficult? What barriers has the perpetrator created? Let's reframe this to examine the perpetrator's pattern of coercive control and the survivor's protective actions despite those barriers.",
  },
  {
    pattern:
      /she failed to protect|failure to protect|mother('s)? inability|she (didn'?t|couldn'?t) protect/i,
    response:
      "Let's pause here \u2014 'failure to protect' language inadvertently blames the survivor. In the S&T framework, we ask: What is the perpetrator doing that interferes with the survivor's parenting? What protective actions IS the survivor taking? The survivor is often parenting under duress. Let's document the perpetrator's pattern and recognize the survivor's strengths.",
  },
  {
    pattern:
      /she (is|was) (also|equally) (abusive|violent)|mutual (abuse|violence|combat)/i,
    response:
      "The concept of 'mutual abuse' requires careful examination. The S&T model asks us to identify the primary aggressor and their pattern of coercive control. What looks like 'mutual violence' often involves a survivor's resistance or self-defense against an ongoing pattern. Let's map the pattern of behavior: Who initiated the controlling dynamic? What does the broader context show?",
  },
  {
    pattern:
      /she needs (therapy|counseling|help)|fix (her|the mother)|she('s| is) (the|a) problem/i,
    response:
      "I want to gently redirect here. Focusing on what the survivor 'needs to fix' shifts accountability away from the perpetrator. The S&T approach asks: What is the perpetrator doing that creates the conditions the survivor is dealing with? How is the survivor already demonstrating resilience and protective capacity? Let's center our analysis on perpetrator accountability.",
  },
];

// Keyword-matched responses
export const KEYWORD_RESPONSES: {
  keywords: string[];
  responses: CoachResponse[];
}[] = [
  {
    keywords: ["perpetrator", "pattern", "coercive", "control", "behavior"],
    responses: [
      {
        text: "Documenting the perpetrator's pattern is central to good S&T practice. Look for: repeated behaviors across time (not isolated incidents), tactics that limit the survivor's autonomy, impact on parenting and children's daily functioning. Try using the 'pattern' lens \u2014 what does this person do repeatedly to maintain power and control?",
        category: "Perpetrator Pattern",
      },
      {
        text: "When mapping perpetrator behavior, consider these domains: physical violence, sexual violence, emotional abuse, economic control, isolation tactics, using children as leverage, threats and intimidation, and monitoring/surveillance. Which of these are present in your case? Let's build a comprehensive pattern map.",
        category: "Perpetrator Pattern",
      },
    ],
  },
  {
    keywords: ["survivor", "mother", "protective", "strengths", "resilience"],
    responses: [
      {
        text: "Identifying the survivor's protective actions is a core S&T competency. Even in the most constrained circumstances, survivors make choices to protect their children. Look for: safety planning (even informal), shielding children from violence, maintaining routines, seeking support, and making strategic decisions about when to resist and when to comply for safety.",
        category: "Survivor Strengths",
      },
      {
        text: "The S&T model asks us to actively document survivor strengths alongside perpetrator patterns. This isn't about being 'nice' \u2014 it's about accuracy. A comprehensive assessment that ignores protective actions is incomplete. What has this survivor done to keep their children safe, maintain normalcy, or seek help?",
        category: "Survivor Strengths",
      },
    ],
  },
  {
    keywords: ["children", "child", "impact", "kids", "parenting"],
    responses: [
      {
        text: "When assessing impact on children, the S&T model frames it as: 'How has the perpetrator's behavior affected the children?' \u2014 not 'How has the mother's response affected the children.' This keeps accountability with the person choosing to use violence. Consider: disrupted routines, fear responses, developmental impacts, relationship with each parent, and the child's own coping strategies.",
        category: "Child Impact",
      },
    ],
  },
  {
    keywords: ["case", "documentation", "report", "assessment", "court"],
    responses: [
      {
        text: "Strong S&T-aligned documentation follows a clear structure: (1) Describe the perpetrator's specific behaviors as a pattern, not isolated incidents. (2) Connect each behavior to its impact on the children. (3) Document the survivor's protective actions. (4) Frame recommendations around perpetrator accountability and family safety. Would you like to walk through any of these steps for your current case?",
        category: "Case Documentation",
      },
    ],
  },
  {
    keywords: ["risk", "safety", "danger", "assessment", "plan"],
    responses: [
      {
        text: "Risk assessment through an S&T lens prioritizes understanding the perpetrator's pattern and escalation indicators. Key questions: Has the violence escalated in frequency or severity? Are there threats to kill? Is there weapon access? Has the survivor recently separated or attempted to leave? Are children being directly targeted? These factors, combined with the perpetrator's pattern history, inform your safety planning.",
        category: "Risk Assessment",
      },
    ],
  },
];

// General coaching responses (fallback pool)
export const GENERAL_RESPONSES: CoachResponse[] = [
  {
    text: "That's an important question. In S&T practice, we always start by centering our analysis on what the perpetrator is doing \u2014 their pattern of behavior and its impact on the family. Then we look at the survivor's protective actions and strengths. How can I help you apply this framework to your current situation?",
    category: "General Guidance",
  },
  {
    text: "Good thinking. Remember, the three core principles of the S&T model are: (1) Keep the child safe and together with the non-offending parent, (2) Hold the perpetrator accountable for their pattern of behavior, (3) Value and support the survivor's role as a parent. Which of these would you like to explore further?",
    category: "S&T Principles",
  },
  {
    text: "I'm here to support your practice. Whether you need help with case documentation, understanding perpetrator patterns, recognizing survivor strengths, or preparing for a difficult conversation \u2014 I'm grounded in the S&T model and ready to coach you through it. What would be most helpful right now?",
    category: "General Guidance",
  },
  {
    text: "Let's think about this through the S&T lens. The model asks us to be curious about the perpetrator's behavior and its function \u2014 what is it designed to achieve? Control, isolation, intimidation? And simultaneously, what is the survivor doing to navigate this? Often their actions show remarkable strategic thinking under duress.",
    category: "S&T Framework",
  },
  {
    text: "Practice fidelity matters because consistency in applying the S&T model directly impacts outcomes for families. When we drift toward victim-blaming language or lose focus on perpetrator accountability, we risk making decisions that inadvertently punish survivors for the perpetrator's behavior. Let's keep our lens clear.",
    category: "Practice Fidelity",
  },
];

// Context hot-button responses
export const CONTEXT_RESPONSES: Record<string, string> = {
  "Case Consultation":
    "I'm ready to help with your case consultation. To provide the best S&T-aligned guidance, could you tell me:\n\n1. What type of case is this? (child protection, family court, police referral)\n2. What perpetrator behaviors have been identified so far?\n3. What do you know about the survivor's situation and protective actions?\n\nShare what you're comfortable with, and I'll help you analyze it through the S&T framework.",
  "Practice Guidance":
    "Let's strengthen your S&T practice. Here are some areas I can help with:\n\n\u2022 **Perpetrator Pattern Mapping** \u2014 Documenting behaviors as patterns, not incidents\n\u2022 **Survivor Strength Assessment** \u2014 Identifying and documenting protective actions\n\u2022 **Child Impact Analysis** \u2014 Connecting perpetrator behavior to child outcomes\n\u2022 **Language & Framing** \u2014 Ensuring your documentation uses S&T-aligned language\n\u2022 **Difficult Conversations** \u2014 Preparing for challenging professional interactions\n\nWhich area would you like to focus on?",
  "S&T Principles":
    "The Safe & Together model rests on three foundational principles:\n\n**1. Safe** \u2014 Prioritize the safety of children by addressing the source of danger (the perpetrator's behavior), not by separating children from their non-offending parent.\n\n**2. Together** \u2014 Keep children together with the non-offending parent whenever safely possible. The bond between survivor and child is a protective factor.\n\n**3. Accountability** \u2014 Hold the perpetrator accountable for their choices and the impact of their behavior on the entire family system.\n\nThese principles guide every interaction, assessment, and recommendation. Which principle would you like to explore in the context of your work?",
  "Fidelity Check":
    "Let's do a quick practice fidelity check. I'll ask you a few reflective questions:\n\n1. In your most recent case, did you document the perpetrator's pattern of behavior (not just individual incidents)?\n2. Did you identify and document the survivor's protective actions?\n3. Did your recommendations focus on perpetrator accountability rather than requirements for the survivor?\n4. Did you assess child impact as a consequence of the perpetrator's behavior?\n\nReflect on these, and share where you feel confident and where you'd like support.",
};

// Welcome message
export const WELCOME_MESSAGE =
  "Welcome back, Sarah. I'm your S&T practice coach \u2014 here to help you apply the Safe & Together model with confidence. Whether you need help analyzing a case, preparing documentation, or checking your practice alignment, I'm here 24/7.\n\nYou can start by telling me what you're working on, or use the quick-start buttons above to jump into a specific area.";

// Demo past sessions
export const DEMO_SESSIONS = [
  {
    id: 1,
    title: "Case Consultation: Johnson Family",
    date: "Today, 9:15 AM",
    preview: "Discussed perpetrator pattern mapping...",
  },
  {
    id: 2,
    title: "Practice Guidance: Court Report Language",
    date: "Yesterday, 2:30 PM",
    preview: "Reviewed S&T-aligned documentation...",
  },
  {
    id: 3,
    title: "Fidelity Check: Weekly Review",
    date: "Mar 10, 11:00 AM",
    preview: "Assessed practice alignment across cases...",
  },
  {
    id: 4,
    title: "Case Consultation: Davis Referral",
    date: "Mar 8, 4:45 PM",
    preview: "Analyzed new police referral through S&T lens...",
  },
];
