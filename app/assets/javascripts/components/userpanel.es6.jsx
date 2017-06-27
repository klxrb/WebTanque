class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      register: false,
      footerText: ''
    }
    this.setUser = this.setUser.bind(this);
    this.switchRegisterUser = this.switchRegisterUser.bind(this);
    this.userPanel = this.userPanel.bind(this);
    this.headingText = this.headingText.bind(this);
  }

  setUser(username) {
    this.setState({username: username});
  }

  switchRegisterUser() {
    this.setState({register: !this.state.register});
  }

  registerUser(message) {
    this.setState({footerText: !this.state.register});
  }

  userPanel() {
    if (this.state.username === '') {
      if (this.state.register) {
        return <Register
                 registerUser={this.registerUser}
                 cancelRegisterUser={this.switchRegisterUser} />
      } else {
        return <Login
                 logInUser={this.setUser}
                 registerUser={this.switchRegisterUser} />;
      }
    } else {
      return <p>Not done logged in yet</p>;
    }
  }

  headingText() {
    if ( this.state.username !== "" ) {
      return this.state.username;
    } else if ( this.state.register ) {
      return "Register new user";
    } else {
      return "Log in";
    }
  }

  render() {
    return (
      <div className="col-sm-4">
        <div id="navbar" className="navbar-collapse collapse">
          <div className="panel panel-default">
            <div className="panel-heading"><h1 className="panel-title">{ this.headingText() }</h1></div>
            <div className="panel-body">
              { this.userPanel() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
