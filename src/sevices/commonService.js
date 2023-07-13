import config from "config";
import axios from "axios";
const baseUrl = `${config.Api}`;

 function onLogin(body) {
    const data=JSON.stringify(body);
   
    return  axios.get(baseUrl).then(res=>{
        if(res.data.email==data.email && res.data.password==data.password){
            return res
        }
    else{
        return "invalid";
    }}
            ).catch(err=>{console.log(err);});
}
function onRegister(body){
    const data=JSON.stringify(body);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept': "application/json", },
        body: JSON.stringify(body)
    };
    return  axios.post(baseUrl,data, requestOptions).then(res=>{return res}).catch(err=>{return err});
}
function onGet(){
    return  axios.get(baseUrl).then(res=>{
     return res;
    }).catch(err=>{
     return err;
    })
}


export default {onLogin,onRegister,onGet};