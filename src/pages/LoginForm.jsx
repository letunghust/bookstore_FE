import React, { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";

const backend_url = import.meta.env.BACKEND_URL || "http://localhost:3001";
const LoginForm = ({ setIsLogedIn }) => {
  const navigate = useNavigate();
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    const userInfo = { email, password };
    // console.log(userInfo);

    try {
      const response = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) { 
        const data = await response.json();
        const token = data.token;
        if(token) {
          localStorage.setItem('token', token)
          alert("Login successfully");
          navigate("/");
          window.location.reload();
        } else{
          alert('Invalid email or password');
        }
        form.reset();
        // localStorage.setItem("userInfo:", JSON.stringify(userInfo));
        setIsLogedIn(true); // cập nhật trạng thái đăng nhập
      } else {
        // alert("Invalid email or password");
        const dataAlert = await response.json();
        alert(dataAlert.message);
      }
    } catch (error) {
      // throw new Error("Error login");
      console.log(error)
      alert('Error log in')
    }
  };

  return (
    <div>
      <section className="h-screen">
        <div className="container h-full px-6 py-24">
          <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* Left column container with background*/}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            {/* Right column container with form */}
            <div className="md:w-8/12 lg:ms-6 lg:w-5/12">
              <form onSubmit={handleLoginSubmit}>
                {/* Email input */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 outline-none transition duration-200 ease-in-out focus:ring-primary focus:border-primary"
                    id="email"
                    placeholder="Email address"
                  />
                </div>

                {/* Password input */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="block w-full border rounded px-3 py-2 outline-none transition duration-200 ease-in-out focus:ring-primary focus:border-primary"
                    id="password"
                    placeholder="Password"
                  />
                </div>

                {/* Remember me checkbox */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                    <input
                      className="relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary"
                      type="checkbox"
                      value=""
                      id="Remember"
                      defaultChecked
                    />
                    <label
                      className="inline-block ps-[0.15rem] hover:cursor-pointer"
                      htmlFor="Remember"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* Forgot password link */}
                  <a
                    href="/forgotpassword"
                    className="text-primary focus:outline-none dark:text-primary-400"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit button */}
                <Button type="submit" label="Log in" />

                {/* Divider */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>

                {/* Register button */}
                <div className="flex items-center justify-between pb-6">
                  <p className="mb-0 me-2">Do not have an account?</p>
                  <Link to="/signup">
                    <button
                      type="button"
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                    >
                      Register
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
