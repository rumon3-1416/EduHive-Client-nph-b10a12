import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import auth from '../firebase/firebase.config';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const googleProvider = new GoogleAuthProvider();
const serverUrl = import.meta.env.VITE_ServerUrl;

export const ContextValue = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  // const [role, setRole] = useState('student');
  // const [role, setRole] = useState('teacher');
  const [role, setRole] = useState('admin');

  const axiosPublic = useAxiosPublic();

  // Create User
  const emailPassSignUp = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  // Sign In User
  const emailPassSignIn = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  // Google Sign
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  // Update user
  const updateUserProfile = (user = auth.currentUser, obj) => {
    setLoading(true);
    return updateProfile(user, obj);
  };
  // Sign Out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  // On Auth Changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser || null);

      if (currentUser) {
        axiosPublic
          .post('/jwt', { email: currentUser.email })
          .then(res => localStorage.setItem('access_token', res.data.token));

        axiosPublic.post('/users', {
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
        // .then(res => setRole(res.data.role));

        setLoading(false);
      } else {
        localStorage.removeItem('access_token');

        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  return {
    loading,
    setLoading,
    serverUrl,
    user,
    role,
    emailPassSignUp,
    googleSignIn,
    emailPassSignIn,
    updateUserProfile,
    signOutUser,
  };
};
