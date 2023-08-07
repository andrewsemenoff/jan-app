import { ButtonType, CustomButton } from "../components/button/button.styles";

const ProblemsList = () => {
  return (
    <div>
      ProblemsList
      <CustomButton buttonType={ButtonType.INVERTED}>
        propose a problem
      </CustomButton>
    </div>
  );
};

export default ProblemsList;
