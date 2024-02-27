"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalConfirm from "@/components/profilecomponent/savemodal";

type Profile1 = {
  userid: number;
  username: string;
  dob: Date | string;
  bio: string;
  email: string;
  phone: string;
  avatar: string;
};

type Team1 = {
  team_id : string;
  teamName : string;
  team_poster: string;
  role : string;
};

type Profileandteam = {
  pData1: Profile1[];
  pTeam: Team1[];
};

const EditProfile: React.FC<Profile1> = ({
  userid, username, dob, bio, phone, avatar, email 
}) => (
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  // const handleConfirm = () => {
  //   // Perform save action here
  //   console.log('Save action performed');
  //   closeModal();
  // };

  <main>
    {/* <p className="font-bold text-3xl p-3 underline underline-offset-8">
      EditProfile
    </p> */}
    <div className="grid grid-cols-2 gap-4 m-16">
      <div className=" m-16 ">
        <div className="justify-center flex ">
          <img
            className="h-[18rem] w-[18rem] border-2 rounded-3xl"
            src={avatar}
          />
        </div>
        <div className="flex justify-center mt-10">
          <button className="p-5 bg-green-300 hover:bg-green-600 text-1xl">
            Edit Picture
          </button>
        </div>
      </div>
      <div className="grid content-center">
        <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="w-full apx-3 mb-6 ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-1xl font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Username
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder={username}
            />
          </div>
          <div className="w-full apx-3 mb-6 ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-1xl font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Date of Birth
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder={dob.toString()}
            />
          </div>
          <div className="w-full apx-3 mb-6 ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-1xl font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Bios
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder={bio}
            />
          </div>
          <div className="w-full apx-3 mb-6 ">
            <label
              className="block uppercase tracking-wide text-gray-700 text-1xl font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder={phone}
            />
          </div>
          <div className="flex justify-end">
            <Link href="/profile">
              <button
                // onClick={openModal}
                className="bg-green-300 hover:bg-green-600 p-3"
              >
                Save Change
              </button>
              {/* <ModalConfirm isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirm} /> */}
            </Link>
            <Link href="/profile">
              <button className="bg-red-300 hover:bg-red-600 p-3 ml-5">
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  </main>
);

function editprofileApp() {
  const profile01: Profile1[] = [
    {
      userid: 1,
      username: "Peter1234",
      dob: "12-12-2002",
      bio: "bio XD",
      phone: "0944215180",
      email: "peter1234@gmail.comm",
      avatar:
        "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png",
    },
  ];

  const teamprofile01: Team1[] = [
    {
      team_id: "T00001",
      teamName: "team1",
      team_poster:
        "https://media.licdn.com/dms/image/D4E12AQFP9XcUm3C_Fw/article-cover_image-shrink_600_2000/0/1684536742731?e=2147483647&v=beta&t=-87dzXNxDzNHcI-b69NtYenHzRCnjprXWM_Jq1JD1LM",
      role: "Owner",
    },
    {
      team_id: "T00002",
      teamName: "team2",
      team_poster:
        "https://www.proofhub.com/articles/wp-content/uploads/2019/07/Why-Bigger-Team-Isn%E2%80%99t-Always-the-Better-Choice.jpeg",
      role: "Member",
    },
  ];

  return (
    <div>
        {profile01.map((prof) => (
        <EditProfile key={prof.userid} {...prof} />
      ))}
    </div>
  );
}

export default editprofileApp;
