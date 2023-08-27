import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { InputWithTitleWrapper, SmallText, Title } from "../../App.style";
import { getMockProblems } from "../../assets/mock_data";
import { CommunityLabel } from "../../components/problem-item/problem-item.styles";
import ReactionBox from "../../components/reaction-box/reaction-box.component";
import SvgIcon, {
  Fashion,
  SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import { CommunitiesListBox } from "../ProblemProposal/ProblemProposal.styles";
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
import CustomButton, {
  ButtonType,
} from "../../components/button/button.component";

const Problem = () => {
  const { id } = useParams();
  const [solutionText, setSolutionText]= useState('');
  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      window?.MathJax.typesetClear();
      window?.MathJax.typeset();
    }
  }, [solutionText]);
  const handleSolutionTextChange = (e: ChangeEvent <HTMLTextAreaElement>) => {
    setSolutionText(e.target.value)};  

    const isSubmitBtnDisabled = !solutionText.length;

    const randomProblem = getMockProblems(10)[id ? +id - 1 : 0];
  console.log(randomProblem);

  const {
    title,
    author,
    createdAt,
    votes,
    currentAward,
    communities,
    solutions,
    reactions,
    details,
  } = randomProblem;

  const donates = [
    { sponsor: "John Smith", sum: 127, date: 1690068244863 },
    { sponsor: "Steven White", sum: 560, date: 1690468244863 },
    { sponsor: "Tom Sawyer", sum: 490, date: 1692418244863 },
  ];

  const distanceToNow = formatDistanceToNow(createdAt);
  const date = format(createdAt, "dd.MM.yyyy");
  console.log("details:", details);

  return (
    <>
      <TitleSectionForProblemPage>
        <FlexWrapper>
          <Title>Problem #{id}</Title>
          <ReactionBox reactions={reactions} />
        </FlexWrapper>
        <FlexWrapper>
          <SmallText>Posted by {author}</SmallText>
          <SmallText>
            {distanceToNow} ago / {date}
          </SmallText>
        </FlexWrapper>
      </TitleSectionForProblemPage>
      <MainSectionForProblemPage>
        <LeftBox>
          <Title>{title}</Title>
          <DetailedText>{details}</DetailedText>
          <CommunitiesListBox>
            {communities.map((c, index) => (
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
            <SolutionTextArea value={solutionText} onChange={handleSolutionTextChange} placeholder="Type your solution"/>
          </InputWithTitleWrapper>
          <ButtonsWrapper>
            <CustomButton
              disabled={isSubmitBtnDisabled}
              buttonType={ButtonType.BASE}
              style={{ width: "15em" }}
            >
              Submit
            </CustomButton>
            <CustomButton
              buttonType={ButtonType.INVERTED}
              style={{ width: "15em" }}
            >
              <SvgIcon svgPath={SVG_PATH.BELL} fashion={Fashion.STATIC} size="1.5em" fill="#0984e3"/>
              Subscribe
            </CustomButton>
          </ButtonsWrapper>
        </LeftBox>
        <RightBox>
          <SponsorsWrapper>
            <div>
              <Title>
                Current award: ${donates.reduce((acc, cur) => acc + cur.sum, 0)}
              </Title>
              <SmallText>
                please don't hesitate and give us all your money
              </SmallText>
            </div>
            <CustomButton buttonType={ButtonType.BASE}>Sponsor</CustomButton>
            <div>
              <Title>Top sponsors:</Title>
              {donates.map((d, index) => {
                const createdAt = format(d.date, "dd.MM.yyyy");
                return (
                  <SmallText key={index}>
                    ${d.sum} by {d.sponsor} {createdAt}
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
