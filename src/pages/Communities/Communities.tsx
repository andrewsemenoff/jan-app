import { useEffect, useState } from "react";
import { Circles as Loader } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import CommunityCard from "../../components/community-card/community-card.components";
import { CustomInput } from "../../components/custom-input/custom-input.styles";
import { STATUS } from "../../features/account/accountSlice";
import {
  SORT,
  changeSortCommunitiesType,
  getCommunities,
  selectSortType,
  selectSortedCommunities,
} from "../../features/communities/communitiesSlice";
import SvgIcon, {
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import {
  Divider,
  GridWrapper,
  LoaderWrapper,
  SortBar,
} from "./Communities.styles";

const Communities = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchFilter, setSearchFilter] = useState("");
  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);

  const sortType = useAppSelector(selectSortType);
  const communities = useAppSelector(selectSortedCommunities(sortType));
  const filteredCommunities = communities.filter((c) =>
    c.name.toLocaleLowerCase().includes(searchFilter)
  );

  useEffect(() => {
    if (!communities.length) {
      (async () => {
        setRequestStatus(STATUS.PENDING);
        try {
          await dispatch(getCommunities());
        } finally {
          setRequestStatus(STATUS.IDLE);
        }
      })();
    }
    dispatch(getCommunities());
  }, []);

  const handleSortByAlphClick = () => {
    sortType !== SORT.AlPHA_DESC
      ? dispatch(changeSortCommunitiesType(SORT.AlPHA_DESC))
      : dispatch(changeSortCommunitiesType(SORT.ALPHA_ASC));
  };
  const handleSortByMembersAmountClick = () => {
    sortType !== SORT.MEMBER_AMOUNT_DESC
      ? dispatch(changeSortCommunitiesType(SORT.MEMBER_AMOUNT_DESC))
      : dispatch(changeSortCommunitiesType(SORT.MEMBER_AMOUNT_ASC));
  };
  const handleSortByProblemsAmountClick = () => {
    sortType !== SORT.PR_AMOUNT_DESC
      ? dispatch(changeSortCommunitiesType(SORT.PR_AMOUNT_DESC))
      : dispatch(changeSortCommunitiesType(SORT.PR_AMOUNT_ASC));
  };

  return (
    <div>
      <SortBar>
        <CustomButton
          buttonType={ButtonType.BASE}
          svgFill={
            sortType === SORT.ALPHA_ASC || sortType === SORT.AlPHA_DESC
              ? "white"
              : undefined
          }
          svgElement={{
            svgPath:
              sortType !== SORT.AlPHA_DESC
                ? SVG_PATH.SORT_ALPHABET_ASCENDING
                : SVG_PATH.SORT_ALPHABET_DESCENDING,
          }}
          onClick={handleSortByAlphClick}
        />
        <CustomButton
          buttonType={ButtonType.BASE}
          svgFill={
            sortType === SORT.MEMBER_AMOUNT_ASC ||
            sortType === SORT.MEMBER_AMOUNT_DESC
              ? "white"
              : undefined
          }
          svgElement={{
            svgPath:
              sortType !== SORT.MEMBER_AMOUNT_DESC
                ? SVG_PATH.SORT_AMOUNT_ASCENDING
                : SVG_PATH.SORT_AMOUNT_DESCENDING,
          }}
          onClick={handleSortByMembersAmountClick}
        >
          <SvgIcon svgPath={SVG_PATH.MEMBERS} />
        </CustomButton>

        <CustomButton
          buttonType={ButtonType.BASE}
          svgFill={
            sortType === SORT.PR_AMOUNT_ASC || sortType === SORT.PR_AMOUNT_DESC
              ? "white"
              : undefined
          }
          svgElement={{
            svgPath:
              sortType !== SORT.PR_AMOUNT_DESC
                ? SVG_PATH.SORT_AMOUNT_ASCENDING
                : SVG_PATH.SORT_AMOUNT_DESCENDING,
          }}
          onClick={handleSortByProblemsAmountClick}
        >
          <SvgIcon svgPath={SVG_PATH.SOLUTIONS} />
        </CustomButton>
        <CustomInput
        style={{width: '50%', minWidth: '5em'}}
          value={searchFilter}
          onChange={(event) => {
            setSearchFilter(event.currentTarget.value);
          }}
        />
      </SortBar>
      {requestStatus === STATUS.PENDING ? (
        <LoaderWrapper>
          <Loader color="#0984e3" />
        </LoaderWrapper>
      ) : (
        <GridWrapper>
          {filteredCommunities?.map((c, index, arr) => {
            return ((sortType === SORT.AlPHA_DESC||sortType ===SORT.ALPHA_ASC )&&
                c.name.charAt(0).toLocaleLowerCase() !==
                  arr[index - 1]?.name.charAt(0).toLocaleLowerCase()) ? (
              <>
                <Divider>{c.name.charAt(0)}</Divider>
                <CommunityCard
                  community={c}
                  key={index}
                  onClick={() => navigate(`/communities/${c.name}`)}
                />
              </>
            ) : (
              <CommunityCard
                community={c}
                key={index}
                onClick={() => navigate(`/communities/${c.name}`)}
              />
            );
          })}
        </GridWrapper>
      )}
    </div>
  );
};

export default Communities;
