const TagList = ({ tags, handleTagFiter }) => {
  return (
    <ul className="tag-list">
      {tags.map((tag) => {
        return handleTagFiter ? (
          <button
            key={tag}
            onClick={() => handleTagFiter(tag)}
            className="tag-pill tag-default"
          >
            {tag}
          </button>
        ) : (
          <li key={tag} className="tag-pill tag-default">
            {tag}
          </li>
        );
      })}
    </ul>
  );
};
export default TagList;
