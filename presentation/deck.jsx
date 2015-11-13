/*eslint-disable no-multiple-empty-lines*/
import React from "react/addons";

// victory components
import {VictoryPie} from "victory-pie";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Deck, CodePane, Heading, Image, Link, Slide, Text, Layout, List, ListItem, Fill, Appear
} from "spectacle/src/spectacle";

// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/bg/formidable/formidangles-dark.svg"),
  polygonsGray: require("../assets/img/bg/formidable/formidangles-gray.svg"),
  estonia: require("../assets/img/bg/slides/estonia.jpg")
};

// Preload all images
preloader(Object.keys(images).map((key) => images[key]));

// Components
// ----------
// Custom overrides for the deck
class CustomDeck extends Deck {
  _handleKeyPress(e) {
    // Call base method.
    super._handleKeyPress(e);

    // Add some extra key bindings for Satechi remote.
    /*globals window:false*/
    const event = window.event || e;

    const SATECHI_PREV_KEY = 38;
    if (event.keyCode === SATECHI_PREV_KEY) {
      this._prevSlide();
    }

    const SATECHI_NEXT_KEY = 40;
    if (event.keyCode === SATECHI_NEXT_KEY) {
      this._nextSlide();
    }
  }
}

// Non-bolded heading.
const getLonelyHeadingStyles = function () {
  /*eslint-disable no-invalid-this*/
  const styles = Heading.Mixin.getStyles.call(this);
  styles.fontWeight = "normal";
  return styles;
};

class LonelyHeading extends Heading {
  constructor(props) {
    super(props);
    this.getStyles = getLonelyHeadingStyles;
  }
}

LonelyHeading.defaultProps = {
  size: 4
};

LonelyHeading.Mixin = {
  getStyles: getLonelyHeadingStyles
};

// A meaningful "point" in text.
class Point extends React.Component {
  render() {
    return (
      <span style={{fontWeight: "bold"}}>
        {this.props.children}
      </span>
    );
  }
}

Point.propTypes = {
  children: React.PropTypes.node
};

// Blackbox for white over images
class BlackBox extends React.Component {
  render() {
    const Tag = this.props.tag;
    const styles = Object.assign({
      background: `rgba(${this.props.bgRgb.join(",")}, ${this.props.bgDarken})`,
      borderRadius: "0.2em",
      padding: "0.0em 0.2em",
      margin: "0"
    }, this.props.style);

    return (
      <Tag style={styles}>
        {this.props.children}
      </Tag>
    );
  }
}

BlackBox.defaultProps = {
  tag: "span",
  bgDarken: 0.75,
  bgRgb: [0, 0, 0],
  style: {}
};

BlackBox.propTypes = {
  bgDarken: React.PropTypes.number,
  bgRgb: React.PropTypes.array,
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  tag: React.PropTypes.string
};

// Links
// -----
const links = {
  /*eslint-disable max-len*/
  tcThanksgiving2014: "http://techcrunch.com/2014/12/02/walmart-com-reports-biggest-cyber-monday-in-history-mobile-traffic-at-70-over-the-holidays/",
  frMobileTraffic: "http://www.fierceretail.com/mobileretail/story/walmart-mobile-traffic-100/2015-05-20",
  wmFy2014: "http://cdn.corporate.walmart.com/66/e5/9ff9a87445949173fde56316ac5f/2014-annual-report.pdf"
  /*eslint-enable max-len*/
};


// Helpers
// -------
// A naive, indent preserving strip.
const strip = function (val) {
  // Find first line with text. Capture that indent level.
  let indent = null;

  return val.split("\n")
    .map((line) => {
      // Capture initial indent.
      if (indent === null && /^\s/.test(line)) {
        indent = /^ */.exec(line)[0];
      }

      // If no indent, ignore.
      if (indent === null) {
        return null;
      }

      return line
        .replace(new RegExp("^" + indent), "")
        .replace(/\s*$/, "");
    })
    .join("\n")
    .replace(/^\s*|\s$/, "");
};

