"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// Define Types
type Input = {
  email: string;
  password: string;
  mobileNumber: number;
  username: string;
};

const Page = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<Input>();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = register("email", {
    required: true,
    pattern: {
      value: emailPattern,
      message: "Email is not valid",
    },
  });

  const password = register("password", {
    required: true,
  });
  const handleForm: SubmitHandler<Input> = (data) => {
    console.log("called");
    console.log(data);
  };

  console.log(watch("email"), watch("password"));
  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <label htmlFor="email">Email</label>
        </div>

        <div>
          <label htmlFor="password">Password</label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Page;
