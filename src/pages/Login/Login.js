// import { UserOutlined } from '@ant-design/icons';
// import Authform from '../../components/Authform';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { authUser,setCurrentUser, setCurrentUserStatus, setCurrentUserEmail, setCurrentUserPosition } from '../../app/userSlice';

// export default function Login() {

//   const fields = [
//     {
//       placeholder: 'Username',
//       name: 'username',
//       type: 'text',
//       prefix: <UserOutlined />,
//       rules:[{
//         required:true,
//         message:"Username cannot be empty"
//       }]
//     },
//     {
//       placeholder: 'Password',
//       name: 'password',
//       type: 'password',
//       rules:[{
//         required:true,
//         message:"Password cannot be empty"
//       }]
//     }
//   ];

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     console.log('Data before authentication:', data);
  
//     try {
//       const user = await dispatch(authUser(data));
//       console.log('User after authentication:', user);
  
//       if (user.payload.id) {
//         console.log('Successful login');
//         dispatch(setCurrentUser(user.payload.id));
//         dispatch(setCurrentUserStatus(user.payload.appStatus));
//         dispatch(setCurrentUserEmail(user.payload.email));
//         dispatch(setCurrentUserPosition(user.payload.position));
//         if (user.payload.position === 'hr') {
//           navigate('/hr-profile');
//         } else {
//           navigate('/onboarding-application');
//         }
//       } else {
//         alert('Invalid username password');
//       }
//     } catch (err) {
//       console.error('Authentication failed:', err);
//     }
//   };


//   return (
//     <div>
//       <Authform
//         buttonText="Login"
//         onSubmit={onSubmit}
//         title="Login to your account"
//         fields={fields}
//       />
//     </div>
//   );
// }


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
        position === "hr"
          ? "/employee-profile-summary"
          : "/onboarding-application"
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