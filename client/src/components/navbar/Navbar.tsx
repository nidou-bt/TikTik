import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../utils/tiktik-logo.png";
import { createOrGetUser } from "../../utils";
import useAuthStore from "../../store/authStore";
import { IUser } from "../../types/type";

const Navbar = () => {
  const { addUser, userProfile, removeUser } = useAuthStore();
  const [user, setUser] = useState<IUser | null>(null);

  const handleLogout = () => {
    googleLogout();
    removeUser();
  };

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <nav className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="W-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
            layout="responsive"
          />
        </div>
      </Link>
      <div>SEARCH</div>

      {user ? (
        <div className="flex gap-5 md:gap-10">
          <Link href="/upload">
            <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
              <IoMdAdd className="text-xl" />
              <span className="hidden md:block">Upload</span>
            </button>
          </Link>
          {user.image && (
            <Link href="/">
              <>
                <Image
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                  src={user.image}
                  alt="profile photo"
                />
              </>
            </Link>
          )}
          <button type="button" className="px-2 bg-slate-200 border-2 rounded-full" onClick={handleLogout}>
            <AiOutlineLogout color="red" fontSize={21} />
          </button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(response) => {
            console.log("res", response);
            createOrGetUser(response, addUser);
          }}
          onError={() => {
            console.log("error");
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
