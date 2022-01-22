let ground, groundElevation, groundStart, clouds, cloudNumber, isDarkCloudy1, cloudColor
let player
let gravity, gravityREAL, jumpPower
let platforms = []
let coins, myColors;



function setup() {
	createCanvas(windowWidth, windowHeight);

	sound1 = loadSound("https://cdn.glitch.com/8c8ffa71-41d0-4587-86b6-0bfb8890610a%2Fpop1.mp3?v=1620060857834")

	sound2 = loadSound("https://cdn.glitch.com/8c8ffa71-41d0-4587-86b6-0bfb8890610a%2Fpop2.mp3?v=1620060857811")

	points = 0;
	isDarkCloudy1 = false
	cloudColor = 'white'
	clouds = []
	cloudNumber = 15;
	ground = 20;
	groundElevation = 30;
	groundStart = height - groundElevation;

	gravityREAL = true

	// Player
	player = {
		x: width / 2,
		y: height - 50
	}

	jumpPower = 20;

	// ground
	drawGround();


	//possible coins with values
	myColors = [
		{ color: "deepskyblue", value: 1 },
		{ color: "Peachpuff", value: 2 },
		{ color: "sandybrown", value: 3 },
		{ color: "dimgray", value: 4 },
		{ color: "red", value: 6 },
		{ color: "orchid", value: -1 },
		{ color: "yellow", value: -3 },
		{ color: "darkorchid", value: -10 }
	]

	coins = []
	for (let i = 0; i < 15; i++) {
		let choice = Math.floor(random(myColors.length))
		console.log(choice)
		let randomColor = myColors[choice]
		console.log(randomColor)
		coins.push(new Coin(randomColor.color, randomColor.value, width, height * 0.6))
	}

} // end of setup()

function draw() {
	drawBackground();
	Cloud.displayClouds();
	Cloud.moveClouds();

	player.y += gravity

	for (let i = 0; i < coins.length; i++) {
		coins[i].display()
	}

	drawGround();


	noFill()
	// Starts player
	displayPlayer();

	// Render Platforms
	startPlatforms();
	displayPlatforms();

	playerMovement()
	theGravity()
	score()

	displayPoints()
	outOfBorder()

} // end of draw()

function drawBackground() {
	if (isDarkCloudy1) {
		// gray
		background(176, 182, 184)
		background(119, 136, 153)
	} else {
		// blue
		background(179, 226, 245)
    // fill('gold')
    // circle(60, 100, random(39, 40))
	}

}
function drawCloud() {
	ellipse()
}

class Cloud {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	drawCloud() {
		noStroke()
		if (isDarkCloudy1) {
			fill(175, 182, 185)
		} else {
			fill('white')
		}
		ellipse(this.x, this.y, 40, 20)
		ellipse(this.x - 10, this.y - 10, 40, 30)
		ellipse(this.x + 10, this.y + 10, 40, 30)
		ellipse(this.x - 10, this.y + 5, 40, 30)
		ellipse(this.x + 10, this.y + 5, 60, 30)
	}

	static cloudySky() {
		for (let i = 0; i < clouds.length; i++) {
			clouds[i].drawCloud()
		}
	}

	static createClouds() {
		if (clouds.length < cloudNumber) {
			for (let i = 0; i < cloudNumber; i++) {
				clouds.push(new Cloud(random(0, windowWidth), random(0, windowHeight)))
			}
		}
	}

	static displayClouds() {
		Cloud.createClouds();
		Cloud.cloudySky();
	}

	static moveClouds() {
		for (let i = 0; i < clouds.length; i++) {
			// if (i === 2) {
			//   if (clouds[i].x  - 60 > windowWidth) {
			//     clouds[i].x -= 0.0001
			//   } else {
			//     clouds[i].x = random(-60, windowWidth + 60 )
			//   }
			// } else {
			if (clouds[i].x + 60 < windowWidth + 100) {
				clouds[i].x += 1.05
			} else {
				clouds[i].x = -59
				clouds[i].y = random(0, windowHeight)
			}
		}
	}


} // end of class


// ground
function drawGround() {
	fill('green')
	rect(0, windowHeight - groundElevation, windowWidth, 30)

	checkGravity();

} // end of drawGround()

/* ************Platform stuff****************/
// Platform
class Platform {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.platformWidth = 50;
		this.platformHeight = 15;
	}

	// Platform.add(platformName)
	static add(platform) {
		platforms.push(platform);
	}

	// add custom sizes later
	drawPlatform() {
		fill('yellow')
		rect(this.x, this.y, this.platformWidth, this.platformHeight)
	}

	sideCollide() {
		// edit later
		let hit = collideRectCircle(this.x, this.y, this.platformWidth, this.platformHeight, player.x, player.y, 20)

		return hit;
	}

} // end of Platform


// might need to edit
// Starts up the platform list
function startPlatforms() {

	Platform.add(new Platform(windowWidth / 2, windowHeight - groundElevation * 2 - 10));

	// Platform.add(new Platform(windowWidth /2, 
	// windowHeight - groundElevation*4 - 10))

	if (platforms.length <= 10) {
		while (platforms.length <= 10) {
			Platform.add(new Platform(width / 2 + random(-(width / 2 + 50), (width / 2 - 50)),
				height - (groundElevation * 2) * (platforms.length + 1) - 10))
			console.log("Length: " + platforms.length)
		}
	}
}

