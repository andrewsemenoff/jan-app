import { format, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SmallText, Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import { CommunitiesListBox } from "../../components/problem-creation/problem-creation.styles";
import { CommunityLabel } from "../../components/problem-item/problem-item.styles";
import ReactionBox from "../../components/reaction-box/reaction-box.component";
import SolutionsAndComments from "../../components/solutions-and-comments/solutions-and-comments.component";
import { selectUserId } from "../../features/account/accountSlice";
import {
  getOneProblem,
  selectCurrentProblem,
  subscribeOnProblem,
} from "../../features/problems/problemsSlice";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import {
  ButtonsWrapper,
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
  const { problem_id } = useParams();
  const dispatch = useAppDispatch();
  const problem = useAppSelector(selectCurrentProblem);
  const userId = useAppSelector(selectUserId);
  const {
    id,
    title,
    details,
    author,
    communityNames,
    currentAward,
    dateCreated,
    authorId,
    interactions: { donations, totalLikes, totalDislikes, subscriptions },
  } = problem;

  const canSubscribe = authorId !== userId;
  const isSubscribed = subscriptions.some((s) => {
    console.log("profileId:", s.profileId);
    console.log("userId:", userId);
    return s.profileId === userId;
  });
  const handleSubscribe = async () => {
    await dispatch(subscribeOnProblem(id));
    await dispatch(getOneProblem(id));
  };

  console.log("current problem:", problem);

  useEffect(() => {
    if (problem_id) {
      dispatch(getOneProblem(problem_id));
    }
  }, [problem_id]);

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      window?.MathJax.typesetClear();
      window?.MathJax.typeset();
    }
  }, [problem_id]);

  const parsedDate = parseISO(dateCreated);
  console.log("parsedDate: ", parsedDate);

const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm');

  return (
    <>
      <TitleSectionForProblemPage>
        <FlexWrapper>
          <Title>Problem #{problem_id}</Title>
          <ReactionBox
            reactions={{ dislikes: totalDislikes, likes: totalLikes }}
          />
        </FlexWrapper>
        <FlexWrapper>
          <SmallText>Posted by {author}</SmallText>
          <SmallText>{formattedDate}</SmallText>
        </FlexWrapper>
        <EditButtonsBar>
          <CustomButton disabled={true} buttonType={ButtonType.BASE}>
            Edit
          </CustomButton>
          <CustomButton buttonType={ButtonType.BASE}>Delete</CustomButton>
        </EditButtonsBar>
      </TitleSectionForProblemPage>

      <MainSectionForProblemPage>
        <LeftBox>
          <Title>{title}</Title>
          <DetailedText>{details}</DetailedText>
          <CommunitiesListBox>
            {communityNames.map((c, index) => (
              <CommunityLabel key={index}>{c}</CommunityLabel>
            ))}
          </CommunitiesListBox>

          <ButtonsWrapper>
            {canSubscribe && (
              <CustomButton
                onClick={handleSubscribe}
                buttonType={ButtonType.INVERTED}
                style={{ width: "15em" }}
              >
                <SvgIcon
                  svgPath={SVG_PATH.BELL}
                  fashion={Fashion.STATIC}
                  size="1.5em"
                  fill="#0984e3"
                />
                {isSubscribed ? "Unsubscribe" : "Subscribe"}
              </CustomButton>
            )}
          </ButtonsWrapper>
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
