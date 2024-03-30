import React, { useEffect, useState } from "react";
import { api } from "../../../api/Api";
import { GrEdit } from "react-icons/gr";
const ProfileImg = ({ Alert, users, fetchData }) => {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [local, setLocal] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLocal(token);
    }
  }, []);

  const headers = {
    Authorization: `Token ${local}`,
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files && event.target.files[0];
    fetchData();
    if (imageFile) {
      setSelectedImage(imageFile);
      const img = new FormData();
      img.append("img", imageFile);
      api
        .patch("/user/info", img, { headers })
        .then((response) => {
          Alert("Фотография обновлена", "success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const renderImagePreview = () => {
    if (selectedImage) {
      return (
        <div className="image_preview">
          <img src={URL.createObjectURL(selectedImage)} alt="Preview" />
          <p className="edit">
            <GrEdit size={18} style={{ marginRight: "5px" }} />
            Изменить фотографию
          </p>
        </div>
      );
    } else {
      return (
        <div className="image_preview">
          <img
            src={"http://217.18.62.110/" + (users.img ? users.img : "")}
            alt=""
          />
          <p className="edit">
            <GrEdit size={18} style={{ marginRight: "5px" }} />
            Изменить фотографию
          </p>
        </div>
      );
    }
  };
  return (
    <div>
      <form onSubmit={handleImageChange}>
        <label>
          {renderImagePreview()}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
      </form>
    </div>
  );
};

export default ProfileImg;
