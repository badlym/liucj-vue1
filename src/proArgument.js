

const arrayProto=Array.prototype
//常常使用Object.create(null)，这样做的目的是防止Object构造函数的原型被修改时对新建的对象产生影响
const arrayMethods=Object.create(arrayProto)
const methodsToPatch=['push','pop','unshift','shift','splice','sort','revers']
/**
 * 拦截数组 数组响应式 将数组的原型对象指向一个新的对象 然后对这个新的对象进行响应式拦截 从而实现对数组的响应式
 */
methodsToPatch.forEach(method=>{
  Object.defineProperty(arrayMethods,method,{
    value:function(...args) {
      console.log(args,'args');
      console.log(this,'this');
      const ret=  arrayProto[method].apply(this,args)
      console.log('array reactive');
  // 实现数组响应式的相关能力
      let inserted=[]
      switch (method) {
        case 'push':
        case 'unshift':
          inserted=args
          break
        case 'splice':
          // this.arr.splice(idx, num, x, x, x)
            //返回添加的元素
          inserted=args[2]
          break
      }
      // 如果数组有新增的元素,则对新增的元素进行响应式处理
      inserted.length&&this.__ob__.observeArray(inserted)
      this.__ob__.dep.notify()

      return ret
    },//包含这个属性的数据值。默认值为undefined
    configurable:true,//:表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性，默认值为false。
    writable:true,//表示能否修改属性的值。默认值为false
    enumerable:false,//表示能否通过for in循环访问属性，默认值为false
  })

})

export default function proArgument (arr) {
  arr.__proto__=arrayMethods

}
