
import axios from 'axios';
import { urlFunction } from '../utils/urls';


export let userContext = async () => {
  try {
    const user = await localStorage.getItem('user');
    if (user !== null) {
      return user;
    } else {
      return null;
    }
  } catch (error) { }
};


// Get user by id 
export let getUserById = async (id_user, token) => {
  let res = await axios.get(`${urlFunction()}/user/${id_user}`,
    {
      headers: {
        Authorization: 'bearer ' + token,
      },
    });
  let data = res.data
  return data != null ? data : []
}


// Get user pagination
export let getUserAll = async (limit, offset) => {
  let d = {
    limit, offset
  }
  let res = await axios.post(`${urlFunction()}/users/pagination`,d);  
  // let res = await axios.post(`http://3.17.175.93:3001/api/v2/admin/users/pagination`, d)
  let data = res.data
  return data != null ? data : []
}



// Get user pagination
export let getUserOwnerRestaurant = async (token) => {
  // let d = {
  //   limit, offset
  // } 
  let res = await axios.get(`${urlFunction()}/restaurant/all/owner`,
    {
      headers: {
        Authorization: 'bearer ' + token,
      },
    }
  );
  let data = res.data
  return data != null ? data : []
}



//Get user count
export let getUserCount = async (token) => {
  let res = await axios.get(`${urlFunction()}/users/count/data`, {
    headers: {
      Authorization: 'bearer ' + token,
    },
  });
  let data = res.data
  return data != null ? data : []
}

// Get bank info by id user 
export let getBankInfoByUserId = async (id_user, token) => {
  let res = await axios.get(`${urlFunction()}/restaurant/user/bank_info/${id_user}`,
    {
      headers: {
        Authorization: 'bearer ' + token,
      },
    });
  let data = res.data
  return data != null ? data : []
}