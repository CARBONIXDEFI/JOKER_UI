import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Col, Container, OverlayTrigger, Row, Tab, Tabs, Tooltip, InputGroup, FormControl, Modal } from 'react-bootstrap';
import Layout from './LayoutT';
import { Link } from 'react-router-dom';
import DAI from '../../assets/images/dai.jpeg';
import ButtonLoad from 'react-bootstrap-button-loader';
/* global BigInt */
import { InjectedConnector } from '@web3-react/injected-connector';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';

import jokercoin from '../../assets/images/Jokercoin.png';
import stasiscoin  from '../../assets/images/stasiscoin.png';
import creditscoin from '../../assets/images/creditscoin.png';
import MetaMask from '../../assets/images/metamask-icon.svg';
import Coinbase from '../../assets/images/coinbase-icon.svg';

import Web3 from 'web3';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

import {ethers} from 'ethers';
import { CREDITS_Chainlink_Oracle_Address, CREDITS_Token_ABI, CREDITS_Token_Address, Chainlink_Oracle_ABI, DAI_Chainlink_Oracle_Address, DAI_TOKEN_ABI, DAI_TOKEN_Address, DIME_Chainlink_Oracle_Address, DIME_Token_ABI, DIME_Token_Address, JOKER_Chainlink_Oracle_Address, JOKER_Token_ABI, JOKER_Token_Address, Presale_DIME_CREDITS_ABI, Presale_DIME_CREDITS_Address } from '../../abi/ABI&ContractAddress';

// import { allTokenABI, presaleDCABI, daiTokenForDC, jokerTokenForDC, dimeTokenForDC, creditsTokenForDC, 
//          presaleDCMintProxy, ownerPresaleDC, treasuryPresaleDC } from '../../abi/abi';

