import { Chip } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { InputWithTitleWrapper, MainSection, Title } from "../../App.style";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCommunitiesNames } from "../../features/communities/communitiesSlice";
import { addProblem, editProblem } from "../../features/problems/problemsSlice";
import AutocompleteField from "../autocomplete-field/autocomplete-field.component";
import CustomButton, { ButtonType } from "../button/button.component";
import {
  ButtonsBar,
  CommunitiesListBox,
  DescriptionTextArea,
  FormsWrapper,
  GridBox,
  PreviewWrapper,
  TitleSectionForProblemProposal,
  TitleTextArea,
} from "./problem-creation.styles";
import { useNavigate } from "react-router-dom";

export enum CREATION_TYPE {
  ADD_PROBLEM = "create problem",
  EDIT_PROBLEM = "save changes",
}

interface ProblemCreationProps {
  creationType: CREATION_TYPE;
  problem?: {
    title: string | undefined;
    description: string | undefined;
    communities: string[] | undefined;
  };
}

const ProblemCreation = ({ creationType, problem }: ProblemCreationProps) => {
  const navigate = useNavigate();
  const buttonName = creationType;
  const titleSectionName =
    creationType === CREATION_TYPE.ADD_PROBLEM
      ? "Propose a problem"
      : "Edit problem";
  const communities = useAppSelector(selectCommunitiesNames);
  const defaultTitle =
    "If the sum of two numbers is 15 and their difference is 5, find the two numbers";
  const defaultDescription =
    "When \\(a \\ne 0\\), there exists two solutions for\\(ax^2 + bx + c = 0\\) as \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\] ";

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(problem?.title ?? defaultTitle);
  const [description, setDescription] = useState(
    problem?.description ?? defaultDescription
  );
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>(
    problem?.communities ?? []
  );
  const handleCommunitiesChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string[]
  ) => {
    setSelectedCommunities(newValue);
  };

  const handleButtonClicked = () => {
    const newProblem = {
      title: title,
      details: description,
      communityNames: selectedCommunities,
    };
    switch (creationType) {
      case CREATION_TYPE.ADD_PROBLEM:
        dispatch(addProblem(newProblem));
        break;
      case CREATION_TYPE.EDIT_PROBLEM:
        dispatch(editProblem(newProblem));
        break;
    }
  };

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined") {
      window?.MathJax.typesetClear();
      window?.MathJax.typeset();
    }
  }, [title, description]);
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
