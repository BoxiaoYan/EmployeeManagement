import { UserOutlined } from "@ant-design/icons";
import Authform from "../../components/Authform";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authUser, setCurrentUser } from "../../app/userSlice";
import { useEffect } from "react";

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
  }, []);

  const onSubmit = async (data) => {
    const response = await dispatch(authUser(data));
    if (!response.error) {
      console.log("Successful login");
      dispatch(setCurrentUser(response.payload));
      navigate(location.state?.from || "/");
    } else {
      alert("Invalid username password");
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
