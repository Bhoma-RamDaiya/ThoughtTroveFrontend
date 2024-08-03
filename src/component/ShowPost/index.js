import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";

const Post = ({
  post = {
    title: "this is default post",
    content: "this is default content",
  },
}) => {
  return (
    <Card className="shadow-sm border-0 mt-3">
      <CardBody>
        <h1>{post.title}</h1>
        <CardText
          dangerouslySetInnerHTML={{
            __html: post.content.substring(0, 70) + "...",
          }}
        >
          {/* {post.content.substring(0, 70)}.... */}
        </CardText>
        <div>
          <Link className="btn secondary" to={"/post/" + post.postId}>
            Read More{" "}
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};
export default Post;
