import {
  toneTable,
  iconTable,
  iconColorTable,
  monthTable,
  yearTable,
  guideIconGroups
} from './config'

const setGuideIcon = (iconGroups, icon, tone) => {
  const group = iconGroups[icon]
  let toneGroup = null
  if (tone % 5 === 1) {
    toneGroup = 0
  } else if (tone % 5 === 2) {
    toneGroup = 1
  } else if (tone % 5 === 3) {
    toneGroup = 2
  } else if (tone % 5 === 4) {
    toneGroup = 3
  } else if (tone % 5 === 0) {
    toneGroup = 4
  }
  return group[toneGroup]
}

const setDateNow = (input = new Date()) => {
  const d = input
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()

  const data = {
    year,
    month,
    date,
    hours,
    minutes
  }
  return data
}

const calulateDateMainIcon = (dateInput) => {
  const { year, month, date} = dateInput
  const n1 = Object.keys(yearTable).filter((key) => yearTable[key].includes(year))[0]
  const n2 = monthTable[month]
  const n3 = date

  let ans = 0
  let sum = 0
  if (n1 && n2 && n3) {
    sum = Number(n1) + Number(n2) + Number(n3)
    if (sum <= 260) {
      ans = sum
    } else {
      let temp = []
      for (let i=0; i<6; i++) {
        temp.push( sum - 260 * i)
        if (sum - 260 * i <= 260 ) break
      }
      ans = temp[temp.length - 1]
    }
  }
  return ans
}

const getTones = (input) => {
  let temp = []
  for (let i=0; i<20; i++) {
    let tone = input - 13 * i
    temp.push(tone)
    if (tone < 13) break
  }
  const tempTone = temp[temp.length - 1] === 0 ? 13 : temp[temp.length - 1]
  const toneTableIndex = tempTone - 1
  const tones = {
    top: toneTable[toneTableIndex],
    left: toneTable[toneTableIndex],
    middle: toneTable[toneTableIndex],
    right: toneTable[toneTableIndex],
    bottom: toneTable[(14 - tempTone - 1)],
  }
  const data = {
    tones,
    mainTone: tempTone
  }
  return data
}

const getIcons = (mainKin, mainTone)  => {
  let temp = []
  for (let i=0; i<13; i++) {
    let icon = mainKin - 20 * i
    temp.push(icon)
    if (icon < 20) break
  }
  const mainNum = temp[temp.length - 1]
  const guideIconNum = setGuideIcon(guideIconGroups, mainNum, mainTone)

  const middleN = mainNum
  const rightN = 19 - mainNum
  const leftN = mainNum < 10 ? mainNum + 10 : mainNum - 10
  const bottomN = 21 - mainNum > 20 ? 21 - mainNum - 20 : 21 - mainNum
  const topN = Number(guideIconNum)
  
  const data = {
    top: {
      iconText: iconTable[topN],
      color: Object.keys(iconColorTable).filter((key) => iconColorTable[key].includes(topN))[0],
      kin: setIconKins('top', topN, mainTone)
    },
    left: {
      iconText: iconTable[leftN],
      color: Object.keys(iconColorTable).filter((key) => iconColorTable[key].includes(leftN))[0],
      kin: setIconKins('left', leftN, mainTone)
    },
    middle: {
      iconText: iconTable[mainNum], 
      color: Object.keys(iconColorTable).filter((key) => iconColorTable[key].includes(middleN))[0],
      kin: mainKin
    },
    right: {
      iconText: iconTable[rightN], 
      color: Object.keys(iconColorTable).filter((key) => iconColorTable[key].includes(rightN))[0],
      kin: setIconKins('right', rightN, mainTone)
    },
    bottom: {
      iconText: iconTable[bottomN], 
      color: Object.keys(iconColorTable).filter((key) => iconColorTable[key].includes(bottomN))[0],
      kin: setIconKins('bottom', bottomN, mainTone)
    },
  }
  return data
}

const setIconKins = (position, positionN, mainTone) => {
  let temp = []
  let kin = null
  switch(position) {
    case 'bottom':
      for (let i=0; i<13; i++) {
        temp.push(20 * i + positionN)
      }
      kin = temp.filter(elm => (elm - (14 - mainTone)) % 13 === 0)[0]
      break
    default:
      for (let i=0; i<13; i++) {
        temp.push(20 * i + positionN)
      }
      kin = temp.filter(elm => (elm - mainTone) % 13 === 0)[0]
      break
  }
  return kin
}

const setInitData = () => {
  const mainKin = calulateDateMainIcon(dateNow)
  const { tones, mainTone } = getTones(mainKin)
  const icons = getIcons(mainKin , mainTone)
  let data = {}
  Object.keys(icons).forEach((iKey, index) => {
    if(iKey === Object.keys(tones)[index]) {
      icons[iKey] = {
        ... icons[iKey],
        tone: iKey === 'bottom' ? 14 - mainTone : mainTone,
        toneText: tones[iKey],
        position: [iKey][0]
      }
    }
    data = icons
  })
  return data
}

export const dateNow = setDateNow()
export const initData = setInitData()

export default {
  dateNow,
  initData  
}
