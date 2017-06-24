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
    this.props.logInUser(this.state.username, this.state.password);
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
        <button className="btn btn-primary" id="logIn" type="submit">Log in</button>
      </form>
    );
  }
}
