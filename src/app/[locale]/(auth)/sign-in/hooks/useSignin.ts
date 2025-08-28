import { useRouter } from "@/navigation";

const useSignin = () => {
  const router = useRouter();
  const getCallbackUrl = () => {
    const callbackUrl =
      new URL(location.href).searchParams.get("callbackUrl") || "/";
    const url = new URL(callbackUrl, window.location.origin);
    return {
      pathname: url.pathname as "/" | "/pathnames",
      query: Object.fromEntries(url.searchParams.entries()),
    };
  };

  const navigate = () => {
    router.push(getCallbackUrl());
  };

  return { navigate };
};

export default useSignin;
