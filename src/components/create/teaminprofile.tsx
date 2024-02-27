"use client";

import Link from "next/link";
import React from "react";

type Team1 = {
  team_id: string;
  teamName: string;
  team_poster: string;
  role: string;
};

type Profileteam = {
  pTeam: Team1[];
};

const teaminprofile: React.FC<Profileteam> = ({ pTeam }) => (
  <main>
    <div className="grid grid-cols-4 gap-4 m-16 mt-8">
      {pTeam.map((pT) => (
        <div key={pT.team_id} className="mb-10">
          <div className="flex justify-center">
            {/* <button className="w-48 h-48 rounded-full bg-orange-300 mt-5">
              <p className=" text-4xl font-bold">P</p>
            </button> */}
            <Link href="/teams">
              <img
                className="md:h-[10rem] md:w-[10rem] sm:h-[12rem] sm:w-[12rem] border-2 rounded-full border-blue-900 border-4"
                src={pT.team_poster}
              />
            </Link>
          </div>
          <div className="flex justify-center">
            <p className=" text-3xl mt-1">{pT.teamName}</p>
          </div>
        </div>
      ))}
      ;
    </div>
  </main>
);

export default teaminprofile;
