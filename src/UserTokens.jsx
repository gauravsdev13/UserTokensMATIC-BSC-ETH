import React, { useState, useEffect } from 'react';
import './App.css'
import { ethers } from "ethers";
import Axios from 'axios';

const USDTContractABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]

function UserTokens() {

  const [USDCPrice, setUSDCPrice] = useState(0);
  const [DAIPrice, setDAIPrice] = useState(0);
  const [MATICPrice, setMATICPrice] = useState(0);
  const [WBTCPrice, setWBTCPrice] = useState(0);
  const [ETHPrice, setETHPrice] = useState(0);
  const [BUSDPrice, setBUSDPrice] = useState(0);
  const [USDTPrice, setUSDTPrice] = useState(0);
  
   useEffect( () => {
  async function getData() {

  var res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=USDC&tsyms=USD");
  setUSDCPrice(JSON.parse(JSON.stringify(res.data)))

  res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=DAI&tsyms=USD");
  setDAIPrice(JSON.parse(JSON.stringify(res.data)))

  res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD");
  setMATICPrice(JSON.parse(JSON.stringify(res.data)))

  res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=WBTC&tsyms=USD");
  setWBTCPrice(JSON.parse(JSON.stringify(res.data)))

  res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
  setETHPrice(JSON.parse(JSON.stringify(res.data)))

  res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=BUSD&tsyms=USD");
  setBUSDPrice(JSON.parse(JSON.stringify(res.data)))

  res = await Axios.get("https://min-api.cryptocompare.com/data/price?fsym=USDT&tsyms=USD");
  setUSDTPrice(JSON.parse(JSON.stringify(res.data)))


 }
 getData()
}
), []; 
 

    const [navbarStatus, setNavbarStatus] = useState("Connect");
    const [status, setStatus] = useState();

    const [USDCBalance, setUSDCBalance] = useState(0);
    const [DAIBalance, setDAIBalance] = useState(0);
    const [MATICBalance, setMATICBalance] = useState(0);
    const [WBTCBalance, setWBTCBalance] = useState(0);

    const [BSCETHBalance, setBSCETHBalance] = useState(0);
    const [BUSDBalance, setBUSDBalance] = useState(0);
    const [BSCUSDCBalance, setBSCUSDCBalance] = useState(0);
    const [BSCDAIBalance, setBSCDAIBalance] = useState(0);
    
    const [polygonWETHBalance, setPolygonWETHBalance] = useState(0);
    const [polygonDAIBalance, setpolygonDAIBalance] = useState(0);
    const [polygonUSDCBalance, setPolygonUSDCBalance] = useState(0);
    const [polygonWMATICBalance, setpolygonWMATICBalance] = useState(0);
    const [polygonWBTCBalance, setPolygonWBTCBalance] = useState(0);

    const connectWalletHandler = () => {

        if (!window.ethereum) {
            alert('Please install MetaMask browser extension to interact')
        };

        if (window.ethereum && window.ethereum.isMetaMask && navbarStatus === "Connect") {

            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(result => {
                    accountChangedHandler(result[0]);
                    setNavbarStatus('Disconnect');


                })
                .catch(error => {
                    console.log(error.message);


                });

        } else {
            setNavbarStatus('Connect');
            localStorage.clear();
            accountChangedHandler("");

        }
    }

    const accountChangedHandler = (newAccount) => {
        setStatus(newAccount);
        localStorage.setItem('status', newAccount);

    }

   /*  const chainChangedHandler = () => {
      getUSDTBalance()
    } */
 

    window.ethereum.on('accountsChanged', accountChangedHandler);
  /*   window.ethereum.on('chainChanged', chainChangedHandler); */


    const networks = {
       
        ethereum: {
            chainId:  `0x${Number(1).toString(16)}`,
            chainName: 'Ethereum Main Network (Mainnet)',         
            nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18
            },    
            rpcUrls: ['https://rpc.ankr.com/eth'],          
            blockExplorerUrls: ['https://etherscan.io'],         
        },

        polygon: {
          chainId: `0x${Number(137).toString(16)}`,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
          },
          rpcUrls: ["https://polygon-rpc.com/"],
          blockExplorerUrls: ["https://polygonscan.com/"]
        },

        bsc: {
          chainId: `0x${Number(56).toString(16)}`,
          chainName: "Binance Smart Chain Mainnet",
          nativeCurrency: {
            name: "Binance Chain Native Token",
            symbol: "BNB",
            decimals: 18
          },
          rpcUrls: [
            "https://bsc-dataseed1.binance.org",
            "wss://bsc-ws-node.nariox.org"
          ],
          blockExplorerUrls: ["https://bscscan.com"]
        }
      };

      const tokens = [
        
        //ETH
        '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', //USDC
        '0x6b175474e89094c44da98b954eedeac495271d0f', //DAI
        '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce', //SHIB
        '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599', //WBTC


        //BSC
        '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', //ETH
        '0x55d398326f99059fF775485246999027B3197955', //BUSD
        '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', //USDC
        '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', //DAI


        //POLYGON
        '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', //WETH
        '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', //USDC
        '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', //DAI
        '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', //WMATIC   
        '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6' //WBTC


    ];

      const changeNetwork = async ({ networkName, setError }) => {
        try {
          if (!window.ethereum) throw new Error("Install Metamask");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...networks[networkName]
              }
            ]
          });
        } catch (err) {
          setError(err.message);
        }
      };
    
        const [error, setError] = useState();

        const [ethShow, setEthShow] = useState(false);
        const [bscShow, setBscShow] = useState(false);
        const [polygonShow, setPolygonShow] = useState(false);
      
        const handleNetworkSwitch = async (networkName) => {
          setError();
          await changeNetwork({ networkName, setError });
        };
      
        const handleEthereum = () => {
          handleNetworkSwitch('ethereum'); 
          getUSDTBalance()
          setEthShow(true); setBscShow(false); setPolygonShow(false)
        }

        const handleBSC = () => {
            handleNetworkSwitch('bsc');  
            getBSCBalances();
            setEthShow(false); setBscShow(true); setPolygonShow(false)
            }


        const handlePolygon = () => {        
          handleNetworkSwitch('polygon'); 
          getPolygonBalances()
          setEthShow(false); setBscShow(false); setPolygonShow(true)
            }

        const networkChanged = (chainId) => {
          console.log({ chainId });
        };
      
        useEffect(() => {
          window.ethereum.on("chainChanged", networkChanged);
      
          return () => {
            window.ethereum.removeListener("chainChanged", networkChanged);
          };
        }, []);
      

    const getUSDTBalance = async () => {
    
      if (window.ethereum) {   
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
           
        var transactionsContract = new ethers.Contract(tokens[0], USDTContractABI, provider);
        
        var balance = await transactionsContract.balanceOf(status);
  
        if(balance) setUSDCBalance(ethers.utils.formatEther(balance.toLocaleString()))
  

        transactionsContract = new ethers.Contract(tokens[1], USDTContractABI, provider);
        
        balance = await transactionsContract.balanceOf(status);
  
        if(balance) setDAIBalance(ethers.utils.formatEther(balance.toLocaleString()))

    
        transactionsContract = new ethers.Contract(tokens[2], USDTContractABI, provider);
        
        balance = await transactionsContract.balanceOf(status);
  
        if(balance) setMATICBalance(ethers.utils.formatEther(balance.toLocaleString()))


        transactionsContract = new ethers.Contract(tokens[3], USDTContractABI, provider);
        
        balance = await transactionsContract.balanceOf(status);
  
        if(balance) setWBTCBalance(ethers.utils.formatEther(balance.toLocaleString()))

            
      }
  };
    
    const getBSCBalances = async () => {
    
        if (window.ethereum) {   
          
          const provider = new ethers.providers.Web3Provider(window.ethereum);
             
          let transactionsContract = new ethers.Contract(tokens[4], USDTContractABI, provider);
          
          var balance = await transactionsContract.balanceOf(status);
    
          if(balance) setBSCETHBalance(ethers.utils.formatEther(balance.toLocaleString()))
    

          transactionsContract = new ethers.Contract(tokens[5], USDTContractABI, provider);
          
          balance = await transactionsContract.balanceOf(status);
    
          if(balance) setBUSDBalance(ethers.utils.formatEther(balance.toLocaleString()))

      
          transactionsContract = new ethers.Contract(tokens[6], USDTContractABI, provider);
          
          balance = await transactionsContract.balanceOf(status);
    
          if(balance) setBSCUSDCBalance(ethers.utils.formatEther(balance.toLocaleString()))


          transactionsContract = new ethers.Contract(tokens[7], USDTContractABI, provider);
          
          balance = await transactionsContract.balanceOf(status);
    
          if(balance) setBSCDAIBalance(ethers.utils.formatEther(balance.toLocaleString()))

              
        }
    };

    const getPolygonBalances = async () => {
    
      if (window.ethereum) {   
        
        const provider = new ethers.providers.Web3Provider(window.ethereum);
           
        let transactionsContract = new ethers.Contract(tokens[8], USDTContractABI, provider);
        
        var balance = await transactionsContract.balanceOf(status);
  
        if(balance) setPolygonWETHBalance(ethers.utils.formatEther(balance.toLocaleString()))
  

        transactionsContract = new ethers.Contract(tokens[9], USDTContractABI, provider);
        
        balance = await transactionsContract.balanceOf(status);
  
        if(balance) setPolygonUSDCBalance(ethers.utils.formatEther(balance.toLocaleString()))

    
        transactionsContract = new ethers.Contract(tokens[10], USDTContractABI, provider);
        
        balance = await transactionsContract.balanceOf(status);
  
        if(balance) setpolygonDAIBalance(ethers.utils.formatEther(balance.toLocaleString()))


        transactionsContract = new ethers.Contract(tokens[11], USDTContractABI, provider);
        
        balance = await transactionsContract.balanceOf(status);
  
        if(balance) setpolygonWMATICBalance(ethers.utils.formatEther(balance.toLocaleString()))


        transactionsContract = new ethers.Contract(tokens[12], USDTContractABI, provider);
        
        balance = await transactionsContract.balanceOf(status);
  
        if(balance) setPolygonWBTCBalance(ethers.utils.formatEther(balance.toLocaleString()))
            
      }
  };
 
    useEffect(() => {
        if (localStorage.getItem('status')) connectWalletHandler();
    }, []);

    return (
        <div className="App">
         
            {status}
            <button className='Connect' onClick={connectWalletHandler} >
                {navbarStatus}</button> 
            <button className='Network 'onClick={handleEthereum} >ETHEREUM</button>
            <button className='Network BSC' onClick={handleBSC} >BSC</button>
            <button className='Network Polygon' onClick={handlePolygon} >POLYGON</button><br></br>
          

          { ethShow && <>
               
              <h4>Ethereum</h4>

               <div className='List E'>USDC &nbsp; Balance  {USDCBalance}&nbsp; Price 1$  </div>
               <div className='List E'>DAI &nbsp; Balance {DAIBalance} &nbsp;  Price {JSON.stringify(DAIPrice.USD)}$  </div>
               <div className='List E'>MATIC&nbsp; Balance {MATICBalance} &nbsp;  Price {JSON.stringify(MATICPrice.USD)}$ </div>
               <div className='List E'>WBTC &nbsp; Balance  {WBTCBalance} &nbsp;  Price {JSON.stringify(WBTCPrice.USD)}$ </div>

               </> }

               { bscShow && <>

               <h4>BSC</h4>

               <div className='List B'>ETH &nbsp; Balance  {BSCETHBalance} &nbsp;  Price {JSON.stringify(ETHPrice.USD)}$ </div>
               <div className='List B'>BUSD &nbsp; Balance  {BUSDBalance} &nbsp;  Price {JSON.stringify(BUSDPrice.USD)}$  </div>
               <div className='List B'>USDC &nbsp; Balance  {BSCUSDCBalance} &nbsp;  Price  {JSON.stringify(USDCPrice.USD)}$ </div>
               <div className='List B'>DAI &nbsp; Balance  {BSCDAIBalance} &nbsp;  Price {JSON.stringify(DAIPrice.USD)}$  </div>

  </> }

          { polygonShow && <>

               <h4>Polygon</h4>

               <div className='List P'>WETH &nbsp; Balance  {polygonWETHBalance} &nbsp;  Price {JSON.stringify(ETHPrice.USD)}$ </div>
               <div className='List P'>DAI &nbsp; Balance  {polygonDAIBalance} &nbsp;  Price {JSON.stringify(DAIPrice.USD)}$  </div>
               <div className='List P'>USDC &nbsp; Balance  {polygonUSDCBalance} &nbsp;  Price  {JSON.stringify(USDCPrice.USD)}$   </div>
               <div className='List P'>WMATIC &nbsp; Balance  {polygonWMATICBalance} &nbsp;  Price {JSON.stringify(MATICPrice.USD)}$  </div>
               <div className='List P'>WBTC &nbsp; Balance {polygonWBTCBalance} &nbsp;  Price {JSON.stringify(WBTCPrice.USD)}$  </div>

               </> }
        </div>
    );
}

export default UserTokens;