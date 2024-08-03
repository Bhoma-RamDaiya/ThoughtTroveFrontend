import { Container } from "reactstrap";
import Base from "../../component/Base";
import NewFeed from "../../component/NewFeed";

const Home = () => {
  return (
    <Base>
      <Container className="mt-3">
        <NewFeed />
      </Container>
    </Base>
  );
};
export default Home;
