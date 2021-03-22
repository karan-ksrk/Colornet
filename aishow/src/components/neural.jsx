import React from "react";
import Sketch from "react-p5";

function Neural() {
  let setup = (p5, canvasParentRef) => {
    let xyz = p5.createCanvas(600, 600).parent(canvasParentRef);
    //Calculation to center the canvas
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;

    xyz.position(x, y);
  };

  let l1 = 10; //layer2
  let l2 = 10; // layer1
  let ng = 40; // neuron gap
  let nr = 8; // neuron radius
  let lg = 1; // layer gap

  let l3 = 4; //layer3

  let draw = (p5) => {
    p5.translate(300, 300);

    for (let i = 0; i < l1; i++) {
      for (let j = 0; j < l2; j++) {
        p5.stroke(p5.random(155, 255));
        p5.line(-200, ng * i - (l1 / 2) * ng, lg, ng * j - (l2 / 2) * ng);
        p5.noStroke();
      }
      p5.circle(-200, ng * i - (l1 / 2) * ng, nr);
    }

    for (let i = 0; i < l2; i++) {
      for (let j = 0; j < l3; j++) {
        p5.stroke(p5.random(155, 255));
        p5.line(lg, ng * i - (l2 / 2) * ng, lg * 150, ng * j - (l3 / 2) * ng);
        p5.noStroke();
      }

      p5.circle(lg, ng * i - (l2 / 2) * ng, nr);
    }

    for (let i = 0; i < l3; i++) {
      p5.circle(lg * 150, ng * i - (l3 / 2) * ng, nr);
    }
    p5.frameRate(10);
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} className="App" />
    </div>
  );
}

export default Neural;
