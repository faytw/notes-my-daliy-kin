import {
  db
} from '../plugins/firebaseStore';

export function getUserInfos(params) {
  const { email, password } = params
  // TODO: encode password
  const userRef = db.collection("users").where("email", "==", email).where('password', '==', password)
  return new Promise((resolve, reject) => {
    userRef.get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data()
        const { 
          id, 
          ...infos
        } = data

        const result = {
          id, 
          infos
        }
        resolve(result)
      })
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      reject(error)
    })
  })
}

export function getUserInfosWithId(id) {
  
  // TODO: encode password
  const userRef = db.collection("users").where("id", "==", id)
  return new Promise((resolve, reject) => {
    userRef.get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data()
        const { email, name, id, roles } = data
        const result = {
          email,
          name,
          id,
          roles,
        }
        resolve(result)
      })
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
      reject(error)
    })
  })
}


export default {
  getUserInfos,
  getUserInfosWithId,
}
