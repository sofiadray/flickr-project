import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import { getPhotos } from "../flickr.js";

var initialSlides = [
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?fit=crop&fm=jpg&h=825&q=80&w=1325',
  'https://images.unsplash.com/photo-1445251836269-d158eaa028a6?fit=crop&fm=jpg&h=825&q=80&w=1325',
  'https://images.unsplash.com/photo-1443926818681-717d074a57af?fit=crop&fm=jpg&h=825&q=80&w=1325',
  'https://images.unsplash.com/photo-1445251836269-d158eaa028a6?fit=crop&fm=jpg&h=825&q=80&w=1325',
];

class App extends Component {
    state = { 
      selected_image: initialSlides[0],
      slides: initialSlides,
      current_idx: 0
    }

  handleSearch = (event) => {
    let searchText = event.target.value
    if (searchText.length > 0) {
      getPhotos(searchText).then((data) => {
        this.setState({
          selected_image: data[0],
          slides: data,
          current_idx: 0
        })
      })
    }
  }

  displayThumbnail = (idx) => {
    this.setState({
      selected_image: this.state.slides[idx],
      current_idx: idx
    });  
  }

  showNextThumbnail = () => {
    if (this.state.current_idx + 1 === this.state.slides.length) {
      this.setState({
        current_idx:0,
        selected_image: this.state.slides[0]
      }); 
    }
    else {
      let index = this.state.current_idx + 1
      this.setState({ 
        current_idx: index, 
        selected_image: this.state.slides[index] 
      });
    }
  }

  showPrevThumbnail = () => {
    if (this.state.current_idx === 0 ) {
      let last = this.state.slides.length - 1
      this.setState({ 
        current_idx: last, 
        selected_image: this.state.slides[last]
      });
    }
    else {
      let index = this.state.current_idx - 1
      this.setState({ 
        current_idx: index, 
        selected_image: this.state.slides[index] 
      });
    }
  }

  render() {
    return (
      <div className="App">
          <SearchBar 
            handleSearch={this.handleSearch}
          />
          <Jumbotron 
            url={this.state.selected_image} 
            showNextThumbnail={this.showNextThumbnail} 
            showPrevThumbnail={this.showPrevThumbnail}
          />
          <ThumbnailRow 
            thumbnails={this.state.slides} 
            displayThumbnail={this.displayThumbnail} 
          />
      </div>
    );
  }
}

class SearchBar extends Component {
  static propTypes = {
    handleSearch: PropTypes.func.isRequired, 
  }
  render() {
    const { handleSearch } = this.props
    return (
      <input 
        type="text" 
        placeholder="Start Typing..." 
        className="search" 
        onChange={handleSearch}
      />
    );
  }
}

class Jumbotron extends Component {
  static propTypes = {
    url: PropTypes.string,
    showNextThumbnail: PropTypes.func,
    showPrevThumbnail: PropTypes.func
  }
  render() { 
    const { url, showNextThumbnail, showPrevThumbnail } = this.props
    const jumboStyle = {
      maxHeight: "450px"
    }
    return (
      <div className="jumbotron-container">
        <div className="arrow"  style={{float:"left"}}>
          <i onClick={showPrevThumbnail} className="fa fa-angle-left fa-5x" aria-hidden="true" />
        </div>
        <div className="jumbotron-main" style={{height:"500px"}}>
          <img src={url} style={jumboStyle} alt="no results" />
        </div>
        <div className="arrow" style={{float:"right"}}>
          <i onClick={showNextThumbnail} className="fa fa-angle-right fa-5x" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

class ThumbnailRow extends Component {
  static propTypes = {
    thumbnails: PropTypes.array,
    displayThumbnail: PropTypes.func
  }
  render() {
    const { thumbnails, displayThumbnail } = this.props;
    return (
    <div className="thumbnail-row">
      {thumbnails.map((el, idx)=>{
        return (
          <Thumbnail
          key={idx} 
          idx={idx}
          url={el}
          displayThumbnail={displayThumbnail}
          />
        )
      })}
    </div>
    );
  }
}

class Thumbnail extends Component {
  static propTypes = {
    idx: PropTypes.number.isRequired,
    url: PropTypes.string,
    displayThumbnail: PropTypes.func
  }
  render() {
    const { idx, url, displayThumbnail } = this.props
    const thumbnailStyle = {
      boxSizing: "border-box",
      maxHeight: "150px",
      float:"left",
      padding: ".5em",
      textAlign: "center"
    }
    return (
      <div className="thumbnail">
          <img 
            src={url} 
            style={thumbnailStyle}
            alt={ "result #" + idx + 1 }
            onClick={() => { displayThumbnail(idx) }}
          />
      </div>
    );
  }
}

export const displayThumbnail = () => {};
export { App, Jumbotron, Thumbnail, ThumbnailRow }; 
