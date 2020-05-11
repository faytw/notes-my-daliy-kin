import { db } from '../plugins/firebaseStore';

const notesRef = db.collection('users').doc('records').collection('diaries')

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
  const { doc, ...updateData } = params
  const data = [ updateData ]
  return new Promise((resolve, reject) => {
    notesRef.doc(`${doc}`).set({data}).then((docSnapshot) => {
      console.log(docSnapshot)
      
    }).catch((err) => reject(err))
  })
}

export default {
  getNotes,
  createNotes,
}
