export const colors = {
  _: '#7adbbc',
  _: '#b9e87e',
  _: '#e7896d',
  _: '#fdf380',
  _: '#b58efd',
  _: '#ef99c3',
  _: '#e8ebf7',
  _: '#aa9f9e',
  white: '#ffffff',
  black: '#484848',
  blue: '#3ca4cb',
  green: '#8abc3f',
  red: '#e03e41',
  yellow: '#efc74b',
  purple: '#8d6adf',
  pink: '#cc669c',
  gray: '#a7a7af',
  _: '#726f6f',
  lgray: '#dbdbdb',
  pureBlack: '#000000',
}

export const mixColors = (hex1, hex2, weight2 = 0.5) => {
  if (weight2 <= 0) return hex1
  if (weight2 >= 1) return hex2
  let weight1 = 1 - weight2
  let int1 = parseInt(hex1.slice(1, 7), 16)
  let int2 = parseInt(hex2.slice(1, 7), 16)
  let int =
    (((int1 & 0xff0000) * weight1 + (int2 & 0xff0000) * weight2) & 0xff0000) |
    (((int1 & 0x00ff00) * weight1 + (int2 & 0x00ff00) * weight2) & 0x00ff00) |
    (((int1 & 0x0000ff) * weight1 + (int2 & 0x0000ff) * weight2) & 0x0000ff)
  return '#' + int.toString(16).padStart(6, '0')
}

export const inOrOut = (x, y, w, h, mPos) => {
  //c.rect(x, y, w, h, 0, null, colors.red)
  return mPos.x >= x && mPos.x < x + w && mPos.y >= y && mPos.y < y + h
}

export const random = (max, round) => round ? Math.floor(Math.random() * max) : Math.random() < max

export const getRandom = array => array[Math.floor(Math.random() * array.length)]

export const clipboardCopy = (popupElement, data) => {
    navigator.clipboard.writeText(data).then(() => {
        popup(popupElement)
    })
}

export const insert = (array, index, item) => [...array.slice(0, index), item, ...array.slice(index)]

export const popup = element => document.getElementById(element).classList.toggle("show")

export const sleep = time => new Promise(resolve => setTimeout(resolve, time))

export const hexToRgb = (hex, toArray) => {
    if (toArray) {
        return [(hex >> 16) & 0xFF, (hex >> 8) & 0xFF, hex & 0xFF]
    } else {
        return `rgb(${(hex >> 16) & 0xFF}, ${(hex >> 8) & 0xFF}, ${hex & 0xFF})`
    }
}

export const rgbToHex = rgb => rgb.reduce((a, b) => a + (b | 256).toString(16).slice(1), '#')

export const smoothStep = x => x > 1 ? 1 : x > 0 ? 3 * x * x - 2 * x * x * x : 0

export const clamp = (i, min, max) => Math.min(Math.max(i, min), max)
