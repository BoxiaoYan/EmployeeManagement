import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { authUser, setCurrentUser } from "../../app/userSlice";
import { verifySession } from "../../services/auth";

import Authform from "../../components/Authform";

export default function Login() {
  const fields = [
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip login if token is valid
    verifySession(navigate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    const response = await dispatch(authUser(data));
    if (!response.error) {
      message.success("Successful login");
      dispatch(setCurrentUser(response.payload));
      const position = response.payload.position;
      navigate(
        location.state?.from ||
          (position === "hr" ? "/hiring-management" : "/visa-status-management")
      );
    } else {
      message.error("Invalid username password");
    }
  };

  return (
    <div>
      <Authform
        buttonText="Login"
        onSubmit={onSubmit}
        title="Login to your account"
        fields={fields}
      />
    </div>
  );
}
