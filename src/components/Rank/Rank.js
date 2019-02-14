import React from 'react';

const Rank = ({name, entries}) => {
    return(
        <div className=''>
            <div className='center f4 white'>
                {`Hi ${name} your entries are ...`}
            </div>
            <div className='f2 white center'>
                {entries}
            </div>
        </div>
    );
}

export default Rank;