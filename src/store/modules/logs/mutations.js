export default {
  setLogsInfos: (state, logs) => {
    state.infos = logs
  },
  setDataTableItems: (state, logs) => {
    let items = []
    logs.forEach((item, index) => {
      const middleInfos = item.signature.filter((sign) => sign.position === 'middle')[0]
      const {toneText, sealText, kin} = middleInfos
      let obj = {
        name: item.name,
        middle: {
          toneText,
          sealText,
          kin,
        },
        id: item.signID
      }
      items[index] = obj
    })
    state.dataTableItems = items
  },
}
