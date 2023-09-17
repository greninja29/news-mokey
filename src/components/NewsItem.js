import React from 'react'

const NewsItem =(props)=> {
    return (
      <div className="my-3">
         <div className="card">
          <div style={{display:'flex', justifyContent:'flex-end', position: 'absolute', right:0}}>
            <span className='badge rounded-pill bg-danger'>{props.source}</span>
          </div>
          <img src={!props.imageUrl?"https://cdn.dribbble.com/users/6238/screenshots/3213019/media/d7dc83d654069a3850683783445ae58f.jpg?resize=400x300&vertical=center":props.imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{props.title}...</h5>
            <p className="card-text">{props.description}...</p>
            <p className='card-text'><small className='text-muted'>By {!props.author?"Unknown":props.author} on {new Date(props.date).toGMTString()}</small></p>
            <a rel='noreferrer' href={props.newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
