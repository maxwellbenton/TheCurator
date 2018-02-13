import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    imageList: ["/crowd.png", "/academy.png", "/womanandchild.png"],
    currentImage: 0,
    timeCheck: Date.now(),
    scroll: 0,
    zoom: 1
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.updateScroll);
    window.addEventListener("keydown", this.updateScroll);
  }

  updateScroll = event => {
    event.stopPropagation();
    this.setState(pState => ({
      scroll: window.scrollY,
      zoom: pState.zoom + 0.005
    }));
  };

  renderImages = () => {
    console.log("hey");
    return (
      <div className="imageContainer">
        <img
          className="image"
          style={{ transform: `scale(${this.state.zoom})` }}
          src={this.state.imageList[this.state.currentImage]}
        />
      </div>
    );
  };
  render() {
    return <div className="App">{this.renderImages()}</div>;
  }
}

export default App;
