import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserMenu from "./UserMenu";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      <span className="flex space-x-2 items-center">
        {isAuthenticated ? (
          <>
            <Link
              to="/my-order-status"
              className="font-bold hover:text-green-800"
            >
              {" "}
              Order Status
            </Link>
            <UserMenu />
          </>
        ) : (
          <div className="flex items-center gap-4 justify-between">
            <Link to="/about" className="text-lg font-bold text-green-800">
              About
            </Link>
            <Link to="/contact" className="text-lg font-bold text-green-800">
              Contact
            </Link>
            <Button
              onClick={async () => await loginWithRedirect()}
              variant="ghost"
              className="font-bold px-8 bg-green-700 text-lg hover:bg-green-900 hover:text-white text-white"
            >
              Log In
            </Button>
          </div>
        )}
      </span>
    </>
  );
};

export default MainNav;
