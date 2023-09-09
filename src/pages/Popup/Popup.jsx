import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = () => {
  const [apiKey, setApiKey] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(true);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['openaiApiKey']).then(({ openaiApiKey }) => {
      setApiKey(openaiApiKey);
    });
    chrome.storage.local.get(['token']).then(({ token }) => {
      token ? setLogged(true) : setLogged(false);
    });
  }, []);

  return (
    <div className="container">
      {logged ? (
        <div className="mb-3">Logged in!</div>
      ) : (
        <div>
          <form
            onSubmit={() =>
              registered ? console.log('logging in') : console.log('signing up')
            }
          >
            {registered ? (
              <div className="mb-2 h2">Login</div>
            ) : (
              <div className="mb-2 h2">Register</div>
            )}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control mb-2"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control mb-2"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </form>
          {registered ? (
            <div
              role="button"
              className="form-text"
              onClick={() => setRegistered(false)}
            >
              Need to register?
            </div>
          ) : (
            <div
              role="button"
              className="form-text"
              onClick={() => setRegistered(true)}
            >
              Already registered?
            </div>
          )}
        </div>
      )}
      <form>
        <div className="my-3">
          <label htmlFor="apiKey" className="form-label">
            API Key
          </label>
          <input
            type="text"
            className="form-control"
            id="apiKey"
            name="apiKey"
            placeholder="OpenAI API Key"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              chrome.storage.local.set({ openaiApiKey: e.target.value });
            }}
          />
          <div id="apiKeyHelp" className="form-text mb-2">
            Go to your OpenAI profile and generate a new API key!
          </div>
        </div>
      </form>
    </div>
  );
};

export default Popup;
