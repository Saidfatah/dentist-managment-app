import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";

const updateClientAddImageInFirestore = async (
  id,
  newImageUrl,
  width,
  height
) => {
  try {
    const targetDocRef = doc(db, "clients/" + id);
    await updateDoc(targetDocRef, {
      images: arrayUnion({ url: newImageUrl, width, height }),
    });
  } catch (error) {
    console.log(error);
  }
};

const updateClientAddImage = async (id, newImageUrl, width, height) => {
  await updateClientAddImageInFirestore(id, newImageUrl, width, height);

  //   localStorage.setItem(
  //     "TODAYS_CLIENTS",
  //     JSON.stringify({
  //       clients: newTodaysClients,
  //       day_of_creation: new Date().getDay(),
  //     })
  //   );

  return undefined;
};

export default updateClientAddImage;
