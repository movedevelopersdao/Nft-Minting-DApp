import React from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Provider, Network } from "aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import "./style.css";
import { useState, useEffect } from "react";

const provider = new Provider(Network.MAINNET);
const moduleAddress =
  "0x5f10a3ba5f9ecb6614a9ad1b1d07e84869cbce01df69ddca34f7a8ae978ec450";

function App() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [accountHasList, setAccountHasList] = useState<boolean>(false);
  const [counter, setCounter] = useState<string>("");

  const doTransaction = async () => {
    if (!account) return [];
    const payload = {
      type: "entry_function_payload",
      function: `${moduleAddress}::MDD_STUDENT_PROGRAM_NFT::create_token`,
      type_arguments: [],
      arguments: [],
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

  const fetchList = async () => {
    if (!account) return [];
    const view = {
      function: `${moduleAddress}::MDD_STUDENT_PROGRAM_NFT::get_counter`,
      type_arguments: [],
      arguments: [],
    };
    try {
      const usdd = await provider.view(view);
      const firstUsdd = usdd[0].toString();
      setCounter(firstUsdd);
      // console.log(firstUsdd);
      
    } catch (e: any) {
      setAccountHasList(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [account?.address]);

  return (
    <>
      <div>
        <div className="home-container">
          {/* <Helmet>
        <title>Soggy Foolish Lapwing</title>
        <meta property="og:title" content="Soggy Foolish Lapwing" />
      </Helmet> */}
          <div className="home-container1">
            <img
              alt="image"
              src="/mdd%20logo-200w.png"
              className="home-image"
            />
            <div className="home-container2">
              <span className="home-text">
                #MoveIndia student program Mainnet NFT Mint
              </span>
            </div>
          </div>
          <div className="home-container3">
            <div className="home-container4">
              <div className="component-container">
                <span className="component-text">
                  {" "}
                  <WalletSelector />
                </span>
              </div>
            </div>
            <div className="home-container5">
              <span className="home-text1">Mint Your NFT</span>
              <div className="home-container6">
                <span className="home-text2">Total Mints:</span>
                <span className="home-text3">{counter}</span>
              </div>
              <button
                type="button"
                onClick={doTransaction}
                className="home-container7"
              >
                <span className="home-text4">MINT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

{
  /* <Layout>
  <Row align="middle">
    <Col span={10} offset={2}>
      <h1>Multisender</h1>
    </Col>
    <Col span={12} style={{ textAlign: "right", paddingRight: "200px" }}>
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
    )} */
}

// const doMulitsenderTransaction = async () => {
//   if (!account) return [];
//   const payload = {
//     type: "entry_function_payload",
//     function: `${moduleAddress}::MultiSender::ms_trans`,
//     type_arguments: [],
//     arguments: [

//         ["0xc84ba2f6661ecc76ff512c8cc8a84e925025ab65fc4c573e66ebec4d6fa94d8a","0x76e65478cc0cc33db80f06c36d37e6d02cb7470bc5a91cf4f8882278711b108a"]
//       ,

//         1000

//     ],

//   };
//   try {
//     // sign and submit transaction to chain
//     const response = await signAndSubmitTransaction(payload);
//     // wait for transaction
//     await provider.waitForTransaction(response.hash);
//     // setAccountHasList(true);
//   } catch (error: any) {
//     // setAccountHasList(false);
//   }
// };
