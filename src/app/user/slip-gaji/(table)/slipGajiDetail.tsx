"use client";
import { useJabatanStore } from "@/store/jabatan/jabatanStore";
import { useJabatanFungsionalStore } from "@/store/jabatanFungsional/jabatanFungsionalStore";
import { usePajakStore } from "@/store/pajak/pajakStore";
import { usePinjamanStore } from "@/store/pinjaman/pinjamanStore";
import { usePotongGajiStore } from "@/store/potongGaji/potongGajiStore";
import { useSlipGajiStore } from "@/store/slipGaji/slipGajiStore";
import { useTunjanganBonusStore } from "@/store/tunjanganBonus/tunjanganBonusStore";
import { useTunjanganTetapStore } from "@/store/tunjanganTetap/tunjanganTetapStore";
import { useEffect } from "react";

const SlipGajiDetail = () => {
  const slipGajiData = useSlipGajiStore((state) => state.SlipGajiData);

  const tanggalFormatter = (tanggal: string) => {
    const date = new Date(tanggal.split("T")[0]);
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
    }).format(date);
  };

  const formattedRupiah = (angka: number) => {
    return `Rp. ${new Intl.NumberFormat("id-ID").format(angka)}`;
  };

  const fetchJabatan = useJabatanStore((state) => state.fetchJabatan);
  const jabatanById = useJabatanStore((state) => state.jabatanById);

  // tunjangan tetap
  const fetchTunjanganTetap = useTunjanganTetapStore(
    (state) => state.fetchTunjanganTetap,
  );
  const tunjanganTetapById = useTunjanganTetapStore(
    (state) => state.tunjanganTetapById,
  );

  // tunjangan fungsional
  const fetchJabatanFungsional = useJabatanFungsionalStore(
    (state) => state.fetchJabatanFungsional,
  );
  const jabatanFungsionalById = useJabatanFungsionalStore(
    (state) => state.jabatanFungsionalById,
  );

  // bonus
  const fetchTunjanganBonus = useTunjanganBonusStore(
    (state) => state.fetchTunjanganBonus,
  );
  const tunjanganBonusById = useTunjanganBonusStore(
    (state) => state.tunjanganBonusyId,
  );

  // pinjaman
  const fetchPinjaman = usePinjamanStore((state) => state.fetchPinjaman);
  const pinjamanById = usePinjamanStore((state) => state.pinjamanPegawaiById);

  // potong gaji
  const fetchPotongGaji = usePotongGajiStore((state) => state.fetchPotongGaji);
  const potongGajiById = usePotongGajiStore(
    (state) => state.potongGajiPegawaiById,
  );

  // pajak
  const fetchPajak = usePajakStore((state) => state.fetchPajak);
  const pajakById = usePajakStore((state) => state.pajakById);

  useEffect(() => {
    fetchJabatan();
    fetchTunjanganTetap();
    fetchJabatanFungsional();
    fetchTunjanganBonus();
    fetchPinjaman();
    fetchPotongGaji();
    fetchPajak();
  }, [
    fetchJabatan,
    fetchTunjanganTetap,
    fetchJabatanFungsional,
    fetchTunjanganBonus,
    fetchPinjaman,
    fetchPajak,
    fetchPotongGaji,
  ]);

  return (
    <div className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
      <div className="flex-1 space-y-6">
        {/* Informasi Pegawai */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Informasi Pegawai</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="w-1/3 align-top font-bold">Nama Pegawai</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {slipGajiData?.pegawai?.nama || "-"}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 align-top font-bold">Total Gaji</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {formattedRupiah(slipGajiData?.total_gaji_bersih as number)}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 align-top font-bold">Tanggal Pembuatan</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {tanggalFormatter(slipGajiData?.tanggal as string)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Pembayaran */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Informasi Pembayaran</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="w-1/3 align-top font-bold">Metode Pembayaran</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {slipGajiData?.pembayaran_gaji[0]?.metode_pembayaran || "-"}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 align-top font-bold">Nomor Transaksi</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {slipGajiData?.pembayaran_gaji[0]?.nomor_transaksi || "-"}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 align-top font-bold">
                  Tanggal Pembayaran
                </td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {tanggalFormatter(
                    slipGajiData?.pembayaran_gaji[0]
                      ?.tanggal_pembayaran as string,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Gaji Pokok */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Gaji Pokok</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="w-1/3 align-top font-bold">Jabatan</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {jabatanById(
                    slipGajiData?.slip_gaji_detail_gaji_pokok[0]
                      ?.jabatan_id as string,
                  )?.nama || "-"}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 align-top font-bold">Gaji Pokok</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {formattedRupiah(
                    slipGajiData?.slip_gaji_detail_gaji_pokok[0]
                      ?.total_gaji_pokok as number,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Kehadiran */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Kehadiran</h2>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="w-1/3 align-top font-bold">
                  Upah Per Kehadiran
                </td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {formattedRupiah(
                    (slipGajiData?.slip_gaji_detail_kehadiran[0]
                      ?.upah_per_hadir as number) || 0,
                  )}
                </td>
              </tr>
              <tr>
                <td className="w-1/3 align-top font-bold">Total Kehadiran</td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {slipGajiData?.slip_gaji_detail_kehadiran[0]
                    ?.total_kehadiran || 0}{" "}
                  x
                </td>
              </tr>
              <tr>
                <td className="w-1/3 align-top font-bold">
                  Upah Per Kehadiran
                </td>
                <td className="w-4 text-left">:</td>
                <td className="text-left">
                  {formattedRupiah(
                    slipGajiData?.slip_gaji_detail_kehadiran[0]?.total || 0,
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* lembur */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Lembur</h2>

          {slipGajiData?.slip_gaji_detail_lembur?.map((lembur, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md mb-1 font-semibold">
                {lembur.tanggal.split("T")[0]}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top font-bold">Upah Lembur</td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(lembur.total_upah)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* tunjangan tetap */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Tunjangan Tetap</h2>

          {slipGajiData?.slip_gaji_detail_tetap.map((tunjangan, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md mb-1 font-semibold">
                {index + 1}.{" "}
                {tunjanganTetapById(tunjangan.tunjangan_tetap_id)?.nama}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top font-bold">
                      Nominal Tunjangan
                    </td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(
                        tunjanganTetapById(tunjangan.tunjangan_tetap_id)
                          ?.nominal || 0,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-top font-bold">
                      Total Tunjangan
                    </td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(tunjangan.total_tetap || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 space-y-6">
        {/* jabatan fungsional */}

        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">
            Tunjangan Jabatan Fungsional
          </h2>

          {slipGajiData?.slip_gaji_detail_fungsional.map((tunjangan, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md mb-1 font-semibold">
                {index + 1}.{" "}
                {jabatanFungsionalById(tunjangan.jabatan__fungsional_id)?.nama}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top font-bold">
                      Nominal Tunjangan
                    </td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(
                        jabatanFungsionalById(tunjangan.jabatan__fungsional_id)
                          ?.tunjangan || 0,
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-top font-bold">
                      Total Tunjangan
                    </td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(tunjangan.total_fungsional || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* tunjangan bonus */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Tunjangan Bonus</h2>
          {slipGajiData?.slip_gaji_detail_bonus.map((tunjangan, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md mb-1 font-semibold">
                {tunjanganBonusById(tunjangan.bonus_id)?.tanggal.split("T")[0]}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top font-bold">
                      Keterangan Bonus
                    </td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {tunjanganBonusById(tunjangan.bonus_id)?.keterangan ||
                        "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-top font-bold">Total Bonus</td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(tunjangan.total_bonus || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* pinjaman */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Pinjaman</h2>
          {slipGajiData?.slip_gaji_detail_pinjaman.map((pinjaman, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md mb-1 font-semibold">
                {pinjamanById(pinjaman.pinjaman_id)?.tanggal.split("T")[0]}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top font-bold">
                      Keterangan Bonus
                    </td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {pinjamanById(pinjaman.pinjaman_id)?.keterangan || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-top font-bold">Total Bonus</td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(pinjaman.total_pinjaman || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* potong gaji */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Potong Gaji</h2>
          {slipGajiData?.slip_gaji_detail_potong_gaji.map(
            (potongGaji, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-md mb-1 font-semibold">
                  {potongGaji.tanggal.split("T")[0]}
                </h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="w-1/3 align-top font-bold">
                        Keterangan Bonus
                      </td>
                      <td className="w-4 text-left">:</td>
                      <td className="text-left">
                        {potongGajiById(potongGaji.tanggal)?.keterangan || "-"}
                      </td>
                    </tr>
                    <tr>
                      <td className="w-1/3 align-top font-bold">Total Bonus</td>
                      <td className="w-4 text-left">:</td>
                      <td className="text-left">
                        {formattedRupiah(potongGaji.total_potong_gaji || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ),
          )}
        </div>

        {/* pajak */}
        <div className="rounded-lg border p-4 shadow-md">
          <h2 className="mb-2 text-lg font-semibold">Pajak</h2>
          {slipGajiData?.slip_gaji_detail_pajak.map((pajak, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md mb-1 font-semibold">
                {pajakById(pajak.pajak_id)?.nama}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="w-1/3 align-top font-bold">Persentase</td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">{pajak.total_pajak_persen} %</td>
                  </tr>
                  <tr>
                    <td className="w-1/3 align-top font-bold">Total Pajak</td>
                    <td className="w-4 text-left">:</td>
                    <td className="text-left">
                      {formattedRupiah(pajak.total_pajak_rupiah || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlipGajiDetail;
