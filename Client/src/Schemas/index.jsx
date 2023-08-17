import * as Yup from "yup";

const SignUpSchema = Yup.object({
  userName: Yup.string().min(3).max(25).required("Your name is required"),
  email: Yup.string().email().required("Your email is required"),
  password: Yup.string()
    .min(8)
    .required("Your password must contain atleast 8 letters"),
});

const LoginSchema = Yup.object({
  userName: Yup.string().min(3).max(25).required("Your name is required"),
  // email: Yup.string().email().required("Your email is required"),
  password: Yup.string()
    .min(8)
    .required("Your password must contain atleast 8 letters"),
});

export { SignUpSchema, LoginSchema };
