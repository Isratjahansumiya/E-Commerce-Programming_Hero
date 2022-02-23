import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import * as firebase from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import "firebase/auth";
import firebaseConfig from './firebase.config';

const Login = () => {
  const [newPerson,setNewPerson] =useState(false);
  const [person,setPerson]=useState({
    isSignIn: false,
    name: '',
    email: '',
    password:'',
    photo:'',
    error: '',
    success:false
  })
  firebase.initializeApp(firebaseConfig);


  const [loggedInUser,setLoggedInUser]=useContext(UserContext);
  const [ghUser,setGhUser]=useState({})
  const location=useLocation();
  const navigate=useNavigate();
  let {from}=location.state || {from: {pathname:"/"}}

  const handleGoogleSignIn=()=>{
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //const credential = GoogleAuthProvider.credentialFromResult(result);

    //const token = credential.accessToken;
    // The signed-in user info.
    //const user = result.user;
    const {displayName,email,photoURL}=result.user;

    const signedInUser={
      isSignIn: true,
      name: displayName,
      email: email,
      photo: photoURL,

    }
    setPerson(signedInUser);
    setLoggedInUser(signedInUser)
    })
    .catch((error) => {
      console.log(error);
      const errorMessage = error.message;
      console.log(errorMessage);
  });
  }

  const handleSignOut =()=>{
    const auth = getAuth();
    return signOut(auth).then((res) => {
      const signOutUser={
        isSignIn:false,
        name:'',
        email:'',
        photoURL:''
      }
      setPerson(signOutUser);
      setLoggedInUser(signOutUser);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }
  const updateUserName=(name) =>{
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      // Profile updated!
      //console.log('Profile name updated')
    }).catch((error) => {
      // An error occurred
      //console.log(error)
    });

  }

  const handleSubmit=(event)=>{
    if(!newPerson && person.email && person.password){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, person.email, person.password)
        .then((userCredential) => {
          const newPersonInfo={...person};
          newPersonInfo.error='';
          newPersonInfo.success=true;
          setPerson(newPersonInfo);
          setLoggedInUser(newPersonInfo);
          navigate(from,{replace:true});

        })
        .catch((error) => {
          const newPersonInfo={...person};
          newPersonInfo.error=error.message;
          newPersonInfo.success=false;
          setPerson(newPersonInfo);
        });
      }
      event.preventDefault();

    }
    if(newPerson && person.email && person.password){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, person.email, person.password)
        .then((userCredential) => {
        // Signed in
        const newPersonInfo={...person};
        newPersonInfo.error='';
        newPersonInfo.success=true;
        setPerson(newPersonInfo);
        updateUserName(person.name);
                // ...
        })
        .catch((error) => {
          const newPersonInfo={...person};
          newPersonInfo.error=error.message;
          newPersonInfo.success=false;
          setPerson(newPersonInfo);
          });
    }

  const handleBlur=(event)=>{
    let isFieldValid=true;
    if(event.target.name==="email"){
      isFieldValid=/\S+@\S+\.\S+/.test(event.target.value);

    }
    if(event.target.name==="password"){
      const isPasswordValid=event.target.value.length > 6;
      const passwordHasNumber=/\d{1}/.test(event.target.value);
      isFieldValid=isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newPersonInfo={...person};
      newPersonInfo[event.target.name]=event.target.value;
      setPerson(newPersonInfo);
    }
  }

  return (
    <div style={{textAlign:'center'}}>
      {
        person.isSignIn? <button onClick={handleSignOut}> Sign Out with google</button> :
        <button onClick={handleGoogleSignIn}>Sign in with google</button>

      }
      <br />
      <h1>Sign in or Sign up with email!!</h1>
      <input type="checkbox" onChange={()=>setNewPerson (!newPerson)} name="newPerson" id="" />
      <label htmlFor="newPerson">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {newPerson && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" required/>}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder='Your email address' required />
        <br />
        <input type="password" name="password" autoComplete='on' onBlur={handleBlur} placeholder='Your password' required />
        <br />
        <input type="submit" value={newPerson? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{color:"red"}}>{person.error}</p>
      {
        person.success &&  <p style={{color:"green"}}>User {newPerson? 'Created' : 'Sign In'} Succesfully</p>
      }


    </div>
  );
};

export default Login;