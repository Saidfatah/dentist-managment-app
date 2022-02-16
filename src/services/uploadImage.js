/* eslint-disable no-restricted-globals */
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";
import updateClientAddImage from "./updateCLient.addImage";

const uploadImage = async (image, id, dispatch) => {
  const imageFile = image.imageFile;
  if (imageFile) {
    let fileName = imageFile.name;
    const metaData = {
      contentType: imageFile.type,
    };
    const storageRef = ref(storage, "images/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile, metaData);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (err) => {
        dispatch.clients.finishedUploadingImage(dispatch);
        console.log(err);
      },
      async (url) => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

        await updateClientAddImage(id, imageUrl, image.width, image.height);

        location.reload();
      }
    );
  }
};

export default uploadImage;
