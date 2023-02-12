import { ref, uploadBytesResumable, getDownloadURL, storage } from '../../firebase/firebase'

const uploadProfile = (file, uid, path) => new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${path}/${uid}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        (snapshot) => { },
        (error) => reject(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
        }
    );
})

export default uploadProfile;