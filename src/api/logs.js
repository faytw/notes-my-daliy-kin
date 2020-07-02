import { db } from '../plugins/firebaseStore';

export function getLogs(params) {
  console.log(params)
  const { user } = params
  const logsRef = db.collection('relationships_logs').doc(user)
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
  const { user, signID } = params
  const logsRef = db.collection('relationships_logs').doc(user)
  return new Promise((resolve, reject) => {
    logsRef.set({ [signID]: params }, { merge: true })
    .then(() => {
      resolve('created success')
    })
    .catch((err) => reject(err))
  })
}

export default {
  getLogs,
  createLogs,
}
