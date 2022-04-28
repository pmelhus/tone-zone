import {useState} from "react"
import "./LoginModal.css"

const LoginModal = ({visible, setVisible}) => {


  const backgroundClick = () => {

    setVisible(!visible)

  }
  if (!visible) return null
return (
  <div className='background-modal' onClick={(e) => {
    backgroundClick()
    }}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-content'>
          <div className ='fang-buttons'>
            <div className ='fb-button'></div>
              <button type='button'>Continue with Facebook</button>
            <div className ='google-button'></div>
              <button>Continue with Google</button>
            <div className ='apple-button'></div>
              <button>Continue with Apple</button>
          <div className='auth-separator'>
              
            <span className='or-span'>or</span>

          </div>
          </div>
        </div>
      </div>
  </div>
)
}

export default LoginModal
