// "use client"
import { getAllTask } from '@/api-caller/task';
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { cookies } from 'next/headers'
import Image from 'next/image'

export default async function Home({ params }: { params: { teamId: string } }) {
  const cookie = cookies().get("accessToken")?.value!;
	
	const queryClient  = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: [`task-${params.teamId}`],
		queryFn: async()=> getAllTask({token: cookie, team_id : params.teamId}),
	  });
  return (
    <main className="mx-4 flex flex-col gap-6 p-5">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Drag and Drop Kanban Board 
            </h1>
            <HydrationBoundary state={dehydrate(queryClient)}> 
            <KanbanBoard token={cookie} team_id={params.teamId}/> 
             </HydrationBoundary>
              {/* <KanbanBoard token={cookie} teamId={params.teamId} /> */}
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              With Keyboard Controls and Screen Reader interactions.
            </p>
          </main>
  )
}
