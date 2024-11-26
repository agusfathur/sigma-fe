import ContentSection from "@/components/custom/conten-separator";
import {
  IconCalendarDot,
  IconCalendarUser,
  IconCashRegister,
  IconFaceId,
  IconMoonStars,
  IconReportMoney,
} from "@tabler/icons-react";
import Link from "next/link";

const UserDashboardPage = () => {
  return (
    <ContentSection title="Dashboard" desc="Dashboard User">
      <div>
        <div className="h-80 w-full space-y-4 rounded border-b-2 border-t-2 border-slate-900 bg-white">
          {/* layer up */}
          <div className="my-2 flex justify-around space-x-4">
            <button className="flex h-20 w-20 cursor-pointer flex-col items-center justify-between rounded-sm border-[2px] border-black py-2 shadow-[2px_5px_0px_1px_rgba(0,0,0,1)] active:scale-95">
              <IconFaceId className="h-8 w-8 text-black" />
              <h5 className="text-center text-xs font-bold text-black">
                Absensi
              </h5>
            </button>

            <Link
              href={"/user/izin"}
              className="flex h-20 w-20 flex-col items-center rounded-sm border-[2px] border-black py-2 shadow-[2px_5px_0px_1px_rgba(0,0,0,1)] hover:scale-95 active:scale-90"
            >
              <IconCalendarDot className="h-8 w-8 text-black" />
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Izin
              </h5>
            </Link>
            <div className="flex h-20 w-20 flex-col items-center rounded-sm border-[2px] border-black py-2 shadow-[2px_5px_0px_1px_rgba(0,0,0,1)]">
              <IconCalendarUser className="h-8 w-8 text-black" />
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Jadwal
              </h5>
            </div>
          </div>
          {/* layer up end */}
          {/* layer down */}
          <div className="my-2 flex justify-around space-x-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black p-2">
                <IconCashRegister className="h-6 w-6 text-white" />
              </div>
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Gaji
              </h5>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black p-2">
                <IconMoonStars className="h-6 w-6 text-white" />
              </div>
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                THR
              </h5>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center rounded-full bg-black p-2">
                <IconReportMoney className="h-6 w-6 text-white" />
              </div>
              <h5 className="mt-2 text-center text-xs font-semibold text-black">
                Pinjaman
              </h5>
            </div>
          </div>
          {/* layer down end */}
        </div>
      </div>
    </ContentSection>
  );
};

export default UserDashboardPage;
