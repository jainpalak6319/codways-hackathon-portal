import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  console.log("Home Auth State:", auth);
  const handleLogin = () => {
    dispatch(
      loginSuccess({
        user: {
          name: "Palak",
          role: "admin",
        },
        token: "dummy_token",
      })
    );
  };

  return (
    <div className="container mt-5">
      <h1>Redux Test</h1>

      <button
        className="btn btn-primary"
        onClick={handleLogin}
      >
        Test Login
      </button>

      <pre>{JSON.stringify(auth, null, 2)}</pre>
      <Link
  to="/admin/dashboard"
  className="btn btn-success ms-3"
>
  Go To Admin Dashboard
</Link>
    </div>
    


  );
}

export default Home;