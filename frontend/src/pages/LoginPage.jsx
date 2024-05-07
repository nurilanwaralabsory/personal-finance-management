import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [formData, setFormData] = useState("");
  const [dbData, setDbData] = useState();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await axios.get("http://localhost:5000/users");
      setDbData(user.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    let userFound = false;
    let userId = "";

    dbData.forEach((user) => {
      if (
        formData.email === user.email &&
        formData.password === user.password
      ) {
        userFound = true;
        userId = user.id;
        return;
      }
    });

    if (userFound) {
      window.location = `/`;
    } else {
      alert("User not found");
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-xs'>
        <form onSubmit={handleSubmitForm}>
          <div className='mb-5'>
            <h1 className='text-3xl text-blue-600 font-bold mb-2'>Login</h1>
            <p className='text-slate-600'>Welcome,please enter your detail!</p>
          </div>
          <Input
            className={"mb-3"}
            type='text'
            placeholder='Enter your email'
            name='email'
            onChange={handleChange}
          />
          <Input
            className={"mb-3"}
            type='password'
            placeholder='Enter your password'
            name='password'
            onChange={handleChange}
          />
          <Button type='submit' className={"w-full bg-blue-600"}>
            Login
          </Button>
        </form>
        <p className='text-center my-3 text-slate-600'>
          Have an account?{" "}
          <span>
            <a className='text-blue-600' href='#'>
              Login
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
