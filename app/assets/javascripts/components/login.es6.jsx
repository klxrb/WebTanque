class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }


  render() {
    var csrf = document.getElementsByName('csrf-token')[0].getAttribute('content');
    return (
      <form method="post" action="/authenticate">
        <input type="hidden" name="authenticity_token" value={ csrf } />
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
