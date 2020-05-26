import { db } from '../plugins/firebaseStore';

const logsRef = db.collection('relationships_logs').doc('logs')

export function getLogs() {
  return new Promise((resolve, reject) => {
    logsRef.get().then((docSnapshot) => {
      if(docSnapshot.exists) {
        let logs = docSnapshot.data()
        resolve(logs)
      }
    }).catch((err) => reject(err))
  })
}

export function createLogs(params) {
  const data = params
  return new Promise((resolve, reject) => {
    logsRef.set({data}).then(() => {
      console.log('CREATED LOGS SUCCESS')
    }).catch((err) => reject(err))
  })
}

export function updateLogs(params) {
  const { updateID , updateUser, name } = params
  getLogs().then(({ data }) => {
    const temp = data.slice()
    data.forEach((log, index) => {
      if (log.signID === updateID && log.user === updateUser) {
        temp[index].name = name
      }
    })
    const newData = temp
    return new Promise((resolve, reject) => {
      logsRef.set({ data: newData }).then(() => {
        console.log('UPDATED LOGS SUCCESS')
      }).catch((err) => reject(err))
    })
  })
}

export function deleteLogs(params) {
  const { removeID, updateUser } = params
  getLogs().then(({data}) => {
    const temp = data.slice()
    data.forEach((log, index) => {
      if (log.signID === removeID && log.user === updateUser) {
        temp.splice(index, 1)
      }
    })
    const newData = temp
    return new Promise((resolve, reject) => {
      logsRef.set({ data: newData }).then(() => {
        console.log('DELETED LOGS SUCCESS')
      }).catch((err) => reject(err))
    })
  })
}

export default {
  getLogs,
  createLogs,
  deleteLogs,
  updateLogs,
}
