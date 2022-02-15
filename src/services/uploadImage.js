import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

const uploadImage = async (image, dispatch) => {
  // const url = file.url
  let fileName = image.name;
  //   if (fileName.indexOf("HEIC") > -1) fileName = fileName.replace("HEIC", "png");
  const metaData = {
    contentType: image.type,
  };
  const storageRef = ref(storage, "images/" + fileName);
  const uploadTask = uploadBytesResumable(storageRef, image, metaData);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (err) => console.log(err),
    async (url) => {
      // eslint-disable-next-line no-restricted-globals
      const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

      console.log(imageUrl);
      //   setTimeout(() => {
      //     //eslint-disable-next-line no-restricted-globals
      //     location.reload();
      //   }, 3000);
    }
  );
};

export default uploadImage;
