import React, { useEffect, useState } from "react";
import { getAllPost } from "../../Services/PostService/post-service";
import {
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import Post from "../ShowPost";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeed = () => {
  const [postContent, setPostContent] = useState({
    content: [],
    lastPage: false,
    pageNumber: "",
    pageSize: "",
    totalElements: "",
    totalPages: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    changePage(currentPage);
  }, [currentPage]);
  const changePage = (pageNumber = 0, pageSize = 4) => {
    if (pageNumber > postContent.pageNumber && postContent.lastPage) {
      return;
    }
    if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
      return;
    }
    getAllPost(pageNumber, pageSize)
      .then((data) => {
        setPostContent({
          content: [...postContent.content, ...data.content],
          lastPage: data.lastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages,
        });
        // window.scroll(0, 0);
        console.log(data);
      })
      .catch((error) => {
        toast.error("page is loading......");
      });
  };
  const changePageInfinite = () => {
    console.log("changing page....");
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className="container-fluid">
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          <h1>Blog count : {postContent?.totalElements}</h1>
          <InfiniteScroll
            dataLength={postContent.content.length}
            next={changePageInfinite}
            hasMore={!postContent.lastPage}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yeah! You have seen it all</b>
              </p>
            }
          >
            {postContent?.content.map((post) => (
              <Post post={post} key={post.postId} />
            ))}
          </InfiniteScroll>

          {/* <Container className="mt-3 ">
            <Pagination>
              <PaginationItem
                disabled={postContent.pageNumber == 0}
                onClick={() => {
                  changePage(postContent.pageNumber - 1);
                }}
              >
                <PaginationLink previous></PaginationLink>
              </PaginationItem>
              {[...Array(postContent.totalPages)].map((item, index) => (
                <PaginationItem
                  onClick={() => changePage(index)}
                  active={postContent.pageNumber == index}
                  key={index}
                >
                  <PaginationLink> {index + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem
                disabled={postContent.lastPage === true}
                onClick={() => {
                  changePage(postContent.pageNumber + 1);
                }}
              >
                <PaginationLink next></PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container> */}
        </Col>
      </Row>
    </div>
  );
};

export default NewFeed;
