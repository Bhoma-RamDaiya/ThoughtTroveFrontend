import React from "react";
import Base from "../../component/Base/index";
import AddPost from "../../component/AddPost/Index";
import { Container } from "reactstrap";

const UserDashBoard = () => {
  return (
    <Base>
      <div>
        <Container>
          <AddPost />
        </Container>
      </div>
    </Base>
  );
};

export default UserDashBoard;
