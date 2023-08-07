import { Circle, RoundPhoto } from "./avatar.style";

interface AvatarProps {
  url: string;
  alt: string;
  width: string;
}

const Avatar = ({ url, alt, width }: AvatarProps) => {
  return (
    <div style={{ width: width, overflow: "hidden", position: "relative" }}>
      <RoundPhoto src={url} alt={alt} />
      <Circle />
    </div>
  );
};

export default Avatar;
