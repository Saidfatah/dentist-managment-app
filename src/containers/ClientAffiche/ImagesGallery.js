/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Icon, Loader } from "../../components";
import Modal from "../../components/Modal";

const ImageUploadForm = ({ uploadImage, imageSubmitStatus }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (image !== "" && image) {
      uploadImage({ image });
    }
  }, [image]);

  const onChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      var url = URL.createObjectURL(files[0]);
      var img = new Image();

      img.onload = () => {
        setImage({
          imageFile: files[0],
          height: img.height,
          width: img.width,
        });
        URL.revokeObjectURL(img.src);
      };
      img.src = url;
    }
  };

  return (
    <form>
      <label className="w-12 h-12  border-green-500 border-2 rounded-md flex justify-center items-center shadow-xl ">
        {imageSubmitStatus === "SUBMIT_PROGRESS" ? (
          <Loader />
        ) : (
          <>
            <Icon name="ADD" classes=" text-green-500" />
            <input type="file" className=" hidden" onChange={onChange} />
          </>
        )}
      </label>
    </form>
  );
};

const scaleDimension = ({ height, width }) => {
  let scale = 0.4;
  let originalAspectRation = width / height;
  if (height <= width) {
    originalAspectRation = height / width;
    scale = 1.5;
  }

  console.log({ originalAspectRation });

  return {
    height: height * originalAspectRation * scale,
    width: width * originalAspectRation * scale,
  };
};
const ImagesGallery = ({
  uploadImage,
  imageSubmitStatus,
  client,
  showModal,
}) => {
  const [selectedImage, setSelectedImage] = useState({});

  const { images } = client;

  return (
    <div className="shadow-md rounded-lg cursor-pointer p-4 mb-2 border-2 border-gray-200 ">
      <div className=" flex flex-wrap ">
        {images &&
          images.map((image) => (
            <button
              onClick={() => {
                showModal({ modal_id: "IMAGE_MODAL" });
                setSelectedImage(image);
              }}
              className="  w-12 h-12 overflow-hidden rounded-md mb-4 mr-4"
            >
              <img
                src={image.url}
                alt="client tooth"
                className="w-full h-full  bg-green-200"
              />
            </button>
          ))}
        <ImageUploadForm
          uploadImage={uploadImage}
          imageSubmitStatus={imageSubmitStatus}
        />
        <Modal
          id="IMAGE_MODAL"
          height={scaleDimension(selectedImage).height}
          width={scaleDimension(selectedImage).width}
        >
          <img
            src={selectedImage.url}
            style={{
              height: scaleDimension(selectedImage).height,
              width: scaleDimension(selectedImage).width,
            }}
            // height={selectedImage.height}
            // width={selectedImage.width}
            alt="client tooth"
          />
        </Modal>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    imageSubmitStatus: state.clients.imageSubmitStatus,
  }),
  (dispatch) => ({
    uploadImage: dispatch.clients.uploadImage,
    showModal: dispatch.UI.showModal,
  })
)(ImagesGallery);
