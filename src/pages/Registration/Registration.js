import { UserOutlined, MailOutlined } from '@ant-design/icons';
import Authform from '../../components/Authform';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { registerUser } from '../../app/userSlice';

import { verifyRegLink } from '../../services/auth'

// const validateTokenWithServer = async (token) => {
//     try {
//       const response = await fetch("/api/auth/register");
//       const data = await response.json();
//       console.log('Response:', data);
  
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
  const {token } = useParams();
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const handleVerification = async () => {
      await verifyRegLink(token, setEmail);
    //   console.log('Email after verification:', email);
    };
  
    handleVerification();
  }, [token, email]); 

  
  
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
//   navigate('/login')
  console.log(data)
  dispatch(registerUser(data)).then(() => navigate('/login'));
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