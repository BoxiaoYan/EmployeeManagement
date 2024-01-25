import { UserOutlined } from '@ant-design/icons';
import Authform from '../../components/Authform';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser,setCurrentUser } from '../../app/userSlice';

export default function Login() {

  const fields = [
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Data before authentication:', data);
  
    try {
      const user = await dispatch(authUser(data));
      console.log('User after authentication:', user);
  
      if (user.payload.id) {
        console.log('Successful login');
        dispatch(setCurrentUser(user.payload.id));
        navigate('/');
      } else {
        alert('Invalid username password');
      }
    } catch (err) {
      console.error('Authentication failed:', err);
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