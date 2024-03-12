import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";
import Teaminprofile from "@/components/create/teaminprofile";
import Link from "next/link";
import { date } from "zod";
import { GetProfile, GetTeam, getUser } from "@/api-caller/user";
import { cookies } from "next/headers";
import destr from "destr";
import { SignupRequest } from "@/type/user";
import { formatCookie } from "@/lib/utils";
import Image from "next/image";

type Profile1 = {
  user_id: number;
  username: string;
  dob: Date | string;
  bio: string;
  email: string;
  phone: string;
  avatar: string;
};

type Team1 = {
  team_id: string;
  team_name: string;
  team_poster: string;
  role: string;
};

type Profileandteam = {
  pData1: Profile1;
  pTeam: Team1[];
};

// const cookies = cookies.get("accessToken").value
console.log(getUser);

const Profile: React.FC<Profileandteam> = ({ pData1, pTeam }) => (
  <main className="min-h-screen max-h-screen">
    <div key={pData1.user_id}>
      {/* <p className="font-bold text-5xl p-3 underline underline-offset-8">
          Profile
        </p> */}

      <div className="grid grid-cols-2 gap-4 m-16">
        <div className=" m-16 ">
          <div className="justify-center flex ">
            <Image
              className="md:h-[20rem] md:w-[20rem] sm:h-[24rem] sm:w-[24rem] border-2 rounded-3xl"
              width={50}
              height={50}
              src={pData1.avatar !== "" ? pData1.avatar : "/profile1.png"}
              alt="Picture of the Profile"
            />
          </div>
        </div>
        <div className="m-16">
          <div>
            <p className="md:text-2xl font-bold">
              {pData1.username}
              <Link href="/profile/editprofile">
                <button className="ml-10 bg-slate-700 p-2 rounded-md hover:bg-slate-300">
                  <FaPencil />
                </button>
              </Link>
            </p>
          </div>
          <p className="md:text-1xl font-light">{pData1.bio}</p>
          <div className=" mt-24">
            <p className="md:text-3xl font-bold">Contact</p>
            <p className="mt-1 h-1 w-3/4 bg-black"></p>
            <div className=" mt-6 flex items-center">
              <p className="md:text-4xl mr-10">
                <MdEmail />
              </p>
              <span className="md:text-2xl">{pData1.email}</span>
            </div>
            <div className=" mt-2 flex items-center">
              <p className="text-4xl mr-10">
                <FaPhoneAlt />
              </p>
              <span className="md:text-2xl">{pData1.phone}</span>
            </div>
            <div className=" mt-2 flex items-center">
              <p className="text-4xl mr-10">
                <FaBirthdayCake />
              </p>
              <span className="md:text-2xl">{pData1.dob.toString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* <p className="text-5xl font-bold ">Organize</p> */}
    <div className="flex justify-center">
      <p className="mt-1 h-1 w-5/6 bg-black"></p>
    </div>
    <div className="mb-10">
      <Teaminprofile pTeam={pTeam} />
    </div>
  </main>
);

const ProfileApp = async () => {
  // const [profile, setProfile] = useState([]);
  // useEffect(() => {
  //   fetch('https://f7r7tx33-3000.asse.devtunnels.ms/api/users/profile/1')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setProfile(data);
  //     });
  // }, []);

  const token = cookies().get("accessToken")?.value!;
  const users = cookies().get("user")?.value!;

  const cookie = formatCookie(users);
  const { user_id } = destr<SignupRequest>(cookie);
  // const { user_iw } = destr<SignupRequest>(cookie);

  const data = await GetProfile(token, user_id);
  const teams = await GetTeam(token, user_id);

  console.log("Endi ", data.data);
  console.log("Endi2 ", teams.data);

  return (
    <div>
      <Profile pTeam={teams.data} pData1={data.data} />
    </div>
  );
};

export default ProfileApp;
