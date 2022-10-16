

/* 负责更新dom节点的方法*/
import Dep from './dep.js';

export default function Watcher(cb) {
  this._cb=cb
  //赋值 Dep.
Dep.target=this
  // 执行回调函数时,会有一些 this.xx的读取操作 从而触发getter进行依赖收集
  this._cb()
  //防止重复收集依赖
  Dep.target=null
}

Watcher.prototype.update=function() {
  //当响应式数据更新时,执行this._cd函数,更新Dom
this._cb()
}
