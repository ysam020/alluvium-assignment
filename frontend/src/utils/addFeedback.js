import axios from "axios";

export async function addFeedback(values, file, setFile) {
  const { email, subject, message, contact, status } = values;
  const formData = {
    file,
    email,
    subject,
    message,
    contact,
    status,
  };

  try {
    await axios.post(
      `https://alluvium.onrender.com/feedback/${email}`,
      formData
    );
    setFile("");
    alert("Feedback added successfully");
  } catch (error) {
    alert(error);
  }
}
