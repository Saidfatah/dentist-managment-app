import { doc, addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Add a new document in collection "cities"

const users = [
  {
    reference: "C0001",
    id: "2b78d93b-07dc-4db8-93af-f04e9d4a9f80",
    perosnalInfo: {
      firstName: "Said",
      lastName: "Fatah",
      phone: "067786827687",
      address: "ouarzazate tabount azeaz ",
      age: "21",
      profession: "dev eaze ",
      CIN: "P243243",
      isOrthoClient: false,
    },
    extraInfo: {
      healthProblems: "azeaz",
      anesthesia: "yes ",
      péncilineAllergie: "oui ",
      bleeding: "none",
      pregnant: "oui ",
      observation: "azeazeaz aze azeaze aze azeaze aze \n\nazeaze\naze\nazeaze",
    },
    initialBalance: -3047,
    sessions: [
      {
        date: "24_01_2022",
        toothNumber: "NOT_ASSIGNED",
        intervention: "intervention",
        price: 0,
        received: "0",
        reste: "0",
      },
      {
        date: "24_01_2022",
        toothNumber: "NOT_ASSIGNED",
        intervention: "hydt lih dersa",
        price: 0,
        received: 0,
        reste: 0,
      },
      {
        date: "24_01_2022",
        toothNumber: "NOT_ASSIGNED",
        intervention: "hydt lih dersa",
        price: 0,
        received: 0,
        reste: 0,
      },
      {
        date: "24_01_2022",
        toothNumber: "NOT_ASSIGNED",
        intervention: "test",
        price: 0,
        received: 0,
        reste: 0,
      },
      {
        date: "24_01_2022",
        toothNumber: "H1",
        intervention: "azaz",
        price: 0,
        received: 0,
        reste: 0,
      },
    ],
    created_at: "18_01_2022",
    updated_at: "18_01_2022",
    appointments: [
      {
        date: "2022_01_31",
        control: false,
        attended: false,
      },
    ],
    payments: [
      {
        fullName: "Said fatah",
        date: "23_01_2022",
        amount: "8",
        refrence: "P0001",
      },
      {
        fullName: "Said fatah",
        date: "23_01_2022",
        amount: "8",
        refrence: "P0002",
      },
      {
        fullName: "Said fatah",
        date: "23_01_2022",
        amount: "4",
        refrence: "P0003",
      },
      {
        fullName: "Said fatah",
        date: "23_01_2022",
        amount: "7",
        refrence: "P0004",
      },
      {
        fullName: "SaidFatah",
        date: "23_01_2022",
        amount: "6",
        refrence: "P0005",
      },
      {
        fullName: "SaidFatah",
        date: "23_01_2022",
        amount: "6",
        refrence: "P0006",
      },
      {
        fullName: "SaidFatah",
        date: "30_01_2022",
        amount: "8",
        refrence: "P0001",
      },
    ],
    hasAttended: true,
    shapes: [
      {
        shapeName: "ARROW_LEFT",
        left: 195,
        top: 30,
        id: "8ae08f18-baf3-44aa-9f04-544aa3c4fd1d",
      },
      {
        shapeName: "ARROW_LEFT",
        left: 11,
        top: 91,
        id: "c52adad5-93a1-4a79-8181-bb12b5cee551",
      },
    ],
  },
  {
    reference: "C0001",
    id: "9c43f80d-f0b9-4cb5-8010-6c400087498e",
    perosnalInfo: {
      firstName: "eto",
      lastName: "eto",
      phone: "0638165046",
      age: "modir",
      profession: "cameron",
      CIN: "P243244",
      isOrthoClient: false,
    },
    extraInfo: {
      healthProblems: "",
      anesthesia: false,
      péncilineAllergie: false,
      bleeding: false,
      pregnant: false,
      observation: "",
    },
    initialBalance: 0,
    sessions: [],
    created_at: "24_01_2022",
    updated_at: "24_01_2022",
    appointments: [
      {
        date: "2022_01_31",
        control: false,
        attended: false,
      },
    ],
    payments: [],
    hasAttended: true,
  },
  {
    reference: "C0001",
    id: "09d5ea1f-7547-40bb-b1f0-ec9dc51d0def",
    perosnalInfo: {
      firstName: "FATAH",
      lastName: "SAID",
      phone: "0638165046",
      age: "azaz",
      profession: "TABOUNT  TARMIGT",
      CIN: "P243245",
      isOrthoClient: true,
    },
    extraInfo: {
      healthProblems: "",
      anesthesia: false,
      péncilineAllergie: false,
      bleeding: false,
      pregnant: false,
      observation: "",
    },
    initialBalance: 0,
    sessions: [],
    created_at: "24_01_2022",
    updated_at: "24_01_2022",
    appointments: [
      {
        date: "2022_01_31",
        control: false,
        attended: false,
      },
    ],
    payments: [],
    hasAttended: true,
  },
  {
    reference: "C0001",
    id: "5aa49219-5f15-499c-906d-204365bff955",
    perosnalInfo: {
      firstName: "bekrine",
      lastName: "mohamed",
      phone: "0638165046",
      age: "12",
      profession: "dev",
      address: "TABOUNT  TARMIGT",
      CIN: "P243246",
      isOrthoClient: true,
    },
    extraInfo: {
      healthProblems: "",
      anesthesia: false,
      péncilineAllergie: false,
      bleeding: false,
      pregnant: false,
      observation: "",
    },
    initialBalance: 0,
    sessions: [],
    created_at: "24_01_2022",
    updated_at: "24_01_2022",
    appointments: [
      {
        date: "2022_01_31",
        control: false,
        attended: false,
      },
    ],
    payments: [],
    hasAttended: true,
  },
  {
    reference: "C0001",
    id: "fd52e676-b9ea-48e6-8d9f-fb2e3c777bca",
    perosnalInfo: {
      firstName: "NAIM",
      lastName: "Ayoub",
      phone: "09896876653",
      age: "19",
      profession: "dev",
      address: "tarmikt",
      CIN: "P243250",
      isOrthoClient: false,
    },
    extraInfo: {
      healthProblems: "",
      anesthesia: false,
      péncilineAllergie: false,
      bleeding: false,
      pregnant: false,
      observation: "",
    },
    initialBalance: 0,
    sessions: [],
    created_at: "24_01_2022",
    updated_at: "24_01_2022",
    appointments: [
      {
        date: "2022_01_31",
        control: false,
        attended: false,
      },
    ],
    payments: [],
    hasAttended: true,
  },
  {
    reference: "C0001",
    id: "9794ba63-94c2-46dd-9ca0-876e98eb93f4",
    perosnalInfo: {
      firstName: "abdelkghafour",
      lastName: "chouai",
      phone: "",
      age: "",
      profession: "",
      address: "",
      CIN: "",
      isOrthoClient: false,
    },
    extraInfo: {
      healthProblems: "",
      anesthesia: false,
      péncilineAllergie: false,
      bleeding: false,
      pregnant: false,
      observation: "",
    },
    shapes: [
      {
        shapeName: "ARROW_RIGHT",
        left: 50,
        top: 50,
        id: "7b6293b6-954d-419d-8ba4-61ea6bfc1577",
      },
    ],
    initialBalance: 0,
    sessions: [],
    created_at: "30_01_2022",
    updated_at: "30_01_2022",
    appointments: [
      {
        date: "2022_01_31",
        control: false,
        attended: false,
      },
    ],
    payments: [],
    hasAttended: true,
  },
];

export default () => {
  users.forEach(async (user) => {
    try {
      const userRes = await addDoc(collection(db, "clients"), { ...user });
      console.log(userRes);
    } catch (error) {
      console.log(error);
    }
  });
};
