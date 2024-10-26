import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps={
      country:'us',
      pageSize:8,
      category:'general'
    }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string

    }

    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading: false,
            page:1
            

        }
        document.title=`${this.props.category} -News Daily`;

        
    }

    async updateNews(){
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fd226a087301477da8da11c42a40fe17&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data= await fetch(url);
      let parsedData=await data.json();
      this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})


    }
   async componentDidMount(){
        this.updateNews();

    }
     handlePreClick=async()=>{
        
       this.setState({page:this.state.page -1});
       this.updateNews();

    }
     handleNextClick=async()=>{
      this.setState({page:this.state.page +1});
      this.updateNews();
    }
  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center mb-5'>Newsdaily - Top Headlines</h2>
           {this.state.loading && <Spinner/>}
        
        <div className='row'>
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className='col-md-4' key={element.url}>
            <NewsItem title={element.title?element.title.slice(0,35):""} description={element.description?element.description.slice(0,85):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author}
            date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
            
        
        
        

      </div>
         <div className='container d-flex justify-content-between'>
         <button disabled={this.state.page<=1}type="button" onClick={this.handlePreClick} class="btn btn-dark"> &larr;Previous</button>
         <button  disabled={this.state.page+1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} class="btn btn-dark">Next&rarr;</button>

         </div>
      </div>

    )
  }
}

export default News
