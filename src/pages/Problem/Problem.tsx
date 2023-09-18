import { format, formatDistanceToNow, formatISO, parseISO } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InputWithTitleWrapper, SmallText, Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";
import { CommunitiesListBox } from "../../components/problem-creation/problem-creation.styles";
import { CommunityLabel } from "../../components/problem-item/problem-item.styles";
import ReactionBox from "../../components/reaction-box/reaction-box.component";
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
  CommentTextArea,
  DetailedText,
  FlexWrapper,
  LeftBox,
  MainSectionForProblemPage,
  RightBox,
  SolutionTextArea,
  SponsorsWrapper,
  TitleSectionForProblemPage,
} from "./Problem.style";
import { selectUser, selectUserId } from "../../features/account/accountSlice";

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
  const isSubscribed = subscriptions.some((s) => s.profileId === userId);
  const handleSubscribe = () => {
    dispatch(subscribeOnProblem(id));
  };
  console.log("current problem:", problem);

  const [solutionText, setSolutionText] = useState("");
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
  const handleSolutionTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSolutionText(e.target.value);
  };

  const isSubmitBtnDisabled = !solutionText.length;

  // const parsedDate = parseISO(dateCreated);
  // const distanceToNow = formatDistanceToNow(parsedDate);
  // const creationDate = formatISO(parsedDate);

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
          <SmallText>{/* {distanceToNow} ago / {creationDate} */}</SmallText>
        </FlexWrapper>
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
          <InputWithTitleWrapper style={{ position: "relative" }}>
            <Title>Comment: </Title>
            <CommentTextArea
              placeholder="Type your comment here"
              maxLength={200}
              rows={3}
            />
            <CustomButton
              buttonType={ButtonType.ROUND_BUTTON}
              size="2.5em"
              style={{ position: "absolute", right: ".2em", bottom: ".2em" }}
            >
              <SvgIcon
                svgPath={SVG_PATH.SEND_MESSAGE}
                style={{ position: "relative", left: "5%" }}
                fill="white"
                size="60%"
              />
            </CustomButton>
          </InputWithTitleWrapper>
          <InputWithTitleWrapper>
            <Title>Propose your solution</Title>
            <SolutionTextArea
              value={solutionText}
              onChange={handleSolutionTextChange}
              placeholder="Type your solution"
            />
          </InputWithTitleWrapper>
          <ButtonsWrapper>
            <CustomButton
              disabled={isSubmitBtnDisabled}
              buttonType={ButtonType.BASE}
              style={{ width: "15em" }}
            >
              Submit
            </CustomButton>
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
