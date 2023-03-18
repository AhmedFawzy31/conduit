import ArticlePreview from "./ArticlePreview";

const ArticleList = ({ articles, handlePaginationClick, activePage }) => {
  const isZero = articles.articles.length === 0;
  //get number of pages
  let paginationItems = [];
  for (let i = 0; i < articles.articlesCount / 10; i++) {
    paginationItems.push(
      <li
        key={i + 1}
        className={`page-item ${i === activePage ? "active" : ""}`}
      >
        <button
          onClick={() => {
            handlePaginationClick(i);
          }}
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
      {isZero && (
        <div className="article-preview">No articles are here... yet.</div>
      )}
      <nav className="pagination-nav">
        <ul className="pagination">{paginationItems}</ul>
      </nav>
    </>
  );
};

export default ArticleList;
