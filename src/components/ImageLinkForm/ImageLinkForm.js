import React from 'react'
import './ImageLinkForm.css'



const ImageLinkForm = ({onInputChange, onSubmit, onInputKey}) => {
    
    return(
        <div >
            <p className='f4 center white'>
                {'This website finds out the face in a given pic.'}
            </p>
            <div className='center pa3 br5 form shadow-5' style={{width:'700px'}}>
                <input id = 'inputUrlBox' className='f6 w-70 pa2' type='text' onChange={onInputChange} 
                onKeyPress={onInputKey}
                // onPaste={onUrlPaste}
                />
                <button className='w-30 f6 grow link pointer dib white bg-light-purple ph3' onClick={onSubmit}>
                    Detect
                </button>
            </div>
        </div>
    );
    
}

export default ImageLinkForm;