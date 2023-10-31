import { RoundPhoto } from "./avatar.style";

interface AvatarProps {
  url: string;
  width: string;
  alt?: string;
  border?: string
}

const Avatar = ({ url, alt, width, border }: AvatarProps) => {
  return (
    <div style={{ width: width, overflow: "hidden", border }}>
      <RoundPhoto src={url} alt={alt} />
    </div>
  );
};

export default Avatar;
