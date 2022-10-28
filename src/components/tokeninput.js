import React, { useState } from 'react';

const TokenInput = ({ handleToken }) => {
    const [token, setToken] = useState('');
    return (
        <div className="token-input">
            <h2>You are not Authorzed, please provide Access Token</h2>
            <div className="input">
                <input type={'text'} value={token} onChange={(e) => setToken(e.target.value)} />
                <button disabled={!token} onClick={() => handleToken(token)}>Access</button>
            </div>
        </div>
    )
}

export default TokenInput;