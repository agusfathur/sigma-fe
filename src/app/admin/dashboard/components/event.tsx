interface EventComponentProps {
  tanggal: string;
  type: "jadwal" | "libur" | "cuti" | "kosong";
  eventText: { eventTitle: string; eventTime: string }[] | undefined;
}

export const EventComponent = ({
  tanggal,
  type,
  eventText,
}: EventComponentProps) => {
  return (
    <>
      {type === "kosong" && (
        <div className="relative bg-gray-100 px-3 py-2">
          <time
            dateTime={tanggal}
            className="flex h-6 w-6 items-center justify-center font-semibold text-slate-600"
          >
            {tanggal.split("-")[2]}
          </time>
          <ol className="mt-2">
            {eventText?.map((event, index) => (
              <li key={index}>
                <div className="group flex">
                  <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {event.eventTitle}
                  </p>
                  <time className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">
                    {event.eventTime}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
      {type === "jadwal" && (
        <div className="relative bg-white px-3 py-2">
          <time
            dateTime={tanggal}
            className="flex h-6 w-6 items-center justify-center font-semibold text-black"
          >
            {tanggal.split("-")[2]}
          </time>
          <ol className="mt-2">
            {eventText?.map((event, index) => (
              <li key={index}>
                <div className="group flex">
                  <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {event.eventTitle}
                  </p>
                  <time className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">
                    {event.eventTime}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
      {type === "libur" && (
        <div className="relative bg-white px-3 py-2">
          <time
            dateTime={tanggal}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 font-semibold text-white"
          >
            {tanggal.split("-")[2]}
          </time>
          <ol className="mt-2">
            {eventText?.map((event, index) => (
              <li key={index}>
                <div className="group flex">
                  <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {event.eventTitle}
                  </p>
                  <time className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">
                    {event.eventTime}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
      {type === "cuti" && (
        <div className="relative bg-white px-3 py-2">
          <time
            dateTime="tanggal"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 font-semibold text-white"
          >
            {tanggal.split("-")[2]}
          </time>
          <ol className="mt-2">
            {eventText?.map((event, index) => (
              <li key={index}>
                <div className="group flex">
                  <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                    {event.eventTitle}
                  </p>
                  <time className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">
                    {event.eventTime}
                  </time>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export const EventComponentMobile = ({
  tanggal,
  type,
  eventText,
}: EventComponentProps) => {
  return (
    <>
      {type === "kosong" && (
        <button
          type="button"
          className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10"
        >
          <time dateTime={tanggal} className="ml-auto">
            {tanggal.split("-")[2]}
          </time>
          <span className="sr-only">{eventText?.length} events</span>
        </button>
      )}
      {type === "jadwal" && (
        <button
          type="button"
          className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10"
        >
          <time dateTime={tanggal} className="ml-auto">
            {tanggal.split("-")[2]}
          </time>
          <span className="sr-only">{eventText?.length} events</span>
          {eventText && eventText.length > 0 && (
            <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
              {eventText.map((event, index) => (
                <span
                  key={index}
                  className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                ></span>
              ))}
            </span>
          )}
        </button>
      )}
      {type === "libur" && (
        <button
          type="button"
          className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10"
        >
          <time
            dateTime={tanggal}
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-600"
          >
            {tanggal.split("-")[2]}
          </time>
          <span className="sr-only">{eventText?.length} events</span>
          {eventText && eventText.length > 0 && (
            <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
              {eventText.map((event, index) => (
                <span
                  key={index}
                  className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                ></span>
              ))}
            </span>
          )}
        </button>
      )}
      {type === "cuti" && (
        <button
          type="button"
          className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10"
        >
          <time
            dateTime={tanggal}
            className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-green-600"
          >
            {tanggal.split("-")[2]}
          </time>
          <span className="sr-only">{eventText?.length} events</span>
          {eventText && eventText.length > 0 && (
            <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
              {eventText.map((event, index) => (
                <span
                  key={index}
                  className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                ></span>
              ))}
            </span>
          )}
        </button>
      )}
    </>
  );
};
