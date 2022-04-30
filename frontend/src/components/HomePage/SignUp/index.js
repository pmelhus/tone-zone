import "./SignUp.css"
import {useState} from "react"
import SignUpModal from "./SignUpModal"

const SignUp = () => {
    const [signUpToggle, setSignUpToggle] = useState(false)
  return(
    <div className='sign-up-container'>
      <button onClick={()=>setSignUpToggle(!signUpToggle)}className='sign-up' type="button">Sign Up</button>
      <SignUpModal visible={signUpToggle} setVisible={setSignUpToggle} />
    </div>
  )
}


export default SignUp
