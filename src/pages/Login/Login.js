import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { authUser, setCurrentUser, setCurrentUserStatus, setCurrentUserEmail, setCurrentUserPosition } from "../../app/userSlice";
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
      dispatch(setCurrentUserStatus(response.payload.appStatus));
      dispatch(setCurrentUserEmail(response.payload.email));
      dispatch(setCurrentUserPosition(response.payload.position));
      const position = response.payload.position;
      const appStatus = response.payload.appStatus
      const user_id = response.payload.id;
      navigate(
        position === "hr"
          ? "/employee-profile-summary"
          : ( appStatus !== "Approved" ? `/onboarding-application/${user_id}` : `/personal-profile/${user_id}`)
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