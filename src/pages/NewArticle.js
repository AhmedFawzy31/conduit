import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
const CreateEditArticle = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
  const createArticle = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/articles`,
        data,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (response.data) navigate(`/article/${response.data.article.slug}`);
      return response.data;
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    const tagArr = form.tagList.split(" ");
    createArticle.mutate({
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
                      disabled={createArticle.isLoading}
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
                      value={form.description}
                      onChange={onChange}
                      required
                      disabled={createArticle.isLoading}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      name="body"
                      value={form.body}
                      required
                      onChange={onChange}
                      disabled={createArticle.isLoading}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags seperated by a space"
                      name="tagList"
                      onChange={onChange}
                      disabled={createArticle.isLoading}
                    />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                    disabled={createArticle.isLoading}
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
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return redirect("/auth/login");
  return null;
};
