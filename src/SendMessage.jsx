import React from "react";
import {CasperClient, CLPublicKey, CLValueBuilder, Contracts, DeployUtil, RuntimeArgs} from "casper-js-sdk";
import {getProvider} from "./casper-wallet.js";
import axios from "axios";

const SendMessage = (props) => {
  const [message, setMessage] = React.useState("");
  const [deployHash, setDeployHash] = React.useState("");
  const provider = getProvider();

  const sendMessage = async () => {
    const publicKey = CLPublicKey.fromHex(props.publicKey)
    const casperClient = new CasperClient(process.env.NODE_URL)
    const contractClient = new Contracts.Contract(casperClient);
    contractClient.setContractHash(`hash-${process.env.SAMPLE_CONTRACT_HASH}`);
    const setMessageDeploy = contractClient.callEntrypoint("set_message", RuntimeArgs.fromMap({
      "message": CLValueBuilder.string(message),
    }), publicKey, process.env.CHAIN_NAME, '0');

    const result = await provider.sign(JSON.stringify(DeployUtil.deployToJson(setMessageDeploy)), props.publicKey)
    if (!result.cancelled) {
      const signedDeploy = DeployUtil.setSignature(
        setMessageDeploy,
        result.signature,
        publicKey
      );

      const response = await axios.post(`/deploy`, {deploy: DeployUtil.deployToJson(signedDeploy)}, {baseURL: process.env.API_BASE_URL});
      const {deployHash} = response.data;
      setDeployHash(deployHash);
    }
  }
  return (
    <>
      <input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={() => sendMessage()}>Send</button>
      <div>
        {deployHash !== null && (
          <>
            Deploy hash: {deployHash}
            <br/>
          </>
        )}
      </div>
    </>
  );


};


export default SendMessage;