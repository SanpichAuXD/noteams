"use client";

import React from "react";
import { FaPencil } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaBirthdayCake, FaPhoneAlt } from "react-icons/fa";
import Teaminprofile from "@/components/create/teaminprofile";
import Link from "next/link";

function Profile() {
  return (
    <main className="min-h-screen max-h-screen">
      <p className="font-bold text-5xl p-3 underline underline-offset-8">
        Profile
      </p>

      <div className="grid grid-cols-2 gap-4 m-16">
        <div className=" m-16 ">
          <div className="justify-center flex ">
            <img
              className="h-[32rem] w-[32rem] border-2 rounded-3xl"
              src="https://i.imgflip.com/4/2b5p.jpg"
            />
          </div>
        </div>
        <div className="m-16">
          <div>
            <p className="text-4xl font-bold">
              NONTAPAT PAKER
              <Link href="/profile/editprofile">
                <button className="ml-10 bg-slate-700 p-2 rounded-md hover:bg-slate-300">
                  <FaPencil />
                </button>
              </Link>
            </p>
          </div>
          <p className="text-3xl font-light">Bachelor IT</p>
          <div className=" mt-24">
            <p className="text-5xl font-bold">Contact</p>
            <p className="mt-1 h-1 w-3/4 bg-black"></p>
            <div className=" mt-6 flex items-center">
              <p className="text-6xl mr-10">
                <MdEmail />
              </p>
              <span className="text-4xl">Peter987@kmitl.ac.th</span>
            </div>
            <div className=" mt-2 flex items-center">
              <p className="text-6xl mr-10">
                <FaPhoneAlt />
              </p>
              <span className="text-4xl">092-236547</span>
            </div>
            <div className=" mt-2 flex items-center">
              <p className="text-6xl mr-10">
                <FaBirthdayCake />
              </p>
              <span className="text-4xl">07/07/1991</span>
            </div>
          </div>
        </div>
      </div>
      {/* <p className="text-5xl font-bold ">Organize</p> */}
      <div className="flex justify-center">
        <p className="mt-1 h-1 w-5/6 bg-black"></p>
      </div>
      <div className="grid grid-cols-4 gap-4 m-16 mt-8">
        {/* <Teaminprofile />
        <Teaminprofile />
        <Teaminprofile />
        <Teaminprofile />
        <Teaminprofile />
        <Teaminprofile /> */}
      </div>
    </main>
  );
}

export default Profile;
