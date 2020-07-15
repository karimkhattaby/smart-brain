// @ts-nocheck

// Importing Components
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

// Instantiating the App's URL
// TODO: Change URL and port number for Deployment/Development
const URL = "https://fatidique-fromage-93783.herokuapp.com/";

// Initializing Particles
const particlesOptions = {
  particles: {
    number: {
      value: 75,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

// Initializing the App's Initial State
const initialState = {
  input: "",
  imageURL: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  };

  calculateFaceLocation = (data) => {
    console.log(data);
    // get all recognized faces
    const clarifaiFaces = data.outputs[0].data.regions;
    
    // get the width and height of the input image
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    
    // loop through all recognized faces and create boxes
    const boxes = [];
    for (let region of clarifaiFaces) {
      console.log(region);
      const clarifaiFace = region.region_info.bounding_box;
      boxes.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      });
    }

    // return boxes that surround recognized faces
    return boxes;
  };

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onSubmit = () => {
    const { input } = this.state;
    this.setState({imageURL: input});
    fetch(URL+"imageurl", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if (response) {
        fetch(URL+"image", {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => this.setState(Object.assign(this.state.user, { entries: count})))
        .catch(console.log);
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "home") {
      this.setState({isSignedIn: true});
    }
    else if (route === "signin") {
      this.setState(initialState);
    }
    this.setState({route: route});
  };

  render() {
    const { isSignedIn, imageURL, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles
          className="particles"
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        { route === "home"
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition boxes={boxes} imageURL={imageURL} />
            </div>
          : (
            route === "signin"
            ? <Signin URL={URL} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register URL={URL} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;