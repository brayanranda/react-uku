import img from "../../assets/images/avatar.png";

const Avatar = ({ setIsAvatar, isAvatar }) => {

  return (
    <img
      width={50}
      src={img}
      alt="avatar"
      className="rounded-3xl"
    />
  );
};

export default Avatar;
