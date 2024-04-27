
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase yapılandırma detayları
const firebaseConfig = {
  apiKey: "AIzaSyCF_GiJ2hT5u4v_Gi5DxWFURoun9iA28-M",
  authDomain: "onionchat-7f127.firebaseapp.com",
  projectId: "onionchat-7f127",
  storageBucket: "onionchat-7f127.appspot.com",
  messagingSenderId: "309019941005",
  appId: "1:309019941005:web:9921ea9f25efdad6f7eac4"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };
