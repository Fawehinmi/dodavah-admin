import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import ApTextInput from "../../components/input/TextInput";
import ApButton from "../../components/button";
const FormSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
});

export const SigninPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<{ show: boolean; error?: string }>({
    show: false,
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (!result?.error) {
      router.replace("/");
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setError({ show: true, error: result.error });
    }, 2000);

    setTimeout(() => {
      setError({ show: false });
    }, 5000);
  };
  return (
    <div className=" w-screen h-screen bg-gray-50 flex items-center justify-center">
      <div className="shadow-lg px-5 py-8 rounded-lg bg-white min-w-[50%]">
        <h1 className="font-semibold text-lg  text-center">Welcome back, Admin</h1>
        <p className="text-center text-sm">Welcome back! Please enter your details</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className="pt-3">
              <ApTextInput
                label="Email"
                name="email"
                type="text"
                className="mb-4"
                labelClassName="mb-0 text-sm"
              />

              <ApTextInput label="Password" name="password" type="password" labelClassName="mb-0 text-sm" />

              <div
                className={`flex justify-${
                  error.show ? "between" : "end"
                } py-1 items-center`}
              >
                {error.show && (
                  <span className=" text-red-400">{error.error}</span>
                )}

                <a
                  href="/forgotpassword"
                  className="text-xs lowercase block text-left font-bold text-red-400"
                >
                  Forgot Password?
                </a>
              </div>

              <ApButton
                className={`w-full py-3 rounded-full text-white my-2 hover:bg-rose-600  active:text-white ${loading ? "bg-rose-300 hover:bg-rose-300" : "bg-rose-500"}`}
                name="Sign In"
                loading={loading}
                htmlType="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
