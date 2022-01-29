import { formatDate } from "../../../utils/formatDate";
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
    date: formatDate(new Date(), "_"), //store as strung following DD_MM_YYYY
    toothNumber: toothNumber,
    intervention: intervention,
    price: price || 0,
    received: received || 0,
    reste: reste || 0,
  };
};

//[TODO_BEKRINE]add attended(true/false) field here
// db.collection('chatDocs').where("chatMembers", "array-contains", { userId: "xyz", userName: "abc" });
export const appointmentSchema = (date) => {
  return {
    date, // store as strung following DD_MM_YYYY
    control: false,
    attended: false,
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
  phone,
  age,
  profession,
  address,
  CIN,
  isOrthoClient: isOrthoClient || false,
});

export const shapeSchema = (shapeName, left, top) => ({
  shapeName,
  left,
  top,
  id: v4(),
});
export const clientSchema = (
  reference,
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
  isOrthoClient,
  firstPayment
) => {
  return {
    reference,
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
    shapes: [shapeSchema("ARROW_RIGHT", 50, 50)], //
    initialBalance: 0,
    sessions: sessions || [],
    created_at: formatDate(new Date(), "_"), //stored as DD_MM_YYYY
    updated_at: formatDate(new Date(), "_"), //use firestor's date
    appointments: (firstAppointment && [firstAppointment]) || [],
    payments: (firstPayment && [firstPayment]) || [],
  };
};
