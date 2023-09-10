import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface ChipsArrayProps {
  chips: string[];
}
function ChipsArray({ chips }: ChipsArrayProps) {
  const [chipsArray, setChipsArray] = React.useState<string[]>(chips);

  const handleDelete = (chipToDelete: string) => () => {
    setChipsArray((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipsArray.map((chip, index) => {
        return (
          <ListItem key={index}>
            <Chip label={chip} onDelete={handleDelete(chip)} />
          </ListItem>
        );
      })}
    </Paper>
  );
}
export default ChipsArray;
