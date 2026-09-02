export const JE_APPLICABILITY = Object.freeze({
  APPLICABLE: "APPLICABLE",
  NOT_APPLICABLE: "NOT_APPLICABLE",
  UNCONFIRMED: "UNCONFIRMED",
});

export const HPV_PROGRAMME_APPLICABILITY = Object.freeze({
  APPLICABLE: "APPLICABLE",
  NOT_APPLICABLE: "NOT_APPLICABLE",
  UNCONFIRMED: "UNCONFIRMED",
});

export const GENDER = Object.freeze({
  FEMALE: "FEMALE",
  MALE: "MALE",
  OTHER: "OTHER",
  UNCONFIRMED: "UNCONFIRMED",
});

export const RECORD_STATES = Object.freeze({
  NOT_RECORDED: "NOT_RECORDED",
  GIVEN: "GIVEN",
  MISSED_NOT_AVAILABLE: "MISSED_NOT_AVAILABLE",
});

export const SOURCE_REFERENCES = Object.freeze({
  UIP_ROUTINE_MANUAL: {
    publisher: "Ministry of Health & Family Welfare, Government of India",
    title: "Routine Immunization Manual for Health Workers",
    url: "https://www.mohfw.gov.in/sites/default/files/Routine%20Immunization%20Manual%20For%20Health%20Workers.pdf",
  },
  MOHFW_ANNUAL_REPORT_2024_25: {
    publisher: "Ministry of Health & Family Welfare, Government of India",
    title: "Annual Report 2024–25",
    url: "https://mohfw.gov.in/sites/default/files/Final%20Printed%20English%20AR%202024-25.pdf",
  },
  JE_PROGRAMME: {
    publisher:
      "National Center for Vector Borne Diseases Control, Ministry of Health & Family Welfare",
    title: "Japanese Encephalitis vaccination guidance",
    url: "https://ncvbdc.mohfw.gov.in/index1.php?lang=1&level=2&lid=3759&sublinkid=5922&theme=Green",
  },
  HPV_PROGRAMME_2026: {
    publisher: "Press Information Bureau, Government of India",
    title: "Update on National HPV Vaccination Programme",
    url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2241079&lang=1&reg=1",
  },
});

const atBirth = Object.freeze({ kind: "age", unit: "birth", start: 0, end: 0 });
const atWeeks = (weeks) =>
  Object.freeze({ kind: "age", unit: "weeks", start: weeks, end: weeks });
const monthWindow = (start, end) =>
  Object.freeze({ kind: "age", unit: "months", start, end });
const yearWindow = (start, end = start) =>
  Object.freeze({ kind: "age", unit: "years", start, end });

const universal = Object.freeze({ kind: "UNIVERSAL" });
const jeConditional = Object.freeze({ kind: "JE_PROGRAMME" });
const hpvFemaleProgramme = Object.freeze({
  kind: "HPV_PROGRAMME",
  requiredGender: GENDER.FEMALE,
});

function dose({
  doseId,
  vaccineId,
  seriesId,
  doseNumber,
  en,
  bn,
  officialTiming,
  visitGroup,
  applicability = universal,
  sourceRef = "UIP_ROUTINE_MANUAL",
  adjustmentRuleId = null,
  notes = null,
}) {
  return Object.freeze({
    doseId,
    vaccineId,
    seriesId,
    doseNumber,
    label: Object.freeze({ en, bn }),
    officialTiming,
    visitGroup,
    applicability,
    sourceRef,
    adjustmentRuleId,
    notes,
  });
}

