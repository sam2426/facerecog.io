import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import FaceRecoginition from './components/FaceRecoginition/FaceRecoginition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import './App.css'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
    apiKey: '52d868a0788240eea8af0e87807732d6'
   });

const particleOptions={
    particles: {
        enable: true,
        number:{
            value: 90,
            density: {
                enable:true,
                value_area:800,
            }
        }
    }
}

class App extends Component{
    constructor(){
        super();
        this.state={
            input:'',
            imageURL:'',
            box:{},
        }
    }

    faceBox=(data)=>{
        const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
        const image=document.getElementById('inputImage');
        const width=Number(image.width);
        const height=Number(image.height);
        return{
            top:height*clarifaiFace.top_row,
            bottom:height-(height*clarifaiFace.bottom_row),
            left:width*clarifaiFace.left_col,
            right:width-(width*clarifaiFace.right_col)
        }
    }
//width-
    displayFaceBox = (box) =>{
        console.log(box);
        this.setState({box:box});
    }

    onInputChange=(event)=>{
        this.setState({input:event.target.value});
    }

    onSubmit=()=>{
        this.setState({imageURL:this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response=> {this.displayFaceBox(this.faceBox(response))})
        .catch((err) => console.log(err));
    }

    // const inputBox=document.getElementById("inputUrlBox");
    // inputBox.addEventListener("keypress", (event)=>{
    //     console.log(event)
    // }
    // );

    onInputKey=()=>{
        const inputBox=document.getElementById("inputUrlBox");
        inputBox.addEventListener("keypress",(event)=>{
            if(event.keyCode===13 && inputBox.value.length>0){
                this.setState({imageURL:this.state.input})
                app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
                .then(response=> {this.displayFaceBox(this.faceBox(response))})
                .catch((err) => console.log(err));
            }
        },false)
    }

    // onUrlPaste=()=>{
    //     const inputBox=document.getElementById("inputUrlBox");
    //     inputBox.addEventListener("paste",(event)=>{
    //         // console.log("pasted");
    //         // window.setTimeout(() => {
    //         //     console.log("pasted instant");
    //         //   });
    //         if(event.keyCode===13 && inputBox.value.length>0){
    //             this.setState({imageURL:this.state.input})
    //             app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    //             .then(response=> {this.displayFaceBox(this.faceBox(response))})
    //             .catch((err) => console.log(err));
    //         }
    //     })
    // }
    render(){
        return(
            <div className="App">
                <Particles className='particles'
                params={particleOptions} />
                <Navigation/>
                <Logo/>
                <Rank />
                
                <ImageLinkForm onInputChange={this.onInputChange} 
                onSubmit={this.onSubmit} 
                onInputKey={this.onInputKey}
                // onUrlPaste={this.onUrlPaste}
                />
                
                <FaceRecoginition imageURL={this.state.imageURL} box={this.state.box}/>
            </div>
        );
    }
}
export default App;