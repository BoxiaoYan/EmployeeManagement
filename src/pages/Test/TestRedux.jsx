import { useSelector } from "react-redux";

export default function TestRedux() {
  const userId = useSelector((state) => state.user.user.id || null);
  const username = useSelector((state) => state.user.user.username);
  const position = useSelector((state) => state.user.user.position);
  const appStatus = useSelector((state) => state.user.user.appStatus);
  const userToken = useSelector((state) => state.user.user.token || null);

  return (
    <>
      <div>{userId}</div>
      <div>{username}</div>
      <div>{position}</div>
      <div>{appStatus}</div>
      <div>{userToken}</div>
    </>
  );
}
