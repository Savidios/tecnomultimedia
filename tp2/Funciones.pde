void eventos(){
    if (key == ' ') {
    lineColor = color(random(255), random(255), random(255));
  } else if (key == 'r' || key == 'R') {
    lineColor = color(0);
  }
}
