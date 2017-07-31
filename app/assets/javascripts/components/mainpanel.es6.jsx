class MainPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      arenaWidth: 1200,
      arenaHeight: 700,
      battle: [],
      step: 0
    };
    this.getFrame = this.getFrame.bind(this);
  }

  componentDidMount() {
    var self = this;
    $.ajax({
      type: "GET",
      url: "api/battle/random",
      contentType: "application/json",
      success: function(data) {
        self.setState({ i: 0 });
        self.setState({ battle: data });
      }.bind(self),
      error: function(xhr, status, err) {
        console.error(URL, status, err.toString());
        alert("Failed to load battle");
      }
    });
  }

  getFrame() {
    if (this.state && this.state.battle.length > 0) {
      i = this.state.step;
      if (i >= this.state.battle.length) {
        i = this.state.battle.length;
      }
      this.setState({step: i+1});
      return this.state.battle[i];
    } else {
      return {
        shells: [],
        bots: [],
        explosions: []
      };
    }
  }

  render() {
    var self = this;
    return (
      <div className="panel panel-default">
        <div className="panel-heading"><h1 className="panel-title">Arena</h1></div>
        <div ref={input => {this.arenaPanel = input}} className="panel-body">
          <Arena
            arenaWidth={this.state.arenaWidth}
            arenaHeight={this.state.arenaHeight}
            size={this.state.size}
            getFrame={this.getFrame} />
        </div>
      </div>
    );
  };
}
