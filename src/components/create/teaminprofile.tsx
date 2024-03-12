"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";

type Team1 = {
  team_id: string;
  team_name: string;
  team_poster: string;
  role: string;
};

type Profileteam = {
  pTeam: Team1[];
};

const TruncateText = ({ text, maxLength }: any) => {
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = `${text.slice(0, maxLength)}...`;

  return <span title={text}>{truncatedText}</span>;
};

const teaminprofile: React.FC<Profileteam> = ({ pTeam }) => (
  <main>
    <div className="grid grid-cols-4 gap-4 m-16 mt-8">
      {pTeam.map((pT, index) => (
        <div key={pT.team_id} className={`mb-10`}>
          <div className="flex justify-center">
            {/* <button className="w-48 h-48 rounded-full bg-orange-300 mt-5">
              <p className=" text-4xl font-bold">P</p>
            </button> */}
            <Link href={"/teams/" + pT.team_id}>
              <Image
                className="md:h-[10rem] md:w-[10rem] sm:h-[12rem] sm:w-[12rem] border-4 rounded-full border-slate-900"
                width={300}
                height={300}
                src={pT.team_poster !== "" ? pT.team_poster : "/team_logo.png"}
                alt="Picture of the Poster"
              />
            </Link>
          </div>
          <div className="flex justify-center">
          <TruncateText text={pT.team_name} maxLength={10} />
          </div>
        </div>
      ))}
      ;
    </div>
  </main>
);

export default teaminprofile;
