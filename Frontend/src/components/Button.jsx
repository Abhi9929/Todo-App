/* eslint-disable react/prop-types */
const Button = ({label, onClick}) => {
  return (
    <div>
      <button className="w-full relative inline-flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 my-8"
      onClick={onClick}
      >
        <span className="w-full relative text-2xl px-5 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {label}
        </span>
      </button>
    </div>
  );
};

export default Button;
