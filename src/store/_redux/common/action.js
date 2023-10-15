import * as requestFromServer from "./crud";
import {Slice, callTypes} from "./slice";
const {actions} = Slice;

export const GetAll=()=>dispatch=> {
    dispatch(actions.startCall({ callType: callTypes.list }));
    return   requestFromServer
    .GetAll()
    .then(response=> {  
      if(response.data.success){
        return response.data.success;
      }
      else{
        return null;
      }
    })
}
export const Delete=(data)=>dispatch=>{
    dispatch(actions.startCall({ callType: callTypes.list }));
    return   requestFromServer
    .Delete(data)
    .then(response=> {  
      if(response.data.success){
        return response.data.succes;
      }
      else{
        return null;
      }
    })
}

export const Update=(data)=>dispatch=>{
    dispatch(actions.startCall({ callType: callTypes.list }));
    return   requestFromServer
    .Update(data)
    .then(response=> {  
      if(response.data.success){
        return response.data;
      }
      else{
        return null;
      }
    })
}

export const Add=(data)=>dispatch=>{
  dispatch(actions.startCall({ callType: callTypes.list }));
  return   requestFromServer
  .Add(data)
  .then(response=> {  
    if(response.data.success){
      return response.data;
    }
    else{
      return null;
    }
  })
}
