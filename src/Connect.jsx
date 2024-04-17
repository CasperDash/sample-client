import { getProvider } from "./casper-wallet.js";

const provider = getProvider();

const Connect = (props) => {
  return (
    <>
        <button onClick={() => connectToWallet(props)}>Connect Wallet</button>
        <button onClick={() => disconnect(props)}>Disconnect</button>
    </>
  );
};


const connectToWallet = (props) => {
  provider
    .requestConnection()
    .then((connected) => {
      if (!connected) {
        alert("Couldn't connect to wallet");
      } else {
        provider
          .getActivePublicKey()
          .then((publicKey) => {
            props.setPublicKey(publicKey);
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

const disconnect = (props) => {
  provider
    .disconnectFromSite()
    .then((disconnected) => {
      if (disconnected) {
        props.setPublicKey(null);
        alert("Disconnected");
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

export default Connect;