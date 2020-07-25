const VALUES = [// values total is '52'
  62, 167, 12, 117, 222, 67, 172, 17, 122, 227, 72, 177, 22, 127,
  232, 77, 182, 27, 132, 237, 82, 187, 32, 137, 242, 87,
  192, 37, 142, 247, 92, 197, 42, 147, 252, 97, 202, 47, 152,
  257, 102, 207, 52, 157, 2, 107, 212, 57, 162, 7, 112, 217
]

const setGroups = (input = new Date()) => {
  // Each group has '52 years', first year must be '1858'
  const yearNow = input.getFullYear()
  const afterCount = 52 - Math.round((yearNow - 1858) % 52)
  const afterYears = yearNow + afterCount
  const length = Math.round((yearNow - 1858) % 52) > 0 
  ? Math.round((yearNow - 1858) / 52) + 1 
  : Math.round((yearNow - 1858) / 52)
  // set groups of data
  const data = []
  const groups = []
  for (let i = 1858; i < afterYears; i++) {
    data.push(i)
  }
  for (let i = 0; i < length; i++) {
    let start = i * 52
    let end = (i + 1) * 52
    groups[i] = data.slice(start, end)
  }
  return groups
}

export const getYearValue = (input = '1858') => {
  const groups = setGroups()
  let groupIndex = null
  groups.forEach((group) => {
    groupIndex = group.indexOf(input)
  })
  if (groupIndex < 0) {
    const errMessage = `input value "${input}" is out of years setting.`
    throw new Error(errMessage)
  } else {
    return VALUES[groupIndex]
  }
}

export default getYearValue
