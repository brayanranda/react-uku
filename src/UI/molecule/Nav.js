import { useState, useEffect } from "react";
import { Row } from "reactstrap";
import logo from "../../assets/images/logo.png";
import Avatar from "../atom/Avatar";
import AvatarOptions from "../molecule/AvatarOptions";
import { useLocation } from "react-router-dom";
import { getUser } from "../../hooks/useGetUser";

const Nav = () => {
  const [isAvatar, setIsAvatar] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (isAvatar) {
      setIsAvatar(false);
    }
  }, [location]);

  return (
    <nav className="mx-auto w-11/12 flex items-center justify-between">
      <Row className="w-100">
        <figure className="col-2">
          <img className="w-4/5" src={logo} alt="logo" />
        </figure>
        <ul className="flex items-center justify-end col-10">
          <li className="cursor-pointer position-relative">
            <div
              className="flex items-center bg-gray-100 hover:bg-green-100 duration-300 rounded-full"
              onClick={() => setIsAvatar(!isAvatar)}
            >
              <Avatar isAvatar={isAvatar} setIsAvatar={setIsAvatar} />
              <p className="px-3">{getUser()}</p>
            </div>
            
            {isAvatar && <AvatarOptions />}
          </li>
        </ul>
      </Row>
    </nav>
  );
};

export default Nav;
