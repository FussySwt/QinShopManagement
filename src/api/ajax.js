import axios from 'axios'

const axiosPost = function(url,params,callBack){
    axios.post(url, params)
    .then(res=>{
        callBack(res)
    })
    .catch(err=>{
        console.log(err)
        console.log('error');
      });
}

export default{
    axiosPost
}