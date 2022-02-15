import uploadImage from "../../../../services/uploadImage";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, { image }, state) => {
  try {
    //
    dispatch.clients.startedUploadingImage();

    await uploadImage(image);
    dispatch.clients.finishedUploadingImage(dispatch);
  } catch (error) {
    dispatch.clients.imageUploadFailled({ error: error.message });
    console.log("updateShapes", error);
  }
};
