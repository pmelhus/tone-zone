import "./SignIn.css"
import {useState} from "react"
import LoginModal from "./LoginModal"

const SignIn = () => {
    const [signInToggle, setSignInToggle] = useState(false)
  return(
    <div className='sign-in-container'>
      <button onClick={()=>setSignInToggle(!signInToggle)}className='sign-in' type="button">Sign In</button>
      <LoginModal visible={signInToggle} setVisible={setSignInToggle} />
    </div>
  )
}


export default SignIn
