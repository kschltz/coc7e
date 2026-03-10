export interface AgeModifiers {
  eduPenalty: number;
  strSizPenalty: number; // to be distributed
  strConDexPenalty: number; // to be distributed
  appPenalty: number;
  eduImprovementChecks: number;
  luckRolls: number;
}

export function getAgeModifiers(age: number): AgeModifiers {
  if (age >= 15 && age <= 19) {
    return {
      eduPenalty: 5,
      strSizPenalty: 5,
      strConDexPenalty: 0,
      appPenalty: 0,
      eduImprovementChecks: 0,
      luckRolls: 2,
    };
  }
  if (age >= 20 && age <= 39) {
    return {
      eduPenalty: 0,
      strSizPenalty: 0,
      strConDexPenalty: 0,
      appPenalty: 0,
      eduImprovementChecks: 1,
      luckRolls: 1,
    };
  }
  if (age >= 40 && age <= 49) {
    return {
      eduPenalty: 0,
      strSizPenalty: 0,
      strConDexPenalty: 5,
      appPenalty: 0,
      eduImprovementChecks: 2,
      luckRolls: 1,
    };
  }
  if (age >= 50 && age <= 59) {
    return {
      eduPenalty: 0,
      strSizPenalty: 0,
      strConDexPenalty: 10,
      appPenalty: 5,
      eduImprovementChecks: 3,
      luckRolls: 1,
    };
  }
  if (age >= 60 && age <= 69) {
    return {
      eduPenalty: 0,
      strSizPenalty: 0,
      strConDexPenalty: 20,
      appPenalty: 10,
      eduImprovementChecks: 4,
      luckRolls: 1,
    };
  }
  if (age >= 70 && age <= 79) {
    return {
      eduPenalty: 0,
      strSizPenalty: 0,
      strConDexPenalty: 40,
      appPenalty: 15,
      eduImprovementChecks: 4,
      luckRolls: 1,
    };
  }
  if (age >= 80 && age <= 89) {
    return {
      eduPenalty: 0,
      strSizPenalty: 0,
      strConDexPenalty: 80,
      appPenalty: 20,
      eduImprovementChecks: 4,
      luckRolls: 1,
    };
  }
  return {
    eduPenalty: 0,
    strSizPenalty: 0,
    strConDexPenalty: 0,
    appPenalty: 0,
    eduImprovementChecks: 0,
    luckRolls: 1,
  };
}
