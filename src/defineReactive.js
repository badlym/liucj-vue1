import {observe} from './Observe.js';
import Dep from './dep.js';

export  function defineReactive(target,key,val) {
  const childOb = observe(val)
  const dep = new Dep()
  Object.defineProperty(target,key,{
    get(){
      if(Dep.target){
        dep.depend()
        if(childOb){
          childOb.dep.depend()
        }

      }
      console.log('getter key=',key)
      return val
    },
    set(newV){
  if(newV===val) return
      console.log('setter key =',newV);
      val=newV
      observe(val)
      dep.notify()
    }
  })
}
