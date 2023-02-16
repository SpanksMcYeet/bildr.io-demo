import Canvas from './canvas.js'

const canvas = document.getElementById('canvas')
const c = new Canvas(canvas)

export let mouse = { 
  x: 0, 
  y: 0,
  left: false,
  right: false,
}
export let zoom = 0

export let keys = []

canvas.addEventListener('mousedown', e => {
  mouse.left = true
})
canvas.addEventListener('mouseup', e => {
  mouse.left = false
})
canvas.addEventListener('contextmenu', e => {
  e.preventDefault()
  mouse.right = true
})
canvas.addEventListener('mousemove', e => {
  mouse.x = e.clientX * window.devicePixelRatio
  mouse.y = e.clientY * window.devicePixelRatio
})
canvas.addEventListener('wheel', e => {
  e.preventDefault()
  zoom -= Math.sign(e.deltaY)
})
canvas.addEventListener('keydown', e => {
  /*let key = null
  if (e.key === ) {
    keys.push()
  } else {
    return
  }*/
})
canvas.addEventListener('keyup', e => {
  /*let key = null
  if (e.key === ) {
    keys.push()
  } else {
    return
  }*/
})
canvas.addEventListener('keypress', e => {
  /*let key = null
  if (e.key === ) {
    keys.push()
  }*/
})
