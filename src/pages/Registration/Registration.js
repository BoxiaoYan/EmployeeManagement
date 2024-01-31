import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";

import { registerUser } from "../../app/userSlice";
import { verifyRegLink } from "../../services/auth";

import Authform from "../../components/Authform";
import RegLinkExpired from "../ErrorPages/RegLinkExpired";

export default function Registration() {
  // confirm the url has token
  const navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();

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
    // Wait for email verification to complete
    await verifyRegLink(token, setEmail, setErrorMsg);

    // Dispatch registerUser action
    const response = await dispatch(registerUser({ ...data, email }));
    if (!response.error) {
      message.success("You have successfully registered. Please log in.");
      navigate("/login");
    } else {
      const error = response.payload;
      console.log(error);
      if (error === "User is already registered") {
        message.error("You have already registered. Please log in.");
        navigate("/login");
      } else if (error === "Username is already existed") {
        message.error("Username is already existed.");
      } else {
        navigate("/error/server-error");
      }
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