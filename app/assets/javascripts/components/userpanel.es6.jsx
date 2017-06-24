class UserPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.logInUser = this.logInUser.bind(this);
  }

  logInUser(username, password) {
    this.setState({username: username});
  }

  render() {
    return (
      <div className="col-sm-4">
        <div id="navbar" className="navbar-collapse collapse">
          <div className="panel panel-default">
            <div className="panel-heading">{ this.state.username === "" ? "Log in ..." : this.state.username }</div>
            <div className="panel-body">
              <Login logInUser={this.logInUser}/>
            </div>
            <div className="panel-footer">Log out button?</div>
          </div>
        </div>
      </div>
    );
  }
}
