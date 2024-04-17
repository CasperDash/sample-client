import React from 'react'
import Connect from "./Connect.jsx";
import SendMessage from "./SendMessage.jsx";

function App() {
  const [publicKey, setPublicKey] = React.useState(null);
  return (
    <>
      <Connect setPublicKey={setPublicKey} />
      <div>
        {publicKey !== null && (
          <>
            Wallet connected: {publicKey}
            <br />
          </>
        )}
      </div>
      <SendMessage publicKey={publicKey}/>
    </>
  );
}



export default App
