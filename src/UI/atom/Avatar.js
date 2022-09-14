import img from "../../assets/images/avatar.jpg";

const Avatar = ({ setIsAvatar, isAvatar }) => {
  const handleAvatar = () => {
    setIsAvatar(!isAvatar);
  };
  return (
    <img
      onClick={handleAvatar}
      className="rounded-3xl"
      src={img}
      alt="avatar"
    />
  );
};

export default Avatar;
