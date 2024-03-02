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
  teamName: string;
  team_poster: string;
  role: string;
};

type Profileandteam = {
  pData1: Profile1[];
  pTeam: Team1[];
};

// const cookies = cookies.get("accessToken").value
console.log(getUser)

const Profile: React.FC<Profileandteam> = ({ pData1, pTeam }) => (
  
  <main className="min-h-screen max-h-screen">
    
      <div key={pData1.user_id}>
        {/* <p className="font-bold text-5xl p-3 underline underline-offset-8">
          Profile
        </p> */}

        <div className="grid grid-cols-2 gap-4 m-16">
          <div className=" m-16 ">
            <div className="justify-center flex ">
              <img
                className="md:h-[20rem] md:w-[20rem] sm:h-[24rem] sm:w-[24rem] border-2 rounded-3xl"
                src={pData1.avatar}
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

  const token = cookies().get('accessToken')?.value!;
  const users = cookies().get('user')?.value!;
  

  const cookie = formatCookie(users);
  const { user_id } = destr<SignupRequest>(cookie);
  // const { user_iw } = destr<SignupRequest>(cookie);

  const data = await GetProfile(token ,user_id)
  const teams = await GetTeam(token, user_id);

  console.log("Endi ",data.data);
  console.log("Endi2 ",teams.data);
  
  // const profile01: Profile1[] = [
  //   {
  //     userid: 1,
  //     username: "Peter1234",
  //     dob: "12-12-2002",
  //     bio: "bio XD",
  //     phone: "0944215180",
  //     email: "peter1234@gmail.comm",
  //     avatar:
  //       "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
  //   },
  // ];

  // const teamprofile01: Team1[] = [
  //   {
  //     team_id: "T00001",
  //     teamName: "team1",
  //     team_poster:
  //       "https://media.licdn.com/dms/image/D4E12AQFP9XcUm3C_Fw/article-cover_image-shrink_600_2000/0/1684536742731?e=2147483647&v=beta&t=-87dzXNxDzNHcI-b69NtYenHzRCnjprXWM_Jq1JD1LM",
  //     role: "Owner",
  //   },
  //   {
  //     team_id: "T00002",
  //     teamName: "team2",
  //     team_poster:
  //       "https://www.proofhub.com/articles/wp-content/uploads/2019/07/Why-Bigger-Team-Isn%E2%80%99t-Always-the-Better-Choice.jpeg",
  //     role: "Member",
  //   },
  // ];

  return (
    <div>
      <Profile pTeam={teams.data} pData1={data.data} />
    </div>
  );
}

export default ProfileApp;
