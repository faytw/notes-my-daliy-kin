import {
  toneTextTable,
  sealTextTable,
  sealColorTable,
  monthTable,
  yearTable,
  guideSealGroups,
  positionTextTable,
  timeZones,
} from './config'

const setGuideIcon = (sealGroups, icon, tone) => {
  const group = sealGroups[icon]
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

export const setDate = (input = new Date()) => {
  const d = input
  const year = d.getFullYear()
  const month = d.getMonth()
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

export const calulateDateMainIcon = (dateInput) => {
  const { year, month, date} = dateInput
  const n1 = Object.keys(yearTable).filter((key) => yearTable[key].includes(year))[0]
  const n2 = monthTable[month+1]
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
    top: toneTextTable[toneTableIndex],
    left: toneTextTable[toneTableIndex],
    middle: toneTextTable[toneTableIndex],
    right: toneTextTable[toneTableIndex],
    bottom: toneTextTable[(14 - tempTone - 1)],
  }
  const data = {
    tones,
    mainTone: tempTone
  }
  return data
}

const getSeals = (mainKin, mainTone)  => {
  let temp = []
  for (let i=0; i<13; i++) {
    let icon = mainKin - 20 * i
    temp.push(icon)
    if (icon < 20) break
  }
  const mainNum = temp[temp.length - 1]
  const guideSealNum = setGuideIcon(guideSealGroups, mainNum, mainTone)

  const middleN = mainNum
  const rightN = 19 - mainNum
  const leftN = mainNum < 10 ? mainNum + 10 : mainNum - 10
  const bottomN = 21 - mainNum > 20 ? 21 - mainNum - 20 : 21 - mainNum
  const topN = Number(guideSealNum)
  
  const data = {
    top: {
      sealText: sealTextTable[topN],
      color: Object.keys(sealColorTable).filter((key) => sealColorTable[key].includes(topN))[0],
      kin: setSealKins('top', topN, mainTone)
    },
    left: {
      sealText: sealTextTable[leftN],
      color: Object.keys(sealColorTable).filter((key) => sealColorTable[key].includes(leftN))[0],
      kin: setSealKins('left', leftN, mainTone)
    },
    middle: {
      sealText: sealTextTable[mainNum], 
      color: Object.keys(sealColorTable).filter((key) => sealColorTable[key].includes(middleN))[0],
      kin: mainKin
    },
    right: {
      sealText: sealTextTable[rightN], 
      color: Object.keys(sealColorTable).filter((key) => sealColorTable[key].includes(rightN))[0],
      kin: setSealKins('right', rightN, mainTone)
    },
    bottom: {
      sealText: sealTextTable[bottomN], 
      color: Object.keys(sealColorTable).filter((key) => sealColorTable[key].includes(bottomN))[0],
      kin: setSealKins('bottom', bottomN, mainTone)
    },
  }
  return data
}

const setSealKins = (position, positionN, mainTone) => {
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

export const setInitData = () => {
  const date = setDate()
  const mainKin = calulateDateMainIcon(date)
  const { tones, mainTone } = getTones(mainKin)
  const seals = getSeals(mainKin , mainTone)
  let data = {}
  Object.keys(seals).forEach((iKey, index) => {
    if(iKey === Object.keys(tones)[index]) {
      seals[iKey] = {
        ... seals[iKey],
        tone: iKey === 'bottom' ? 14 - mainTone : mainTone,
        toneText: tones[iKey],
        position: [iKey][0],
        positionText: positionTextTable[[iKey][0]],
        positionTimeZone: timeZones[[iKey][0]]
      }
    }
    data = seals
  })
  const  { bottom, top, left, right, middle } = data
  return [ top, left, middle, right, bottom ]
}

export const handleNotebookData = (displayKin) => {
  const { mainTone } = getTones(displayKin)
  const { middle } = getSeals(displayKin , mainTone)
  const data = { ...middle,
    tone: mainTone,
    toneText: toneTextTable[mainTone - 1]
  }
  return data
}

export default {
  setDate,
  calulateDateMainIcon,
  setInitData,
  handleNotebookData,
}
