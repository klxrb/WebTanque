class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      usernameError: '',
      passwordError: '',
      emailError: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.setState({[event.target.name]: event.target.value}, function() {
      if (this.state.username === '' ) {
        this.setState({usernameError: 'Username cannot be empty'});
      } else {
        this.setState({usernameError: ''});
      }
      if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({passwordError: 'Passwords do not match'});
      } else if (this.state.password === '') {
        this.setState({passwordError: 'Password cannot be empty'});
      } else {
        this.setState({passwordError: ''});
      }
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.state.email === '' ) {
        this.setState({usernameError: 'Email cannot be empty'});
      } else if (re.test(this.state.email)) {
        this.setState({emailError: ''});
      } else {
        this.setState({emailError: 'Invalid email address'});
      }
    });
  }

  buttonDisabled() {
    return ! ( this.state.passwordError === '' && this.state.emailError === '' && this.state.emailError === '' );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.cancelRegisterUser();
    var self = this;
    $.ajax({
      type: "POST",
      url: "api/user/register",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        user: {
          username: $.trim(self.state.username),
          email: self.state.email,
          password: self.state.password,
          password_confirmation: self.state.passwordConfirmation
        }
      }),
      success: function(data) {
        alert("Success!");
      }.bind(self),
      error: function(xhr, status, err) {
        alert("Failed to log in");
        console.error(URL, status, err.toString());
      }
    });
  }

  render() {
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label className="control-label" htmlFor="username">Username <span className="text-danger">{this.state.usernameError}</span></label>
          <input className="form-control" id="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="email">Email <span className="text-danger">{this.state.emailError}</span></label>
          <input className="form-control" id="email" type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="password">Password <span className="text-danger">{this.state.passwordError}</span></label>
          <input className="form-control" id="password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="passwordConfirmation">Password (confirm)</label>
          <input className="form-control" id="password" type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.handleChange} />
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" id="registerUser" type="submit" disabled={this.buttonDisabled()}>Register</button>
          <button className="btn btn-warning" id="cancelRegistration" type="button" onClick={this.props.cancelRegisterUser}>Cancel</button>
        </div>
      </form>
    );
  }
}
