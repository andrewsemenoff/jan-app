import { Circle } from './avatar-placeholder.styles';

interface AvatarPlaceholder{
    name: string;
}
const AvatarPlaceholder = ({name}: AvatarPlaceholder) => {
    const firstLetter = name[0].toUpperCase();
  return (
    <Circle>{firstLetter}</Circle>
  )
}

export default AvatarPlaceholder