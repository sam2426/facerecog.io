import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo'
import FaceRecoginition from './components/FaceRecoginition/FaceRecoginition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
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
            route:'signin',
            isSignedIn:false,
            user:{
                id : '',
                name : '',
                email : '',
                entries : '',
                joined : '',
            }
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
        this.setState({box:box});
    }

    onInputChange=(event)=>{
        this.setState({input:event.target.value});
    }

    onSubmit=()=>{
        // this.setState({imageURL:this.state.input})
        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        .then(response=> {
            if(response){
                fetch('http://localhost:3000/image', {
                    method:'put',
                    headers:{'Content-Type' : 'application/json'},
                    body:JSON.stringify({
                        id:this.state.user.id,
                    })
                })
                .then(response => response.json())
                .then(count => {
                    this.setState(Object.assign(this.state.user, {entries:count}))
                })
            }

            this.displayFaceBox(this.faceBox(response))})
        .catch((err) => console.log(err));
    }

    loadUser = (data)=>{
        console.log(data);
        this.setState({user:{
            id : data.id,
            name : data.name,
            email : data.email,
            entries : data.entries,
            joined : data.joined,

        }})
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
                // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
                // .then(response=> {this.displayFaceBox(this.faceBox(response))})
                // .catch((err) => console.log(err));
            }
        },false)
    }

onRouteChange=(route)=>{
    if(route==='signin'){
        this.setState({isSignedIn:false})
    }
    else if(route==='home'){
        this.setState({isSignedIn:true})
    }
    this.setState({route:route});
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
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
                { this.state.route==='home'
                    ?<div>
                        <Logo/>
                        <Rank 
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        />
                        
                        <ImageLinkForm onInputChange={this.onInputChange} 
                        onSubmit={this.onSubmit} 
                        onInputKey={this.onInputKey}
                        // onUrlPaste={this.onUrlPaste}
                        />
                        
                        <FaceRecoginition imageURL={this.state.imageURL} box={this.state.box}/>
                    </div>
                    :(
                        this.state.route==='signin'
                        ?<Signin  loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                    )
                    
                }
            </div>
        );
    }
}
export default App;