const Stablecoin = () => {

    useEffect(() => {
        document.title = "Mint DIME & CREDITS | ELEMENT"
    }, [])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cRatioUpdateShow, setCRatioUpdateShow] = useState(false)

    const handleCRatioUpdateShow = () => setCRatioUpdateShow(true);
    const handleCRatioUpdateClose = () => setCRatioUpdateShow(false);

    const [cRatioUpdateShowEinr, setCRatioUpdateShowEinr] = useState(false);

    const handleCRatioUpdateShowEinr = () => setCRatioUpdateShowEinr(true);
    const handleCRatioUpdateCloseEinr = () => setCRatioUpdateShowEinr(false);

    const [cRatioLoad, setcRatioLoad] = useState(false);

    const handleShowcRatioLoad = () => setcRatioLoad(true);
    const handleHidecRatioLoad = () => setcRatioLoad(false);

    const [loadMint, setLoadMint] = useState(false);

    const handleShowMint = () => setLoadMint(true);
    const handleHideMint = () => setLoadMint(false);   
    
    const [prerequisiteShow, setLoadPrerequisite] = useState(false);

    const handlePrerequisiteShow = () => setLoadPrerequisite(true);
    const handlePrerequisiteClose = () => setLoadPrerequisite(false);

    const [daiAmount, setDaiAmount ] = useState("");

    const [cRatioValue, setCRatioValue] = useState();
    
    const[allowan,setAllowance] = useState("")
    const[allowan2,setAllowance2] = useState("")

    const [DimeToken, setDimeToken] = useState();
    const [CreditToken, setCreditToken] = useState("");

    const[jokerPrice,setjokerPrice] = useState("")
    const[daiPrice,setdaiPrice] = useState("")
    const[creditsPrice,setcreditsPrice] = useState("")
    // const[dimePrice,setdimePrice] = useState("")

    const[JokerPrice,setJokerPrice] = useState("")
    const[USDCPrice,setUSDCPrice] = useState("")
    const[CreditPrice,setCreditPrice] = useState("")
    const[dimePrice,setdimePrice] = useState("")
    const [daiBalances,setDaiBalances] = useState("");
    const[JokerBalance,setJokerBalance] = useState("");
    const[dimeBalance,setDimeBalance] = useState("");
    const[creditsBalance,setCreditsBalance] = useState("");
    const[JokerInput,setJokerInput] = useState("");
    
    const connectToEthereum = async () => {
        try {
          if (window.ethereum) {
            let k = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("K",k)
            const web3= new ethers.providers.Web3Provider(window.ethereum);
            return web3;
          } else {
            throw new Error('No Ethereum wallet found.');
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      };

      useEffect(()=>{
            fraxCalculation();
    },[allowan, allowan2])

      const fraxCalculation = async() =>{
        if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
        }
        else{
            console.log("useeffect")
            // const provider = new ethers.providers.Web3Provider(window.ethereum)
            const url = "https://sepolia.infura.io/v3/886e9a53b5da4f6286230678f7591bde";
            const provider = new ethers.providers.JsonRpcProvider(url);
            // console.log("Connected Successfully", account);

            //new code
        const DimePriceContract = new ethers.Contract(DIME_Chainlink_Oracle_Address, Chainlink_Oracle_ABI, provider);
        const USDCPriceContract = new ethers.Contract(DAI_Chainlink_Oracle_Address, Chainlink_Oracle_ABI, provider);
        const JokerPriceContract = new ethers.Contract(JOKER_Chainlink_Oracle_Address, Chainlink_Oracle_ABI, provider);
        const CreditPriceContract = new ethers.Contract(CREDITS_Chainlink_Oracle_Address, Chainlink_Oracle_ABI, provider);
        
        const JOKERContract = new ethers.Contract(JOKER_Token_Address, JOKER_Token_ABI, provider);
        const daiContract = new ethers.Contract(DAI_TOKEN_Address, DAI_TOKEN_ABI, provider);
        const dimeContract = new ethers.Contract(DIME_Token_Address, DIME_Token_ABI, provider);
        const creditsContract = new ethers.Contract(CREDITS_Token_Address, CREDITS_Token_ABI, provider);

        // const MintContractDC = new ethers.Contract(presaleDCMintProxy, presaleDCABI, provider);
        // const ECOReserveContract = new ethers.Contract(ECOReserveAddress, ECOReserveABI, provider);

        let usdcprice = ethers.utils.formatUnits(await USDCPriceContract.getChainlinkDataFeedLatestAnswer(),0);
        let dimeprice = ethers.utils.formatUnits(await DimePriceContract.getChainlinkDataFeedLatestAnswer(),0);
        let Creditprice = ethers.utils.formatUnits(await CreditPriceContract.getChainlinkDataFeedLatestAnswer(),0);
        let Jokerprice = ethers.utils.formatUnits(await JokerPriceContract.getChainlinkDataFeedLatestAnswer(),0);

        // let jokerPrice = ethers.utils.formatUnits(await DimePriceContract.getChainlinkDataFeedLatestAnswer(),0);
        // let jokerPrice = 10 * 10e8;//for now it is given as 10$

        // setJokerPrice(Jokerprice);
        // setUSDCPrice(usdcprice) 
        // setdimePrice(dimeprice);
        // setCreditPrice(Creditprice);

        setjokerPrice(Jokerprice);
        setdaiPrice(usdcprice) 
        setdimePrice(dimeprice);
        setcreditsPrice(Creditprice);

        let daibalance = ethers.utils.formatUnits(await daiContract.balanceOf(localStorage.getItem("walletAddress")),0);
        setDaiBalances(daibalance)  
        let Jokerbalance = ethers.utils.formatUnits(await JOKERContract.balanceOf(localStorage.getItem("walletAddress")),0);
        setJokerBalance(Jokerbalance)
        let dimebalance = ethers.utils.formatUnits(await dimeContract.balanceOf(localStorage.getItem("walletAddress")),0);
        setDimeBalance(dimebalance)  
        let creditsbalance = ethers.utils.formatUnits(await creditsContract.balanceOf(localStorage.getItem("walletAddress")),0);
        setCreditsBalance(creditsbalance)  

        let allowance =  ethers.utils.formatUnits(await daiContract.allowance(localStorage.getItem("walletAddress"),Presale_DIME_CREDITS_Address),0);
        console.log("allowance1", allowance)
        setAllowance(allowance);
        let allowance2 =  ethers.utils.formatUnits(await JOKERContract.allowance(localStorage.getItem("walletAddress"),Presale_DIME_CREDITS_Address),0);
        console.log("allowance2", allowance2)
        setAllowance2(allowance2);
        }
      }

      const calculateDimeCreditmint = async(value)=>{
        setDaiAmount(value)
        let dai25 = (value * 1e18) * 25 / 100;
        let calculatedValue = (dai25 * (daiPrice) * (10 ** 9)) / (jokerPrice * (10 ** 18));
        console.log("calculated",calculatedValue,Math.abs(calculatedValue));
        setJokerInput((Math.abs(calculatedValue)));

        let Totaldollarvalue = ((value * 1e18) * daiPrice)  / 1e18;
        let creditTokenMint = ((Totaldollarvalue * 1e18 * 50) / (100 * creditsPrice)); //24 - 6 = 18
        let dimeTokenMint = ((Totaldollarvalue * 1e9 * 50) / (100 * dimePrice)); //24 - 15 = 9
        setCreditToken(creditTokenMint);
        setDimeToken(dimeTokenMint);
        await fraxCalculation();

        console.log("Tokens", calculatedValue, Totaldollarvalue, creditTokenMint, dimeTokenMint);
      }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
     }

     const toastDiv = (txId) =>
    (
        <div>
            <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View Txn in Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
     </svg></p></a></p> 
        </div>
    );

