class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
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
    if (this.state.username) {
      return <p>Not done logged in yet</p>;
    } else {
      if (this.state.register) {
        return <Register
                 registerUser={this.registerUser}
                 cancelRegisterUser={this.switchRegisterUser} />
      } else {
        return <Login
                 logInUser={this.setUser}
                 registerUser={this.switchRegisterUser} />;
      }
    }
  }

  headingText() {
    if ( this.state.username ) {
      return "Logged in: " + this.state.username;
    } else if ( this.state.register ) {
      return "Register new user";
    } else {
      return "Log in";
    }
  }

  footer() {
    if ( this.state.username ) {
      var csrf = document.getElementsByName('csrf-token')[0].getAttribute('content');
      return (
        <div className="panel-footer">
          <form method="post" action="logout">
            <input type="hidden" name="authenticity_token" value={ csrf } />
            <button className="btn btn-primary" id="logOut" type="submit">Log out</button>
          </form>
        </div>
      )
    } else {
      return null;
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
            { this.footer() }
          </div>
        </div>
      </div>
    );
  }
}
