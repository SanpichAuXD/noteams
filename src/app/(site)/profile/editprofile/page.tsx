"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ModalConfirm from "@/components/profilecomponent/savemodal";

function editprofile() {
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);
  // const handleConfirm = () => {
  //   // Perform save action here
  //   console.log('Save action performed');
  //   closeModal();
  // };
  return (
    <main>
      <p className="font-bold text-5xl p-3 underline underline-offset-8">
        EditProfile
      </p>
      <div className="grid grid-cols-2 gap-4 m-16">
        <div className=" m-16 ">
          <div className="justify-center flex ">
            <img
              className="h-[24rem] w-[24rem] border-2 rounded-3xl"
              src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
            />
          </div>
          <div className="flex justify-center mt-10">
            <button className="p-5 bg-green-300 hover:bg-green-600 text-3xl">
              Edit Picture
            </button>
          </div>
        </div>
        <div className="grid content-center">
          <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="w-full apx-3 mb-6 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2"
                htmlFor="grid-first-name"
              >
                First Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full apx-3 mb-6 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Last Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
              />
            </div>
            <div className="w-full apx-3 mb-6 ">
              <label
                className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Email
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-black rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Jane"
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
}

export default editprofile;
