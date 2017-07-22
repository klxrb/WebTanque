class Arena extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      width: 1200,
      height: 700,
      ratio: this.props.arenaHeight / this.props.arenaWidth
    };
    this.matchData =  this.props.data;
    this.battle = this.battle.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  componentDidMount() {
    this.battle();
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions() {
    this.setState({
      width: this.bound.offsetWidth,
      height: this.state.ratio * this.bound.offsetWidth
    });
  }

  battle() {
    const node = this.node;
    var line = this.props.getFrame();
    svg = d3.select(node);
    shells = svg.selectAll("circle.shell").data(line["shells"]);

    var self = this;
    shells
      .attr("cx", function(d) { return self.state.width * d.x / self.props.arenaWidth; })
      .attr("cy", function(d) { return d.y * self.state.height / self.props.arenaHeight; });

    shells.enter()
      .append("circle")
      .classed("shell", true)
      .attr("r", 2)
      .attr("fill", "black")
      .attr("cx", function(d) { return self.state.width * d.x / self.props.arenaWidth; })
      .attr("cy", function(d) { return d.y * self.state.height / self.props.arenaHeight; });

    shells.exit().remove();


    setTimeout(this.battle, 50);
  }

  render() {
    return (
      <div ref={input => this.bound = input}>
        <svg ref={ node => this.node = node }
          width={this.state.width} height={this.state.height} style={{"backgroundColor": "#cccccc"}}>
        </svg>
      </div>);
  }
}
