import {defineReactive} from './defineReactive.js';
import proArgument from './proArgument.js';
import Dep from './dep.js';
export default  function Observe(value) {
  Object.defineProperty(value,'__ob__',{
    value:this,
    enumerable:false,
    writable:true,
    configurable:true
    //防止递归的时候处理__ob__,从而进行无限递归
//在页面显示的时候不想显示__ob__
  })
  value.__ob__.dep=new Dep()
  if(Array.isArray(value)){
    // 数组响应式  将 obj的原型对象指向我们新建的对象 并对新建的对象进行拦截
   proArgument(value)
  }else{
    // 走对象形式
    console.log(value,'value对象');
    this.walk(value)
  }
}
Observe.prototype.walk=function(obj) {
  for (const key in obj) {
    defineReactive(obj,key,obj[key])
  }
}

// 遍历数组的每个元素，为每个元素设置响应式
//{
// arr:[
//   {item:'value'}
//
// ]
// }

// 其实这里是为了处理元素为对象的情况，以达到 this.arr[idx].xx 是响应式的目的
Observe.prototype.observeArray=function(arr) {
  for (const arrElement of arr) {
    observe(arrElement)
  }
}
export function observe(value) {
  if(typeof value !=='object') return
  // 说明value 已经是响应式对象了 不需要在做响应式处理
  if(value.__ob__) return  value.__ob__
  const ob=new Observe(value)
  return ob
}
