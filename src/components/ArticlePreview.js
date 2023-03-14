import { Link } from "react-router-dom";
import ArticlePreviewMeta from "./ArticlePreviewMeta";
import TagList from "./TagList";
const ArticlePreview = ({ article }) => {
  return (
    <div key={article.slug} className="article-preview">
      <div className="article-meta">
        <ArticlePreviewMeta article={article}></ArticlePreviewMeta>
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <TagList tags={article.tagList}></TagList>
      </Link>
    </div>
  );
};

export default ArticlePreview;
