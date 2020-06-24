import { db } from '../plugins/firebaseStore';

export function getNotes(params) {
  const { 
    kin,
   } = params
  const notesRef = db.collection('diaries').doc(`${kin}`)
  return new Promise((resolve, reject) => {
    notesRef.get().then((docSnapshot) => {
      if(docSnapshot.exists) {
        let notes = docSnapshot.data()
        resolve(notes)
      }else{
        resolve([])
      }
    }).catch((err) => reject(err))
  })
}

export function createNotes(params) {
  const { 
    kin,
    data
  } = params
  const { 
    note_id: noteId,
   } = data
  const notesRef = db.collection('diaries').doc(`${kin}`)
  return new Promise((resolve, reject) => {
    notesRef.set({ [noteId]: data }, { merge: true }).then(() => {
      resolve('created success')
    }).catch((err) => reject(err))
  })
}

export default {
  getNotes,
  createNotes,
}
