import react from 'react'
import LoginButtom from '../components/loginButtom'
import WithMessage from '../hocs/withMessage'

// Login page
const Login = (props) => {
    const {showMessage} = props

    return (
        <>
            <LoginButtom/>
        </>
    )
}

export default WithMessage(Login)