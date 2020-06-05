import React, { createFactory } from 'react'

const CreateBtn = ({btnName}) => {
    return (
        <button 
            className="btn btn-primary"
            style={{width: "100vw"}}
        >
            {btnName}
        </button>
    )
}

export default CreateBtn