export const ROUTINE_VACCINE_DOSES = Object.freeze([
  dose({ doseId: "bcg", vaccineId: "bcg", seriesId: "bcg", doseNumber: 1, en: "BCG", bn: "বিসিজি", officialTiming: atBirth, visitGroup: "birth" }),
  dose({ doseId: "opv-0", vaccineId: "opv", seriesId: "opv", doseNumber: 0, en: "OPV-0", bn: "ওপিভি-০", officialTiming: atBirth, visitGroup: "birth" }),
  dose({ doseId: "hepb-birth", vaccineId: "hepatitis-b", seriesId: "hepatitis-b", doseNumber: 0, en: "Hepatitis B Birth Dose", bn: "হেপাটাইটিস বি জন্মকালীন ডোজ", officialTiming: atBirth, visitGroup: "birth" }),

  dose({ doseId: "opv-1", vaccineId: "opv", seriesId: "opv", doseNumber: 1, en: "OPV-1", bn: "ওপিভি-১", officialTiming: atWeeks(6), visitGroup: "6-weeks" }),
  dose({ doseId: "penta-1", vaccineId: "pentavalent", seriesId: "pentavalent", doseNumber: 1, en: "Pentavalent-1", bn: "পেন্টাভ্যালেন্ট-১", officialTiming: atWeeks(6), visitGroup: "6-weeks" }),
  dose({ doseId: "rotavirus-1", vaccineId: "rotavirus", seriesId: "rotavirus", doseNumber: 1, en: "Rotavirus-1", bn: "রোটাভাইরাস-১", officialTiming: atWeeks(6), visitGroup: "6-weeks" }),
  dose({ doseId: "fipv-1", vaccineId: "fipv", seriesId: "fipv", doseNumber: 1, en: "fIPV-1", bn: "এফআইপিভি-১", officialTiming: atWeeks(6), visitGroup: "6-weeks" }),
  dose({ doseId: "pcv-1", vaccineId: "pcv", seriesId: "pcv", doseNumber: 1, en: "PCV-1", bn: "পিসিভি-১", officialTiming: atWeeks(6), visitGroup: "6-weeks" }),

  dose({ doseId: "opv-2", vaccineId: "opv", seriesId: "opv", doseNumber: 2, en: "OPV-2", bn: "ওপিভি-২", officialTiming: atWeeks(10), visitGroup: "10-weeks" }),
  dose({ doseId: "penta-2", vaccineId: "pentavalent", seriesId: "pentavalent", doseNumber: 2, en: "Pentavalent-2", bn: "পেন্টাভ্যালেন্ট-২", officialTiming: atWeeks(10), visitGroup: "10-weeks" }),
  dose({ doseId: "rotavirus-2", vaccineId: "rotavirus", seriesId: "rotavirus", doseNumber: 2, en: "Rotavirus-2", bn: "রোটাভাইরাস-২", officialTiming: atWeeks(10), visitGroup: "10-weeks" }),

  dose({ doseId: "opv-3", vaccineId: "opv", seriesId: "opv", doseNumber: 3, en: "OPV-3", bn: "ওপিভি-৩", officialTiming: atWeeks(14), visitGroup: "14-weeks" }),
  dose({ doseId: "penta-3", vaccineId: "pentavalent", seriesId: "pentavalent", doseNumber: 3, en: "Pentavalent-3", bn: "পেন্টাভ্যালেন্ট-৩", officialTiming: atWeeks(14), visitGroup: "14-weeks" }),
  dose({ doseId: "rotavirus-3", vaccineId: "rotavirus", seriesId: "rotavirus", doseNumber: 3, en: "Rotavirus-3", bn: "রোটাভাইরাস-৩", officialTiming: atWeeks(14), visitGroup: "14-weeks" }),
  dose({ doseId: "fipv-2", vaccineId: "fipv", seriesId: "fipv", doseNumber: 2, en: "fIPV-2", bn: "এফআইপিভি-২", officialTiming: atWeeks(14), visitGroup: "14-weeks" }),
  dose({ doseId: "pcv-2", vaccineId: "pcv", seriesId: "pcv", doseNumber: 2, en: "PCV-2", bn: "পিসিভি-২", officialTiming: atWeeks(14), visitGroup: "14-weeks" }),

  dose({ doseId: "mr-1", vaccineId: "mr", seriesId: "mr", doseNumber: 1, en: "MR-1", bn: "এমআর-১", officialTiming: monthWindow(9, 11), visitGroup: "9-to-11-months" }),
  dose({ doseId: "fipv-3", vaccineId: "fipv", seriesId: "fipv", doseNumber: 3, en: "fIPV-3", bn: "এফআইপিভি-৩", officialTiming: monthWindow(9, 11), visitGroup: "9-to-11-months" }),
  dose({ doseId: "pcv-booster", vaccineId: "pcv", seriesId: "pcv", doseNumber: 3, en: "PCV Booster", bn: "পিসিভি বুস্টার", officialTiming: monthWindow(9, 11), visitGroup: "9-to-11-months" }),
  dose({ doseId: "je-1", vaccineId: "je", seriesId: "je", doseNumber: 1, en: "JE-1", bn: "জেই-১", officialTiming: monthWindow(9, 11), visitGroup: "9-to-11-months", applicability: jeConditional, sourceRef: "JE_PROGRAMME", notes: "Applicable only where the Government JE programme applies." }),

  dose({ doseId: "mr-2", vaccineId: "mr", seriesId: "mr", doseNumber: 2, en: "MR-2", bn: "এমআর-২", officialTiming: monthWindow(16, 24), visitGroup: "16-to-24-months" }),
  dose({ doseId: "dpt-booster-1", vaccineId: "dpt", seriesId: "dpt", doseNumber: 1, en: "DPT Booster-1", bn: "ডিপিটি বুস্টার-১", officialTiming: monthWindow(16, 24), visitGroup: "16-to-24-months" }),
  dose({ doseId: "opv-booster", vaccineId: "opv", seriesId: "opv", doseNumber: 4, en: "OPV Booster", bn: "ওপিভি বুস্টার", officialTiming: monthWindow(16, 24), visitGroup: "16-to-24-months" }),
  dose({ doseId: "je-2", vaccineId: "je", seriesId: "je", doseNumber: 2, en: "JE-2", bn: "জেই-২", officialTiming: monthWindow(16, 24), visitGroup: "16-to-24-months", applicability: jeConditional, sourceRef: "JE_PROGRAMME", notes: "Applicable only where the Government JE programme applies." }),

  dose({ doseId: "dpt-booster-2", vaccineId: "dpt", seriesId: "dpt", doseNumber: 2, en: "DPT Booster-2", bn: "ডিপিটি বুস্টার-২", officialTiming: yearWindow(5, 6), visitGroup: "5-to-6-years" }),
  dose({ doseId: "td-10", vaccineId: "td", seriesId: "td", doseNumber: 1, en: "Td at 10 Years", bn: "১০ বছরে টিডি", officialTiming: yearWindow(10), visitGroup: "10-years" }),
  dose({ doseId: "td-16", vaccineId: "td", seriesId: "td", doseNumber: 2, en: "Td at 16 Years", bn: "১৬ বছরে টিডি", officialTiming: yearWindow(16), visitGroup: "16-years" }),
]);

