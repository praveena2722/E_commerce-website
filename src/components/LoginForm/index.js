import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', error: '', submitError: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    console.log(history)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFail = errorMsg => {
    this.setState({error: errorMsg, submitError: true})
  }

  onSubmittingForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.onSubmitFail(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, error, submitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    console.log(username, password)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="website_login_img_lg"
        />
        <div className="input_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="website_logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
            alt="website login"
            className="website_login_img_sm"
          />
          <form className="form_container" onSubmit={this.onSubmittingForm}>
            <label htmlFor="username" className="label_text">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="user_input"
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
            <label htmlFor="password" className="label_text">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="user_input"
              onChange={this.onChangePassword}
              placeholder="Password"
            />
            <button type="submit" className="login_btn">
              Login
            </button>

            {submitError && <p className="error_msg">*{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
