import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SmallText, Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import CommunityChip from "../../components/community-chip/community-chip.component";
import { CommunitiesListBox } from "../../components/problem-item/problem-item.styles";
import ReactionBox from "../../components/reaction-box/reaction-box.component";
import SolutionsAndComments from "../../components/solutions-and-comments/solutions-and-comments.component";
import {
  STATUS,
  selectIsSignedIn,
  selectUser,
  selectUserId,
} from "../../features/account/accountSlice";
import { getComments } from "../../features/comments/commentsSlice";
import {
  deleteProblem,
  dislikeProblem,
  getOneProblem,
  likeProblem,
  selectCurrentProblem,
  subscribeOnProblem,
} from "../../features/problems/problemsSlice";
import { getSolutions } from "../../features/solutions/solutionsSlice";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import { getLocalDateInWords } from "../../utils/timeHandling";
import {
  DetailedText,
  EditButtonsBar,
  FlexWrapper,
  LeftBox,
  MainSectionForProblemPage,
  RightBox,
  SponsorsWrapper,
  TitleSectionForProblemPage,
} from "./Problem.style";

const Problem = () => {
  const navigate = useNavigate();
  const [deleteRequestStatus, setDeleteRequestStatus] = useState(STATUS.IDLE);
  const [reactionRequestStatus, setReactionRequestStatus] = useState(
    STATUS.IDLE
  );
  const { problem_id } = useParams();
  const dispatch = useAppDispatch();
  const problem = useAppSelector(selectCurrentProblem);
  const isSignedIn = useAppSelector(selectIsSignedIn);
  const userId = useAppSelector(selectUserId);
  const user = useAppSelector(selectUser);
  const {
    id,
    title,
    details,
    author,
    communityNames,
    currentAward,
    dateCreated,
    authorId,
    interactions: {
      donations,
      totalLikes,
      totalDislikes,
      subscriptions,
      likes,
      dislikes,
    },
  } = problem;

  const dateInWords = getLocalDateInWords(dateCreated);

  const canDelete = deleteRequestStatus === STATUS.IDLE;
  const isOwnProblem = authorId === userId;
  const isSubscribed = subscriptions.some((s) => {
    return s.profileId === userId;
  });
  const handleSubscribe = async () => {
    await dispatch(subscribeOnProblem(id));
    await dispatch(getOneProblem(id));
  };
  const handleDeleteClicked = async () => {
    setDeleteRequestStatus(STATUS.PENDING);
    try {
      await dispatch(deleteProblem(id)).unwrap();
      navigate("/");
    } catch (err: any) {
      console.log("error after delete problem was clicked");
    } finally {
      setDeleteRequestStatus(STATUS.IDLE);
    }
  };
  const handleEditClicked = () => {
    navigate(`/edit-problem/${id}`);
  };

  const handleClickLike = async () => {
    if (reactionRequestStatus === STATUS.IDLE) {
      setReactionRequestStatus(STATUS.PENDING);
      await dispatch(likeProblem(id));
      setReactionRequestStatus(STATUS.IDLE);
    }
  };
  const handleClickDislike = async () => {
    if (reactionRequestStatus === STATUS.IDLE) {
      setReactionRequestStatus(STATUS.PENDING);
      await dispatch(dislikeProblem(id)).unwrap();
      setReactionRequestStatus(STATUS.IDLE);
    }
  };

  const typesetMathJax = () => {
    if (typeof window?.MathJax !== "undefined") {
      window?.MathJax.typeset();
    }
  };

  useEffect(() => {
    (async () => {
      if (problem_id && isSignedIn) {
        await dispatch(getOneProblem(problem_id)).unwrap();
        typesetMathJax();
        await dispatch(getSolutions(problem_id)).unwrap();
        await dispatch(getComments(problem_id)).unwrap();
      }
    })();
    
  }, [problem_id]);
  

  return (
    <>
      <TitleSectionForProblemPage>
        <FlexWrapper>
          <div>
            <SmallText style={{ color: "grey" }}>
              {isSubscribed ? "Subscribed" : ""}
            </SmallText>
            <Title>Problem #{problem_id}</Title>
          </div>
          <SvgIcon
            fill={isSubscribed ? "black" : "grey"}
            onClick={handleSubscribe}
            svgPath={SVG_PATH.BELL}
            fashion={Fashion.ANIMATED}
            size="1.5em"
          />

          <ReactionBox
            reactions={{
              totalDislikes,
              totalLikes,
              likes,
              dislikes,
            }}
            handleClickDislike={handleClickDislike}
            handleClickLike={handleClickLike}
          />
        </FlexWrapper>
        <FlexWrapper>
          <SmallText>Posted by {author}</SmallText>
          <SmallText>{dateInWords}</SmallText>
        </FlexWrapper>
        {isOwnProblem && (
          <EditButtonsBar>
            <CustomButton
              onClick={handleEditClicked}
              buttonType={ButtonType.INVERTED}
            >
              Edit
            </CustomButton>
            <CustomButton
              disabled={!canDelete}
              buttonType={ButtonType.INVERTED}
              onClick={handleDeleteClicked}
            >
              Delete
            </CustomButton>
          </EditButtonsBar>
        )}
      </TitleSectionForProblemPage>

      <MainSectionForProblemPage>
        <LeftBox>
          <Title>{title}</Title>
          <DetailedText>{details}</DetailedText>
          <CommunitiesListBox>
            {communityNames.map((c, index) => (
              <CommunityChip key={index} communityName={c} />
            ))}
          </CommunitiesListBox>
          {problem_id && <SolutionsAndComments problemId={problem_id} />}
        </LeftBox>
        <RightBox>
          <SponsorsWrapper>
            <div>
              <Title>Current award: ${currentAward}</Title>
              <SmallText>
                please don't hesitate and give us all your money
              </SmallText>
            </div>
            <CustomButton buttonType={ButtonType.BASE}>Sponsor</CustomButton>
            <div>
              <Title>Top sponsors:</Title>
              {donations.map((d, index) => {
                return (
                  <SmallText key={index}>
                    ${d.amount} by {d.profileName} {d.date}
                  </SmallText>
                );
              })}
            </div>
          </SponsorsWrapper>
        </RightBox>
      </MainSectionForProblemPage>
    </>
  );
};

export default Problem;
