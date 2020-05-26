import { db } from '../plugins/firebaseStore';

const notesRef = db.collection('diaries')

export function getNotes(params) {
  const { sealText } = params
  return new Promise((resolve, reject) => {
    notesRef.doc(`${sealText}`).get().then((docSnapshot) => {
      if(docSnapshot.exists) {
        let notes = docSnapshot.data()
        resolve(notes)
      }
    }).catch((err) => reject(err))
  })
}

export function createNotes(params) {
  const { doc, ...updated } = params
  const data = []
  data.push(updated)
  return new Promise((resolve, reject) => {
    notesRef.doc(`${doc}`).set({ data }).then(() => {
      console.log(`UPDATED ${doc} NOTES SUCCESS`)
    }).catch((err) => reject(err))
  })
}

export default {
  getNotes,
  createNotes,
}
