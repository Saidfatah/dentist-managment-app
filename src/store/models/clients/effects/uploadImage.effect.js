import uploadImage from "../../../../services/uploadImage";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (dispatch, { image }, state) => {
  try {
    const visitedClient = state.clients.visitedClient;
    if (visitedClient) {
      const { id } = visitedClient;
      dispatch.clients.startedUploadingImage();
      await uploadImage(image, id, dispatch);
    }
  } catch (error) {
    dispatch.clients.imageUploadFailled({ error: error.message });
    console.log("updateShapes", error);
  }
};
