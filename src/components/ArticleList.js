import ArticlePreview from "./ArticlePreview";
const ArticleList = ({ articles, handlePaginationClick }) => {
  //get number of pages
  let paginationItems = [];
  for (let i = 0; i < articles.articlesCount / 10; i++) {
    paginationItems.push(
      <li key={i + 1} className="page-item">
        <button
          onClick={() => handlePaginationClick(i * 10)}
          className="page-link"
        >
          {i + 1}
        </button>
      </li>
    );
  }

  return (
    <>
      {articles.articles.map((article) => {
        return (
          <ArticlePreview key={article.slug} article={article}></ArticlePreview>
        );
      })}

      <nav className="pagination-nav">
        <ul className="pagination">{paginationItems}</ul>
      </nav>
    </>
  );
};

export default ArticleList;
