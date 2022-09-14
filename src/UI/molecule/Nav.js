import { useState } from "react";
import { Row } from "reactstrap";
import logo from "../../assets/images/logo.png";
import Avatar from "../atom/Avatar";
import AvatarOptions from "../molecule/AvatarOptions";

const Nav = () => {
  const [isAvatar, setIsAvatar] = useState(false);
  return (
    <nav className="mx-auto w-11/12 flex items-center justify-between">
      <Row className="w-100">
        <figure className="col-2">
          <img className="w-4/5" src={logo} alt="logo" />
        </figure>
        <ul className="flex items-center justify-end col-10">
          <li className="cursor-pointer position-relative">
            <Avatar isAvatar={isAvatar} setIsAvatar={setIsAvatar} />
            {isAvatar ? <AvatarOptions /> : ""}
          </li>
        </ul>
      </Row>
    </nav>
  );
};

export default Nav;
