import React, { useState } from "react";
import { connect } from "react-redux";
import { ActionButton } from "../../components";

const ImagesGallery = ({ uploadImage, imageSubmitStatus }) => {
  const [image, setImage] = useState();
  const onChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      setImage(files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      <ActionButton
        onClick={() => {
          uploadImage({ image });
        }}
      >
        upload image
      </ActionButton>
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
