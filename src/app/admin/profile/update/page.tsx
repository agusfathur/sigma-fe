import { Metadata } from "next";
import ProfileForm from "./ProfileForm";

export const metadata: Metadata = {
  title: "Update Profile",
};

const UpdateProfilePage = () => {
  return (
    <>
      <ProfileForm />
    </>
  );
};

export default UpdateProfilePage;
