function Vehicle(x, y) {
  this.position = createVector(x, y);
  var min = 4;
  var max = 12;
  this.r = Math.round(Math.random() * (max - min)) + min;

  this.maxspeed;
  this.maxforce = 0.2;
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, 0);

  var val;

  this.applyForce = function(force) {
    this.acceleration.add(force);
  }


  this.separate = function(vehicles) {
    var min = 5;
    var max = 35;
    var desiredseparation = Math.round(Math.random() * (max - min)) + min;
    var sum = createVector();
    var count = 0;
    for (var i = 0; i < vehicles.length; i++) {
      var d = p5.Vector.dist(this.position, vehicles[i].position);

      if ((d > 0) && (d < desiredseparation)) {
        var diff = p5.Vector.sub(this.position, vehicles[i].position);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }


  this.update = function() {
    this.velocity.add(this.acceleration);
    var min = 1;
    var max = 100;
    this.maxspeed = Math.round(Math.random() * (max - min)) + min;
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  this.display = function(vehicles) {
    var dist;
    stroke(255);

    for (var i = 0; i < vehicles.length; i++) {
      dist = p5.Vector.dist(this.position, vehicles[i].position);
      if(dist > 0 && dist < 65) {
        strokeWeight(0.019);
        line(this.position.x, this.position.y, 0, vehicles[i].position.y + 5);
        line(this.position.x, this.position.y, width, vehicles[i].position.y + 5);
        line(this.position.x, this.position.y, vehicles[i].position.y - 2, 0);
        line(this.position.x, this.position.y, vehicles[i].position.y - 2, height);
        strokeWeight(0.1);
        line(this.position.x, this.position.y, vehicles[i].position.x, vehicles[i].position.y);
      }
    }

    var min = 1;
    var max = 100;
    val = Math.round(Math.random() * (max - min)) + min;

    if(val > 23) {
      fill(20, 20, 20);
    } else {
      stroke(0);
      fill(0);
    }
    push();
    translate(this.position.x, this.position.y);
    rect(-3, -3, this.r, this.r);
    pop();
  }


  this.borders = function() {
    if (this.position.x < -this.r) this.position.x =  width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x >  width+this.r) this.position.x = -this.r;
    if (this.position.y > height+this.r) this.position.y = -this.r;
  }
}
