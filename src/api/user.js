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
      console.log(querySnapshot)
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        const data = doc.data()
        const {id, name, roles} = data
        const result = {
          id,
          name,
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
}
