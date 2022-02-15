/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Icon, Loader } from "../../components";

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
      setImage(files[0]);
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

const ImagesGallery = ({ uploadImage, imageSubmitStatus, client }) => {
  const { images } = client;

  if (!images) return null;

  return (
    <div className="shadow-md rounded-lg cursor-pointer p-4 mb-2 border-2 border-gray-200 ">
      <div className=" flex flex-wrap ">
        {images.map((image) => (
          <div className="  w-12 h-12 overflow-hidden rounded-md mb-4 mr-4">
            <img src={image} className="w-full h-full" />
          </div>
        ))}
        <ImageUploadForm
          uploadImage={uploadImage}
          imageSubmitStatus={imageSubmitStatus}
        />
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
  })
)(ImagesGallery);
