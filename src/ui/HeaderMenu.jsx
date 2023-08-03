import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";

import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ListItem = styled.li`
  list-style: none;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <ListItem>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </ListItem>

      <ListItem>
        <DarkModeToggle />
      </ListItem>

      <ListItem>
        <Logout />
      </ListItem>
    </StyledHeaderMenu>
  );
}
