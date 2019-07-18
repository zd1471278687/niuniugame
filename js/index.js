const context = canvas.getContext('2d') // 创建一个 2d context

export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    // 初始游戏数据
    this.game = {
      width: canvas.width / 3,
      height: 200,
      hammer: {
        x: 10,
        y: 50,
        color: 'pink',
        width: 20,
        height: 50
      }
    }

    this.restart()
  }

  /**
   * 开始
   */
  restart() {
    const obj = {
      x: 0,
      y: 100,
      color: '',
      width: this.game.width,
      height: this.game.height
    }
    let arr = []
    for (let i = 0; i < 9; i++) {
      let obj1 = JSON.parse(JSON.stringify(obj))
      let numX = (i % 3) === 0 ? 2 :( i % 3 - 1)
      let numY = parseInt(i / 3)
      obj1.x = numX * this.game.width
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
    this.drawRectItem(this.game.hammer)
    this.hammer(arr)
  }

  /**
   * 锤子移动
   * @param arr // 画布背景测试数据
   */
  hammer (arr) {
    canvas.addEventListener('touchstart', e => {
      wx.vibrateShort({
        success: res => {
          console.log(res)
        }
      })
      this.clearRectItem(this.game.hammer)
      this.drawRect(arr)
      let touches = e.touches[0]
      this.game.hammer.x = touches.clientX - this.game.hammer.width / 2
      this.game.hammer.y = touches.clientY - this.game.hammer.height / 2
      this.drawRectItem(this.game.hammer)
    })
    canvas.addEventListener('touchmove', e => {
      this.clearRectItem(this.game.hammer)
      this.drawRect(arr)
      let touches = e.touches[0]
      this.game.hammer.x = touches.clientX - this.game.hammer.width / 2
      this.game.hammer.y = touches.clientY - this.game.hammer.height / 2
      this.drawRectItem(this.game.hammer)
    })
  }
  
  /**
   * 删除锤子前一帧
   * @param i 
   */
  clearRectItem (i) {
    context.clearRect(i.x, i.y, i.width, i.height)
  }
  
  /**
   * 删除画布背景前一帧
   * @param arr // 画布背景测试数据
   */
  clearRect (arr) {
    arr.forEach(i => {
      context.clearRect(i.x, i.y, i.width, i.height)
    })
  }

  /**
   * 画一个新锤子
   * @param i // 锤子数据
   */
  drawRectItem (i) {
    context.fillStyle = i.color // 矩形颜色
    context.fillRect(i.x, i.y, i.width, i.height)
  }

  /**
   * 绘制新背景
   * @param arr // 画布背景测试数据
   */
  drawRect(arr) {
    arr.forEach(i => {
      this.drawRectItem(i)
    })
  }

}