const mintDimeCredit = async() =>{
    handleShowMint();
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const MintContract = new ethers.Contract(Presale_DIME_CREDITS_Address, Presale_DIME_CREDITS_ABI, web31.getSigner(account));


        console.log("jokerprice amount",JokerPrice,USDCPrice,daiAmount,JokerInput)
        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        const daiAmountBN = ethers.utils.parseUnits(daiAmount.toString(), 18);
        // Send the transaction and wait for it to be mined
        const mintTx = await MintContract.depositAndMint(daiAmountBN);
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        toast.success(toastDiv(id));
        await fraxCalculation();
        toast.success("Mint is Done successfully");
        handleHideMint();
    }catch(error){
        toast.error("Mint is not succeed",`${error}`);
        console.log("error",error)
        handleHideMint();
    }

}

const approveDai = async () => {
    handleShowMint();
    try {
      const web31 = await connectToEthereum();
      if (!web31) return;
  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]; // Use the first account
  
      console.log("Connected Successfully", account);
  
      // Create contract instance with the correct order of arguments
      const daiContract = new ethers.Contract(DAI_TOKEN_Address, DAI_TOKEN_ABI, web31.getSigner(account));
  
      // Convert daiAmount to BigNumber and multiply by 1e18
      const daiAmountBN = ethers.utils.parseUnits(daiAmount.toString(), 18);
  
      const approveTx = await daiContract.approve(Presale_DIME_CREDITS_Address, daiAmountBN);
      await approveTx.wait();
  
      console.log("approveTx", approveTx.hash);
  
      // Wait for a moment before fetching transaction details
      await sleep(2000);
      
      const id = `https://sepolia.etherscan.io/tx/${approveTx.hash}`;
      toast.success(toastDiv(id));
      toast.success("Approval successful");
      await fraxCalculation();
      handleHideMint();
    } catch (error) {
      toast.error("Approval failed", `${error}`);
      console.error("Error:", error);
      handleHideMint();
    }
  };

