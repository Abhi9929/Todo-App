/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const InputBox = ({ label, placeholder, name, onChange }) => {
  const [visible, setVisibility] = useState(false);

  const Icon = <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />;

  const InputType = visible ? "text" : "password";

  const inputComponent = () => {
    if (label === "Password" || label === "Confirm Password") {
      return (
        <>
          <div className="text-md  font-bold text-left ">{label}</div>
          <input
            type={InputType}
            placeholder={placeholder}
            className="px-2 py-3 w-full border rounded border-slate-200 "
            value={name}
            onChange={onChange}
            required
          />
          <button
            className=" bg-transparent absolute top-[55%] text-slate-500 right-2 text-[17px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setVisibility(!visible);
            }}
          >
            {Icon}
          </button>
        </>
      );
    } else if (label === "Email") {
      return (
        <>
          <div className="text-md  font-bold text-left ">{label}</div>
          <input
            type="email"
            maxLength={40}
            placeholder={placeholder}
            className="px-2 py-3 w-full border rounded border-slate-200"
            value={name}
            onChange={onChange}
            required
          />
        </>
      );
    } else {
      return (
        <>
          <div className="text-md  font-bold text-left ">{label}</div>
          <input
            type="text"
            min={1}
            placeholder={placeholder}
            className="px-2 py-3 w-full border rounded border-slate-200"
            value={name}
            onChange={onChange}
            required
          />
        </>
      );
    }
  };

  return <div className="my-6 relative">{inputComponent()}</div>;
};

export default InputBox;
