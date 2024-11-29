"use client";
import { useEffect, useState } from "react";
import { EventComponent, EventComponentMobile } from "./(component)/event";
import { useDataLiburStore } from "@/store/dataLibur/dataLiburStore";
import { useJadwalKerjaStore } from "@/store/jadwalKerja/jadwalKerjaStore";
import { useSession } from "next-auth/react";

const JadwalPage = () => {
  const { data: session } = useSession();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const jadwal = useJadwalKerjaStore((state) => state.jadwalKerja);
  const fetchJadwal = useJadwalKerjaStore(
    (state) => state.fetchJadwalKerjaPegawaiByUserFilter,
  );

  const dataLibur = useDataLiburStore((state) => state.dataLibur);
  const fetchDataLibur = useDataLiburStore((state) => state.fetchDataLibur);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const awalBulan = [
    { hari: "Sabtu", letak: 6 },
    { hari: "Jumat", letak: 5 },
    { hari: "Kamis", letak: 4 },
    { hari: "Rabu", letak: 3 },
    { hari: "Selasa", letak: 2 },
    { hari: "Senin", letak: 1 },
    { hari: "Minggu", letak: 0 },
  ];

  const letakAwal = awalBulan.find((hari) => hari.letak === firstDayOfMonth);

  const datesAwal = [];

  if (letakAwal) {
    const prevMonth = month === 0 ? 11 : month - 1; // Jika bulan = Januari, mundur ke Desember
    const prevYear = month === 0 ? year - 1 : year; // Jika mundur ke Desember, pastikan tahun dikurangi
    const prevMonthLastDate = new Date(prevYear, prevMonth + 1, 0).getDate(); // Tanggal terakhir bulan sebelumnya

    for (let i = letakAwal.letak - 1; i >= 0; i--) {
      const prevDate = prevMonthLastDate - (i - 1); // Ambil tanggal dari akhir bulan sebelumnya
      const formattedDate = new Date(prevYear, prevMonth, prevDate)
        .toISOString()
        .split("T")[0];

      datesAwal.push({
        tanggal: formattedDate,
        event: [],
        type: "kosong",
      });
    }
  }

  // Create an array to store the dates in YYYY-MM-DD format
  const datesArray = [];
  // Loop through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = day.toString();
    const formattedDate = `${year}-${month + 1}-${formattedDay}`;
    const fullDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${formattedDay.toString().padStart(2, "0")}T00:00:00.000Z`;
    const eventArray = [];
    let typeHari = "";
    if (
      dataLibur.find(
        (data) =>
          data.tanggal === fullDate && data.status_absen === "tidak_hadir",
      )
    ) {
      const libur = dataLibur.find(
        (data) =>
          data.tanggal === fullDate && data.status_absen === "tidak_hadir",
      );
      typeHari = "libur";
      eventArray.push({ eventTitle: libur?.nama, eventTime: "" });
    } else if (
      dataLibur.find(
        (data) => data.tanggal === fullDate && data.status_absen === "hadir",
      )
    ) {
      const cuti = dataLibur.find(
        (data) => data.tanggal === fullDate && data.status_absen === "hadir",
      );
      typeHari = "cuti";
      eventArray.push({ eventTitle: cuti?.nama, eventTime: "" });
    } else {
      const findJadwal = jadwal.find((data) => data.tanggal === fullDate);
      typeHari = "jadwal";
      if (findJadwal) {
        eventArray.push(
          {
            eventTitle: "Masuk",
            eventTime: findJadwal.shift_kerja.waktu_masuk,
          },
          {
            eventTitle: "Pulang",
            eventTime: findJadwal.shift_kerja.waktu_pulang,
          },
        );
      }
    }

    datesArray.push({
      tanggal: formattedDate,
      event: eventArray || [],
      type: typeHari,
    });
  }

  console.log({ dataLibur, jadwal });

  useEffect(() => {
    fetchDataLibur();
    fetchJadwal(
      session?.user?.id as string,
      `tahun=${year}&bulan=${month + 1}`,
    );
  }, [fetchDataLibur, fetchJadwal, session?.user?.id]);

  return (
    <>
      {/* <!-- component --> */}
      <div className="lg:flex lg:h-full lg:flex-col">
        <header className="lg:flex-none">
          <input
            type="month"
            className="my-4 w-1/2 rounded-sm border border-slate-900 px-4 py-2 text-lg text-black lg:w-1/3"
            lang="id"
            defaultValue={new Date().toISOString().slice(0, 7)}
            onChange={async (e) => {
              const selectedDate = new Date(e.target.value);
              const newMonth = selectedDate.getMonth();
              const newYear = selectedDate.getFullYear();
              setMonth(newMonth);
              setYear(newYear);

              const newQuery = `tahun=${newYear}&bulan=${newMonth + 1}`;
              await fetchJadwal(session?.user.id as string, newQuery);
              console.log({ month: newMonth, year: newYear });
            }}
          />
        </header>
        <div className="overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
          <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 dark:bg-transparent lg:flex-none">
            <div className="flex justify-center bg-slate-800 py-2 text-white">
              <span>M</span>
              <span className="sr-only sm:not-sr-only">inggu</span>
            </div>
            <div className="flex justify-center bg-slate-800 py-2 text-white">
              <span>S</span>
              <span className="sr-only sm:not-sr-only">enin</span>
            </div>
            <div className="flex justify-center bg-slate-800 py-2 text-white">
              <span>S</span>
              <span className="sr-only sm:not-sr-only">elasa</span>
            </div>
            <div className="flex justify-center bg-slate-800 py-2 text-white">
              <span>R</span>
              <span className="sr-only sm:not-sr-only">abu</span>
            </div>
            <div className="flex justify-center bg-slate-800 py-2 text-white">
              <span>K</span>
              <span className="sr-only sm:not-sr-only">amis</span>
            </div>
            <div className="flex justify-center bg-slate-800 py-2 text-white">
              <span>J</span>
              <span className="sr-only sm:not-sr-only">umat</span>
            </div>
            <div className="flex justify-center bg-slate-800 py-2 text-white">
              <span>S</span>
              <span className="sr-only sm:not-sr-only">abtu</span>
            </div>
          </div>
          {/* body  */}
          <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
            <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
              {datesAwal.map((date, index) => (
                <EventComponent
                  key={index}
                  tanggal={date.tanggal}
                  type={date.type as "jadwal" | "libur" | "cuti" | "kosong"}
                  eventText={date.event}
                />
              ))}
              {datesArray.map((date, index) => (
                <EventComponent
                  key={index}
                  tanggal={date.tanggal}
                  type={date.type as "jadwal" | "libur" | "cuti" | "kosong"}
                  eventText={
                    date.event as { eventTitle: string; eventTime: string }[]
                  }
                />
              ))}
            </div>
            {/* mobile */}
            <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
              {datesAwal.map((date, index) => (
                <EventComponentMobile
                  key={index}
                  tanggal={date.tanggal}
                  type={date.type as "jadwal" | "libur" | "cuti" | "kosong"}
                  eventText={date.event}
                />
              ))}
              {datesArray.map((date, index) => (
                <EventComponentMobile
                  key={index}
                  tanggal={date.tanggal}
                  type={date.type as "jadwal" | "libur" | "cuti" | "kosong"}
                  eventText={
                    date.event as { eventTitle: string; eventTime: string }[]
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JadwalPage;
