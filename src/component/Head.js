import React from 'react'

export const Head = ({props}) => {
  return (
    <div>
          <h3 className="mt-4">{props}</h3>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">{props}</li>
        </ol>
    </div>
  )
}
