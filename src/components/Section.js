import React from 'react';

const Section = ({ title, children }) => {
    return (
        <div className="my-3 p-3 bg-white rounded shadow-sm">
            {title ? <h6 className="pb-2">{title}</h6> : null}
            {children}
        </div>
    )
}

export default Section;