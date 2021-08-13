let logo
let dvdImage

let cR = 0
let cG = 0
let cB = 30

let sideHits = 0
let cornerHits = 0


function setup() {
  createCanvas(800, 600);

  // cornerHits = 0


  // Corner hit counter

  //console.log("")

  // Load the image once.
  dvdImage = loadImage("https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387");

  // Set up an object with some starting values.
  logo = {
    x: 50,
    y: 50,
    xVelocity: 3,
    yVelocity: 3,
    width: 200,
    height: 150,
  }
}

function draw() {
  // Draw the background (we do this in the draw loop for animations)
  background(cR, cG, cB);
  displayCornerHits()
  /************************************************************/
  // Bouncing once it hits the left or right
  if (logo.x > height || logo.x < 0) {
    logo.xVelocity *= -1
    randomColor()
    sideHits += 1
  }

  // Bouncing once it hits the top or bottom
  if (logo.y > width || (logo.y < 0 || logo.y > 600 - 150)) {
    logo.yVelocity *= -1
    randomColor()
    sideHits += 1
  }

  // Make the DVD move
  logo.x += logo.xVelocity
  logo.y += logo.yVelocity
  /***********************************************************/
  // hit Corner cords: (0,0) , (0, 450) , (800-200, 0) , (600, 450)
  // Hit the corner
  if ((logo.x === 0 && logo.y === 0) || (logo.x === 0 && logo.y === 450) || (logo.x === 600 && logo.y === 0) || (logo.x === 600 && logo.y === 450)) {
    // Something happens
    cornerHits += 1;
  }

  // Draw the logo
  image(dvdImage, logo.x, logo.y, logo.width, logo.height);

  // Change to background color every time it hits side
  function randomColor() {
    cR = random(255)
    cG = random(255)
    cB = random(255)
  }

  function displayCornerHits() {
    noStroke()
    textSize(16)
    textFont('Georgia')
    fill('white')
    text("It hit the corner " + cornerHits + " times out of " + sideHits + "!", 20, 30)
  }

}
