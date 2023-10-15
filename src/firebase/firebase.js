import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, getDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, initializeAuth, getReactNativePersistence, getAdditionalUserInfo } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthState } from "../store/_redux/auth/service";
// const firebaseConfig = {
//     apiKey: "AIzaSyCFYCFxUpGy_S5zr-GNPakdHsZMBO2r3rw",
//     authDomain: "coordgraph.firebaseapp.com",
//     projectId: "coordgraph",
//     storageBucket: "coordgraph.appspot.com",
//     messagingSenderId: "587138215449",
//     appId: "1:587138215449:web:18d1694fe31d4490248488"
// };

const firebaseConfig = {
    apiKey: "AIzaSyBRP6o5tyU3Qw0UoP6kVhKgk0bRL9cDbtU",
    authDomain: "coordgraph2.firebaseapp.com",
    projectId: "coordgraph2",
    storageBucket: "coordgraph2.appspot.com",
    messagingSenderId: "513325619720",
    appId: "1:513325619720:web:cf960d02315f6172b50fbd"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// const auth = getAuth();
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const Get = async (table) => {
    try {
        const querySnapshot = await getDocs(collection(db, table));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                uniqid: doc.id,
            })
        });
        return data;
    } catch (error) {
        return [];
    }

}
export const Add = async (table, data) => {
    try {
        const docRef = await addDoc(collection(db, table), data);
        return docRef.id;
    } catch (e) {
        return false;
    }
}

export const Update = async (table, data) => {
    try {
        const docRef = doc(db, table, data.id);
        const updateBlog = await updateDoc(docRef, data.data);
        return true
    } catch (error) {
        return false;
    }
}

export const Delete = async (table, id) => {
    try {
        const result = await deleteDoc(doc(db, table, id));
        return true;
    } catch (error) {
        return false
    }
}

// const authh = getAuth();
export const UserLogin = async (data) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
        return user
    } catch (error) {
        return null
    }
}

export const UserRegister = async (data) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        return userCredential.user.uid
    } catch (error) {
        return null
    }
}
export const GetUser = async (id) => {
    try {
        const postCollection = collection(db, 'user');
        const q = query(postCollection, where('userId', '==', id));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                uniqid: doc.id,
            })
        });
        return data[0];
    } catch (error) {
        return null
    }
}
export const Upload = async (data) => {
    try {
        const authStore = getAuthState();
        const storageRef = ref(storage, `${authStore?.user?.uid}/posts/${data?.id}`);
        const result = await uploadBytes(storageRef, data.file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        return false
    }

}

export const GetUserPosts = async (id) => {
    try {
        const postCollection = collection(db, 'post');
        const q = query(postCollection, where('userId', '==', id));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({
                ...doc.data(),
                uniqid: doc.id,
            })
        });
        return data;
    } catch (error) {
        return null
    }
}
export const getImageLink = async (imageName) => {
    try {
        const storageRef = ref(storage, imageName);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL
    } catch (error) {
        return null
    }
}
export const uploadProfilePhoto = async (data) => {
    try {
        const authStore = getAuthState();
        const storageRef = ref(storage, `${authStore?.user?.uid}/profilePhoto`);
        const result = await uploadBytes(storageRef, data);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        return false
    }
}

export const deleteFile = async (id) => {
    try {
        const authStore = getAuthState();
        const storageRef = ref(storage, `${authStore?.user?.uid}/posts/${id}`);
        const result = await deleteObject(storageRef);
        return true;
    } catch (error) {
        return false
    }
}
export default app;