// Convert note items to list.
const notes = function () {
  const args = [].slice.call(arguments);

  // HACKY: Raw HTML string insertion.
  return (
    "<ul style='font-size: 0.8em'>" +
      args.map((note) => `<li>${note}</li>`).join("") +
    "</ul>"
  );
};

// Presentation
// ------------
export default class extends React.Component {
  render() {
    return (
      <CustomDeck progress="bar" transition={["slide"]}>
        {/* ---------------------------------------------------------------
          * Title
          * --------------------------------------------------------------- */}
        <Slide id="title" bgImage={images.polygons}>
          <Text bold fit caps textColor="primary" textFont="primary">
            VictoryJS
          </Text>
          <Text bold fit caps textColor="primary" textFont="primary">
            Data Viz in React
          </Text>
          <div style={{display: "inline-block", marginTop: "2.5em"}}>
            <Text style={{display: "inline-block", fontSize: "2.5em"}}>
              <Link href="https://twitter.com/ryan_roemer"
                    textColor="lighterGray">
                @colinmegill
              </Link>
            </Text>
            <Text style={{display: "inline-block", margin: "0 0.35em"}}
                  textColor="darkerGray">
              |
            </Text>
            <Text style={{display: "inline-block", fontSize: "2.5em"}}>
              <Link href="http://surge2015.formidablelabs.com"
                    textColor="lighterGray">
                fowa2015.formidablelabs.com
              </Link>
            </Text>
          </div>
        </Slide>

        <Slide id="intro">
          <LonelyHeading size={4}>
            A <em>collection of composable react components</em> for building interactive data visualizations
          </LonelyHeading>
        </Slide>
        <Slide transition={["fade"]}>
          <Heading size={3}>
            Motivations
          </Heading>
          <List>
            <ListItem><Appear fid="1">We love data visualization</Appear></ListItem>
            <ListItem><Appear fid="2">We love <em>React</em></Appear></ListItem>
            <ListItem><Appear fid="3">We love great DevUX</Appear></ListItem>
          </List>
        </Slide>
        <Slide bgImage={"http://1.bp.blogspot.com/-AE5n71l7fYo/U_kgHH5-TkI/AAAAAAAA-hg/3a6FEXsJsRA/s1600/Breitling%2BNavitimer%2B01%2BLimited%2B3.jpg"} bgDarken={0.55}>
          <Heading bold fit caps textColor="white">
            Data visualization
          </Heading>
          <Heading bold fit caps textColor="white">
            Is both technical
          </Heading>
          <Heading bold fit caps textColor="white">
            And aesthetic
          </Heading>
        </Slide>
        <Slide bgImage={"http://the-diamond-studio.com/wp-content/uploads/2014/01/IMG_2981.jpg"} bgDarken={0.55}>
          <Heading bold fit textColor={"lightestGray"} >
            The medium matters
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor={"red"}>
            Data Visualization
          </Heading>
          <Heading size={4}>
            Bridge the divide between beginners and experts
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor={"red"}>
            React
          </Heading>
          <Heading size={4} bold >
            component lifecycle +
          </Heading>
          <Heading style={{marginTop: -25}} size={4}>
            data binding
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2} textColor={"red"}>
            DevUX
          </Heading>
          <Heading size={4} bold >
            Better tooling and infrastructure
          </Heading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Part 1: Bridging the gap between beginners and experts
          * what it means for you - drop in and fully customize
          * ---------------------------------------------------------------
          */}
        <Slide bgImage={images.polygons}>
          <LonelyHeading size={2} textColor="lightestGray">
            Bridging the gap between beginners and experts
          </LonelyHeading>
        </Slide>
        <Slide>
          <Heading size={3}>
            <i className="fa fa-flash"></i> Seconds to Drop In
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              $ npm install victory-pie
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}/>
          <CodePane
            lang="javascript"
            source={strip(`
              import {VictoryPie} from "victory-pie";
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}/>
          <CodePane
            lang="javascript"
            source={strip(`
              <VictoryPie/>
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}/>
        </Slide>
        <Slide>
          <Heading size={3}>
            defaultProps
          </Heading>
          <VictoryPie/>
        </Slide>
        <Slide>
          <Heading size={3}>
            Data
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              <VictoryPie data={[
                { x: "Cats", y: 400 },
                { x: "Dogs", y: 350 },
                { x: "Frogs", y: 25 },
                { x: "Turtles", y: 55 },
                { x: "Chimps", y: 5 }
                ]}/>
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            Data
          </Heading>
          <VictoryPie data={[
              { x: "Cats", y: 400 },
              { x: "Dogs", y: 350 },
              { x: "Frogs", y: 25 },
              { x: "Turtles", y: 55 },
              { x: "Chimps", y: 5 }
            ]}/>
        </Slide>
        <Slide>
          <Heading size={3}>
            innerRadius
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              <VictoryPie
                innerRadius={140}
                data={[
                  { x: "Cats", y: 400 },
                  { x: "Dogs", y: 350 },
                  { x: "Frogs", y: 25 },
                  { x: "Turtles", y: 55 },
                  { x: "Chimps", y: 5 }
                ]}/>
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            innerRadius
          </Heading>
          <VictoryPie
            innerRadius={140}
            data={[
              { x: "Cats", y: 400 },
              { x: "Dogs", y: 350 },
              { x: "Frogs", y: 25 },
              { x: "Turtles", y: 55 },
              { x: "Chimps", y: 5 }
            ]}/>
        </Slide>
        <Slide>
          <Heading size={3}>
            stroke & opacity
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              <VictoryPie
                innerRadius={140}
                style={{
                  data: {
                    stroke: "transparent",
                    opacity: 0.3
                  }
                }}
                data={[
                  { x: "Cats", y: 400 },
                  { x: "Dogs", y: 350 },
                  { x: "Frogs", y: 25 },
                  { x: "Turtles", y: 55 },
                  { x: "Chimps", y: 5 }
                ]}/>
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            stroke & opacity
          </Heading>
          <VictoryPie
            innerRadius={140}
            style={{
              data: {
                stroke: "transparent",
                opacity: 0.5
              }
            }}
            data={[
              { x: "Cats", y: 400 },
              { x: "Dogs", y: 350 },
              { x: "Frogs", y: 25 },
              { x: "Turtles", y: 55 },
              { x: "Chimps", y: 5 }
            ]}/>
        </Slide>
        <Slide>
          <Heading bold fit textColor={"red"}>
            Ecology.js
          </Heading>
          <Heading bold fit style={{marginTop: 40}}>
            Interactive documentation
          </Heading>
        </Slide>
        <Slide>
          <List>
            <ListItem><Appear fid="1">projects.formidablelabs.com/victory-pie/</Appear></ListItem>
            <ListItem><Appear fid="1">projects.formidablelabs.com/victory-scatter/</Appear></ListItem>
            <ListItem><Appear fid="1">projects.formidablelabs.com/victory-chart/</Appear></ListItem>
          </List>
        </Slide>

        {/* ---------------------------------------------------------------
          * Part 2: How is it that react makes this work?
          * ---------------------------------------------------------------
          */}
        <Slide bgImage={images.polygons}>
          <LonelyHeading size={2} textColor="lightestGray">
            {"Why React makes this possible"}
          </LonelyHeading>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <List>
            <ListItem><Appear fid="1">React DOM model</Appear></ListItem>
            <ListItem><Appear fid="2">React data binding / lifecycle</Appear></ListItem>
            <ListItem><Appear fid="3">D3 layout math</Appear></ListItem>
          </List>
        </Slide>
        <Slide>
          <LonelyHeading size={4}>
            D3 pioneered interactive data visualization on the web
          </LonelyHeading>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <List>
            <ListItem><Appear fid="1">extensive api</Appear></ListItem>
            <ListItem><Appear fid="1">extensive ecosystem of gists to start from / learn from</Appear></ListItem>
            <ListItem><Appear fid="1">DOM model inspired React authors</Appear></ListItem>
            <ListItem><Appear fid="1">encouraged functional paradigm</Appear></ListItem>
            <ListItem><Appear fid="1">extensive geo functionality*</Appear></ListItem>
            <ListItem><Appear fid="1">well conceived and maintained by Bostock</Appear></ListItem>
            <ListItem><Appear fid="1">brought academic layout algorithms onto client</Appear></ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3}>
            <i className="fa fa-times"></i> APIs eliminated
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              .selectAll()
              .select()
              .data()
              .enter()
              .exit()
              .update()
              .transition()
              .axis()
              .brush()
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            Markup in D3
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              var node = svg.selectAll(".node")
                .data(graph.nodes)
                .enter().append("circle")
                .attr("class", "node")
                .attr("r", 5)
                .style("fill", function (d) {
                  return color(d.group);
                })
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            Markup in Victory
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              <g>
                <circle
                  r={5}
                  fill={datum.group)}
                  style={{
                    fill: datum.value > 5 ? "red" : "blue"
                  }}/>
                <text> {datum.label} </text>
              </g>
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            Data binding in D3
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              .data(data)
              .enter()
              .append("g")
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            Data binding in Victory
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              let nodesSVG = arrayOfNodes.map((node)=>{

              })
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            Viz State in D3
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              // Toggle children on click.
              function click(d) {
                if (d.children) {
                  d._children = d.children;
                  d.children = null;
                } else {
                  d.children = d._children;
                  d._children = null;
                }
                update(d);
              }
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading bold size={2} >
            Components are <em>composable</em>
          </Heading>
          <Heading fit style={{marginTop: 40}}>
            {"github.com/FormidableLabs/victory-examples"}
          </Heading>
        </Slide>
        <Slide>
          <Heading bold fit textColor={"red"}>
            Radium
          </Heading>
          <Heading bold fit >
            Styles become data
          </Heading>
        </Slide>



        {/* ---------------------------------------------------------------
          * Part 3: Developer environment and tooling
          * ---------------------------------------------------------------
          */}
        <Slide bgImage={images.polygons}>
          <LonelyHeading size={2} textColor="lightestGray">
            {"Infrastructure"}
          </LonelyHeading>
        </Slide>
        <Slide>
          <List>
            <ListItem><Appear fid="1">Repos rather than gists</Appear></ListItem>
            <ListItem><Appear fid="1">forking / issues for continual improvement</Appear></ListItem>
            <ListItem><Appear fid="1">package.json for dependencies</Appear></ListItem>
            <ListItem><Appear fid="1">minified dists / umd builds for CDN</Appear></ListItem>
            <ListItem><Appear fid="1">Babel for ES6</Appear></ListItem>
            <ListItem><Appear fid="1">Webpack for builds</Appear></ListItem>
            <ListItem><Appear fid="1">propTypes for input validation</Appear></ListItem>
            <ListItem><Appear fid="1">Hot Reloading</Appear></ListItem>
            <ListItem><Appear fid="1">sourcemaps</Appear></ListItem>
            <ListItem><Appear fid="1">eslintrc</Appear></ListItem>
            <ListItem><Appear fid="1">Tests</Appear></ListItem>
          </List>
        </Slide>
        <Slide bgImage={images.polygons}>
          <LonelyHeading size={2} textColor="lightestGray">
            {"In other words..."}
          </LonelyHeading>
        </Slide>
        <Slide bgImage={images.polygons}>
          <LonelyHeading size={2} textColor="lightestGray">
            Victory is going to make data visualizations <em>first class citizens</em> in the OSS community.
          </LonelyHeading>
        </Slide>
      </CustomDeck>
    );
  }
}
