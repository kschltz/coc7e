import { InvestigatorSheet, AttributeKey } from "../domain/schema";
import { createAttribute } from "../domain/attributes";
import {
  calculateMaxHP,
  calculateMaxMP,
  calculateStartingSAN,
  calculateMaxSAN,
  calculateMOV,
  calculateBuildAndDamageBonus,
} from "../domain/derivedStats";
import { SKILL_CATALOGUE } from "../domain/skills";

export function createInvestigator(
  data: Partial<InvestigatorSheet>,
): InvestigatorSheet {
  const now = new Date().toISOString();

  const str = data.STR?.value || 50;
  const con = data.CON?.value || 50;
  const siz = data.SIZ?.value || 50;
  const dex = data.DEX?.value || 50;
  const app = data.APP?.value || 50;
  const int = data.INT?.value || 50;
  const pow = data.POW?.value || 50;
  const edu = data.EDU?.value || 50;
  const age = data.age || 20;

  const hpMax = calculateMaxHP(con, siz);
  const mpMax = calculateMaxMP(pow);
  const sanStarting = calculateStartingSAN(pow);
  const mov = calculateMOV(dex, str, siz, age);
  const { build, damageBonus } = calculateBuildAndDamageBonus(str, siz);

  const skills: Record<string, any> = {};
  SKILL_CATALOGUE.forEach((s) => {
    skills[s.key] = {
      base: s.base,
      value: s.base,
      checked: false,
      isOccupation: false,
    };
  });

  // Apply language own base
  skills["language_own"].base = edu;
  skills["language_own"].value = edu;

  // Apply dodge base
  skills["dodge"].base = Math.floor(dex / 2);
  skills["dodge"].value = Math.floor(dex / 2);

  // Override with provided skills
  if (data.skills) {
    Object.keys(data.skills).forEach((k) => {
      if (skills[k]) {
        skills[k] = { ...skills[k], ...data.skills![k] };
      }
    });
  }

  const sanMax = calculateMaxSAN(skills["cthulhu_mythos"].value);

  return {
    schemaVersion: "1.0",
    createdAt: data.createdAt || now,
    updatedAt: now,

    name: data.name || "Unknown",
    player: data.player || "",
    occupation: data.occupation || "",
    age,
    sex: data.sex || "",
    residence: data.residence || "",
    birthplace: data.birthplace || "",
    portrait: data.portrait || "",

    STR: createAttribute(str),
    CON: createAttribute(con),
    SIZ: createAttribute(siz),
    DEX: createAttribute(dex),
    APP: createAttribute(app),
    INT: createAttribute(int),
    POW: createAttribute(pow),
    EDU: createAttribute(edu),

    luck: data.luck || 50,
    startingLuck: data.startingLuck || data.luck || 50,

    hp: { max: hpMax, current: data.hp?.current ?? hpMax },
    mp: { max: mpMax, current: data.mp?.current ?? mpMax },
    san: {
      max: sanMax,
      current: data.san?.current ?? sanStarting,
      starting: sanStarting,
    },
    mov,
    build,
    damageBonus,

    skills,

    occupationPointsTotal: data.occupationPointsTotal || 0,
    occupationPointsSpent: data.occupationPointsSpent || 0,
    personalPointsTotal: data.personalPointsTotal || int * 2,
    personalPointsSpent: data.personalPointsSpent || 0,

    personalDescription: data.personalDescription || "",
    ideology: data.ideology || "",
    significantPeople: data.significantPeople || "",
    meaningfulLocations: data.meaningfulLocations || "",
    treasuredPossessions: data.treasuredPossessions || "",
    traits: data.traits || "",
    injuriesScars: data.injuriesScars || "",
    phobiasManias: data.phobiasManias || "",
    arcaneTomesSpells: data.arcaneTomesSpells || "",
    encountersWithEntities: data.encountersWithEntities || "",

    equipment: data.equipment || [],
    cashOnHand: data.cashOnHand || 0,
    spendingLevel: data.spendingLevel || "",
    assets: data.assets || "",

    weapons: data.weapons || [],
    notes: data.notes || "",
  };
}
