import React from 'react';

export default function Pokemon({name, type, image}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{type}</h5>
            <img src={image} alt='img not found' width='200px' height='250px'/>
        </div>
    );
};