

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalConfirm from "@/components/profilecomponent/savemodal";
import { cookies } from "next/headers";
import { formatCookie } from "@/lib/utils";
import { SignupRequest } from "@/type/user";
import { GetProfile } from "@/api-caller/user";
import destr from "destr";

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
  team_id : string;
  teamName : string;
  team_poster: string;
  role : string;
};

type Profileandteam = {
  pData1: Profile1[];
  pTeam: Team1[];
};

const EditProfile: React.FC<Profileandteam> = ({ pData1, pTeam }) => (
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
      <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">Upload
                Image(jpg,png,svg,jpeg)</label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12 text-gray-400 group-hover:text-gray-600" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                clip-rule="evenodd" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                            Select a photo</p>
                    </div>
                    <input type="file" className="opacity-0" />
                </label>
            
        </div>
        {/* <div className="justify-center flex ">
          <img
            className="h-[18rem] w-[18rem] border-2 rounded-3xl"
            
            src={pData1.avatar !== '' ? pData1.avatar : "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"}
          />
        </div>
        <div className="flex justify-center mt-10">
          {/* <button className="p-5 bg-green-300 hover:bg-green-600 text-1xl"> */}
          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-green-300 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
        </div> */}
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
              placeholder={pData1.username}
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
              placeholder={pData1.dob.toString()}
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
              placeholder={pData1.bio}
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
              placeholder={pData1.phone}
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

async function editprofileApp() {

  const token = cookies().get('accessToken')?.value!;
  const users = cookies().get('user')?.value!;
  

  const cookie = formatCookie(users);
  const { user_id } = destr<SignupRequest>(cookie);
  // const { user_iw } = destr<SignupRequest>(cookie);

  const data = await GetProfile(token ,user_id)
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
        <EditProfile pData1={data.data} />
    </div>
  );
}

export default editprofileApp;