// Renders the platforms
function displayPlatforms() {
	for (let i = 0; i < platforms.length; i++) {
		platforms[i].drawPlatform();
	}
}

/********Game Physics & Player stuff************/
function displayPlayer() {
	// line(0, height - ground, width, height - ground);
	fill("blue")
	ellipse(player.x, player.y, 20, 20)

}// End of displayPlayer()

function checkGravity() {
	if (gravityREAL === false) {

		gravity = 0

	} else if (gravityREAL === true) {
		gravity = 5
	}

	if (player.y < windowHeight - groundElevation) {
		gravityREAL = true
	}
	if (isOnPlatform() === true) {
		gravityREAL = false
	}

	// if (gravityREAL === true) {

	// 	gravity = 5

	// }
}

function theGravity() {

	// If it collides with the ground
	if (collideRectCircle(0, windowHeight - groundElevation, windowWidth, 30, player.x, player.y, 20)) {
		// console.log("HIT")
		gravityREAL = true
		gravity = 0
	}

	// If it collides with a platform
  /*The range for top surface: 
  *check jamboard
  & bottom is  */


} //End of Gravity Function

// Is it on a platform?
function isOnPlatform() {
	// console.log(platforms)
	for (let i = 0; i < platforms.length; i++) {
    /* struggling b/c the jumping is actually like teleporting to a certain point just very quickly, and the player just skips over the range
    solved: increased the range where the ball can land */
		if ((player.x >= platforms[i].x) && (player.x <= (platforms[i].x + platforms[i].platformWidth)) && ((player.y + 10) <= platforms[i].y + 5 && player.y + 10 >= platforms[i].y - 5)) {
			console.log('TRUE')
			// console.log(platforms.length)
			return true

		}
	}
	// console.log('FALSE')
	return false
}


// Detecting bottom of platform
// Useless


function hits() {

	for (let i = 0; i < platforms.length; i++) {
		if (platforms[i].sideCollide()) {
			return true
		}
	}
	return false
}

function playerMovement() {

	if (keyIsPressed) {
		// console.log('PRESSED')
		if (keyCode === RIGHT_ARROW) {
			if (hits() === false || isOnPlatform()) {
				console.log('LEFTARROW')
				player.x += 7

			}

		} else if (keyCode === LEFT_ARROW) {
			if (hits() === false || isOnPlatform()) {
				console.log('RIGHT_ARROW')
				player.x -= 7
			}
		} else if (keyCode === 32) {

			// sound2.play()
			// console.log('SPACEBAR')
			if (hits() === false || isOnPlatform()) {
				console.log('HIT HEAD')
				player.y -= jumpPower;
			}
		} else if (keyCode === 67) {
      isDarkCloudy1 = !isDarkCloudy1
    }
	}

} // end of playerMovement()

/*---------------COINS-------------------------*/
class Coin {
	constructor(color, value, w, h) {
		this.width = 20
		this.totalWidth = w - this.width
		this.x = random(this.totalWidth)
		this.totalHeight = h
		this.y = random(this.totalHeight)

		this.color = color
		this.value = value
	}

	display() {
		fill(this.color)
		ellipse(this.x, this.y, this.width)
	}

	reset() {
		this.x = random(this.totalWidth)
		this.y = random(this.totalHeight)
	}
}

//END OF COINS--------------------------------



function score() {
	for (let i = 0; i < coins.length; i++) {
		if (collideCircleCircle(player.x, player.y, 20, coins[i].x, coins[i].y, coins[i].width)) {
			coins[i].reset()
			sound1.play()
			points += coins[i].value;
		}
	}
	// console.log(points)
} // End of Score


function displayPoints() {

	fill("Black")

	textSize(20)
	text("Points: " + points, 20, 25)

	textSize(10)
	text("Blue Coin = 1 Point", 20, 55)
	text("Peach Coin = 2 Points", 20, 65)
	text("Brown/Orange Coin = 3 Points", 20, 75)
	text("Gray Coin = 4 Points", 20, 85)
	text("Red Coin = 6 Points", 20, 95)
	text("Pink Coin = -1 Point", 20, 105)
	text("Yellow Coin = -3 Points", 20, 115)
	text("Purple Coin = -10 Points", 20, 125)
  text("Press C to change the weather", 20, 45)

}


//Checks if player goes out of border
function outOfBorder() {

	if (player.x > windowWidth) {


		player.x = windowWidth / 2
		player.y = windowHeight - 50
		// console.log("OutOfBorder")


	}

	if (player.x < 0) {

		player.x = windowWidth / 2
		player.y = windowHeight - 50
		// console.log("OutOfBorder")

	}

	if (player.y < 0) {

		player.x = windowWidth / 2
		player.y = windowHeight - 50

	}
} // end of outOfBorder


function restart() {  // Maybe?

	if (keyIsPressed) {


		if (keyCode === 82) {

			console.log("Restart")

		}

	}

}