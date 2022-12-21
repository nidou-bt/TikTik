import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import Image from "next/image";
import { IUser } from "@/types/type";
import { GoVerified } from "react-icons/go";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="xl:border-b-2 border-gray-200 pb-4 ">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Suggested Account
      </p>
      <div>
        {!!allUsers &&
          allUsers.slice(0, 6).map((user) => {
            return (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div
                  className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded"
                  key={user._id}
                >
                  <div className="w-8 h-8">
                    <Image
                      src={user.image}
                      alt="user"
                      width={34}
                      height={34}
                      className="rounded-full"
                      layout="responsive"
                    />
                  </div>
                  <div className="hidden xl:block">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replace(" ", "")}
                      <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-xs">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
