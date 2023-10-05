import { useNavigate } from 'react-router-dom';
import { CommunityChipBox } from './community-chip.styles';

interface CommunityChipProps{
    communityName: string;
}
const CommunityChip = ({communityName}: CommunityChipProps) => {
    const navigate = useNavigate();
    const handleClickChip = (event: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        event.stopPropagation();
        navigate(`/communities/${communityName}`)
    }
  return (
    <CommunityChipBox onClick={handleClickChip}>{communityName}</CommunityChipBox>
  )
}

export default CommunityChip