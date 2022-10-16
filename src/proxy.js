export default function proxy(target,sourceKye,key) {

  Object.defineProperty(target,key,{
    get(){
      return target[sourceKye][key]
    },
 set(newV){
      // 例如 vm._data.t=新值
     target[sourceKye][key]=newV
 }

  })

}
