import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import FaceRecoginition from './components/FaceRecoginition/FaceRecoginition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'

class App extends Component{

    render(){
        return(
            <div className="App">
                <Navigation/>
                <Logo/>
                <ImageLinkForm/>
                <FaceRecoginition/>
            </div>
        );
    }
}
export default App;