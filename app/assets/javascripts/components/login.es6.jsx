class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var self = this;
    $.ajax({
      type: "POST",
      url: "api/user/authenticate",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        user: {
          username: $.trim(self.state.username)
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
          <label className="control-label" htmlFor="username">Username</label>
          <input className="form-control" id="username" type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="password">Password</label>
          <input className="form-control" id="password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" id="logIn" type="submit">Log in</button>
          <button className="btn btn-info" id="register" type="button" onClick={this.props.registerUser}>Register</button>
        </div>
      </form>
    );
  }
}
