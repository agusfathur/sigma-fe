import { Metadata } from "next";
import ProfileIndex from "./ProfilePage";

export const metadata: Metadata = {
  title: "Profile",
};

const ProfilePage = () => {
  return (
    <>
      <ProfileIndex />
    </>
  );
};

export default ProfilePage;
