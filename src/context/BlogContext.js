import createDataContext from "./createDataContext";
import uuid from "uuid/v4";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    // case "add_blogpost":
    //   return [
    //     ...state,
    //     {
    //       id: uuid(),
    //       content: action.payload.content,
    //       title: action.payload.title
    //     }
    //   ];
    case "delete_blogpost":
      return state.filter(blogpost => blogpost.id !== action.payload);
    case "edit_blogpost":
      return state.map(blogpost =>
        blogpost.id === action.payload.id ? action.payload : blogpost
      );
    default:
      return state;
  }
};

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    // dispatch({ type: "add_blogpost", payload: { title, content } });

    await jsonServer.post("/blogposts", { title, content });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({ type: "edit_blogpost", payload: { id, title, content }});
    if (callback) {
      callback();
    }
  };

  // return (id, title, content, callback) => {
  //   dispatch({ type: "edit_blogpost", payload: { id, title, content } });
  //   if (callback) {
  //     callback();
  //   }
  // };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
