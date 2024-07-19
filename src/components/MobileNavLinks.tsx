import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/me"
        className="flex items-center text-lg bg-white font-bold hover:text-green-800"
      >
        Your Profile
      </Link>
      <Link
        to="/my-order-status"
        className="font-bold text-lg hover:text-green-800"
      >
        {" "}
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex items-center text-lg bg-white font-bold hover:text-green-800"
      >
        Manage Restaurant
      </Link>
      <Button
        variant="ghost"
        onClick={() => logout()}
        className="flex items-center px-3 font-bold text-white bg-green-700 text-lg hover:bg-green-900"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
