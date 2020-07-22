import axios from 'axios';
import { urlFunction } from '../utils/urls';

// Filter interest by interval
export let getMenuStat = async (d, token) => {
    let res = await axios.post(`${urlFunction()}/restaurant/stat/`, d,
    {
        headers : {
          Authorization  : 'bearer ' + token,
        },
      }
    );  
    let data = res.data
    return data.length > 0  ? data :[]
}

// Get OrdersStat
export let getOrdersStat = async (d, token) => {
  let res = await axios.post(`${urlFunction()}/restaurant/orders/stat/`,d,
  {
      headers : {
        Authorization  : 'bearer ' + token,
      },
    }
  );  
  let data = res.data
  return data.length > 0  ? data :[]
}

// Get Payment Stat
export let getPaymentStat = async (d, token) => {
  let res = await axios.post(`${urlFunction()}/restaurant/payment/stat/`,d,
  {
      headers : {
        Authorization  : 'bearer ' + token,
      },
    }
  );  

  let data = res.data
  return data.length > 0  ? data :[]
}




// Get Payment Stat
export let getRestaurantReadyToGetPaid = async ( token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/orders/payments/list_restaurant_ready_to_get_paid`,
  {
      headers : {
        Authorization  : 'bearer ' + token,
      },
    }
  );  
  let data = res.data
  return data.length > 0 ? data : []
  
}



