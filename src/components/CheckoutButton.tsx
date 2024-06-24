import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfile, {
  UserFormData,
} from "@/forms/user-profile-forms/UserProfile";
import { useGetMyUser } from "@/api/myUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoadingCheckout: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoadingCheckout }: Props) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const { currentUser, isLoading: userLoading } = useGetMyUser();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-green-800 italic flex-1">
        Log In to checkout
      </Button>
    );
  }

  if (isLoading || !currentUser || isLoadingCheckout) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-green-800 italic flex-1">
          Check Out
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfile
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={userLoading}
          title="Confirm Delivery Details"
          buttonText="Continue To Payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
