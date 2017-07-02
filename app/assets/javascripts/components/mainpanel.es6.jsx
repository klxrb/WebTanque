class MainPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      arenaWidth: 800,
      arenaHeight: 200,
      shells: [
        {
          x: Math.random() * 500,
          y: Math.random() * 500
        }
      ],
      width: 500
    };
    this.getFrame = this.getFrame.bind(this);
  }

  moveDot(dot) {
    return {
      x: Math.min(Math.max(dot.x + Math.random() * 21 - 10, 0), this.state.arenaWidth),
      y: Math.min(Math.max(dot.y + Math.random() * 21 - 10, 0), this.state.arenaHeight)
    };
  }

  getFrame() {
    if (this.state) {
      var newDot = this.moveDot(this.state.shells[0]);
      this.setState({shells: [ newDot ]});
      return {
        shells: this.state.shells
      };
    } else {
      return {
        shells: []
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
            data={this.state.data}
            size={this.state.size}
            getFrame={this.getFrame} />
        </div>
      </div>
    );
  };
}
