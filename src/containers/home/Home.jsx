import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import Header from "../../components/header/Header";
import BookCard from "../../components/book_card/BookCard";
import loadingGIF from "../../assets/loading.gif";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [booksList, setBooksList] = useState([]);
  const [paginationDetails, setPaginationDetails] = useState({
    page: 1,
    limit: 24,
    search: "",
    totalCount: 0,
    hasMore: false,
  });
  const [cancelToken, setCancelToken] = useState(null);

  const getBooksList = (page, search) => {
    if (search?.length === 0) {
      setPaginationDetails({
        page: 1,
        limit: 24,
        search: "",
        totalCount: 0,
        hasMore: false,
      });
      setBooksList([]);
      return;
    }
    if (page === 1) setIsLoading(true);

    if (cancelToken) {
      cancelToken.cancel("Operation canceled due to new request.");
    }

    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);
    axios
      .get(
        `https://openlibrary.org/search.json?title=${search}&page=${page}&limit=${paginationDetails?.limit}&fields=title,author_name,first_publish_year,ratings_count,edition_count,cover_i,ratings_average`,
        {
          cancelToken: newCancelToken.token,
        }
      )
      .then((response) => {
        let currentList = [];
        if (page === 1) {
          currentList = response?.data?.docs || [];
        } else {
          currentList = [...booksList, ...(response?.data?.docs || [])];
        }
        setBooksList(currentList);
        setPaginationDetails((prevPaginationDetails) => {
          return {
            ...prevPaginationDetails,
            page: page + 1,
            search: search,
            totalCount: response?.data?.numFound,
            hasMore: currentList?.length < response?.data?.numFound,
          };
        });
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
        setBooksList([]);
      });
  };

  useEffect(() => {
    getBooksList(1, "Novels");
  }, []);

  const searchBook = (e) => {
    if (e.target.value?.length === 0) {
      getBooksList(1, "Novels");
    } else {
      getBooksList(1, e.target.value || "");
    }
  };

  const loadMoreBooks = () => {
    getBooksList(paginationDetails?.page, paginationDetails?.search);
  };

  const getBooksListing = () => {
    if (isLoading)
      return (
        <div className="LoadingContainer">
          <img className="LoadingGIF" src={loadingGIF} />
        </div>
      );
    if (booksList?.length > 0) {
      return (
        <div id="BooksList" className="BooksListContainer">
          <InfiniteScroll
            dataLength={booksList?.length}
            next={loadMoreBooks}
            hasMore={paginationDetails?.hasMore}
            loader={
              <div className="InfiniteLoadingContainer">
                <img className="InfiniteLoadingGIF" src={loadingGIF} />
              </div>
            }
            scrollableTarget="BooksList"
            className="BooksListContainer"
          >
            {booksList?.map(
              ({
                title,
                author_name,
                first_publish_year,
                ratings_count,
                edition_count,
                cover_i,
                ratings_average,
              }) => (
                <BookCard
                  key={first_publish_year}
                  title={title}
                  author_name={author_name}
                  first_publish_year={first_publish_year}
                  ratings_count={ratings_count}
                  edition_count={edition_count}
                  cover_i={cover_i}
                  ratings_average={ratings_average}
                />
              )
            )}
          </InfiniteScroll>
        </div>
      );
    } else {
      return (
        <div className="LoadingContainer">
          <img
            src={
              paginationDetails?.search?.length === 0
                ? "https://media.istockphoto.com/id/871458498/vector/icon-for-business-administration-document-file-management.jpg?s=612x612&w=0&k=20&c=RHcDC1TFQF8UCibjNEGswkNrvl0boilMyLoKCgW7obQ="
                : "https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg"
            }
            className="NoDataFound"
          />
        </div>
      );
    }
  };

  return (
    <div className="HomeContainer">
      <Header />
      <div className="BooksContainer">
        <div className="SearchContainer">
          <input
            type="text"
            className="SearchBox"
            placeholder="Search Books..."
            onChange={searchBook}
          />
          <FontAwesomeIcon className="SearchIcon" icon={faMagnifyingGlass} />
        </div>
        {getBooksListing()}
      </div>
    </div>
  );
}

export default Home;
