import React, { useState } from "react";
import BottomText from "../components/BottomText";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setWarning(true);
    }

    async function registerNewUser() {
      try {
        const response = axios.post(
          "/api/users/signup",
          {
            firstName,
            lastName,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { data } = (await response).data;
        const { createdUser, token } = data;
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setWarning(false);
        let user = createdUser;
        // navigate to the next page
        navigate("/main", { replace: true, state: { user, token } });
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    }

    registerNewUser();

  };

  return (
    <div className=" bg-slate-300 h-screen flex justify-center items-center">
      <div className=" flex flex-col justify-center h-fit">
        <form
          className=" rounded-lg bg-white  min-w-96 text-center p-2 h-max px-4"
          onSubmit={handleSubmit}
        >
          <Header label={"Signup"} />
          <SubHeading label={"Enter your Information to create an account"} />

          <InputBox
            label={"First Name"}
            placeholder={"John"}
            name={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            name={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            label={"Email"}
            placeholder={"john@mail.com"}
            name={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"123456"}
            name={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputBox
            label={"Confirm Password"}
            placeholder={"123456"}
            name={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {warning && (
            <p className=" text-red-600 text-md">Password did not match</p>
          )}
          <Button label={"Sign up"} />

          <BottomText
            text={"Already have an account?"}
            to={"/signin"}
            label={"Sign in"}
          />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
