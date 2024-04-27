import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCF_GiJ2hT5u4v_Gi5DxWFURoun9iA28-M",
    authDomain: "onionchat-7f127.firebaseapp.com",
    projectId: "onionchat-7f127",
    storageBucket: "onionchat-7f127.appspot.com",
    messagingSenderId: "309019941005",
    appId: "1:309019941005:web:9921ea9f25efdad6f7eac4"
  }).auth();

