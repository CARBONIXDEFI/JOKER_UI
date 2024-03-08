import axios from "axios";

//--------------------Visit History----------------------

export const VisitHistoryPost = async (address, pageName) => {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const locationDetails = await fetch('https://geolocation-db.com/json/')
    let location = await locationDetails.json();
    let ipAddress = location.IPv4;
    let region = location.country_name;

    const requestData = {
        "address": address,
        "ipAddress": ipAddress,
        "pageName": pageName,
        "region": region
    };

    const requestOptions = {
        method: 'POST',
        url: '/jokerapi/v1/visithistory',
        data: requestData
    };

    try {
        const apiResponse = await axios(requestOptions);
        console.log("VisitHistoryPost", apiResponse);
        return true;
    } catch (error) {
        return false;
    }
};

export const getVisitHistoryAll = async () => {

  const url = `/jokerapi/v1/visithistory`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};
  
export const getVisitHistoryByAddress = async (address) => {

  const url = `/jokerapi/v1/visithistory/address/${address}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getVisitHistoryByPageName = async (pageName) => {

  const url = `/jokerapi/v1/visithistory/pagename/${pageName}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getVisitHistoryByRegion = async (region) => {

  const url = `/jokerapi/v1/visithistory/region/${region}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

  //--------------------Visit History----------------------

  //--------------------Transactions-----------------------

  export const TransactionPost = async (address, contractAddress, operation, txid) => {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const requestData = {
      "address": address,
      "contractAddress": contractAddress,
      "operation": operation,
      "txid": txid
    };

    const requestOptions = {
        method: 'POST',
        url: '/jokerapi/v1/transactions',
        data: requestData
    };

    try {
        const apiResponse = await axios(requestOptions);
        console.log("TransactionPost", apiResponse);
        return true;
    } catch (error) {
        return false;
    }
};

export const getTransactionsAll = async () => {

  const url = `/jokerapi/v1/transactions`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTransactionsByAddress = async (address) => {

  const url = `/jokerapi/v1/transactions/address/${address}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTransactionsByContractAddress = async (contractAddress) => {

  const url = `/jokerapi/v1/transactions/contractaddress/${contractAddress}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTransactionsByOperation = async (operation) => {

  const url = `/jokerapi/v1/transactions/operation/${operation}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

  //--------------------Transactions-----------------------

  //--------------------TokenPrice-------------------------

  export const TokenPricePost = async (tokenName, tokenPrice, circulatingSupply) => {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const requestData = {
      "tokenName": tokenName,
      "tokenPrice": tokenPrice,
      "circulatingSupply": circulatingSupply
    };

    const requestOptions = {
        method: 'POST',
        url: '/jokerapi/v1/tokenprice',
        data: requestData
    };

    try {
        const apiResponse = await axios(requestOptions);
        console.log("TokenPricePost", apiResponse);
        return true;
    } catch (error) {
        return false;
    }
};

export const getTokenPriceByOneDay = async () => {

  const url = `/jokerapi/v1/tokenprice/oneday`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTokenPriceByOneWeek = async () => {

  const url = `/jokerapi/v1/tokenprice/oneweek`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTokenPriceByOneMonth = async () => {

  const url = `/jokerapi/v1/tokenprice/onemonth`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

  //--------------------TokenPrice-------------------------

  //--------------------Treasury---------------------------

  export const TreasuryPost = async (tokenName, tokenPrice, tokenReserveCount, reserveName) => {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const requestData = {
      "tokenName": tokenName,
      "tokenPrice": tokenPrice,
      "tokenReserveCount": tokenReserveCount,
      "reserveName": reserveName
    };

    const requestOptions = {
        method: 'POST',
        url: '/jokerapi/v1/treasury',
        data: requestData
    };

    try {
        const apiResponse = await axios(requestOptions);
        console.log("TokenPricePost", apiResponse);
        return true;
    } catch (error) {
        return false;
    }
};

export const getTreasuryAll = async () => {

  const url = `/jokerapi/v1/treasury`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTreasuryByTokenName = async (name) => {

  const url = `/jokerapi/v1/treasury/tokenname/{name}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTreasuryByReserveName = async (reserveName) => {

  const url = `/jokerapi/v1/treasury/tokenname/{reserveName}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTreasuryByOneDay = async () => {

  const url = `/jokerapi/v1/treasury/oneday`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTreasuryByOneWeek = async () => {

  const url = `/jokerapi/v1/treasury/oneweek`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

export const getTreasuryByOneMonth = async () => {

  const url = `/jokerapi/v1/treasury/onemonth`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return [true, data];
    } else {
      return [false, 'Error occurred while fetching data'];
    }
    
  } catch (error) {
    console.log('Error:', error);
    return [false, 'Error occurred while making the request'];
  }
};

  //--------------------Treasury---------------------------