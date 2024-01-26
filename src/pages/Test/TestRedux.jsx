import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { logOutUser } from "../../app/userSlice";

export default function TestRedux() {
  const userId = useSelector((state) => state.user.user.id || null);
  const username = useSelector((state) => state.user.user.username);
  const position = useSelector((state) => state.user.user.position);
  const appStatus = useSelector((state) => state.user.user.appStatus);
  const userToken = useSelector((state) => state.user.user.token || null);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutUser());
  }

  return (
    <>
      <div>{userId}</div>
      <div>{username}</div>
      <div>{position}</div>
      <div>{appStatus}</div>
      <div>{userToken}</div>
      <button onClick={handleLogOut}>Log out</button>
    </>
  );
}
