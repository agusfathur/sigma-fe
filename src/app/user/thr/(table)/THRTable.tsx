/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/table/data-table";
import { useEffect } from "react";
import { THRColumns } from "./THRColumns";
import { useTHRStore } from "@/store/THR/THRStore";
import { useSession } from "next-auth/react";

const UserTHRTable = () => {
  const { data: session } = useSession();
  const tunjanganHariRaya = useTHRStore((state) => state.tunjanganHariRaya);
  const fetchTHRByUser = useTHRStore((state) => state.fetchTHRByUser);

  useEffect(() => {
    fetchTHRByUser(session?.user?.id as string);
  }, [fetchTHRByUser, session]);

  return (
    <>
      <div className="space-y-4">
        <DataTable data={tunjanganHariRaya} columns={THRColumns} />
      </div>
    </>
  );
};

export default UserTHRTable;
