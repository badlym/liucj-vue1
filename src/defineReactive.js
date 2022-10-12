
function defineReactive(target,key,val) {
  observer(val)
  Object.defineProperty(target,key,{
    get(){
      console.log('getter key=',key)
      return val
    },
    set(newV){
  if(newV===val) return
      console.log('setter key =',newV);
      val=newV
      observer(val)
    }
  })
}
function Observer(value) {
  if(Array.isArray(value)){
    // 数组响应式
  }else{
    // 走对象形式
    this.walk(value)
  }
}
Observer.prototype.walk=function(obj) {
  for (const key in obj) {
    defineReactive(obj,key,obj[key])
  }
}

function observer(value) {
  if(typeof value !=='object') return
  const ob=new Observer(value)
  return ob
}
function set(target,key,val) {

defineReactive(target,key,val)
}
/*
* 对数组响应性进行拦截
*
* */
const obj={
  // 原始值和对象的响应式原理
  t: 't value',
  t1: {
    tt1: 'tt1 value'
  },
  // 数组的响应式原理
  arr: [1, 2, 3],
  // 响应式更新
  counter: 0,
  // v-bind
  title: '看我',
  // v-model
  inputVal: 'test',
  isChecked: true,
  selectValue: 2
}
observer(obj)
set(obj,'t2','haha')


