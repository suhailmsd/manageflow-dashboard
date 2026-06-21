import uiValidation from "../features/shared/components/loginAndSignup/uiValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { useContext, useState } from "react";
import { FirebaseContext, UserContext } from "../contexts";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { useToast } from "../hooks";
import { useNavigate } from "react-router-dom";

export const signInUser = () => {
  const auth = getAuth();

  const [loginError, setLoginError] = useState(null);
  const [loginData, setLoginData] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  async function login(form) {
    const email = form.email;
    const password = form.password;

    const { isEmailInvalid, isPasswordInvalid } = uiValidation(form);

    if (isEmailInvalid || isPasswordInvalid) {
      setLoginError("typo error, login again");
      return;
    }

    try {
      setLoginError(null);
      setIsLoginLoading(true);

      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (userCredential) {
        setLoginData(userCredential.user);
      }
    } catch (error) {
      setLoginError("Invalid Login or Password");
      if (error.code == "auth/too-many-requests") {
        setLoginError("Too many request try again later");
      }
    } finally {
      setIsLoginLoading(false);
    }
  }

  return {
    loginData,
    loginError,
    isLoginLoading,
    setLoginError,
    login,
  };
};

export const signUpUser = () => {
  const { setSkipAuthListenerRef } = useContext(UserContext);
  const { showToast } = useToast();

  const { firebase } = useContext(FirebaseContext);
  const auth = getAuth();
  const fireStoreDB = getFirestore(firebase);

  const [signupSucessMessage, setSignupSucessMessage] = useState(null);
  const [loadingSignupRequest, setLoadingSignupRequest] = useState(false);
  const [signupError, setSignupError] = useState(null);

  async function signup(form) {
    const { email, password, ...filterForm } = form;
    delete filterForm.confirmPassword;

    try {
      setSkipAuthListenerRef(true);
      setLoadingSignupRequest(true);
      setSignupSucessMessage(null);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      showToast("success", "User Registered successfully...");

      const tofireStoreUserCollection = {
        ...filterForm,
        userId: userCredential.user.uid,
        status: "pending",
        role: "employee",
        firstName: "",
        lastName: "",
        phone: "",
        profileUrl: `https://ui-avatars.com/api/?name=${filterForm.username}&background=0D8ABC&color=fff`,
        joinedAt: new Date().toISOString(),
      };

      const collectionRef = collection(fireStoreDB, "Users");
      await addDoc(collectionRef, tofireStoreUserCollection);

      const logsCollectionRef = collection(fireStoreDB, "logs");
      await addDoc(logsCollectionRef, {
        action: "USER_CREATED",
        targetUserId: userCredential.user.uid,
        targetUsername: filterForm.username,
        timestamp: serverTimestamp(),
      });

      await signOut(auth);

      setSkipAuthListenerRef(false);
      setSignupSucessMessage("User register successful");

      window.location.href = "/";
    } catch (error) {
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setSignupError("Email already exists");
        return;
      }
    } finally {
      setLoadingSignupRequest(false);
    }
  }

  return {
    signupSucessMessage,
    loadingSignupRequest,
    signupError,
    signup,
    setSignupSucessMessage,
    setSignupError,
  };
};

export const signOutUser = () => {
  const [signoutLoading, setSignoutLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  async function signout() {
    setSignoutLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await signOut(auth);
      navigate("/");
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setSignoutLoading(false);
    }
  }

  return {
    signoutLoading,
    signout,
  };
};
