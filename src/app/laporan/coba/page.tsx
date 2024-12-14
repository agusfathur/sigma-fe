import dynamic from "next/dynamic";

// Dynamic import untuk mencegah SSR error
const PayrollReport = dynamic(() => import("./(component)/PayrollReport"));

const PayrollPage: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <PayrollReport />
    </div>
  );
};

export default PayrollPage;
