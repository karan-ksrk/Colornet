import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    imagUrl: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"],
  };
  // style = {
  //   fontSize: 50,
  //   fontWeight: "bold",
  // };

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no Tags!</p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  render() {
    return (
      <React.Fragment>
        {/* <img src={this.state.imagUrl} alt="" />  */}
        {/* <span style={this.style} className="badge badge-primary m-2"> */}
        {/* <span style={{ fontSize: 30 }} className="badge badge-primary m-2"> */}
        {/* <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button className="btn btn-secondary btn-sm">Increment</button> */}
        <div>
          {this.state.tags.length === 0 && "Please create a new tag"}
          {this.renderTags()}
        </div>
      </React.Fragment>
    );
  }

  // getBadgeClasses() {
  //   let classes = "badge m-2 badge-";
  //   classes += this.state.count == 0 ? "warning" : "primary";
  //   return classes;
  // }

  // formatCount() {
  //   const { count } = this.state;
  //   return count == 0 ? "Zero" : count;
  // }
}

export default Counter;
