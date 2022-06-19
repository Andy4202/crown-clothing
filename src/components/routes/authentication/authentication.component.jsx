
import {signInWithGooglePopup, signInWithGoogleRedirect,createUserDocumentFromAuth} from '../../../utils/firebase/firebase.utils';
import SignUpForm from '../../sign-up-form/sign-up-form.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

const Authentication = () => {

    // useEffect(async () => {
    //     const response = await getRedirectResult(auth);
    //     if (response) {
    //         const userDocRef = await createUserDocumentFromAuth(response.user);
    //     }
    // },[]);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
        createUserDocumentFromAuth(user);
        // console.log(response);
    }

    // const logGoogleRedirectUser = async () => {
    //     const {user} = await signInWithGoogleRedirect();
    //     console.log({user})
    // }


    return (
        <div className='authentication-container'>
            {/* <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
            <SignInForm />
        </div>
    )
}



export default Authentication