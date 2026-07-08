import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const auth = useSelector((state) => state.auth);

  console.log("Home Auth State:", auth);

  return (
    <div className="container mt-5">
      <h1>Hackathon Management Portal</h1>

      <h5 className="mt-4">Redux Auth State</h5>

      <pre>{JSON.stringify(auth, null, 2)}</pre>

      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-2">
          Login
        </Link>

        <Link to="/signup" className="btn btn-success">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Home;