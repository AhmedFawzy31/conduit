// import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { queryClient } from "../QueryClient";
import { useLoaderData } from "react-router-dom";
import { redirect } from "react-router-dom";
const EditArticle = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { slug } = useParams();
  const { article } = useLoaderData();
  let initialState = {
    title: article.title,
    description: article.description,
    body: article.body,
  };
  const [form, setForm] = useState(initialState);
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const updateArticle = useMutation({
    mutationFn: async (data) => {
      const response = await axios.put(
        `https://api.realworld.io/api/articles/${slug}`,
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
    updateArticle.mutate({
      article: {
        ...form,
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
                      value={form.description}
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
                      value={form.body}
                      required
                      onChange={onChange}
                    ></textarea>
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
export default EditArticle;
export function loader({ request, params }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return redirect("/auth/login");
  const url = `https://api.realworld.io/api/articles/${params.slug}`;
  const promise = queryClient.prefetchQuery({
    queryKey: [params.slug],
    queryFn: async () => {
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
  return promise.then(() => {
    return queryClient.getQueryData([params.slug]);
  });
}
