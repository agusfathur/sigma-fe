import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Absensi } from "@/store/absensi/absensi.types";
import { Pegawai } from "@/store/pegawai/pegawai.types";

export function PegawaiAbsen({
  pegawai,
  absen,
}: {
  absen: Absensi[];
  pegawai: Pegawai[];
}) {
  const statusAbsen = (status: string) => {
    let text = "";
    let color = "";
    switch (status) {
      case "hadir":
        text = "Hadir";
        color = "bg-green-600 text-white";
        break;
      case "izin":
        text = "Izin";
        color = "bg-blue-600 text-white";
        break;
      case "cuti":
        text = "Cuti";
        color = "bg-cyan-600 text-white";
        break;
      case "sakit":
        text = "Sakit";
        color = "bg-gray-700 text-white";
        break;
      case "terlambat":
        text = "Terlambat";
        color = "bg-amber-600 text-whote";
        break;
      case "tidak_hadir":
        text = "Tidak Hadir";
        color = "bg-red-600 text-white";
        break;
      default:
        text = "Belum";
        color = "bg-gray-600 text-white";
        break;
    }

    return (
      <div
        className={`ml-auto mr-2 rounded-sm font-semibold ${color} px-2 py-1 text-xs font-semibold`}
      >
        {text}
      </div>
    );
  };
  return (
    <div className="space-y-8">
      {pegawai.map((pegawai, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`${pegawai.foto}`} alt="Avatar" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{pegawai.nama}</p>
            <p className="text-sm text-muted-foreground">
              {pegawai.jabatan.nama}
            </p>
          </div>
          {statusAbsen(
            absen.find((absen) => absen.pegawai_id === pegawai.id_pegawai)
              ?.status_absen as string,
          )}
        </div>
      ))}
    </div>
  );
}
