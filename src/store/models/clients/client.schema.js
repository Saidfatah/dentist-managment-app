import { v4 } from "uuid";
export const thootNumbers = ["H1", "H2", "H3", "H4"];

export const sessionSchema = (
  toothNumber,
  intervention,
  price,
  received,
  reste
) => {
  return {
    date: new Date(),
    toothNumber: toothNumber || "NOT_ASSIGNED",
    intervention: intervention || "NOT_ASSIGNED",
    price: price || 0,
    received: received || 0,
    reste: reste || 0,
  };
};

export const clientSchema = (
  firstName,
  lastName,
  CIN,
  phone,
  age,
  profession,
  address,
  sessions,
  {
    healthProblems,
    ansthesia,
    péncilineAllergie,
    bleeding,
    bregnnant,
    observation,
  }
) => {
  return {
    id: v4(),
    firstName,
    lastName,
    phone: phone || "NOT_SET",
    age,
    profession,
    address,
    CIN,
    extraInfo: {
      healthProblems: healthProblems || "",
      ansthesia: ansthesia || "",
      péncilineAllergie: péncilineAllergie || false,
      bleeding: bleeding || false,
      bregnnant: bregnnant || false,
      observation: observation || "false",
    },
    initialBalance: 0,
    sessions: sessions || [],
    created_at: new Date(), //use firestor's date
    updated_at: new Date(), //use firestor's date
    appointments: [],
  };
};
