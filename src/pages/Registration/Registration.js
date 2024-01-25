import { UserOutlined, MailOutlined } from '@ant-design/icons';
import Authform from '../components/Authform';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { registerUser } from '../app/userSlice';

import { verifyRegLink } from '../services/auth'

export default function Registration() {
  // confirm the url has token
  const navigate = useNavigate();
  const location = useLocation();
  const {token } = useParams();
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

//   useEffect(() => {
//     const handleVerification = async () => {
//       await verifyRegLink(token, setEmail);
//       console.log('Email after verification:', email);
//     };
  
//     handleVerification();
//   }, [token, email]); 

useEffect(() => {
    const handleVerification = async () => {
      try {
        // Wait for email verification to complete
        await verifyRegLink(token, setEmail);
      } catch (error) {
        console.error('Error during verification:', error);
        // Handle the error if needed
      }
    };
    handleVerification();
}, [token]);

  
  
  const fields = [
    {
        placeholder: email,
        defaultValue:email,
        name: 'email',
        type: 'email',
        prefix: <MailOutlined />,
    },
    {
      placeholder: 'Username',
      name: 'username',
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



  const onSubmit = async (data) => {
    try {
      // Wait for email verification to complete
      await verifyRegLink(token, setEmail);
  
      // Now, the email state has been updated
      console.log('Email before submission:', email);
      console.log('Submitted data:', data);
  
      // Dispatch registerUser action
      dispatch(registerUser({ ...data, email })).then(() => navigate('/signin'));
    } catch (error) {
      console.error('Error during verification:', error);
      // Handle the error if needed
    }
  };

  return (
    <div>
        {email===''? (<>Invalid</>):( <Authform
        buttonText="Create your account"
        onSubmit={onSubmit}
        title="Registration"
        fields={fields}
        email ={email}
      />)}

    </div>
  );
}