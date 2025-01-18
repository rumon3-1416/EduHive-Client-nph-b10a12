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
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const googleProvider = new GoogleAuthProvider();

export const ContextValue = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');

  const axiosPublic = useAxiosPublic();

  // Toast notify
  const notify = (action, message) => {
    toast[action](message, {
      position: 'top-center',
      autoClose: 5000,
      pauseOnHover: false,
    });
  };

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
        // Get Token
        axiosPublic
          .post('/jwt', { email: currentUser.email })
          .then(res => localStorage.setItem('access_token', res.data.token))
          .then(() => {
            // Save User & Get Role
            axiosPublic
              .post('/users', {
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              })
              .then(res => {
                setRole(res.data.role);
                setLoading(false);
              });
          });
      } else {
        // Clear Token
        localStorage.removeItem('access_token');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  return {
    user,
    role,
    notify,
    loading,
    setLoading,
    googleSignIn,
    emailPassSignUp,
    emailPassSignIn,
    updateUserProfile,
    signOutUser,
  };
};
