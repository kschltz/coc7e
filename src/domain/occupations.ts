export interface OccupationDefinition {
  key: string;
  pointFormula: string; // e.g. "EDU*4", "EDU*2+DEX*2"
  skills: string[]; // keys of skills
  creditRating: [number, number]; // min, max
}

export const OCCUPATIONS: OccupationDefinition[] = [
  {
    key: "antiquarian",
    pointFormula: "EDU*4",
    skills: [
      "appraise",
      "art_craft",
      "history",
      "library_use",
      "language_other",
      "spot_hidden",
      "charm",
      "navigate",
    ],
    creditRating: [30, 70],
  },
  {
    key: "artist",
    pointFormula: "EDU*2+POW*2", // Simplified
    skills: [
      "art_craft",
      "history",
      "natural_world",
      "psychology",
      "language_other",
      "spot_hidden",
      "charm",
      "listen",
    ],
    creditRating: [9, 50],
  },
  {
    key: "author",
    pointFormula: "EDU*4",
    skills: [
      "art_craft",
      "history",
      "library_use",
      "natural_world",
      "occult",
      "language_other",
      "psychology",
      "persuade",
    ],
    creditRating: [9, 30],
  },
  {
    key: "doctor_of_medicine",
    pointFormula: "EDU*4",
    skills: [
      "first_aid",
      "language_other",
      "medicine",
      "psychology",
      "science",
      "science",
      "charm",
      "library_use",
    ],
    creditRating: [30, 80],
  },
  {
    key: "journalist",
    pointFormula: "EDU*4",
    skills: [
      "art_craft",
      "history",
      "library_use",
      "language_own",
      "psychology",
      "charm",
      "fast_talk",
      "spot_hidden",
    ],
    creditRating: [9, 30],
  },
  {
    key: "police_detective",
    pointFormula: "EDU*2+DEX*2", // Simplified
    skills: [
      "art_craft",
      "disguise",
      "firearms_handgun",
      "law",
      "listen",
      "psychology",
      "spot_hidden",
      "charm",
    ],
    creditRating: [20, 50],
  },
  {
    key: "private_investigator",
    pointFormula: "EDU*2+DEX*2", // Simplified
    skills: [
      "art_craft",
      "disguise",
      "law",
      "library_use",
      "listen",
      "psychology",
      "spot_hidden",
      "charm",
    ],
    creditRating: [9, 30],
  },
  {
    key: "professor",
    pointFormula: "EDU*4",
    skills: [
      "library_use",
      "language_other",
      "language_own",
      "psychology",
      "science",
      "science",
      "charm",
      "history",
    ],
    creditRating: [20, 70],
  },
];
