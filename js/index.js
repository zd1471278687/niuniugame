const context = canvas.getContext('2d') // 创建一个 2d context

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.width =  canvas.width / 3
    this.restart()
  }

  restart() {
    const width = canvas.width / 3
    const obj = {
      x: 0,
      y: 100,
      color: ''
    }
    let arr = []
    for (let i = 0; i < 9; i++) {
      let obj1 = JSON.parse(JSON.stringify(obj))
      let numX = (i % 3) === 0 ? 2 :( i % 3 - 1)
      let numY = parseInt(i / 3)
      obj1.x = numX * this.width
      obj1.y = (numY * 200) + 100
      obj1.color = '#' + i + i + i + i + i + i
      arr.push(obj1)
    }
    // setInterval(() => {
    //   this.clearRect(arr)
      arr = arr.map(i => {
        i.y -= 1
        return i
      })
      this.drawRect(arr)
    // }, 16)
    
  }

  clearRect (arr) {
    arr.forEach(i => {
      context.clearRect(i.x, i.y, this.width, 200)
    })
  }

  drawRect(arr) {
    arr.forEach(i => {
      context.fillStyle = i.color // 矩形颜色
      context.fillRect(i.x, i.y, this.width, 200)
    })
  }

}