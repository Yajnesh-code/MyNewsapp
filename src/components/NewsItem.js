import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
   let {title,description,imageUrl,newsUrl,author,date,source} =this.props;
    return (
      <div className='my-3'>
           <div className="card">
                <img src={imageUrl?imageUrl:"https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F1020%2Fr1402949_1296x729_16%2D9.jpg"} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}..<span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:1}}>{source}
    </span>  </h5>
                    <p className="card-text">{description}...</p>
                    <p className='card-text'><small className='text-muted'>By {author?author:"unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-dark">Read More</a>
                </div>
          </div>
        
      </div>
    )
  }
}

export default NewsItem
