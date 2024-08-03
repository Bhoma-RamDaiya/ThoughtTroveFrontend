import { useState } from "react";
import Base from "../../component/Base";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { toast } from "react-toastify";
import { loginUser } from "../../Services/signup-service/user-service";
import { doLogin } from "../../Auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [userlog, setUserlog] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();
  const handlechange = (event, field) => {
    setUserlog({ ...userlog, [field]: event.target.value });
  };
  const submitform = (event) => {
    event.preventDefault();
    console.log(userlog);
    // if (userlog.userName.trim() == "" || userlog.password == "") {
    //   toast.error("username or password can not be null");
    //   return;
    // }
    //server
    loginUser(userlog)
      .then((data) => {
        console.log(data);
        // do login functionality
        doLogin(data, () => {
          console.log("data stored in local storage ");
        });
        navigate("/user/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data);
        } else {
          toast.error("Enter correct crediantails!!");
        }
      });
    setUserlog({
      userName: "",
      password: "",
    });
  };
  return (
    <Base>
      <Container>
        <Row className="mt-4">
          <Col sm={{ size: 3, offset: 5 }}>
            <Card color="dark" outline>
              <CardHeader>
                <h3 className="text-center">login </h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitform}>
                  <FormGroup>
                    <Label for="userName"> Enter Email </Label>
                    <Input
                      type="email"
                      placeholder="email "
                      id="userName"
                      value={userlog.userName}
                      onChange={(e) => {
                        handlechange(e, "userName");
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password"> Enter password </Label>
                    <Input
                      type="password"
                      placeholder="password "
                      id="password"
                      value={userlog.password}
                      onChange={(e) => {
                        handlechange(e, "password");
                      }}
                    />
                  </FormGroup>

                  <Container className="text-center">
                    <Button color="success" className="ms-2 me-2">
                      {" "}
                      Login
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
};
export default Login;
