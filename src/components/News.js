import React, { useEffect,useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

  const News = (props)=> {

  const  [articles,setaricles] = useState([]);
  const  [loading,setloading] = useState(true);
  const  [page,setpage] = useState(1);
  const  [totalResults,settotalResults] = useState(0);
  
  
  const capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  const updateNews = async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setaricles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
    document.title = `${capitalize(props.category)} - NewsMonkey` ;
  }

  useEffect(()=>{
    updateNews();
    // eslint-disable-next-line
  },[])
  
  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setaricles(articles.concat(parsedData.articles));
    setpage(page+1);
    settotalResults(parsedData.totalResults);
  };

  
    return (
      <>
        <h1 className='text-center' style={{margin: '30px 0px', marginTop: '90px'}}>NewsMonkey-Top {capitalize(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
        {articles.map((element)=>{
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,90):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
}


News.defaultProps = {
  country: "in",
  pageSize: 5 ,
  category: "general" ,
}
News.propTypes = {
  country: PropTypes.string ,
  pageSize: PropTypes.number ,
  category: PropTypes.string ,
}

export default News
