export interface FormField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "checkbox-group" | "date";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface CaseStep {
  number: number;
  title: string;
  description: string;
  guidance: string;
  fields: FormField[];
}

export const CASE_STEPS: CaseStep[] = [
  {
    number: 1,
    title: "Case Overview",
    description: "Basic case information and context",
    guidance: "Start by recording the basic details of the case. This creates the foundation for your perpetrator pattern map.",
    fields: [
      { id: "caseId", label: "Case Reference Number", type: "text", placeholder: "e.g., DV-2026-0847", required: true },
      { id: "date", label: "Assessment Date", type: "date", required: true },
      { id: "workerName", label: "Assessing Worker", type: "text", placeholder: "e.g., Sarah Mitchell" },
      { id: "referralSource", label: "Referral Source", type: "select", options: ["Police Referral", "Self-Referral", "School/Education", "Health Services", "Court Order", "Other Agency", "Family/Community"] },
    ]
  },
  {
    number: 2,
    title: "Referral Information",
    description: "Details about how the case was referred",
    guidance: "Document the referral pathway and presenting concerns. Note: frame concerns around perpetrator behavior, not survivor 'failures.'",
    fields: [
      { id: "referralReason", label: "Reason for Referral", type: "textarea", placeholder: "Describe the presenting concerns that led to this referral..." },
      { id: "priorInvolvement", label: "Prior Agency Involvement", type: "textarea", placeholder: "Document any previous referrals, assessments, or interventions..." },
    ]
  },
  {
    number: 3,
    title: "Perpetrator Identification",
    description: "Identify the person using violence and control",
    guidance: "Clearly identify the perpetrator. Use specific, behavioral language. The S&T model centers analysis on the person choosing to use violence.",
    fields: [
      { id: "perpName", label: "Name", type: "text", placeholder: "Full name of the person using violence" },
      { id: "perpRelationship", label: "Relationship to Children", type: "select", options: ["Father", "Stepfather", "Mother's Partner", "Mother", "Stepmother", "Father's Partner", "Other Family Member", "Other"] },
      { id: "perpDemographics", label: "Relevant Demographics", type: "textarea", placeholder: "Age, employment status, relevant background..." },
    ]
  },
  {
    number: 4,
    title: "Pattern of Coercive Control",
    description: "Document the perpetrator's pattern of behavior",
    guidance: "This is the core of the S&T assessment. Document behaviors as a PATTERN \u2014 not isolated incidents. Look across multiple domains of control.",
    fields: [
      { id: "behaviorTypes", label: "Types of Controlling Behavior Identified", type: "checkbox-group", options: [
        "Physical violence", "Sexual violence", "Emotional/psychological abuse",
        "Financial/economic control", "Isolation from support networks",
        "Using children as leverage", "Threats and intimidation",
        "Monitoring and surveillance", "Legal/administrative abuse",
        "Damage to property", "Harm to pets"
      ]},
      { id: "patternDescription", label: "Describe the Pattern", type: "textarea", placeholder: "Document the perpetrator's pattern of behavior across time. Include specific examples, frequency, escalation indicators, and the function of each behavior (what it achieves for the perpetrator)..." },
    ]
  },
  {
    number: 5,
    title: "Impact on Daily Functioning",
    description: "How the perpetrator's behavior affects the family's daily life",
    guidance: "Connect the perpetrator's pattern directly to its impact on daily functioning. Frame this as 'The perpetrator's behavior causes...' not 'The survivor fails to...'",
    fields: [
      { id: "dailyImpact", label: "Impact on Daily Life", type: "textarea", placeholder: "How has the perpetrator's behavior disrupted routines, housing stability, employment, social connections, health...?" },
      { id: "housingImpact", label: "Housing & Stability Impact", type: "textarea", placeholder: "Has the perpetrator's behavior affected housing security, forced relocations, or created instability...?" },
    ]
  },
  {
    number: 6,
    title: "Impact on Parenting",
    description: "How the perpetrator's behavior affects the survivor's parenting",
    guidance: "Document how the perpetrator's behavior INTERFERES with the survivor's ability to parent \u2014 not the survivor's 'parenting deficits.' The cause is the perpetrator's choice to use violence.",
    fields: [
      { id: "parentingImpact", label: "Impact on Survivor's Parenting", type: "textarea", placeholder: "How has the perpetrator's behavior interfered with the survivor's parenting capacity? Consider: undermining authority, creating fear/anxiety, economic constraints on parenting resources..." },
      { id: "perpParenting", label: "Perpetrator's Parenting Choices", type: "textarea", placeholder: "How does the perpetrator's choice to use violence reflect their parenting? What does it model for the children...?" },
    ]
  },
  {
    number: 7,
    title: "Impact on Children",
    description: "Direct and indirect impact of perpetrator behavior on children",
    guidance: "Assess how the perpetrator's behavior \u2014 not the survivor's response \u2014 affects the children. Children are impacted by the perpetrator's choices.",
    fields: [
      { id: "childImpacts", label: "Observed Impacts on Children", type: "checkbox-group", options: [
        "Behavioral changes (withdrawal, aggression)",
        "Academic decline or school difficulties",
        "Sleep disturbances or nightmares",
        "Anxiety, hypervigilance, or fear responses",
        "Physical health impacts",
        "Social difficulties or isolation",
        "Age-inappropriate responsibilities (parentification)",
        "Disrupted attachment patterns"
      ]},
      { id: "childImpactDetail", label: "Detailed Impact Assessment", type: "textarea", placeholder: "Describe specific impacts on each child, connecting them to the perpetrator's behavior..." },
    ]
  },
  {
    number: 8,
    title: "Survivor Protective Actions",
    description: "Document what the survivor is doing to protect the children",
    guidance: "This is a critical S&T step. Actively identify and document the survivor's protective actions \u2014 even in constrained circumstances, survivors make choices to protect their children.",
    fields: [
      { id: "protectiveActions", label: "Identified Protective Actions", type: "textarea", placeholder: "What is the survivor doing to keep the children safe? Consider: safety planning, shielding from violence, maintaining routines, seeking support, strategic compliance, leaving attempts..." },
      { id: "parentingStrengths", label: "Parenting Strengths Under Duress", type: "textarea", placeholder: "What strengths does the survivor demonstrate as a parent despite the perpetrator's behavior?" },
    ]
  },
  {
    number: 9,
    title: "Survivor Strengths & Resources",
    description: "Map the survivor's broader strengths and support network",
    guidance: "Building a full picture of survivor capacity supports better planning. Strengths exist even in the most difficult circumstances.",
    fields: [
      { id: "strengths", label: "Personal Strengths & Resilience", type: "textarea", placeholder: "What personal strengths, skills, and resilience factors does the survivor demonstrate?" },
      { id: "supportNetwork", label: "Support Network", type: "textarea", placeholder: "Who does the survivor have for support? Family, friends, community, services, faith community..." },
      { id: "barriers", label: "Barriers to Safety", type: "textarea", placeholder: "What barriers exist? Consider: financial dependence, immigration status, cultural factors, fear, lack of housing..." },
    ]
  },
  {
    number: 10,
    title: "Children's Functioning & Needs",
    description: "Assessment of each child's current functioning and needs",
    guidance: "Assess each child individually. Their needs should be understood in the context of the perpetrator's behavior, not as deficits in the survivor's parenting.",
    fields: [
      { id: "childFunctioning", label: "Current Functioning by Child", type: "textarea", placeholder: "For each child, describe their current developmental, emotional, social, and educational functioning..." },
      { id: "childNeeds", label: "Identified Needs", type: "textarea", placeholder: "What specific support or intervention does each child need?" },
    ]
  },
  {
    number: 11,
    title: "Risk Assessment Summary",
    description: "Summary of risk factors and safety concerns",
    guidance: "Assess risk through the S&T lens: focus on the perpetrator's pattern, escalation indicators, and the survivor's current safety. Risk comes from the perpetrator's choices.",
    fields: [
      { id: "riskLevel", label: "Overall Risk Level", type: "select", options: ["Low", "Medium", "High", "Critical"], required: true },
      { id: "riskFactors", label: "Key Risk Factors", type: "textarea", placeholder: "Identify specific risk factors: escalation history, threats to kill, weapon access, separation violence, stalking, mental health, substance use by perpetrator..." },
      { id: "protectiveFactors", label: "Protective Factors", type: "textarea", placeholder: "What factors reduce risk? Survivor safety planning, support network, agency involvement, perpetrator engagement with services..." },
    ]
  },
  {
    number: 12,
    title: "Recommended Actions",
    description: "S&T-aligned recommendations and next steps",
    guidance: "Frame recommendations around perpetrator accountability and supporting the survivor-child relationship. Avoid recommendations that punish the survivor for the perpetrator's behavior.",
    fields: [
      { id: "actionTypes", label: "Recommended Actions", type: "checkbox-group", options: [
        "Safety planning with survivor",
        "Perpetrator intervention program referral",
        "Legal protection order",
        "Children's therapeutic support",
        "Survivor support services referral",
        "Multi-agency risk assessment conference (MARAC)",
        "Housing support",
        "Financial independence support",
        "School liaison and support plan",
        "Supervised contact arrangements"
      ]},
      { id: "actionPlan", label: "Detailed Action Plan", type: "textarea", placeholder: "Outline specific actions, responsible parties, and timelines..." },
      { id: "reviewDate", label: "Review Date", type: "date" },
    ]
  },
];
