class Arena extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 1200,
      height: 700,
      ratio: this.props.arenaHeight / this.props.arenaWidth
    };
    this.battle = this.battle.bind(this);
    this.battle_update = this.battle_update.bind(this);
    this.battle_enter = this.battle_enter.bind(this);
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
      height: this.state.ratio * this.bound.offsetWidth,
      scale: this.bound.offsetWidth / this.props.arenaWidth
    });
  }

  battle_update(item, x_offset=0, y_offset=0) {
    var self = this;
    return item
             .attr("x", function(d) { return d.x - x_offset; })
             .attr("y", function(d) { return d.y - y_offset; });
  }

  battle_enter(item, label, image, x_offset=0, y_offset=0) {
    var self = this;
    return item.enter()
             .append('svg:image')
             .classed(label, true)
             .attr('xlink:href', image)
             .attr('x', function(d) { return d.x - x_offset; })
             .attr('y', function(d) { return d.y - y_offset; });
  }

  battle() {
    const node = this.node;
    var line = this.props.getFrame();
    svg = d3.select(node);
    shells = svg.selectAll("circle.shell").data(line["shells"]);
    bodies = svg.selectAll("image.body").data(line["bots"]);
    turrets = svg.selectAll("image.turret").data(line["bots"]);
    radars = svg.selectAll("image.radar").data(line["bots"]);
    names = svg.selectAll("text").data(line["bots"]);
    explosions = svg.selectAll("image.explosion").data(line["explosions"]);

    var self = this;
    shells
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("transform", function(d) { return "scale("+self.state.scale+")" });
    explosions
      .attr("xlink:href", function(d) { return "../images/explosions/explosion2-"+d.explosion+".png"; })
      .attr("transform", function(d) { return "scale("+self.state.scale+")" });

    shells.enter()
      .append("circle")
      .classed("shell", true)
      .attr("r", 2)
      .attr("fill", "black")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("transform", function(d) { return "scale("+self.state.scale+")" });
    explosions.enter()
      .append("svg:image")
      .classed("explosion", true)
      .attr("x", function(d) { return d.x - 64; })
      .attr("y", function(d) { return d.y - 64; })
      .attr("transform", function(d) { return "scale("+self.state.scale+")" });

    shells.exit().remove();
    explosions.exit().remove();

    this.battle_update(bodies, 18, 18)
      .attr("transform", function(d) { return "scale("+self.state.scale+")rotate("+(180 - d.heading)+","+d.x+","+d.y+")"});
    this.battle_update(turrets, 10, 30)
      .attr("transform", function(d) { return "scale("+self.state.scale+")rotate("+(180 - d.turret)+","+d.x+","+d.y+")"});
    this.battle_update(radars, 11, 8)
      .attr("transform", function(d) { return "scale("+self.state.scale+")rotate("+(180 - d.radar)+","+d.x+","+d.y+")"});
    this.battle_enter(bodies, "body", "../images/body.png", 18, 18);
    this.battle_enter(turrets, "turret", "../images/turret.png", 10, 30);
    this.battle_enter(radars, "radar", "../images/radar.png", 11, 8);
    bodies.exit().remove();
    turrets.exit().remove();
    radars.exit().remove();

    names
      .text(function(d) { return d.name; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return 40 + d.y; })
      .attr("transform", function(d) { return "scale("+self.state.scale+")" });
    names
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px")
      .attr("fill", "red");
    names.exit().remove();

    setTimeout(this.battle, 5);
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
