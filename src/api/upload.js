import { post } from "../utils/apiHelper";
import { apiUrls } from "../utils/constants";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file); // Sử dụng đúng tên field

  try {
    const response = await post(apiUrls.answer, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Trả về dữ liệu từ phản hồi
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Ném lỗi để xử lý bên ngoài
  }
};
