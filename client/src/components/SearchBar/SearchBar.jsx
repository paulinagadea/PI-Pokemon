import React, { useState } from 'react';

export default function SearchBar() {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        alert(name);
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Pokemon name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button> 
        </div>
    );
};