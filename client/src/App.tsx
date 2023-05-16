import React from 'react';
import { Layout, Row, Col, Button } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Provider, Network } from "aptos";
import { useWallet  } from "@aptos-labs/wallet-adapter-react";

import { useState, useEffect } from "react";

const provider = new Provider(Network.DEVNET);
const moduleAddress = "0xe1f608ef49c54a888ff5b0dfe5eb28bf65538cb54f9a45bee5011f384c68e29a";

function App() {
  const { account, signAndSubmitTransaction } = useWallet(); 
  const doMulitsenderTransaction = async () => {
    if (!account) return []; 
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::MultiSender::ms_trans`,
      type_arguments: [],
      arguments: [

          ["0xc84ba2f6661ecc76ff512c8cc8a84e925025ab65fc4c573e66ebec4d6fa94d8a","0x76e65478cc0cc33db80f06c36d37e6d02cb7470bc5a91cf4f8882278711b108a"]
        ,

          1000

      ],

    };
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      // wait for transaction
      await provider.waitForTransaction(response.hash);
      // setAccountHasList(true);
    } catch (error: any) {
      // setAccountHasList(false);
    }
  };
  
  useEffect(() => {
  
  }, [account?.address]);
  
  return (
    <>
      <Layout>
        <Row align="middle">
          <Col span={10} offset={2}>
            <h1>Multisender</h1>
          </Col>
          <Col span={12} style={{ textAlign: "right", paddingRight: "200px" }}>
            <WalletSelector />
          </Col>
        </Row>
      </Layout>
      { (
        <Row gutter={[0, 32]} style={{ marginTop: "2rem" }}>
          <Col span={8} offset={8}>
          <Button onClick={doMulitsenderTransaction} block type="primary" style={{ height: "40px", backgroundColor: "#3f67ff" }}>
            Do the transaction
          </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

 
export default App;
