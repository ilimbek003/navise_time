import axios from "axios";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const navigate = useNavigate();
//   const handleImageChange = (event) => {
//     const imageFile = event.target.files && event.target.files[0];
//     if (imageFile) {
//       setSelectedImage(imageFile);
//       const formData = new FormData();
//       formData.append("photo", imageFile);
//       axios
//         .post(url + "/profile/personal/edit", formData, { headers })
//         .then((response) => {
//           alert("success", response.data.messages);
//           personalChange();
//         })
//         .catch((error) => {
//           alert.error("Ошибка загрузки изображения:", error);
//         });
//     }
//   };
//   const renderImagePreview = () => {
//     if (selectedImage) {
//       return <img src={URL.createObjectURL(selectedImage)} alt="Preview" />;
//     } else {
//       return (
//         <img src={datas_personal ? datas_personal[0].avatar : ""} alt="" />
//       );
//     }
//   };
  return (
    <div className="container">
      <div className="flex_box" style={{ padding: "35px 0 0 0" }}>
        <IoIosArrowBack
          onClick={() => navigate("/dashboard/profile")}
          className="back"
          style={{ margin: "0" }}
          size={30}
        />
        <h1
          style={{ whiteSpace: "nowrap", width: "40%" }}
          className="title title_home"
        >
          Настройки профиля
        </h1>
        <div style={{ width: "33%" }} />
      </div>
      {/* <form onSubmit={handleImageChange}>
        <label>
          {renderImagePreview()}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </label>
      </form> */}
    </div>
  );
};

export default ProfileSettings;