const approveJOKER = async() =>{
    handleShowMint();
    try {
      let web31 = await connectToEthereum();
      if (!web31) return;
  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]; // Use the first account
  
      console.log("Connected Successfully", account);
  
      // Create contract instance with the correct order of arguments
      const jokerContract = new ethers.Contract(JOKER_Token_Address, JOKER_Token_ABI, web31.getSigner(account));

      let jokerAmount = parseInt(JokerInput);
      console.log("jokerAmount", jokerAmount);
      // Convert daiAmount to BigNumber and multiply by 1e9
      const jokerAmountBN = ethers.utils.parseUnits(jokerAmount.toString(), 0);
      console.log("jokerAmountBN", jokerAmountBN);
      const approveTx = await jokerContract.approve(Presale_DIME_CREDITS_Address, jokerAmountBN);
      await approveTx.wait();
  
      console.log("approveTx", approveTx.hash);
  
      // Wait for a moment before fetching transaction details
      await sleep(2000);
      
      const id = `https://sepolia.etherscan.io/tx/${approveTx.hash}`;
      toast.success(toastDiv(id));
      toast.success("Approval successful");
      await fraxCalculation();
      handleHideMint();
    } catch (error) {
      toast.error("Approval failed", `${error}`);
      console.error("Error:", error);
      handleHideMint();
    }
}

    const usdcMaxTau = () =>
    {
        setDaiAmount(daiBalances/1e18);
        calculateDimeCreditmint(daiBalances/1e18)
    }

    const canMintDimeAndCredit = parseFloat(allowan) >= parseFloat(daiAmount) * 1e18;
    const canApproveJoker = parseInt(allowan2) >= parseInt(JokerInput);

    function formatNumberWithDynamicDecimals(number) {
        const formattedNumber = parseFloat(number).toString();
        const [, integerPart, decimalPart] = /^(\d+)\.?(\d*)$/.exec(formattedNumber);
    
        if (decimalPart === '0') {
            // If the decimal part is zero, increase the decimal places until the first non-zero digit
            for (let i = 1; i <= decimalPart.length; i++) {
                if (decimalPart.charAt(i - 1) !== '0') {
                    return `${integerPart}.${decimalPart.slice(0, i)}`;
                }
            }
            // If all decimal places are zero, return only the integer part
            return integerPart;
        } else {
            // If there is a non-zero decimal part, return the original number
            return formattedNumber;
        }
    }

    async function ConnectWallet() {
        // const { activate, chainId } = useWeb3React();
          const injectedConnector = new InjectedConnector({ supportedChainIds: [5] });
          // activate(injectedConnector);
          // <><Header active = {active}/></>
          // <AvatarDropDown deactivate = {deactivate} />
          console.log("injectedConnector", injectedConnector);
          const chainId = await window.ethereum.request({ method: 'eth_requestAccounts' });
              console.log(chainId);
              if(chainId!==0x5)
              {  await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId:'0x5' }],
                });
              }
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            .catch((err) => {
              if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to Wallet.');
              } else {
                console.error(err);
              }
            });
          const account = accounts[0];
          localStorage.setItem("walletAddress", accounts[0]);
          console.log("account", account);
          await sleep(3000);
          window.location.reload();
        }

        const isCoinbaseInstalled = async () => {
            if (typeof window.ethereum !== "undefined") {
                console.log("Coinbase is installed!");
                localStorage.setItem("walletName","Coinbase");
          
                const APP_NAME = 'Coinbase';
                const APP_LOGO_URL = 'https://example.com/logo.png';
                const DEFAULT_ETH_JSONRPC_URL =  'https://eth-sepolia.public.blastapi.io';
                const DEFAULT_CHAIN_ID = 5;
          
                const coinbaseWallet = new CoinbaseWalletSDK({
                      appName: APP_NAME,
                      appLogoUrl: APP_LOGO_URL,
                      darkMode: false
                    });
                
                    // Initialize a Web3 Provider object
                    const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID);
                    const web3 = new Web3(ethereum);
      
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const account = accounts[0];
            
                    console.log(`User's address is ${account}`);
            // setUserAddress(userAddress);
            web3.eth.defaultAccount = account;
            
              localStorage.setItem("walletAddress", accounts[0]);
              console.log("account", account);
              await sleep(3000);
              window.location.reload();
              
              } else {
                console.log("Coinbase is not installed.");
                window.open('https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad', '_blank','noreferrer');
                
              }
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.Coinbase);
        };

        const isMetaMaskInstalled = async () => {
            if (typeof window.ethereum !== "undefined") {
                console.log("MetaMask is installed!");
                localStorage.setItem("walletName","Metamask");
                await ConnectWallet();
              } else {
                console.log("MetaMask is not installed.");
                window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn', '_blank','noreferrer');
              }
            const { ethereum } = window;
            return Boolean(ethereum && ethereum.isMetaMask);
        };

    return (
        <Layout>
            <><ToastContainer position='bottom-right' draggable = {false} transition={Zoom} autoClose={4000} closeOnClick = {false}/></>

            <Container>
                <Row className='justify-content-center'>
                    <Col md={10} lg={7} className="mb-4">
                        {/* {show ? 
                            <Alert variant="grad" className='mb-4' onClose={() => setShow(false)} dismissible>
                                <p><strong className='text-purple'>Mint (2 Steps):</strong>  < br />
                                1. Enter in the amount of USDC you would like to deposit and press MINT. < br />
                                2. Claim your TAU tokens.</p>
                                <p><strong className='text-purple'>Redeem (2 Steps):</strong>  < br />
                                1. Enter in the amount of TAU you would like to redeem and press Redeem. < br />
                                2. Claim your USDC tokens.</p>
                                <p><strong className='text-purple'>Note:</strong> The “Approve“ is only needed when minting for the first time.</p>
                            </Alert>

                            : null
                        } */}

                        <Card className='card-dash d-block border-0 mb-4'>
                            
                            {/* <div className="d-flex align-items-center float-end mt-1 acc-h-links">
                                <h6 className='sub-heading ms-4 d-flex mb-0'>
                                    How it works 
                                    <OverlayTrigger
                                        key="left"
                                        placement="left"
                                        overlay={
                                            <Tooltip id={`tooltip-left`}>
                                                <strong className='text-purple'>1.</strong> Enter the Amount of USDC by which the requirement of ELEM and The amount of TAU or EINR minted can to automatically generated and displayed. <br /><br /><strong className='text-purple'>2.</strong> Once you acquire the desired amount of TAU to mint click on "Mint TAU" or "Mint EINR" button which will initiate the wallet to sign the Transactions.
                                            </Tooltip>
                                        }
                                        >
                                            <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                        </OverlayTrigger>
                                </h6>   
                            </div> */}
                            <Tabs defaultActiveKey="mint" className='dashboard-tabs' id="tab-example-1">
                                <Tab eventKey="mint" title="Mint DIME & CREDIT">
                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={DAI} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>DAI</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(daiBalances) ? Math.floor(formatNumberWithDynamicDecimals(parseFloat(daiBalances)/1e18) * 100) / 100 : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  */}
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={daiAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            onChange={(e) => calculateDimeCreditmint(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={usdcMaxTau}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jokercoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JOKER</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(JokerBalance) ? Math.floor(formatNumberWithDynamicDecimals(parseFloat(JokerBalance)/1e9) * 10000) / 10000 : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(JokerInput) ? Math.floor(formatNumberWithDynamicDecimals(parseFloat(JokerInput)/1e9) * 10000) / 10000 : '0.00'}/>
                                                </div>
                                            </Col>
                                         
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>

                                    <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={stasiscoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>DIME</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(dimeBalance) ? Math.floor(formatNumberWithDynamicDecimals(parseFloat(dimeBalance)/1e9) * 10000) / 10000 : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(DimeToken) ? Math.floor(formatNumberWithDynamicDecimals(parseFloat(DimeToken)/1e9) * 10000) / 10000 : '0.00'}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={creditscoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>CREDITS</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(creditsBalance) ? Math.floor(formatNumberWithDynamicDecimals(parseFloat(creditsBalance)/1e18) * 10000) / 10000 : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(CreditToken) ? Math.floor(formatNumberWithDynamicDecimals(parseFloat(CreditToken)/1e18) * 10000) / 10000 : '0.00'}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Max mint per tx</span>
                                            <strong className='font-semibold'>0.00 USDC</strong>
                                        </div> */}
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Exchange Rate </span>
                                            <strong className='font-semibold'> 1 DAI + 0.025 JOKER = 0.5 CREDITS + 0.5 DIME</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Minting Fee </span>
                                            <strong className='font-semibold'>5% JOKER</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(CreditToken).toFixed(2) === 'NaN' ? '0.00' : Math.floor(formatNumberWithDynamicDecimals(parseFloat(DimeToken/1e9)) * 100) / 100} DIME + 
                                            &nbsp;{parseFloat(CreditToken).toFixed(2) === 'NaN' ? '0.00' : Math.floor(formatNumberWithDynamicDecimals(parseFloat(CreditToken/1e18)) * 100) / 100} CREDITS</strong>
                                        </div>
                                        
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> */}
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                        {!localStorage.getItem("walletAddress") ? <>
                                            // If wallet is not connected, show a button to connect wallet
                                            <ButtonLoad
                                                loading={false} // You may set loading to true if needed
                                                className='btn w-100 btn-blue mb-20'
                                                onClick={handleShow} // Replace with your actual connect wallet function
                                            >
                                                Connect Wallet
                                            </ButtonLoad>
                                        </> : <>
                                        {!daiAmount ? <>
                                            <ButtonLoad
                                              loading={loadMint}
                                              disabled
                                              className='btn w-100 btn-blue mb-20'
                                            >
                                                Enter DAI Amount
                                            </ButtonLoad>
                                        </> : <>
                                            <ButtonLoad
                                              loading={loadMint}
                                              className='btn w-100 btn-blue mb-20'
                                              onClick={canMintDimeAndCredit ? canApproveJoker ? mintDimeCredit : approveJOKER : approveDai}
                                            >
                                              {canMintDimeAndCredit
                                                ? canApproveJoker
                                                  ? 'Mint DIME & CREDIT'
                                                  : 'Approve JOKER'
                                                : 'Approve DAI'}
                                            </ButtonLoad>
                                        </>}
                                        </>}
                                        {/* {allowan > daiAmount ? 
                                        (<>
                                         {mintenabled ? 
                                        (<>
                                         <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={mintJUsd}>
                                                Mint JUSD
                                            </ButtonLoad>
                                        </>):(<>
                                            <ButtonLoad disabled={true} className='btn w-100 btn-blue mb-20' >
                                                Mint JUSD is not Available
                                            </ButtonLoad>
                                        </>)}
                                        </>):(<>
                                            <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={approve}>
                                                Approve
                                            </ButtonLoad>
                                        </>)} */}
                                       
                                           
                                            {/* { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShow}>
                                                Collateral Ratio
                                            </Button> : <></>}   */}
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> */}
                                    </Row>
                                </Tab>
                                {/* <Tab eventKey="Mint DIME" title="Mint DIME">
                                <div className="group-row mb-20">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={USDC} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>USDC</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(daiBalances) ? (parseFloat(daiBalances)/1e9).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    {/* <input type="number" placeholder='0.00' className='form-control' value={usdcAmount} onChange={(e) => amountSet(e.target.value)}/>  
                                                    <InputGroup>
                                                        <FormControl
                                                            // disabled={true}
                                                            value={usdcAmount}
                                                            type='number'
                                                            placeholder="0.00"
                                                            aria-label="Recipient's username"
                                                            aria-describedby="basic-addon2"
                                                            onChange={(e) => calculateDIMEmint(e.target.value)}
                                                        />
                                                        <Button variant="outline-purple" className='btn-xs-d' onClick={usdcMaxDime}>Max</Button>
                                                    </InputGroup>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={jokercoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>JOKER</h5>
                                                        <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(JokerBalance) ? (parseFloat(JokerBalance)/1e9).toFixed(2) : '0.00'}</h5>
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(JokerInput) ? (parseFloat(JokerInput)/1e9).toFixed(4) : '0.00'}/>
                                                </div>
                                            </Col>
                                         
                                        </Row>
                                    </div>
                                    <div className="py-2 px-sm-4 px-2">
                                        <Button variant='blue' style={{cursor:"default"}} className='rounded-circle py-3'><svg width="20" height="20" className='m-0' viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.6255 11.0884C16.9501 10.7638 16.9501 10.2375 16.6255 9.91289C16.301 9.58848 15.7752 9.58824 15.4505 9.91236L11.3799 13.9756V4.66732C11.3799 4.20708 11.0068 3.83398 10.5465 3.83398C10.0863 3.83398 9.71322 4.20708 9.71322 4.66732V13.9756L5.65462 9.90978C5.32808 9.58266 4.79811 9.58242 4.47128 9.90925C4.14466 10.2359 4.14466 10.7654 4.47128 11.0921L9.94049 16.5613C10.2752 16.896 10.8179 16.896 11.1526 16.5613L16.6255 11.0884Z" fill="white"></path></svg></Button>
                                    </div>
                                    <div className="group-row">
                                        <Row>
                                            <Col sm={5} className="mb-sm-0 mb-3">
                                                <Button variant='link' className='btn-currency p-0'>
                                                    <img src={stasiscoin} alt="USDC" />
                                                    <div className="ms-3 text-start">
                                                        
                                                        <h5 className='mb-0 font-semibold'>DIME</h5>
                                                        {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(tauBalances) ? (parseFloat(tauBalances)/1000000).toFixed(2) : '0.00'}</h5> 
                                                    </div>
                                                </Button>
                                            </Col>
                                            <Col sm={7}>
                                                <div className="input-group-max px-3 input-group-max-lg w-100">
                                                    <input readonly disabled type="number" placeholder='0.00' className='form-control' value={parseFloat(DimeToken) ? (parseFloat(DimeToken)/1e9).toFixed(4) : '0.00'}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>


                                    <hr className='my-4' />

                                    <div className="mb-20">
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Max mint per tx</span>
                                            <strong className='font-semibold'>0.00 USDC</strong>
                                        </div> 
                                       <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Exchange Rate </span>
                                            <strong className='font-semibold'> $1 USDC + $1 JOKER = ${parseFloat((2*dimePrice)/1e8).toFixed(4)} DIME</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Minting Fee </span>
                                            <strong className='font-semibold'>5% USDT : 5% JOKER</strong>
                                        </div>
                                        <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(DimeToken).toFixed(2) === 'NaN' ? '0.00' : parseFloat(DimeToken/1e9).toFixed(2)} DIME</strong>
                                        </div>
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>You will receive</span>
                                            <strong className='font-semibold'>{parseFloat(tauAmount).toFixed(2) === 'NaN' ? '0.00' : parseFloat(tauAmount).toFixed(2)} TAU</strong>
                                        </div> */}
                                        {/* <div className="d-flex mb-1 align-items-center justify-content-between text-md">
                                            <span>Claimable amount</span>
                                            <strong className='font-semibold'>0.00 TAU</strong>
                                        </div> 
                                    </div>

                                    <Row className='flex-nowrap align-items-center gx-3'>
                                        <Col>
                                        {allowan > (usdcAmount*1e9) ?( allowan2 > (JokerInput) ? 
                                                    (<><Button loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={mintDIME}>
                                                        Mint DIME
                                                    </Button></>) :
                                                    (<><ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={approveJOKER}>
                                                    Approve JOKER
                                                    </ButtonLoad></>) ):(<>
                                                        <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20'  onClick={approve}>
                                                    Approve USDC
                                                    </ButtonLoad>
                                                    </>) }
                                        {/* {allowan > daiAmount ? 
                                        (<>
                                         {mintenabled ? 
                                        (<>
                                         <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={mintJUsd}>
                                                Mint JUSD
                                            </ButtonLoad>
                                        </>):(<>
                                            <ButtonLoad disabled={true} className='btn w-100 btn-blue mb-20' >
                                                Mint JUSD is not Available
                                            </ButtonLoad>
                                        </>)}
                                        </>):(<>
                                            <ButtonLoad loading={loadMint} className='btn w-100 btn-blue mb-20' onClick={approve}>
                                                Approve
                                            </ButtonLoad>
                                        </>)} 
                                       
                                           
                                            {/* { localStorage.getItem("walletAddress") === "2H7CM6JNAOZLQSPYFE63JYERAKQAVQ5SVEN4Y2567JRL5E5CASVO3Y2VE4" ? <Button className='btn w-100 btn-blue' onClick={handleCRatioUpdateShow}>
                                                Collateral Ratio
                                            </Button> : <></>}   
                                        </Col>
                                        {/* <Col>
                                            <Button disabled className='btn w-100 btn-blue'>
                                                Claim and Autostake
                                            </Button>
                                        </Col> 
                                    </Row>
                                </Tab> */}
                            </Tabs>
                        </Card>
                    </Col>
                </Row>
            <Modal show={prerequisiteShow} className="modal-dashboard" centered onHide={handlePrerequisiteClose}>
            <div className="pt-xl-0 pt-4">   
                <Link className='text-white mb-20' to="/dashboard"><span className='text-blue'>Go to Dashboard &nbsp;</span>
                <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6389 8.36952L18.8028 8.2H18.567H0.967033C0.700676 8.2 0.486002 8.10872 0.33782 7.95548C0.189347 7.80195 0.1 7.57826 0.1 7.3C0.1 7.02174 0.189347 6.79805 0.33782 6.64452C0.486002 6.49128 0.700676 6.4 0.967033 6.4H18.567H18.8064L18.6382 6.22972L14.0939 1.63048C14.0937 1.63036 14.0936 1.63023 14.0935 1.63011C13.7445 1.26887 13.7447 0.730627 14.0939 0.369516C14.4414 0.0101614 14.9564 0.0101614 15.3039 0.369516L21.7831 7.06952C21.939 7.23075 21.939 7.46925 21.7831 7.63048L15.3039 14.3305C14.9564 14.6898 14.4414 14.6898 14.0939 14.3305C13.7445 13.9692 13.7445 13.4308 14.0939 13.0695L18.6389 8.36952Z" fill="blue" stroke="currentColor" strokeWidth="0.2"/>
                                </svg>
                </Link>
                </div><br/>
                <Modal.Header>
                    <Modal.Title>Please perform the below actions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* { appOpt === false ? <ButtonLoad loading={loadAppOpt} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinWalletCheck}>
                        <span className='text-white'>1. App Opt-in (EINR)</span>
                        
                    </ButtonLoad> : <></>}
                    { appOptDynamic === false ? <ButtonLoad loading={loadAppOptDynamic} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={appOptinDynamicWalletCheck}>
                        <span className='text-white'>2. App Opt-in (TAU)</span>
                       
                    </ButtonLoad> : <></>}                    
                    { assetTauOpt === false ? <ButtonLoad loading={loadAssetOptTau} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={assetOptinTauWalletCheck}>
                        <span className='text-white'>3. Opt-in TAU asset</span>
                        
                    </ButtonLoad> : <></>}
                    { assetEinrOpt === false ? <ButtonLoad loading={loadAssetOptEinr} variant='primary' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={assetOptinEinrWalletCheck}>
                        <span className='text-white'>4. Opt-in EINR asset</span>
                        
                    </ButtonLoad> : <></>} */}
                </Modal.Body>
            </Modal>
            <Modal show={cRatioUpdateShow} className="modal-dashboard" centered onHide={handleCRatioUpdateClose}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update TAU</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center' >
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            <Modal show={cRatioUpdateShowEinr} className="modal-dashboard" centered onHide={handleCRatioUpdateCloseEinr}>
                <center>
                <Modal.Header>
                   <Modal.Title>Collateral Ratio Update EINR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <Link className='text-white mb-20' to="/dashboard"><Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center'><span className='text-white'>Go to Dashboard</span></Button></Link> */}
                    <div className="group-row">
                    <Row className=''>
                    <Col sm={5} className="mb-sm-0 mb-3">
                        <Button variant='link' className='btn-currency p-0'>
                            {/* <img src={einrLogo} alt="TAU" /> */}
                            <div className="ms-3 text-start">
                                <h5 className='mb-0 font-semibold' style={{color:"white"}}>Collateral Percentage</h5>
                                {/* <h5 className='sub-heading text-xs mb-0'>Bal: {parseFloat(EinrBalances) ? (parseFloat(EinrBalances)/1000000).toFixed(2) : '0.00'}</h5> */}
                            </div>
                        </Button>
                        </Col>
                    <Col sm={7}>
                    <div className="input-group-max px-3 input-group-max-lg w-50">
                    <InputGroup>
                        <FormControl
                            // disabled={true}
                            value={cRatioValue}
                            type='number'
                            placeholder="0.00"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setCRatioValue(e.target.value)}
                        />
                        {/* <Button variant="outline-purple" className='btn-xs-d'>Max</Button> */}
                    </InputGroup>                   
                    </div>
                    </Col>
                    </Row>
                    </div>
                    <br/>   

                    <ButtonLoad loading={cRatioLoad} variant='primary' className='d-flex p-3 mb-20 justify-content-between w-50 align-items-center'>
                        <span className='text-white'>Update Collateral Ratio</span>
                    </ButtonLoad>
                </Modal.Body>
                </center>
            </Modal>
            <Modal show={show} className="modal-dashboard" centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Connect to a wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button variant='gray' className='d-flex p-3 mb-20 justify-content-between w-100 align-items-center' onClick={()=>isCoinbaseInstalled()}>
                        <span className='text-white'>Coinbase Wallet</span>
                        <img src={Coinbase} alt="Coinbase Wallet" />
                    </Button>
                    <Button variant='gray' className='d-flex p-3 justify-content-between w-100 align-items-center' onClick={()=>isMetaMaskInstalled()}>
                        <span className='text-white'>MetaMask Wallet</span>
                        <img src={MetaMask} alt="MetaMask Wallet" />
                    </Button>
                </Modal.Body>
            </Modal>
            </Container>
        </Layout>
    );
};

export default Stablecoin;