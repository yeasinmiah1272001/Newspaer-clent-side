import { NavLink } from "react-router-dom";
import { MdSlowMotionVideo } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";
import subscription from "../../../assets/icon/subscription.png";

const DesktopLink = () => {
  return (
    <ul className="text-text_primary text-base flex items-center gap-6 desktop-navbar">
      <>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-secondary_color "
              : "flex items-center gap-2 desktop-link "
          }
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </span>
          <span>Home</span>
        </NavLink>
      </>
      <li>
        <NavLink
          to="/video"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-secondary_color "
              : "flex items-center gap-2 desktop-link "
          }
        >
          <span className="text-2xl">
            <MdSlowMotionVideo />
          </span>
          <span>Video</span>
        </NavLink>
      </li>
      <li className="">
        <NavLink
          to="/top-writer"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-secondary_color "
              : "flex items-center gap-2 desktop-link "
          }
        >
          <span className="text-2xl">
            <TfiWrite />
          </span>
          <span>Top Writer</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/subscription"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-secondary_color "
              : "flex items-center gap-2 desktop-link "
          }
        >
          <span className="text-2xl">
            <img src={subscription} alt="subscription" />
          </span>
          <span>Subscription</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/premium-article"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-secondary_color "
              : "flex items-center gap-2 desktop-link "
          }
        >
          <span className="text-2xl">
            <MdOutlineWorkspacePremium />
          </span>
          <span>Premium News</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default DesktopLink;
