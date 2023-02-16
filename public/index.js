import Canvas from './canvas.js'
import * as utils from './utils.js'
import { mouse, zoom, keys } from './events.js'
import GameFeed from './gamefeed.js'

// Apply the canvas
const canvas = document.getElementById('canvas')
const c = new Canvas(canvas)

const Colors = utils.colors
/*
    let renderEntity = (cx, cy, facing, source, size = 50) => {
    let borderSize = 12
    if (source.type === 'tower')
      c.polygon(6, size + 5 + (size * 0.2), cx, cy, colors.pureBlack, mixColors(colors.pureBlack, colors.pureBlack, 0.65), 12)
    console.log(source)
    for (let barrel of source.barrels) {
      let [length, width, aspect, ox, oy, oAngle, _delay] = barrel.position
      let angle = oAngle / 180 * Math.PI + facing
      let { x, y } = rotatePoint((ox + length * 0.5) * 0.1 * size, oy * 0.1 * size, angle)
      if (aspect !== 1) {
        c.trapezoid(cx + x, cy + y, length * 0.05 * size, width * 0.05 * size, angle, aspect, colors.gray, mixColors(colors.gray, colors.black, 0.65), borderSize)
      } else {
        c.box(cx + x, cy + y, length * 0.1 * size, width * 0.1 * size, angle, colors.gray, mixColors(colors.gray, colors.black, 0.65), borderSize)
      }
    }
    if (source.entityType.type === 'tower') {
      c.circle(cx, cy, size, colors.yellow, mixColors(colors.yellow, colors.black, 0.65), 12)
    } else if (source.turret) {
      c.circle(cx, cy, size, colors.gray, mixColors(colors.gray, colors.black, 0.65), 12)
    } else if (source.name === 'Rock') {
      c.polygon(9, size, cx, cy, colors.gray, mixColors(colors.gray, colors.black, 0.65), 12)
    } else {
      c.circle(cx, cy, size, colors.blue, mixColors(colors.blue, colors.black, 0.65), 12)
    }
    if (source.healer)
      c.healPlus(cx, cy, size * 0.65, colors.red, mixColors(colors.red, colors.black, 0.65), 12, 1)
  }
    */
let pos = { x: 0, y: 0 }
let last = { x: 0, y: 0 }
const Client = {
  refresh() {
    let diff = { x: 0, y: 0 }
    diff.x = mouse.x - last.x
    diff.y = mouse.y - last.y
    
    if (mouse.left) {
      pos.x += diff.x
      pos.y += diff.y
    }
    last.x = mouse.x
    last.y = mouse.y
  },
  setBackground(width, height, x, y, zoom) {
    let w = width * 0.5
    let h = height * 0.5
    c.box(w, h, 3000, 3000, 0, utils.mixColors(Colors.lgray, Colors.pureBlack, 0.1))
    c.box(w, h, 3000, 3000, 0, Colors.lgray)
    
    for (let i = -12; i <= 12; i++) {
      c.box(w, i * (60 - (zoom * 2)) + h + y, 3000, 2, 0, utils.mixColors(Colors.lgray, Colors.pureBlack, 0.1))
      c.box(i * (60 - (zoom * 2)) + w + x, h, 2, 3000, 0, utils.mixColors(Colors.lgray, Colors.pureBlack, 0.1))
    }
  }
}
let time = 0
let gameLoop = newTime => {
  let timeElapsed = newTime - time
  time = newTime
  
  let ratio = c.setSize(window.innerWidth, window.innerHeight, window.devicePixelRatio)
  let width = 1920
  let height = 1080
    if (width < height * ratio) {
    height = width / ratio
  } else {
    width = height * ratio
  }
  
  Client.setBackground(width, height, pos.x, pos.y, zoom)
  Client.refresh()

  
  /*
  // Update entity facing
    for (let e of entities) {
      if (e.globalId === player.globalId) {
        let fovWidth = width * e.entityType.attributes.fov
        let fovHeight = height * e.entityType.attributes.fov
        c.setViewport(e.position.x - fovWidth * 0.5, e.position.y - fovHeight * 0.5, fovWidth, fovHeight)
        let rMousePos = {
          x: e.position.x - fovWidth * 0.5 + mousePos.x / (window.innerWidth * window.devicePixelRatio) * fovWidth,
          y: e.position.y - fovHeight * 0.5 + mousePos.y / (window.innerHeight * window.devicePixelRatio) * fovHeight,
        }
        relay({
          packet: 'facing',
          data: e.facing = Math.atan2(rMousePos.y - e.position.y, rMousePos.x - e.position.x)
        })
      }
    }
    c.box(0, 0, 12000, 12000, 0, mixColors(colors.lgray, colors.pureBlack, 0.1))
    c.box(0, 0, 6000, 6000, 0, colors.lgray)
  
    for (let i = -100; i <= 100; i++) {
      c.box(0, i * 60, 12000, 2, 0, mixColors(colors.lgray, colors.pureBlack, 0.1))
      c.box(i * 60, 0, 2, 12000, 0, mixColors(colors.lgray, colors.pureBlack, 0.1))
    }
    for (let e of entities) {
      renderEntity(e.position.x, e.position.y, e.facing, e.entityType, e.size)
    }
    let lMousePos = {
      x: mousePos.x / (window.innerWidth * window.devicePixelRatio) * width * 2,
      y: mousePos.y / (window.innerHeight * window.devicePixelRatio) * height * 2,
    }
    */
  requestAnimationFrame(gameLoop)
}
requestAnimationFrame(gameLoop)
