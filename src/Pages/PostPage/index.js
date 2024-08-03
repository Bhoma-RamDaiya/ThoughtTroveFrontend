import React, { useEffect, useState } from "react";
import Base from "../../component/Base";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import {
  createComment,
  loadPost,
} from "../../Services/PostService/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Services/helper";
import { isLogedIn } from "../../Auth";

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState({
    content: "",
  });
  useEffect(() => {
    loadPost(postId)
      .then((data) => {
        setPost(data);
        // console.log(data);
      })
      .catch((error) => {
        // console.log(error);
        toast.error("error in loading post");
      });
  }, []);
  const printDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const doReply = () => {
    if (!isLogedIn) {
      toast.error("need to login frist...");
    }
    if (comment.content.trim() == "") {
      toast.error("enter some content....");
    }
    createComment(comment, post.postId)
      .then((data) => {
        console.log(data);
        setPost({
          ...post,
          comments: [...post.comments, data.data],
        });
        setComment({
          content: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Base>
      <Container className="mt-4">
        <Link to="/">Home</Link>

        <Row>
          <Col
            md={{
              size: 12,
            }}
          >
            <Card className="mt-3">
              {post && (
                <CardBody>
                  <CardText>
                    Posted By <b>{post.user.name}</b>{" "}
                    <b>{printDate(post.addedDate)}</b>
                  </CardText>
                  <CardText>
                    <b>{post.title}</b>
                  </CardText>
                  <CardText>
                    <span>{post.category.categoryTitle}</span>
                  </CardText>
                  <div className="image-container ">
                    <img
                      src={BASE_URL + "/post/image/" + post.imageName}
                      style={{ width: "40%" }}
                    ></img>
                  </div>
                  <CardText
                    className="mt-5"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  ></CardText>
                </CardBody>
              )}
            </Card>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={{ size: 9, offset: 1 }}>
            <h3>Comments ({post ? post.comments.length : 0})</h3>
            <Card className="mt-4 border-0">
              <CardBody>
                <Input
                  type="textarea"
                  placeholder="write here ......."
                  value={comment.content}
                  onChange={(event) =>
                    setComment({ content: event.target.value })
                  }
                />
                <Button color="primary" className="ms-4 mt-2" onClick={doReply}>
                  Reply
                </Button>
              </CardBody>
            </Card>

            {post &&
              post?.comments.map((item, index) => (
                <Card className="mt-4 border-0" key={index}>
                  <CardBody>
                    <CardText>{item?.content}</CardText>
                  </CardBody>
                </Card>
              ))}
          </Col>
        </Row>
      </Container>
    </Base>
  );
};

export default PostPage;
