import { useRef, useState } from "react";
import { FileTable, columns } from "@/components/file/column";
import { DataTable } from "@/components/file/data-table";
import UploadDnd from "@/components/file/upload-dnd";
import { QueryClient } from "@tanstack/react-query";
import { getFiles } from "@/api-caller/file";
import { cookies } from "next/headers";
export default async function FilePage({ params }: { params: { teamId: string } }) {
  const token = cookies().get("accessToken")?.value!;
  const queryClient  = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [`hydrate-file-${params.teamId}`],
		queryFn: ()=> getFiles({token:token, team_id:params.teamId}),
	  });
  return (
    <div className="flex items-center justify-center bg-blue-700">
      <UploadDnd token={token} team_id={params.teamId} />
    </div>
  );
}