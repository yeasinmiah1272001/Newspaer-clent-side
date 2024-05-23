import PropTypes from "prop-types";
import { useNotification } from "../../../hooks/api";
const SearchAndNotification = ({
  setOpenSearch,
  openSearch,
  setOpenNotification,
  openNotification,
}) => {
  const { notification } = useNotification();

  return (
    <>
      <div className="flex items-center text-text_primary gap-6">
        <div className="">
          <button
            className={`relative cursor-pointer h-10 w-10 active:scale-95 flex justify-center items-center rounded-full duration-200 hover:bg-secondary_color hover:text-white  hover:shadow-md ${
              openNotification ? "bg-secondary_color  shadow-md text-white" : ""
            }`}
            onClick={() => setOpenNotification(!openNotification)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 drop-shadow-md"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>
            <span className="flex absolute h-3 w-3 rounded-full top-[2px] right-0 bg-primary_color  justify-center items-center">
              <small className="text-white text-[10px]">
                {notification?.length}
              </small>
            </span>
          </button>
        </div>
        {/* <div>
          <button
            className={`rounded-full h-10 w-10 flex active:scale-95 justify-center items-center duration-300 hover:shadow-md hover:text-white hover:bg-secondary_color ${
              openSearch ? "bg-secondary_color shadow-md text-white" : ""
            }`}
            onClick={() => setOpenSearch(!openSearch)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 drop-shadow-2xl"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div> */}
      </div>
    </>
  );
};

SearchAndNotification.propTypes = {
  setOpenSearch: PropTypes.func.isRequired,
  openSearch: PropTypes.bool.isRequired,
  setOpenNotification: PropTypes.func.isRequired,
  openNotification: PropTypes.bool.isRequired,
};

export default SearchAndNotification;
