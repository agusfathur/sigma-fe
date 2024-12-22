import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PermohonanIzin } from "@/store/permohonanIzin/permohonanIzin.types";

export function PegawaiIzin({ data }: { data: PermohonanIzin[] }) {
  return (
    <div className="space-y-8">
      {data.map((izin, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`${izin.pegawai.foto}`} alt="Avatar" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {izin.pegawai.nama}
            </p>
            <p className="text-sm text-muted-foreground">
              {izin.keterangan}{" "}
              {izin.tanggal_dari.split("T")[0].split("-").reverse().join("/")} -
              {izin.tanggal_sampai.split("T")[0].split("-").reverse().join("/")}
            </p>
          </div>
          <div className="ml-auto mr-2 rounded-sm bg-rose-600 px-2 py-1 text-xs font-semibold text-white">
            {izin.total_hari} Hari
          </div>
        </div>
      ))}
    </div>
  );
}
