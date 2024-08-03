import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Base from "../../component/Base";
import { useState } from "react";
import { signup } from "../../Services/signup-service/user-service";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    emailId: "",
    password: "",
    about: "",
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };
  const resetdata = () => {
    setData({
      name: "",
      emailId: "",
      password: "",
      about: "",
    });
  };
  const submitform = (event) => {
    event.preventDefault();
    console.log(data);
    //data validate
    // if (error.isError) {
    //   toast.error("form data is invalid!!");
    //   setError({ ...error, isError: false });
    //   return;
    // }
    //call server api
    signup(data)
      .then((response) => {
        toast.success("Signed up SuccessFully");
        console.log(response);
        console.log("success");
        setData({
          name: "",
          emailId: "",
          password: "",
          about: "",
        });
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        console.log("error log");
        // handle error in proper way
        setError({
          errors: error,
          isError: true,
        });
      });
  };
  return (
    <Base>
      <Container>
        {/* {JSON.stringify(data)} */}
        <Row className="mt-4">
          <Col sm={{ size: 4, offset: 4 }}>
            <Card color="dark" outline>
              <CardHeader>
                <h3>SignUp Here</h3>
              </CardHeader>
              <CardBody>
                <Form onSubmit={submitform}>
                  <FormGroup>
                    <Label for="name"> Enter Name </Label>
                    <Input
                      type="text"
                      placeholder="enter name "
                      id="name"
                      onChange={(e) => handleChange(e, "name")}
                      value={data.name}
                      invalid={
                        error.errors?.response?.data?.name ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.name}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name"> Email </Label>
                    <Input
                      type="email"
                      placeholder="Enter Email"
                      id="emailId"
                      onChange={(e) => handleChange(e, "emailId")}
                      value={data.emailId}
                      invalid={
                        error.errors?.response?.data?.emailId ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.emailId}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password"> Enter password </Label>
                    <Input
                      type="password"
                      placeholder="password "
                      id="password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                      invalid={
                        error.errors?.response?.data?.password ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="password"> about </Label>
                    <Input
                      type="textarea"
                      placeholder="about "
                      id="about"
                      onChange={(e) => handleChange(e, "about")}
                      value={data.about}
                      invalid={
                        error.errors?.response?.data?.about ? true : false
                      }
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.about}
                    </FormFeedback>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="warning">Signup</Button>
                    <Button
                      color="secondary"
                      className="ms-3"
                      type="reset"
                      onClick={resetdata}
                    >
                      Reset
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
export default Signup;
