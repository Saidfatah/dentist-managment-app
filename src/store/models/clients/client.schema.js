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

//[TODO_BEKRINE]add attended(true/false) field here
export const appointmentSchema = (date) => {
  return {
    date,
  };
};

const getPropertyIfHas = (object, property) => {
  if (!object) return undefined;
  if (object.hasOwnProperty(property)) return object.property;
  return undefined;
};

export const personalInfoSchema = (
  firstName,
  lastName,
  phone,
  age,
  profession,
  address,
  isOrthoClient,
  CIN
) => ({
  firstName,
  lastName,
  phone: phone || "NOT_SET",
  age,
  profession,
  address,
  CIN,
  isOrthoClient: isOrthoClient || false,
});

export const clientSchema = (
  firstName,
  lastName,
  CIN,
  phone,
  age,
  profession,
  address,
  sessions,
  _extraInfo,
  firstAppointment,
  isOrthoClient
) => {
  return {
    id: v4(),
    perosnalInfo: personalInfoSchema(
      firstName,
      lastName,
      phone,
      age,
      profession,
      address,
      isOrthoClient,
      CIN
    ),
    extraInfo: {
      healthProblems: getPropertyIfHas(_extraInfo, "healthProblems") || "",
      anesthesia: getPropertyIfHas(_extraInfo, "anesthesia") || false,
      péncilineAllergie:
        getPropertyIfHas(_extraInfo, "péncilineAllergie") || false,
      bleeding: getPropertyIfHas(_extraInfo, "bleeding") || false,
      pregnant: getPropertyIfHas(_extraInfo, "pregnant") || false,
      observation: getPropertyIfHas(_extraInfo, "observation") || "",
    },
    initialBalance: 0,
    sessions: sessions || [],
    created_at: new Date(), //use firestor's date
    updated_at: new Date(), //use firestor's date
    appointments: (firstAppointment && [firstAppointment]) || [],
  };
};
