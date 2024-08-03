import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { loadAllCatagories } from "../../Services/CategoryService/catagory-service";
import JoditEditor from "jodit-react";
import { createPost } from "../../Services/PostService/post-service";
import { getCurrentuser } from "../../Auth";
import { toast } from "react-toastify";

const AddPost = () => {
  const [catagories, setCatagories] = useState([]);
  const editor = useRef(null);
  const [user, setUser] = useState(undefined);
  const [post, setPost] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  useEffect(() => {
    setUser(getCurrentuser());
    loadAllCatagories()
      .then((data) => {
        setCatagories(data);
        // console.log(data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);
  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const contentFieldChange = (event) => {
    setPost({ ...post, content: event });
  };
  //create post
  const postCreate = (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      toast.error("title is required");
      return;
    }
    if (post.content.trim() === "") {
      toast.error("please writing about the post");
      return;
    }
    if (post.categoryId === "") {
      toast.error("select the post category");
      return;
    }
    post["userId"] = user.userId;
    createPost(post)
      .then((data) => {
        toast.success("post created bro chill ho jaao ");

        console.log(
          setPost({
            title: "",
            content: "",
            categoryId: "",
          })
        );
      })
      .catch((error) => {
        toast.error("error is here bro just sharpen your mind ");
        // console.log(error);
      });
    // console.log("form submitted");
  };
  return (
    <div className="wrapper">
      <Card className="shadow-sm mt-3">
        {/* {JSON.stringify(post)} */}
        <CardBody>
          <h3>What's going in your mind ?</h3>
          <Form onSubmit={postCreate}>
            <div>
              <Label for="title">Post title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here "
                className="rounded-0"
                name="title"
                onChange={fieldChanged}
              />
            </div>
            <div>
              <Label for="content">Post content</Label>
              {/* <Input
                type="textarea"
                id="content"
                placeholder="Enter here "
                className="rounded-0"
                style={{ height: "250px" }}
              /> */}
              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={contentFieldChange}
              />
            </div>
            <div>
              <Label for="category">Post category</Label>
              <Input
                type="select"
                id="categoryId"
                placeholder="Enter here "
                className="rounded-0"
                name="categoryId"
                onChange={fieldChanged}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --select catagory--
                </option>
                {catagories.map((catagory) => (
                  <option value={catagory.categoryId} key={catagory.categoryId}>
                    {catagory.categoryTitle}
                  </option>
                ))}
              </Input>
            </div>
            <Container className="text-center">
              <Button
                color="primary"
                className="ms-3 mt-3 rounded-0"
                type="submit"
              >
                Create Post
              </Button>
              <Button color="danger" className="ms-3 mt-3 rounded-0">
                Reset Post
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};
export default AddPost;
