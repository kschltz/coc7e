import { z } from "zod";

export const AttributeSchema = z.object({
  value: z.number().int().min(1).max(99),
  half: z.number().int(),
  fifth: z.number().int(),
});

export const SkillSchema = z.object({
  base: z.number().int().min(0).max(99),
  value: z.number().int().min(0).max(99),
  checked: z.boolean(),
  isOccupation: z.boolean().default(false),
});

export const WeaponSchema = z.object({
  name: z.string(),
  skill: z.string(),
  damage: z.string(),
  range: z.string().optional(),
  attacks: z.number().int().default(1),
  ammo: z.number().int().optional(),
  malfunction: z.string().optional(),
});

export const InvestigatorSheetSchema = z.object({
  schemaVersion: z.literal("1.0"),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),

  name: z.string(),
  player: z.string().optional(),
  occupation: z.string(),
  age: z.number().int().min(15).max(90),
  sex: z.string().optional(),
  residence: z.string().optional(),
  birthplace: z.string().optional(),
  portrait: z.string().optional(),

  STR: AttributeSchema,
  CON: AttributeSchema,
  SIZ: AttributeSchema,
  DEX: AttributeSchema,
  APP: AttributeSchema,
  INT: AttributeSchema,
  POW: AttributeSchema,
  EDU: AttributeSchema,

  luck: z.number().int().min(0).max(99),
  startingLuck: z.number().int(),

  hp: z.object({ max: z.number().int(), current: z.number().int() }),
  mp: z.object({ max: z.number().int(), current: z.number().int() }),
  san: z.object({
    max: z.number().int(),
    current: z.number().int(),
    starting: z.number().int(),
  }),
  mov: z.number().int(),
  build: z.number().int(),
  damageBonus: z.string(),

  skills: z.record(z.string(), SkillSchema),

  occupationPointsTotal: z.number().int(),
  occupationPointsSpent: z.number().int(),
  personalPointsTotal: z.number().int(),
  personalPointsSpent: z.number().int(),

  personalDescription: z.string().optional(),
  ideology: z.string().optional(),
  significantPeople: z.string().optional(),
  meaningfulLocations: z.string().optional(),
  treasuredPossessions: z.string().optional(),
  traits: z.string().optional(),
  injuriesScars: z.string().optional(),
  phobiasManias: z.string().optional(),
  arcaneTomesSpells: z.string().optional(),
  encountersWithEntities: z.string().optional(),

  equipment: z.array(z.string()),
  cashOnHand: z.number().default(0),
  spendingLevel: z.string().optional(),
  assets: z.string().optional(),

  weapons: z.array(WeaponSchema),

  notes: z.string().optional(),
});

export type InvestigatorSheet = z.infer<typeof InvestigatorSheetSchema>;
export type AttributeKey =
  | "STR"
  | "CON"
  | "SIZ"
  | "DEX"
  | "APP"
  | "INT"
  | "POW"
  | "EDU";
