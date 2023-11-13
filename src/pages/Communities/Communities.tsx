import CommunityCard from "../../components/community-card/community-card.components";
import { GridWrapper } from "./Communities.styles";

const Communities = () => {
  return (
    <GridWrapper>
      {[...new Array(9).keys()].map((_, index) => (
        <CommunityCard users={} problems={} title={} key={index} />
      ))}
    </GridWrapper>
  );
};

export default Communities;
