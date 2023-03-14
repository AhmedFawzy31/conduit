const TagList = ({ tags, handleTagFiter }) => {
  return (
    <ul className="tag-list">
      {tags.map((tag) => {
        return handleTagFiter ? (
          <button
            key={tag}
            onClick={() => handleTagFiter(tag)}
            className="tag-pill tag-default"
            style={{
              border: 0,
              outline: 0,
            }}
          >
            {tag}
          </button>
        ) : (
          <li key={tag} className="tag-pill tag-default tag-outline">
            {tag}
          </li>
        );
      })}
    </ul>
  );
};
export default TagList;
