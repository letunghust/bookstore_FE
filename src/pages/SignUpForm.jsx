import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const backend_url = import.meta.env.VITE_BACKEND_URL ;
const SignUpForm = () => {
    const navigate = useNavigate();
    const handleSignUpSubmit = async(event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const surname = form.surname.value;
        const phone = form.phone.value; 
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = {name, surname, phone ,email, password};
        console.log('sign up: ', userInfo)

        try{
            const response = await fetch(`${backend_url}/signup`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(userInfo),
            })

            if(response.ok) {
                // alert("Sign up successfully!");
                toast.success("Sign up successfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
                form.reset();
                navigate("/");
            }
            else{
                // alert("Sign up failed!");
                toast.error("Sign up failed!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
            }
        } catch(error) {
            // throw new Error("Error sign up");
            console.log("Error sign up", error);
        }
    }

  return (
    <div>
      <section className="mt-10">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            {/* <!-- Left column container with background--> */}
            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
              <img
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>

            {/* <!-- Right column container with form --> */}
            <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
              <form onSubmit={handleSignUpSubmit}>
                {/* <!-- Name input --> */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 outline-none transition duration-200 ease-in-out focus:ring-primary focus:border-primary"
                    id="name"
                    placeholder="Name"
                  />
                </div>

                {/* Surname input */}
                <div className="mb-6">
                  <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 outline-none transition duration-200 ease-in-out focus:ring-primary focus:border-primary"
                    id="surname"
                    placeholder="Surname"
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 outline-none transition duration-200 ease-in-out focus:ring-primary focus:border-primary"
                    id="phone"
                    placeholder="Phone"
                  />
                </div>

                
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

                {/* <!-- Remember me checkbox --> */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="checkbox"
                      value=""
                      id="exampleCheck3"
                      defaultChecked
                    />
                    <label
                      className="inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="exampleCheck3"
                    >
                      Remember me
                    </label>
                  </div>

                  {/* <!-- Forgot password link --> */}
                  <a
                    href="#!"
                    className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                  >
                    Terms and conditions
                  </a>
                </div>

                {/* <!-- Submit button --> */}

                <Button type="submit" label="Sign up" />

                {/* <!-- Divider --> */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>

                {/* <!-- Other buttons --> */}
                <div className="flex items-center justify-between pb-6">
                  <p className="mb-0 mr-2">Have an account?</p>
                  {/* <TERipple rippleColor="light">
                    <Link to="/login">
                        <button
                        type="button"
                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                        Log in
                        </button>
                    </Link>
                  </TERipple> */}
                  <Link to="/login">
                    <button
                      type="button"
                      className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-danger-50/50 hover:text-danger-600 focus:border-danger-600 focus:bg-danger-50/50 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-rose-950 dark:focus:bg-rose-950"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                    >
                      Log in 
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

export default SignUpForm;
