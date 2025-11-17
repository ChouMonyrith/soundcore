import AuthForm from "@/app/_components/AuthForm";
import React from "react";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center text-center text-6xl font-bold text-white">
        Start Exploring New Sounds Now!
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <AuthForm />
      </div>
    </>
  );
}
