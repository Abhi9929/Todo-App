import { useState } from "react";
import BottomText from "../components/BottomText";
import Button from "../components/Button";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import "../style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();


    async function Userlogin() {
      try {
        const response = axios.post(
          "/api/users/signin",
          {
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
        const { user, token } = data;
        // navigate to the next page
        setEmail("");
        setPassword("");
        navigate("/main", { replace: true, state: {user, token} });
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    }

    Userlogin();

  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className=" flex flex-col justify-center h-fit">
        <div className="bg-slate-300 h-screen flex justify-center items-center">
          <div className=" flex flex-col justify-center h-fit">
            <form
              className=" rounded-lg bg-white w-[300px] text-center p-2 h-max  px-4"
              onSubmit={handleSubmit}
            >
              <Header label={"Signin"} />
              <SubHeading label={"Enter your Information to login"} />
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
              <Button label={"Sign In"} />
              <BottomText
                text={"Create an account?"}
                to={"/signup"}
                label={"Sign up"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
