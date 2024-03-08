import { getAbout } from "@/api-caller/team";
import About from "@/components/teams/About";
import { cookies } from "next/headers";
import React from "react";

interface MockData {
  team_name: string;
  team_poster: string;
  team_desc: string;
}



const AboutPageApp = async({ params }: { params: { teamId: string } }) => {
  const token = cookies().get("accessToken")?.value!;
 const about = await getAbout({token, team_id:params.teamId});
  return <About {...about} />;
};

export default AboutPageApp;
