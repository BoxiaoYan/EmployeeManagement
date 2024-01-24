import { UserOutlined } from '@ant-design/icons';
import Authform from '../components/Authform';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser,setCurrentUser } from '../app/userSlice';

export default function Login() {

  const fields = [
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    //gonna update with redux part
    // navigate('/')

    try{
      const user = await dispatch(authUser(data));
      console.log(user);

      if (user.payload.success) {
        console.log('Successful login');

        dispatch(setCurrentUser(user.payload.id));
        // dispatch(setCurrentToken(user.payload.token));
        navigate('/personal');
        
      } 
      else {
        alert("Invalid username or password");
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
