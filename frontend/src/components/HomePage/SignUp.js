import "./SignUp.css"
import {useState} from "react"
import LoginModal from "./LoginModal"

const SignUp = () => {
    const [signInToggle, setSignInToggle] = useState(false)
  return(
    <div className='sign-up-container'>
      <button onClick={()=>setSignInToggle(!signInToggle)}className='sign-in' type="button">Sign In</button>
      <LoginModal visible={signInToggle} setVisible={setSignInToggle} />
    </div>
  )
}


export default SignUp
