import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    imageList: [
      { zoom: 0, src: "/crowd.png" },
      { zoom: 0, src: "/academy.png" },
      { zoom: 0, src: "/womanandchild.png" }
    ],
    currentImages: [0, 1],
    timeCheck: Date.now(),

    clock: 0
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.updateScroll);
    window.addEventListener("keydown", this.updateScroll);
    this.setInitialImage();
    var tick = setInterval(this.timer, 1000 / 60);
  }

  setInitialImage = () => {
    let randomStartingImage = Math.floor(
      Math.random() * this.state.imageList.length
    );
    let secondImage =
      randomStartingImage + 1 === this.state.imageList.length
        ? 0
        : randomStartingImage + 1;
    this.setState(
      {
        currentImages: [randomStartingImage, secondImage]
      },
      this.setImageList()
    );
  };

  setImageList = () => {
    let newImageList = this.state.imageList.map((image, i) => {
      if (i === this.state.currentImages[0]) return { ...image, zoom: 1 };
      if (i === this.state.currentImages[1]) return { ...image, zoom: 0.0005 };
      return image;
    });

    this.setState({
      imageList: newImageList
    });
  };

  timer = () => {
    if (this.state.imageList[this.state.currentImages[1]].zoom > 1) {
      let newCurrentImages;
      if (this.state.currentImages[1] + 1 === this.state.imageList.length) {
        newCurrentImages = [this.state.currentImages[1], 0];
      } else {
        newCurrentImages = [
          this.state.currentImages[1],
          this.state.currentImages[1] + 1
        ];
      }

      this.setState(
        pState => (
          {
            clock: 0,
            currentImages: newCurrentImages
          },
          this.setImageList()
        )
      );
    } else {
      let newImageList = this.state.imageList.map((image, i) => {
        return { ...image, zoom: image.zoom * 1.002 + 0.0003 };
      });
      this.setState(pState => ({
        clock: pState.clock + 1,
        imageList: newImageList
      }));
    }
  };

  renderImages = () => {
    return (
      <div className="imageContainer">
        <img
          className="image"
          style={{
            transform: `scale(${
              this.state.imageList[this.state.currentImages[1]].zoom
            })`
          }}
          src={this.state.imageList[this.state.currentImages[1]].src}
        />
        <img
          className="image"
          style={{
            transform: `scale(${
              this.state.imageList[this.state.currentImages[0]].zoom
            })`
          }}
          src={this.state.imageList[this.state.currentImages[0]].src}
        />
      </div>
    );
  };
  render() {
    console.log(this.state.currentImages);
    return <div className="App">{this.renderImages()}</div>;
  }
}

export default App;
