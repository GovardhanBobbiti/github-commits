import React, { useState } from 'react';

const TokenInput = ({ handleToken }) => {
    const [token, setToken] = useState('');
    return (
        <div className="token-input">
            <h2>You are not Authorzed,<br /> Please provide Access Token</h2>
            <form className="input">
                <input type={'text'} autoFocus  value={token} placeholder='provide given access token' onChange={(e) => setToken(e.target.value)} />
                <button type='submit' onSubmit={() => handleToken(token)} className='button-style' disabled={!token} onClick={() => handleToken(token)}>Access</button>
            </form>
        </div>
    )
}

export default TokenInput;