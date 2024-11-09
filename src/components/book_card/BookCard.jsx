import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './BookCard.css';

function BookCard(props) {
  const {
    title,
    author_name,
    first_publish_year,
    ratings_count,
    edition_count,
    cover_i,
    ratings_average,
  } = props;

  const getRatings = () =>
    Array(Math.floor(ratings_average))
      .fill()
      .map((_, i) => <FontAwesomeIcon icon={faStar} />);

  return (
    <div className="BookCardContainer">
      <img
        src={
          cover_i
            ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
            : 'https://img.freepik.com/premium-vector/stack-colorful-books-clip-art-vector-illustration_755719-4913.jpg'
        }
        className="BookImage"
      />
      <div className="RightContainer">
        <h1 className="BookTitle">{title}</h1>
        <span className="BookAuthor">
          by <b className="AuthorName">{author_name}</b>
        </span>
        <span className="PublishYear">
          First published in {first_publish_year}
        </span>
        <span className="EditionsCount">{edition_count} editions</span>
        {ratings_average && (
          <span className="RatingsCount">
            {getRatings()} ({ratings_count} ratings)
          </span>
        )}
      </div>
    </div>
  );
}

export default BookCard;
