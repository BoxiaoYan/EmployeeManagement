import { UserOutlined, MailOutlined } from '@ant-design/icons';
import Authform from '../components/Authform';
// import { useDispatch } from 'react-redux';
// import { authUser } from 'app/userSlice';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

// const validateTokenWithServer = async (token) => {
//     try {
//       const response = await fetch(`https://your-api-endpoint.com/validate-token?token=${token}`);
//       const data = await response.json();
  
//       return data.isValid;
//     } catch (error) {
//       console.error('Error validating token:', error);
//       return false;
//     }
//   };

export default function Registration() {
  // confirm the url has token
  const navigate = useNavigate();
  const location = useLocation();
  const {token} = useParams();

//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const isValidToken = await validateTokenWithServer(token);

//         if (!isValidToken) {
//             navigate('/error');
//         }

//       } catch (error) {
//         console.error('Error during registration:', error);
//       }
//     };

//     fetchData();
//   }, [navigate, location.search]);
  
  
  const fields = [
    {
        placeholder: 'email',
        name: 'email',
        type: 'email',
        prefix: <MailOutlined />,
        rules:[{
            type: 'email',
            message: 'Please enter a valid email address',
        },
        {
            required:true,
            message:'Email address cannot be empty'
        }
        ],
    },
    {
      placeholder: 'Username',
      name: 'Username',
      type: 'text',
      prefix: <UserOutlined />,
      rules:[{
        required:true,
        message:"Username cannot be empty"
      }]
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      rules:[{
        required:true,
        message:"Password cannot be empty"
      }]
    }
  ];



const onSubmit = data => {
  navigate('/login')
//   dispatch(signUpUser(data)).then(() => navigate('/login'));
};

  return (
    <div>
      <Authform
        buttonText="Create your account"
        onSubmit={onSubmit}
        title="Registration"
        fields={fields}
      />
    </div>
  );
}
