import { UserOutlined, MailOutlined } from "@ant-design/icons";
import Authform from "../../components/Authform";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { registerUser } from "../../app/userSlice";

import { verifyRegLink } from "../../services/auth";

import RegLinkExpired from "../ErrorPages/RegLinkExpired";

export default function Registration() {
  // confirm the url has token
  const navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

  //   useEffect(() => {
  //     const handleVerification = async () => {
  //       await verifyRegLink(token, setEmail);
  //       console.log('Email after verification:', email);
  //     };

  //     handleVerification();
  //   }, [token, email]);

  useEffect(() => {
    verifyRegLink(token, setEmail, setErrorMsg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fields = [
    {
      placeholder: email,
      defaultValue: email,
      name: "email",
      type: "email",
      prefix: <MailOutlined />,
    },
    {
      placeholder: "Username",
      name: "username",
      type: "text",
      prefix: <UserOutlined />,
      rules: [
        {
          required: true,
          message: "Username cannot be empty",
        },
      ],
    },
    {
      placeholder: "Password",
      name: "password",
      type: "password",
      rules: [
        {
          required: true,
          message: "Password cannot be empty",
        },
      ],
    },
  ];

  const onSubmit = async (data) => {
    try {
      // Wait for email verification to complete
      await verifyRegLink(token, setEmail, setErrorMsg);

      // Now, the email state has been updated
      // console.log("Email before submission:", email);
      // console.log("Submitted data:", data);

      // Dispatch registerUser action
      dispatch(registerUser({ ...data, email, navigate }));
    } catch (error) {
      console.error("Error during verification:", error);
      // Handle the error if needed
    }
  };

  return (
    <div>
      {errorMsg ? (
        <RegLinkExpired errorMsg={errorMsg} />
      ) : (
        <Authform
          buttonText="Create your account"
          onSubmit={onSubmit}
          title="Registration"
          fields={fields}
          email={email}
        />
      )}
    </div>
  );
}
