
import axios from 'axios';
import { urlFunction } from '../utils/urls';

// list of restaurant count 
export let listRestaurantCount = async () => {
  try {
    let res = await axios.get(`${urlFunction()}/restaurant/count/data`)
    let data = res.data
    return data
 } catch (error) {
   alert(error.message)
   return []
  }
};

// list of restaurant
export let listRestaurantContext = async (limit, offset) => {
  try {
  let d = {
      limit, offset
    } 
    let res = await axios.post(`${urlFunction()}/restaurant/all`, d)
    let data = res.data
    return data.length > 0 ? data : [] 
    
 } catch (error) {
   alert(error.message)
   return []
  }
};
// list of restaurant without pagination
export let listRestaurantWithoutPaginationGraph = async () => {
  try {
    let res = await axios.post(`${urlFunction()}/restaurant/all`)
    let data = res.data
    return data.length > 0 ? data : [] 
 } catch (error) {
   alert(error.message)
   return []
  }
};

// list of restaurant without pagination
export let listRestaurantWithoutPagination = async () => {
  try {
    let res = await axios.get(`${urlFunction()}/restaurant/get/all`)
    let data = res.data
    return data.length > 0 ? data.splice(0,40) : [] 
 } catch (error) {
   alert(error.message)
   return []
  }
};



// get restauran by id
export let getRestaurantById = async (rest_id) => {
  let res = await axios.get(`${urlFunction()}/restaurant/${rest_id}`);
  let data = res.data
  return data.length > 0  ? data :[]
}

// get orders -->
export let getOrdersByRestaurantId = async (rest_id, token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/orders/${rest_id}`,
  {
    headers : {
      Authorization  : 'bearer ' + token,
    },
    });  
  let data = res.data
  return data.length > 0  ? data :[]
}
// get orders -->
export let getCompletedOrdersByRestaurantId = async (rest_id, token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/orders/completed/only/${rest_id}`,
   
  {
    headers : {
      Authorization  : 'bearer ' + token,
    },
    });  
  let data = res.data
  return data.length > 0  ? data :[]
}



// Get order  -->> menu orders by with all object
export let getOrderMenuByIdFicheOrder = async (ficher_order_id, token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/orders/orders_details/${ficher_order_id}`,
  {
    headers : {
      Authorization  : 'bearer ' + token,
    },
  });  
  let data = res.data
  return data.length > 0  ? data :[]
}

// get restaurant by 
export let getRestaurantByIdUsers = async (id_user, token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/by_user/${id_user}`,
  {
    headers : {
      Authorization  : 'bearer ' + token,
    },
  });  
  let data = res.data
  return data.length > 0 ? data : []
  
}

// Payment admin 
export let getPaymentByRestaurantId = async (id_res, token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/payment/admin/uniq/${id_res}`,
  {
    headers : {
      Authorization  : 'bearer ' + token,
    },
  });  
  let data = res.data
  return data.length > 0  ? data :[]
}


// get all payment
export let getAdminPayment = async (token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/payment/admin/all`,
  {
    headers : {
      Authorization  : 'bearer ' + token,
    },
  });  
  let data = res.data
  return data.length > 0  ? data :[]
}

// Search payment
export let searchPaymentId = async (value) => {
  let d = { 'payment_id': value }
  let res = await axios.post(`${urlFunction()}/restaurant/payment/admin/search`, d,
  );  
  let data = res.data
  return data.length > 0  ? data :[]
}



//  filter payment by interval
export let filterPayementByDateInterval = async (d, token) => {
  let res = await axios.post(`${urlFunction()}/restaurant/payment/admin/search/by_interval/`, d,
  {
    headers : {
      Authorization  : 'bearer ' + token,
    },
    }
  );  
  let data = res.data
  return data.length > 0  ? data :[]
}



// filter interest by interval
export let filterInterestByDateInterval = async (d, token) => {
  let res = await axios.post(`${urlFunction()}/insterest/search/by_interval/`, d,
  {
      headers : {
        Authorization  : 'bearer ' + token,
      },
    }
  );  
  let data = res.data
  return data.length > 0  ? data :[]
}

// Get Interest 
export let getInterestData = async () => {
  let res = await axios.get(`${urlFunction()}/interest/`,);  
  let data = res.data
  return data.length > 0  ? data :[]
}



