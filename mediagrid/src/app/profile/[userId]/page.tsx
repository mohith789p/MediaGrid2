"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProfilePage from "../page";

const ProfileUserIdPage = () => {
  const params = useParams();
  // The ProfilePage component will handle params internally
  return <ProfilePage />;
};

export default ProfileUserIdPage;
