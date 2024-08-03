import { myaxios, pvtAxios } from "../helper";

export const createPost = (postData) => {
  //   console.log(postData, "userId and all data is here or not ");
  return pvtAxios
    .post(
      `/post/User/${postData.userId}/Category/${postData.categoryId}`,
      postData
    )
    .then((response) => response.data);
};
// load all get post
export const getAllPost = (pageNo, pageSize) => {
  //   console.log(postData, "userId and all data is here or not ");
  return myaxios
    .get(`/post/getAllPost?pageNo=${pageNo}&pageSize=${pageSize}`)
    .then((response) => response.data);
};
export const loadPost = (postId) => {
  //   console.log(postData, "userId and all data is here or not ");
  return myaxios
    .get(`/post/getByPostId/` + postId)
    .then((response) => response.data);
};
export const createComment = (comment, postId) => {
  //   console.log(postData, "userId and all data is here or not ");
  return pvtAxios
    .post(`/comment/post/${postId}/comments`, comment)
    .then((response) => response.data);
};
