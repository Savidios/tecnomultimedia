PImage retrato;
void setup() {
  size(800, 400);
  background(255, 255, 0);
  retrato = loadImage("data/retrato.jpg");
}
  void draw () {
    image(retrato,400,0,400,430);
    fill (255, 255, 0);
    rect (50, 50, 300, 325);
    fill (255);
    ellipse (160,170, 90,110);
    fill (255);
    ellipse (240,170, 90,110);
    fill (64, 207, 255);
    ellipse (170,170, 25,35);
    fill (0);
    ellipse (170,170, 10,15);
    fill (64, 207, 255);
    ellipse (230,170, 25,35);
    fill (0);
    ellipse (230,170, 10,15);
    line (130,128, 113,105);
    line (156,115, 154,92);
    line (181,121, 194,98);
    line (217,123, 205,98);
    line (242,114, 242,91);
    line (266,125, 276,110);
    noFill();
  strokeWeight(2);
  stroke(0);
  arc(width/4, height/2+10, 180, 150, 0, PI);
  fill (255, 255, 0);
  arc(width/4, height/2+10, 20, 50, PI, TWO_PI);
  arc(width/7, height/2+30, 40, 60, PI, TWO_PI);
  arc(width/2.8, height/2+30, 40, 60, PI, TWO_PI);
  fill (255);
  strokeWeight(2);
    rect (201,284,20,30);
    fill (255);
    rect (173,284,20,30);
    fill (162,179,13,255);
    ellipse (73,95,20,40);
    fill (162,179,13,255);
    ellipse (56,143,10,30);
    fill (162,179,13,255);
    ellipse (317,98,20,30);
    fill (162,179,13,255);
    ellipse (321,315,30,50);
    fill (162,179,13,255);
    ellipse (75,302,10,30);
    println (mouseX);
    println (mouseY);
}
    
    



  
 
