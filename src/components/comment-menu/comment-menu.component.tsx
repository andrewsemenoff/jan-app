import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useAppDispatch } from "../../app/hooks";
import { deleteComment, getComments } from "../../features/comments/commentsSlice";
import SvgIcon, {
    Fashion,
    SVG_PATH,
} from "../../svg-components/svg-icon/svg-icon.component";
import { MenuElement } from "./commment-menu.styles";

interface CommentMenuProps{
    commentId: string,
    problemId: string,
    disabled?: boolean,
    handleClickEdit: ()=>void,
}
const CommentMenu = ({commentId, problemId, disabled, handleClickEdit}: CommentMenuProps) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget as unknown as HTMLElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
   const res = await dispatch(deleteComment(commentId)).unwrap();
   if (res === 200) {
    await dispatch(getComments(problemId))
   }
    setAnchorEl(null);
  };
  const handleEdit = async () => {
    handleClickEdit();
    setAnchorEl(null);
  };

  return (
    <div>
      <SvgIcon
        size="1em"
        svgPath={SVG_PATH.MENU}
        fashion={Fashion.ANIMATED}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDelete}>
          <MenuElement>
            <SvgIcon svgPath={SVG_PATH.DELETE} size="1em" />
            Delete
          </MenuElement>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <MenuElement>
            <SvgIcon svgPath={SVG_PATH.PENCIL} size="1em" />
            Edit
          </MenuElement>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CommentMenu;