export const HPV_PROGRAMME = Object.freeze({
  programmeId: "india-hpv-2026",
  programmeType: "SEPARATE_PROGRAMME",
  sourceRef: "HPV_PROGRAMME_2026",
  applicability: hpvFemaleProgramme,
  eligibilityPresentation: Object.freeze({
    targetGroup: "ELIGIBLE_GIRLS",
    programmeAgeYears: 14,
    doseStructure: "SINGLE_DOSE",
    exposeExactDueDate: false,
    individualEligibilityDecision: false,
  }),
  routineRule: Object.freeze({
    structure: "SINGLE_DOSE",
    officialTiming: yearWindow(14),
    internalMilestoneOnly: true,
  }),
  entries: Object.freeze([
    dose({
      doseId: "hpv-single-dose",
      vaccineId: "hpv",
      seriesId: "hpv-programme",
      doseNumber: 1,
      en: "HPV Single Dose",
      bn: "এইচপিভি একক ডোজ",
      officialTiming: yearWindow(14),
      visitGroup: "hpv-programme-14-years",
      applicability: hpvFemaleProgramme,
      sourceRef: "HPV_PROGRAMME_2026",
      notes: "Separate programme rule; eligibility must not be inferred when gender or programme applicability is unconfirmed.",
    }),
  ]),
  transitionalCampaignPolicy: Object.freeze({
    policyType: "CAMPAIGN_TRANSITION",
    permanentAgeRule: false,
    launchDate: "2026-02-28",
    campaignDurationDays: 90,
    eligibilityShape: Object.freeze({
      targetGender: GENDER.FEMALE,
      routineTargetAgeYears: 14,
      transitionalTurnsAgeYears: 15,
      transitionalWindowDaysFromLaunch: 90,
    }),
    description:
      "Campaign-only transition for the 14-year target group, including girls who turn 15 within the stated 90-day launch window. It is not a permanent age rule and is not automatically evaluated in Phase 1.",
    automaticallyApplied: false,
  }),
});

export const ADJUSTMENT_RULES = Object.freeze([]);

export const INDIA_UIP_SCHEDULE = Object.freeze({
  id: "worklity-india-uip",
  version: "2026-09-01",
  jurisdiction: "India",
  publisher:
    "Ministry of Health & Family Welfare / National Health Mission, Government of India",
  reviewedDate: "2026-09-01",
  sourceReferences: SOURCE_REFERENCES,
  routineDoses: ROUTINE_VACCINE_DOSES,
  programmes: Object.freeze({ hpv: HPV_PROGRAMME }),
  adjustmentRules: ADJUSTMENT_RULES,
  warning: Object.freeze({
    en: "Informational planning and record calculation only. This schedule does not prescribe vaccination, determine medical fitness, replace U-WIN/MCP cards or official records, decide contraindications, or certify vaccination.",
    bn: "এটি শুধু তথ্যভিত্তিক পরিকল্পনা ও নথির হিসাব। এই সময়সূচি টিকা দেওয়ার পরামর্শ দেয় না, চিকিৎসাগত উপযুক্ততা নির্ধারণ করে না, U-WIN/MCP কার্ড বা সরকারি নথির বিকল্প নয়, টিকার বাধা নির্ধারণ করে না এবং টিকাদান সনদ দেয় না।",
  }),
});
