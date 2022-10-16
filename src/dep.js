export default  function Dep() {
  this.watchers=[]
}
// 实例化watcher时 会赋值 Dep.target=Watcher 实例
Dep.target=null
// Dep.target 是一个静态属性，值为 null 或者 watcher 实例
// 在实例化 Watcher 时进行赋值，待依赖收集完成后在 Watcher 中又重新赋值为 null
Dep.prototype.depend = function () {
  // 防止 Watcher 实例被重复收集
  if (this.watchers.includes(Dep.target)) return
  // 收集 Watcher 实例
  this.watchers.push(Dep.target)
}

Dep.prototype.notify=function() {
  for (const watcher of this.watchers) {
    watcher.update()
  }

}
