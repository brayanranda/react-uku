import img from "../../assets/images/avatar.png";

const Avatar = ({ setIsAvatar, isAvatar }) => {
  const handleAvatar = () => {
    setIsAvatar(!isAvatar);
  };
  return (
    <img
      width={50}
      src={img}
      alt="avatar"
      onClick={handleAvatar}
      className="rounded-3xl"
    />
  );
};

export default Avatar;
