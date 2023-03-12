import AuthorInfo from "./AuthorInfo";
import FavoritePreview from "./FavoritePreview";

const ArticlePreviewMeta = ({ article }) => {
  return (
    <>
      <AuthorInfo article={article}></AuthorInfo>
      <FavoritePreview
        article={article}
        type="articlePreview"
      ></FavoritePreview>
    </>
  );
};

export default ArticlePreviewMeta;
