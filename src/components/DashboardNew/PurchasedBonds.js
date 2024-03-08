import React, {useState, useEffect} from 'react';
import { Accordion, Button, Col, Container, FormControl, InputGroup, OverlayTrigger, Row, Tab, Tabs, Tooltip } from 'react-bootstrap';
import Layout from './LayoutT';

import ButtonLoad from 'react-bootstrap-button-loader';
import { Link } from 'react-router-dom';
import USDC from '../../assets/images/usdc.jpg';
import MyAlgoConnect from '@randlabs/myalgo-connect';
import { ToastContainer, Toast, Zoom, Bounce, toast} from 'react-toastify';
import { ethers } from 'ethers';
import { DIME_Bond_ABI, DIME_Bond_Address } from '../../abi/ABI&ContractAddress';
// import { bondContract, jokerTokenbond, dimeTokenbond, daiTokenbond, bondContractabi, jokerTokenbondabi, dimeTokenbondabi, daiTokenbondabi} from '../../abi/abi';


const PurchaseBond = (prop) => {
    const[loaderClaim, setLoaderClaim] = useState(false);

    const handleShowLoadClaim = () => setLoaderClaim(true);
    const handleHideLoadClaim = () => setLoaderClaim(false);

    const[claimedRewards, setClaimedRewards] = useState(0.00);
    const[claimableRewards, setClaimableRewards] = useState(0);
    const[claimableRewardspercent, setclaimableRewardspercent] = useState(0.00);
    const[bondInfo, setBondInfo] = useState([]);

    const[totalPayout, settotalPayout] = useState(0.0000);
    const[creationTime, setCreationTime] = useState();

    useEffect(async() => {
        await displayValueCalculation2()
    }, []);

    const fixdimeoutput = () =>{
        let output = ((ethers.BigNumber.from(prop.info.initialPayout._hex).toNumber()) / 1e9).toFixed(4);
        settotalPayout(parseFloat(output)); 
    }

    const fixdcreationtimeoutput = () => {
        const output = ethers.BigNumber.from(prop.info.creationTime._hex).toNumber();
        const dateObject = new Date(output * 1000);
        
        // Get individual date components
        const month = dateObject.toLocaleString('en-us', { month: 'short' });
        const day = dateObject.getDate();
        const year = dateObject.getFullYear();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();
    
        // Format the date string
        const formattedDate = `${month} ${day} ${year} ${hours}:${minutes}:${seconds}`;
        setCreationTime(formattedDate);
    }

    const fixrewardsclaimedoutput = () =>{
        let output = ((ethers.BigNumber.from(bondInfo.percentClaimed._hex).toNumber()) / 1e2);
        setClaimedRewards(parseFloat(output));
    }

    const claimWalletCheck = async () =>
{
    handleShowLoadClaim()
    try{
        const web31 = await connectToEthereum();
        if (!web31) return;

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0]; // Use the first account

        console.log("Connected Successfully", account);

        // Create contract instance with the correct order of arguments
        const DimeBondContract = new ethers.Contract(DIME_Bond_Address, DIME_Bond_ABI, web31.getSigner(account));

        // const val = ethers.utils.formatUnits(100000000000000, 0);
        // let k = Web3.utils.toBN(1000000000000000000n);
        // const val11 = ethers.utils.formatUnits(100000000000000, 18);
        // const val1 =  ethers.utils.parseUnits(val11, 18);;
        // Send the transaction and wait for it to be mined
        const mintTx = await DimeBondContract.redeem(localStorage.getItem('walletAddress'),(ethers.BigNumber.from(prop.bondcount)).toNumber());
        await mintTx.wait();
        console.log("minttx",mintTx.hash);
        // toast.success(` "Successfully Minted JUSD", ${(mintTx.hash)} `)
        let id = "https://sepolia.etherscan.io/tx/" + mintTx.hash;
        await sleep(2000);
        toast.success(toastDiv(id));
        await displayValueCalculation2();
        toast.success("Claim  successfully");
        handleHideLoadClaim();
    }catch(error){
        toast.error("Claim is not succeed",`${error}`);
        console.log("error",error)
        handleHideLoadClaim();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 const toastDiv = (txId) =>
(
    <div>
        <p> Transaction is successful &nbsp;<a style={{color:'#133ac6'}} href={txId} target="_blank" rel="noreferrer"><br/><p style={{fontWeight: 'bold'}}>View in Sepolia Explorer <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M11.7176 3.97604L1.69366 14L0.046875 12.3532L10.0697 2.32926H1.23596V0H14.0469V12.8109H11.7176V3.97604Z" fill="#133ac6"/>
 </svg></p></a></p>  
    </div>
);

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

  const displayValueCalculation2 = async() =>{
    if(localStorage.getItem("walletAddress") === null || localStorage.getItem("walletAddress") === undefined || localStorage.getItem("walletAddress") === ''){                
    }
    else{
        console.log("useeffect")
      //   const provider = new ethers.providers.Web3Provider(window.ethereum)
      const url = "https://sepolia.infura.io/v3/886e9a53b5da4f6286230678f7591bde";
      const provider = new ethers.providers.JsonRpcProvider(url);
        // console.log("Connected Successfully", account);
      //new code

    //   const DimePriceContract = new ethers.Contract(DIMEChainlinkAddress, ChainLinkABi, provider);
    //   const USDCPriceContract = new ethers.Contract(USDCChainlinkAddress, ChainLinkABi, provider);
    //   const JokerPriceContract = new ethers.Contract(JOKERChainlinkAddress, ChainLinkABi, provider);
    //   const CreditPriceContract = new ethers.Contract(CREDITChainlinkAddress, ChainLinkABi, provider);
    //   const DimeContract = new ethers.Contract(dimeTokenbond, dimeTokenbondabi, provider);
    //   const daiContract = new ethers.Contract(daiTokenbond, daiTokenbondabi, provider);
    // //   const TreasuryContract = new ethers.Contract(TreasuryAddress, TreasuryContractABI, provider);
    //   const JOKERContract = new ethers.Contract(jokerTokenbond, jokerTokenbondabi, provider);
      const DimeBondContract = new ethers.Contract(DIME_Bond_Address, DIME_Bond_ABI, provider);
      let bondInfo1 = await bonfInfo((ethers.BigNumber.from(prop.bondcount)).toNumber());
      setBondInfo(bondInfo1);
      fixdimeoutput();
      fixdcreationtimeoutput();
      setClaimedRewards(parseFloat(((ethers.BigNumber.from(bondInfo1.percentClaimed._hex)).toNumber()) / 1e2));
      console.log("purchased details:", bondInfo1);
      let claimableReward1 = await DimeBondContract.claimableRewards(localStorage.getItem('walletAddress'), (ethers.BigNumber.from(prop.bondcount)).toNumber());
      setClaimableRewards(((ethers.BigNumber.from(claimableReward1._hex).toNumber()) / 1e9).toFixed(4));
      let res =  (await DimeBondContract.percentVestedFor(localStorage.getItem('walletAddress'), (ethers.BigNumber.from(prop.bondcount)).toNumber()));
      let totalpercentvested = ((ethers.BigNumber.from(res._hex).toNumber()) / 1e2).toFixed(2);
      if(totalpercentvested > 100.00){
        totalpercentvested = 100.00;
      }
      let claimable_percent = totalpercentvested - claimedRewards ; 
      setclaimableRewardspercent(claimable_percent);
      
    }
  }
  const bonfInfo = async(bondNumber) => {
    const url = "https://sepolia.infura.io/v3/886e9a53b5da4f6286230678f7591bde";
    const provider = new ethers.providers.JsonRpcProvider(url);
    const DimeBondContract = new ethers.Contract(DIME_Bond_Address, DIME_Bond_ABI, provider);
    const bigNumberObject = ethers.BigNumber.from(bondNumber);
    const result = await DimeBondContract.bondInfo(localStorage.getItem('walletAddress'), bigNumberObject.toNumber());
    console.log(" bondInfo:", result);
    return result;
}


return(
    <Row className='row-divider'>
                                        <Col md={3}>
                                            <h6><span className='text-gray-d'>Total payout: </span></h6>
                                            <h6>{totalPayout.toFixed(4)} DIME </h6>
                                            {/* <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col> 
                                            
                                                </Col>
                                            </Row> */}
                                        </Col>
                                        <Col md={3}>
                                            <h6><span className='text-gray-d'>Created Time: </span></h6>
                                            <h6>{creationTime}</h6>
                                            {/* <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col> 
                                            
                                                </Col>
                                            </Row> */}
                                        </Col>
                                        <Col md={3}>
                                            <h6><span className='text-gray-d'>Rewards Claimed: </span></h6>
                                            <h6>{claimedRewards.toFixed(2)} % </h6>
                                            {/* <Row className='flex-nowrap mb-2 gx-3'>
                                                <Col> 
                                            
                                                </Col>
                                            </Row> */}
                                        </Col>
                                        <Col md={3}>
                                            <h6><span className='text-sm text-gray-d'>Claimable Rewards: </span> {claimableRewards} DIME</h6>
                                            <Row className='flex-nowrap align-items-center mb-2 gx-3'>
                                              <Col>
                                                {claimableRewardspercent >= 20.00 ? 
                                                (<>
                                                    <ButtonLoad loading={loaderClaim} className='btn w-100 btn-blue' onClick={claimWalletCheck}>Claim </ButtonLoad>
                                                </>):(<>
                                                
                                                    <ButtonLoad disabled={true} className='btn w-100 btn-blue' >Claim </ButtonLoad>
                                                </>)}                                    
                                                </Col>                                  
                                                <Col xs="auto">
                                                <OverlayTrigger
                                                    key="left"
                                                    placement="left"
                                                    overlay={
                                                        <Tooltip id={`tooltip-left`}>
                                                            Your claimable rewards.
                                                        </Tooltip>
                                                    }
                                                    >
                                                        <svg className="tooltip-icon ms-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12Z" stroke="#CCCCCC" stroke-width="1.5"></path><path d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8Z" fill="#CCCCCC"></path><path d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12Z" fill="#CCCCCC"></path></svg>
                                                    </OverlayTrigger>
                                                </Col>
                                                </Row>
                                                </Col>
                                    </Row>
)

}

export default PurchaseBond;