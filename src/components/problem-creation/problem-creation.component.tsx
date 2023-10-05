import { Chip } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { InputWithTitleWrapper, MainSection, Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCommunitiesNames, selectCommunitiesNames } from "../../features/communities/communitiesSlice";
import {
  Problem,
  addProblem,
  editProblem,
} from "../../features/problems/problemsSlice";
import AutocompleteField from "../autocomplete-field/autocomplete-field.component";
import CustomButton, { ButtonType } from "../button/button.component";
import {
  ButtonsBar,
  DescriptionTextArea,
  FormsWrapper,
  GridBox,
  PreviewWrapper,
  TitleSectionForProblemProposal,
  TitleTextArea,
} from "./problem-creation.styles";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../features/account/accountSlice";
import { CommunitiesListBox } from "../problem-item/problem-item.styles";

export enum CREATION_TYPE {
  ADD_PROBLEM = "create problem",
  EDIT_PROBLEM = "edit problem",
}

interface ProblemCreationProps {
  creationType: CREATION_TYPE;
  problem?: {
    title: string;
    description: string;
    communities: string[];
    problem_id: string;
  };
}
const arraysHaveSameStrings = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((item) => arr2.includes(item));
};

const ProblemCreation = ({ creationType, problem }: ProblemCreationProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const communities = useAppSelector(selectCommunitiesNames);

  const buttonName =
    creationType === CREATION_TYPE.ADD_PROBLEM
      ? "create problem"
      : "save changes";
  const titleSectionName =
    creationType === CREATION_TYPE.ADD_PROBLEM
      ? "Propose a problem"
      : "Edit problem";
  const defaultTitle =
    "If the sum of two numbers is 15 and their difference is 5, find the two numbers";
  const defaultDescription =
    "When \\(a \\ne 0\\), there exists two solutions for\\(ax^2 + bx + c = 0\\) as \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\] ";

  const [requestStatus, setRequestStatus] = useState(STATUS.IDLE);

  const initialTitle = problem?.title ?? defaultTitle;
  const initialDescription = problem?.description ?? defaultDescription;
  const initialCommunities = problem?.communities ?? [];

  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [selectedCommunities, setSelectedCommunities] =
    useState<string[]>(initialCommunities);

  const isProblemChanged =
    initialTitle !== title ||
    initialDescription !== description ||
    !arraysHaveSameStrings(initialCommunities, selectedCommunities);

  const canClick = requestStatus === STATUS.IDLE && isProblemChanged;

  const handleCommunitiesChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setSelectedCommunities(newValue);
  };

  const handleButtonClicked = async () => {
    const newProblem = {
      title: title,
      details: description,
      communityNames: selectedCommunities,
    };
    switch (creationType) {
      case CREATION_TYPE.ADD_PROBLEM:
        try {
          setRequestStatus(STATUS.PENDING);
          const { id } = (await dispatch(
            addProblem(newProblem)
          ).unwrap()) as Problem;
          navigate(`/problem/${id}`);
        } catch (err: any) {
        } finally {
          setRequestStatus(STATUS.IDLE);
        }

        break;
      case CREATION_TYPE.EDIT_PROBLEM:
        if (problem)
          try {
            setRequestStatus(STATUS.PENDING);
            await dispatch(
              editProblem({
                updatedProblem: newProblem,
                problem_id: problem?.problem_id,
              })
            ).unwrap();
            navigate(`/problem/${problem.problem_id}`);
          } catch (err: any) {
          } finally {
            setRequestStatus(STATUS.IDLE);
          }
        else
          console.log(
            "did not get problem object in problem-creation component"
          );

        break;
    }
  };

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      window?.MathJax.typesetClear();
      window?.MathJax.typeset();
    }
  }, [title, description]);
  useEffect(()=>{
    dispatch(getCommunitiesNames())
  },[])
  return (
    <>
      <TitleSectionForProblemProposal>
        <Title>{titleSectionName}</Title>
        <Title>Preview</Title>
      </TitleSectionForProblemProposal>
      <MainSection>
        <GridBox>
          <FormsWrapper>
            <InputWithTitleWrapper>
              <Title>Title:</Title>
              <TitleTextArea
                placeholder={defaultTitle}
                value={title}
                name="title"
                rows={3}
                maxLength={150}
                onChange={(e) => setTitle(e.target.value)}
              ></TitleTextArea>
            </InputWithTitleWrapper>
            <InputWithTitleWrapper>
              <Title>Description:</Title>
              <DescriptionTextArea
                placeholder={defaultDescription}
                value={description}
                name="description"
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
              ></DescriptionTextArea>
            </InputWithTitleWrapper>
            <InputWithTitleWrapper>
              <Title>Community:</Title>
              <AutocompleteField
                selectedItems={selectedCommunities}
                items={communities}
                handleChange={handleCommunitiesChange}
              />
            </InputWithTitleWrapper>
          </FormsWrapper>
          <PreviewWrapper>
            <Title style={{ marginBottom: "2em", textAlign: "center" }}>
              {title}
            </Title>
            <p>{description}</p>
            <CommunitiesListBox>
              {selectedCommunities.map((communityName, index) => (
                <Chip
                  label={communityName}
                  key={index}
                  style={{ backgroundColor: "#0288d1" }}
                />
              ))}
            </CommunitiesListBox>
          </PreviewWrapper>
        </GridBox>
        <ButtonsBar>
          <CustomButton
            buttonType={ButtonType.BASE}
            onClick={handleButtonClicked}
            disabled={!canClick}
          >
            {buttonName}
          </CustomButton>
          {creationType === CREATION_TYPE.EDIT_PROBLEM && (
            <CustomButton
              buttonType={ButtonType.INVERTED}
              onClick={() => navigate(-1)}
            >
              cancel
            </CustomButton>
          )}
        </ButtonsBar>
      </MainSection>
    </>
  );
};

export default ProblemCreation;
