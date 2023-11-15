import { Community } from "../../features/communities/communitiesSlice";
import {
  CardBox,
  DescriptionBox,
  Label,
  RelativeBox,
  StatBox,
  StatItem,
  Triangle,
} from "./community-card.styles";

interface Props {
  community: Community;
  onClick: () => void;
}
const CommunityCard = ({
  community: { description, name, totalMembers, totalProblems },
  onClick,
}: Props) => {
  return (
    <CardBox onClick={onClick}>
      <h2 style={{ flexGrow: "1fr" }}>{name}</h2>
      <DescriptionBox>{description}</DescriptionBox>
      <StatBox>
        <RelativeBox>
          <StatItem>{totalMembers}</StatItem>
          <Label>
            members
            <Triangle />
          </Label>
        </RelativeBox>
        <RelativeBox>
          <StatItem>{totalProblems}</StatItem>
          <Label>
            problems
            <Triangle />
          </Label>
        </RelativeBox>
      </StatBox>
    </CardBox>
  );
};

export default CommunityCard;
