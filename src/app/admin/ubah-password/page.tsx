import { Metadata } from "next";
import UbahPasswordForm from "./(form)/UbahPasswordForm";

export const metadata: Metadata = {
  title: "Ubah Password",
};

const ChangePassword = () => {
  return (
    <>
      <div className="mb-5 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Ubah Password</h1>
      </div>

      <div>
        <UbahPasswordForm />
      </div>
    </>
  );
};

export default ChangePassword;
