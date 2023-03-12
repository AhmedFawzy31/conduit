// import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateEditArticle = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  // const { slug } = useParams();
  // const isEdit = slug ? true : false;
  let initialState = {
    title: "",
    description: "",
    body: "",
    tagList: "",
  };
  const [form, setForm] = useState(initialState);
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const createOrUpdateArticle = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "https://api.realworld.io/api/articles",
        data,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      //why does it give error if I use it below in if(isSuccess)?
      if (response.data) navigate(`/article/${response.data.article.slug}`);
      return response.data;
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const tagArr = form.tagList.split(" ");
    createOrUpdateArticle.mutate({
      article: {
        ...form,
        tagList: tagArr,
      },
    });
  };
  return (
    <>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form onSubmit={onSubmit}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      name="title"
                      value={form.title}
                      onChange={onChange}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      name="description"
                      onChange={onChange}
                      required
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      name="body"
                      required
                      onChange={onChange}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags seperated by a space"
                      name="tagList"
                      onChange={onChange}
                    />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateEditArticle;
export const loader = () => {
  //make sure user is signed in
  //make sure the user is the author if it's an edit page
  //load the article data
};
