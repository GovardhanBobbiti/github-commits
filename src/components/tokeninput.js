import React, { useState } from 'react';

const TokenInput = ({ handleToken }) => {
    const [token, setToken] = useState('');
    return (
        <div className="token-input">
            <h2>You are not Authorzed,<br /> Please provide Access Token</h2>
            <div className="input">
                <input type={'text'} value={token} placeholder='provide given access token' onChange={(e) => setToken(e.target.value)} />
                <button className='button-style' disabled={!token} onClick={() => handleToken(token)}>Access</button>
            </div>
        </div>
    )
}

export default TokenInput;