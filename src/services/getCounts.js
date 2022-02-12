import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const getCountsFromFirestore = async () => {
  try {
    const docRef = doc(db, "COUNTS/HkNwOOlP8b860gY6VLnn");
    const targetDocRef = await getDoc(docRef);
    return targetDocRef.data();
  } catch (error) {
    console.log(error);
  }
};

const getCounts = async () => {
  const countsFromCache = localStorage.getItem("COUNTS_DENTIST_APP");

  if (countsFromCache != undefined && countsFromCache != null) {
    const { counts, day_of_creation } = JSON.parse(countsFromCache);
    const current_day = new Date().getDay();
    if (current_day == day_of_creation) {
      return counts;
    }
  }

  const counts = await getCountsFromFirestore();

  localStorage.setItem(
    "COUNTS_DENTIST_APP",
    JSON.stringify({
      counts,
      day_of_creation: new Date().getDay(),
    })
  );
  return counts;
};

export default getCounts;
