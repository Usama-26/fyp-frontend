import { useAccounts } from "@/context/AccountContext";
import { GoogleLogin } from "@react-oauth/google";

export function GoogleLoginBtn({ userType }) {
  const { handleGoogleAuth } = useAccounts();
  return (
    <GoogleLogin
      text="continue_with"
      width={320}
      useOneTap
      onSuccess={(credentialResponse) => {
        handleGoogleAuth(credentialResponse.credential, userType);
      }}
      onError={() => console.log("Failed")}
    />
  );
}
