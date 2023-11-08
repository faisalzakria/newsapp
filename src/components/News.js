import React from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json();
      props.setProgress(70);
      console.log(parsedData);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)

    props.setProgress(100);
  }

  useEffect(() => {
      document.title = `${capitalizeFirstLetter(props.category)} - NiggaNews`;

    updateNews()
  
  
  }, [])
  

  const handlePrevClick = async () => {
    setpage(page - 1)
    updateNews()
  };

  const handleNextClick = async () => {
    setpage(page + 1)
    updateNews();
    };

  

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop: "70px"}}>NingaNews - Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner />}
                <div className="row">
                    {articles.map((element) => {
                      return (
                        <div className="col-md-4" key={element.url}>
                          <NewsItem
                            imageUrl={element.urlToImage}
                            title={element.title ? element.title.slice(0, 45) : ""}
                            description={
                              element.description ? element.description.slice(0, 88) : ""
                            }
                            newsUrl={element.url}
                            author={element.author} date={element.publishedAt}
                            source={element.source.name}
                          />
                        </div>
                      );
                      })}
                    </div>
        <div className="container d-flex justify-content-end">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-outline-primary mx-3"
            onClick={handlePrevClick}
          >
            &larr; Previous{" "}
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
            type="button"
            className="btn btn-outline-primary"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
  
        </div>
    );
}

    News.defaultProps = {
      pageSize: 25,
      category: 'general',
    }
    News.propTypes = {
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }

export default News;
