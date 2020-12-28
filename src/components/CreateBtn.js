import React, { createFactory } from 'react'

const CreateBtn = ({btnName, onClick}) => {
    return (
        <button 
            className="btn btn-primary"
            style={{width: "100%"}}
            onClick={onClick}
        >
            {btnName}
        </button>
    )
}

export default CreateBtn