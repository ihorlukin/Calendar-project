import { useState } from "react"
import { ButtonsWrapper, ButtonWrapper, EventTitle, FormPositionWrapper, FormWrapper } from "../../containers/StyledComponents"
import { styled } from "styled-components"
import axios from "axios"

const ChangeViewWrapper = styled.div`
  display: flex;
  gap: 10px;
`
const SpanWrapper = styled.span`
  cursor: pointer
`
export const LoginForm = ({ SetIsShowModal}) => {

const [view, setView] = useState("Sign in")
const [isLoading, setIsLoading] = useState(false)
const [userCredentials, setUserCredentials] = useState({
    email:"",
    password:"",
    username: "",
})
  const onChangeHandler = (e) => {
    setUserCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
    console.log(e.target.value)
  }

const cancelHandler = () => {
  SetIsShowModal(false)
  setUserCredentials({
    email:"",
    password:"",
    username: "",
  })
}
const viewChangeHandler = (viewType) => {
  setUserCredentials({
    email:"",
    password:"",
    username: "",
  })
  setView(viewType)
}

const loginHandler = async() => {
  try{
    setIsLoading(true)
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredentials)
    console.log(res)
  }catch(error){
    console.log(error.message)
  }finally{
    setIsLoading(false)
  }
}

const registerHandler = async () => {
  console.log("fetch")
  try{
    setIsLoading(true)
    const res = await axios.post("http://localhost:5000/api/auth/register", userCredentials)
    console.log(res)
  }catch(error){
    console.log(error.message)
  }finally{
    setIsLoading(false)
  }
}
// const submitHandler = (type) => {
//   // if(type === "login" && userCredentials.email && userCredentials.password ){
//   //   loginHandler()
//   // } 
//   if(type === "reqister" && userCredentials.email && userCredentials.password && userCredentials.username){
//     registerHandler()
//   } else {
//     return
//   }
// }

  return (
    <FormPositionWrapper onClick={() => cancelHandler()}>
            <FormWrapper onClick={e => e.stopPropagation()}>
            <h3>{view}</h3>
              {view === "Sign up" && 
                <EventTitle
                value={userCredentials.username}
                name="username"
                onChange={(e) => onChangeHandler(e)}
                placeholder="Username"
              />
              }
              <EventTitle
                value={userCredentials.email}
                type="email"
                name="email"
                onChange={e => onChangeHandler(e)}
                placeholder="Email"
              />
              <EventTitle
                value={userCredentials.password}
                name="password"
                onChange={e => onChangeHandler(e)}
                placeholder="Password"
              />
              <ButtonsWrapper>
          {view === "Sign in" ? (
            <>
              <ButtonWrapper disabled={isLoading} onClick={(e) => registerHandler("login")}>Sign in</ButtonWrapper>
              <ChangeViewWrapper>
              <span>Do not have an account?</span>
              <SpanWrapper onClick={() => viewChangeHandler("Sign up")}>Sign up</SpanWrapper>
              </ChangeViewWrapper>
            </>) : (
              <>
              <ButtonWrapper disabled={isLoading} onClick={() => registerHandler()}>Sign up</ButtonWrapper>
              <ChangeViewWrapper>
              <span>Already have an account?</span>
              <SpanWrapper onClick={() => viewChangeHandler("Sign in")}>Sign in</SpanWrapper>
              </ChangeViewWrapper>
              </>
            )} 
              </ButtonsWrapper>
            </FormWrapper>
          </FormPositionWrapper>
  )
}