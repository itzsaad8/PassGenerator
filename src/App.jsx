import React, { useEffect,useCallback,useState,useRef } from 'react'
import './App.css'
import Swal from 'sweetalert2'

const App = () => {
  const [length, setLength] = useState(10)
      const [numAllowed, setNumAllowed] = useState(false)
      const [charAllowed, setcharAllowed] = useState(false)
      const [password, setPassword] = useState("")
      const passwordRef = useRef(null)

//usecallback
  const passwordgenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"

    for (let i = 0; i <= length; i++) {

      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])



  // useref hook
  const passwordCopytoCb = useCallback (()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    Swal.fire({
      icon: 'success',
      title:'password copied to clipboard'})
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Your password has been copied to your clipboard',
    //   showConfirmButton: false,
    //   timer: 1500
    // })
  },[password])


//useeffect
 useEffect(()=>{
  passwordgenerator()
 },[length,passwordgenerator,charAllowed,numAllowed])
  return (
      

  <>

    <div className="container custom-cont d-flex align-items-center justify-content-center align-items-center bg-secondary ">
      <div className="1st d-flex align-items-center flex-column bg-dark py-4 px-4 text-white rounded ">
      <h1 className='text-center mb-5'>Password generator</h1>
      <div className="2nd d-flex flex-row align-items-center justify-content-center input-lg ">
        <input
        className='input-lg  border-none outline-none py-1 px-4 c_inp'
          type="text"
          value={password}
          placeholder='password'
          readOnly
          ref={passwordRef}

        />
        <button
        onClick={passwordCopytoCb}
        className='btn btn-primary rounded-0  c_btn'>copy</button>
      </div>
      
        <div className="d-flex flex-row justify-content-between mt-3">
          
            <input
              className="range-input"
              type="range"
              min="10"
              max="90"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="range-label mx-1">Length :{length}</label>
          
          <div className=" ms-3 me-3">
            <label className="mb-0">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                checked={numAllowed}
                onChange={() =>{ setNumAllowed((prev) => !prev);}}
              />
              Number
            </label>
          </div>
          
            <label className="mb-0">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={(e) => setcharAllowed(e.target.checked)}
              />
              Character
            </label>
          
        </div>
      
      </div>
    </div>
  
  
  
  
  </>
  )
}

export default App



