import { useSession } from "next-auth/react";
import UserProfileCard from "./UserProfileCard";
import UserProfileSkeleton from "./UserProfileSkeleton,";
import { DEFAULT_DASHBOARD_ICONS } from "@/constants/general";

const UserProfile = () => {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <UserProfileCard
          user={{
            name: session?.user?.name ?? "Unknown User",
            image:
              session?.user?.image ??
              `${DEFAULT_DASHBOARD_ICONS}/profile-icon.png`,
          }}
        />
      ) : (
        <UserProfileSkeleton />
      )}
    </>
  );
};

export default UserProfile;
