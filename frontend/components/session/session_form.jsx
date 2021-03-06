import React from 'react';
import { _nullUser } from '../../util/null_objects';


const _demoUser = {
  full_name: "Demo User",
  email: "fluffy_Kittens_187@kitties.com",
  password: "password123"
};

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = _nullUser;
  }

  componentWillUnmount() {
    this.props.clearSessionErrors();
    if(this.demoAnimation) clearInterval(this.demoAnimation);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(this.props.closeModal);
  }

  handleDemoSubmit(e) {
    e.target.disabled = true;
    this.setState(_nullUser, () => {

      let nameInput = document.querySelector(".session-name");
      let nameArr = _demoUser.full_name.split("").reverse();
      let emailArr = _demoUser.email.split("").reverse();
      let passwordArr = _demoUser.password.split("").reverse();

      this.demoAnimation = setInterval(() => {
        if(nameInput && nameArr.length > 0) {
          this.setState({ full_name: this.state.full_name + nameArr.pop()});
        } else if (emailArr.length > 0) {
          this.setState({ email: this.state.email + emailArr.pop()});
        } else if (passwordArr.length > 0) {
          this.setState({ password: this.state.password + passwordArr.pop()});
        } else {
          clearInterval(this.demoAnimation);
          this.props.demoLogin(_demoUser).then(this.props.closeModal);
        }
      }, 80);
    });
  }

  handleChange(input, e) {
    this.setState({ [input]: e.target.value});
  }

  render() {
    let nameInput, formHeader, formFooter;

    if (this.props.formType === "Login") {
      nameInput = "";
      formHeader = "Login to Your Instatute Account!";
      formFooter = "Already have an account?";
    } else {
      nameInput = (
        <div className="modal-content-text-input">
          <i className="fas fa-user fa-lg"></i>
          <input
          type="text"
          className="session-name"
          value={this.state.full_name}
          placeholder="Full Name"
          onChange={(e) => this.handleChange("full_name", e)}
          />
        </div>
    );
      formHeader = "Sign up and Start Learning!";
      formFooter = "Don't have an account?";
    }

    const showErrors = !(this.props.errors.length) ? ("") : (
      <ul className="modal-session-errors-list">
        {this.props.errors.map((error, id) =>
          <li key={id}>{error}</li>)}
      </ul>
    );

    return(
      <div className="modal-content">
        <div className="modal-header">
          <a onClick={this.props.closeModal}>&times;</a>
          <p>{formHeader}</p>
        </div>

        {showErrors}

        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div>{nameInput}</div>
          <div className="modal-content-text-input">
            <i className="far fa-envelope fa-lg"></i>
            <input
              type="text"
              className="session-email"
              value={this.state.email}
              placeholder="E-mail"
              onChange={(e) => this.handleChange("email", e)}
            />
          </div>
          <div className="modal-content-text-input">
            <i className="fas fa-lock fa-lg"></i>
            <input
              type="password"
              className="session-password"
              value={this.state.password}
              placeholder="Password"
              onChange={(e) => this.handleChange("password", e)}
            />
          </div>
          <input className="btn btn-primary session"
            type="submit"
            value={this.props.formType}
          />
        </form>
          <input className="btn demo-submit"
            type="button"
            value="Demo User"
            onClick={(e) => this.handleDemoSubmit(e)}
          />
        <div className="modal-footer">
          <p>{formFooter} {this.props.otherForm}</p>
        </div>
      </div>
    );
  }
}

export default SessionForm;
