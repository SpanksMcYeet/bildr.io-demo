const Canvas = class {
  constructor(canvas) {
    this.canvas = canvas
    this.width = 300
    this.height = 150
    this.scale = 1
    
    this.ctx = canvas.getContext('2d')
    this.ctx.lineJoin = 'round'
  }
  setSize(width, height, scale) {
    if (this.width !== width || this.height !== height || this.scale !== scale) {
      this.width = width
      this.height = height
      this.scale = scale
      
      let cWidth = Math.ceil(width * scale)
      let cHeight = Math.ceil(height * scale)
      this.canvas.width = cWidth
      this.canvas.height = cHeight
      this.canvas.style.width = `${cWidth / scale}px`
      this.canvas.style.height = `${cHeight / scale}px`

      this.ctx.lineJoin = 'round'
    }
    return width / height
  }
  setViewport(x, y, width, height) {
    let sx = this.width * this.scale / width
    let sy = this.height * this.scale / height
    this.ctx.setTransform(sx, 0, 0, sy, -x * sx, -y * sy)
  }
  circle(x, y, radius, alpha, fill = null, stroke = null, border = 0) {
    this.ctx.save()
    this.ctx.globalAlpha = alpha
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, Math.PI * 2)
    if (stroke != null) {
      this.ctx.lineWidth = border
      this.ctx.strokeStyle = stroke
      this.ctx.stroke()
    }
    if (fill != null) {
      this.ctx.fillStyle = fill
      this.ctx.fill()
    }
    this.ctx.restore()
  }
  rect(x, y, width, height, angle, fill = null, stroke = null, border = 0) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.translate(x, y)
    this.ctx.rotate(angle)
    this.ctx.rect(0, 0, width, height)
    if (stroke != null) {
      this.ctx.lineWidth = border
      this.ctx.strokeStyle = stroke
      this.ctx.stroke()
    }
    if (fill != null) {
      this.ctx.fillStyle = fill
      this.ctx.fill()
    }
    this.ctx.restore()
  }
  box(x, y, width, height, angle, fill = null, stroke = null, border = 0, alpha = 1) {
    this.ctx.save()
    this.ctx.globalAlpha = alpha
    this.ctx.beginPath()
    this.ctx.translate(x, y)
    this.ctx.rotate(angle)
    this.ctx.rect(width * -0.5, height * -0.5, width, height)
    if (stroke != null) {
      this.ctx.lineWidth = border
      this.ctx.strokeStyle = stroke
      this.ctx.stroke()
    }
    if (fill != null) {
      this.ctx.fillStyle = fill
      this.ctx.fill()
    }
    this.ctx.restore()
  }
  gradientBox(x, y, width, height, angle, grad, colorStops, stroke = null, border = 0, alpha = 1) {
    this.ctx.save()
    
    this.ctx.globalAlpha = alpha
    this.ctx.beginPath()
    this.ctx.translate(x, y)
    this.ctx.rotate(angle)
    this.ctx.rect(width * -0.5, height * -0.5, width, height)
    if (stroke != null) {
      this.ctx.lineWidth = border
      this.ctx.strokeStyle = stroke
      this.ctx.stroke()
    }
    if (grad != null) {
      let gradient = this.ctx.createLinearGradient(grad.x1, grad.y1, grad.x2, grad.y2)
      let stop = 0
      for (let color of colorStops) {
        gradient.addColorStop(stop / (colorStops.length - 1), color)
        stop++
      }
      this.ctx.fillStyle = gradient
      this.ctx.fill()
    }
    this.ctx.restore()
  }
  polygon(sides, size, x, y, fill = null, stroke = null, border = 0) {
    this.ctx.beginPath()
    this.ctx.moveTo (x + size, y + size * 0)
    for (let i = 1; i <= sides; i++)
      this.ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / sides), y + size * Math.sin(i * 2 * Math.PI / sides))
    this.ctx.closePath() 
    if (stroke != null) {
      this.ctx.lineWidth = border
      this.ctx.strokeStyle = stroke
      this.ctx.stroke()
    }
    if (fill != null) {
      this.ctx.fillStyle = fill
      this.ctx.fill()
    }
  }
  text(x, y, size, text, lineWidth = null, alpha = 1, fill = '#f6f6f6', stroke = '#3a3a3a') {
    this.ctx.save()
    this.ctx.globalAlpha = alpha
    this.ctx.font = `bold ${size}px Ubuntu`
    this.ctx.textAlign = 'center'
    this.ctx.lineWidth = lineWidth == null ? size * 0.35 : lineWidth
    this.ctx.strokeStyle = stroke
    this.ctx.fillStyle = fill
    this.ctx.beginPath()
    this.ctx.strokeText(text, x, y)
    this.ctx.fillText(text, x, y)
    this.ctx.restore()
  }
  drawImg(src, x, y, width, height) {
    this.ctx.drawImage(src, x, y, width, height)
  }
  lineGrad(grad, colorStops, rect) {
    let gradient = this.ctx.createLinearGradient(grad.x1, grad.y1, grad.x2, grad.y2)
    let stop = 0
    for (let color of colorStops) {
      gradient.addColorStop(stop / (colorStops.length - 1), color)
      stop++
    }
    this.ctx.fillStyle = gradient
    this.ctx.rect(rect.x, rect.y, rect.width, rect.height, rect.angle, rect.fill)
    this.ctx.fill()
  }
  radGrad(grad, colorStops, rect) {
    let gradient = this.ctx.createRadialGradient(grad.x1, grad.y1, grad.r1, grad.x2, grad.y2, grad.r2)
    let stop = 0
    for (let color of colorStops) {
      gradient.addColorStop(stop / (colorStops.length - 1), color)
      stop++
    }
    this.ctx.fillStyle = gradient
    //this.ctx.rect(rect.x, rect.y, rect.width, rect.height, rect.angle)
    this.ctx.fill()
  }
  gradientText(x, y, size, text, alpha = 1, grad, colorStops, lineWidth) {
    this.ctx.save()
    this.ctx.globalAlpha = alpha
    this.ctx.font = `bold ${size}px Ubuntu`
    this.ctx.textAlign = 'center'
    this.ctx.lineWidth = size * lineWidth
    let gradient = this.ctx.createLinearGradient(grad.x1, grad.y1, grad.x2, grad.y2)
    let stop = 0
    for (let color of colorStops) {
      gradient.addColorStop(stop / (colorStops.length - 1), color)
      stop++
    }
    this.ctx.fillStyle = gradient
    this.ctx.strokeStyle = gradient
    this.ctx.beginPath()
    this.ctx.fillText(text, x, y)
    this.ctx.strokeText(text, x, y)
    this.ctx.restore()
  }
  createPath(x, y, width, height, pathTo, opacity, fill = null, stroke = null, border = 0) {
    this.ctx.save()
    this.ctx.globalAlpha = opacity
    let path = new Path2D(pathTo)
    if (typeof pathTo === 'object') {
      let paths = Object.values(pathTo)
      let origin = new Path2D(pathTo[0])
      for (let path of paths.splice(1, paths.length))
        origin.addPath(new Path2D(path))
      path = origin
    }
    //path.moveTo(x, y)
    this.ctx.translate(x, y)
    this.ctx.scale(width / 12800, height / -12800)
    this.ctx.translate(0, -12800)

    if (stroke != null) {
      this.ctx.lineWidth = border
      this.ctx.strokeStyle = stroke
      this.ctx.stroke(path)
    }
    if (fill != null) {
      this.ctx.fillStyle = fill
      this.ctx.fill(path)
    }
    this.ctx.restore()
  }
}
  
export default Canvas
