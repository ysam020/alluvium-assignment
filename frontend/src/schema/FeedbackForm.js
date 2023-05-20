import * as Yup from "yup";

const emailRegex =
  /[a-zA-Z0-9_]+(\.)?[a-zA-Z0-9_]+[@]{1}[a-zA-Z]+\.[a-zA-Z]{2,6}/;
const phoneRegex = /^[6-9][\d]{9}$/;

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email")
    .matches(emailRegex, "Invalid email"),

  subject: Yup.string()
    .trim()
    .min(5, "Subject must be atleast 5 characters")
    .max(25, "Maximun 25 Characters are allowed")
    .required("Please enter a subject"),

  message: Yup.string()
    .trim()
    .min(10, "Message must be atleast 10 characters")
    .max(150, "Maximun 150 Characters are allowed")
    .required("Please enter a message"),

  contact: Yup.string()
    .matches(phoneRegex, "Enter a valid phone number")
    .required("Please enter your number"),
});
