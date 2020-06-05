import React from 'react'

const TotalPrice = ({income, outcome}) => {
    return (
        <div className="d-flex flex-row justify-content-between" style={{maxWidth: "300px"}}>
            <div><span>Income: </span> {income}</div>
            <div><span>Outcome: </span>{outcome}</div>
        </div>
    )
}

export default TotalPrice