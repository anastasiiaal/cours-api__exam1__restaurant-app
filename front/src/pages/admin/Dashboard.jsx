import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);

  console.log(token, user);

  return (
    <div>
      <h2>Hello {user?.email}</h2>
      <p>Restaurant list here</p>
    </div>
  );
};
