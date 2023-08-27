import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";

import { InputWithTitleWrapper, Title } from "../../App.style";
import { communities } from "../../assets/mock_data";
import CustomButton, { ButtonType } from "../../components/button/button.component";
import { CommunityLabel } from "../../components/problem-item/problem-item.styles";
import {
  CommunitiesListBox,
  CommunitySelectorWrapper,
  DescriptionTextArea,
  FormsWrapper,
  MainSectionForProblemProposal,
  PreviewWrapper,
  TitleSectionForProblemProposal,
  TitleTextArea
} from "./ProblemProposal.styles";



const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "12em",
      minWidth: "16em",
    },
  },
};

const ProblemProposal = () => {
  const defaultTitle =
    "If the sum of two numbers is 15 and their difference is 5, find the two numbers";
  const defaultDescription =
    "When \\(a \\ne 0\\), there exists two solutions for\\(ax^2 + bx + c = 0\\) as \\[x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.\\] ";

  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const handleSelectChange = (
    event: SelectChangeEvent<typeof selectedCommunities>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCommunities(
      typeof value === "string" ? value.split(",") : value
    );
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
        <Title>Propose a problem</Title>
        <Title>Preview</Title>
      </TitleSectionForProblemProposal>
      <MainSectionForProblemProposal>
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
          <CommunitySelectorWrapper>
            <Title>Community:</Title>
            <Select
              sx={{ width: "16em", overflow: "hidden", height: "2em" }}
              id="demo-multiple-checkbox"
              multiple
              value={selectedCommunities}
              onChange={handleSelectChange}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {communities.map((name) => (
                <MenuItem sx={{ padding: "0" }} key={name} value={name}>
                  <Checkbox checked={selectedCommunities.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </CommunitySelectorWrapper>
          <CustomButton buttonType={ButtonType.BASE} >Post the problem</CustomButton>
        </FormsWrapper>
        <PreviewWrapper>
          <Title style={{ marginBottom: "2em", textAlign: "center" }}>
            {title}
          </Title>
          <p>{description}</p>
          <CommunitiesListBox>
            {selectedCommunities.map((communityName, index) => (
              <CommunityLabel key={index}>{communityName}</CommunityLabel>
            ))}
          </CommunitiesListBox>
        </PreviewWrapper>
      </MainSectionForProblemProposal>
    </>
  );
};

export default ProblemProposal;
