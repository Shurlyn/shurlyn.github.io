const { ArduinoIoTCloud } = require('arduino-iot-js');

const thingId = "393a25ca-5f98-44cb-9183-9155c82c3b1d"
const variableName = "8df8a3df-4ee5-4049-aa67-4f275985ac83"

const Light1ID = "8df8a3df-4ee5-4049-aa67-4f275985ac83"
const Light2ID = "ac926276-36f4-4cc9-b6bb-ecfc18dab47f";
const Light3ID = "6ea1c7a1-0e0b-4505-9cf4-54b3f081b288";
const Light4ID = "182e55a0-c0f8-4a15-bff7-55193b0e975b";
const Light5ID = "10822fbd-d8a9-426c-a918-0cd890ae10cc";
const Light6ID = "99b5e1d2-fe2e-4ff9-9343-6d7fc8200991";



const options = {
    clientId: "hgZM1XY1mn0yz8tiNcy208BY7lUt6ij5",
    clientSecret: "iYTpUj1nYk3sHdgzxuZUaMficMDUN6A9q3IpepvKxBxLhnbxgklQA7g3gHthliLM",
    onDisconnect: message => {
        console.error(message);
    }
}


ArduinoIoTCloud.connect(options)
  .then(() => {
    console.log("Connected to Arduino IoT Cloud broker");
    return ArduinoIoTCloud.onPropertyValue(thingId, variableName, showUpdates = value => console.log(value));
  })
  .then(() => console.log("Callback registered"))
  .catch(error => console.log(error));
  console.log("ran")


/*-------------------------------------------------------------------------------- */
let light1 = document.getElementById("light1");
light1.addEventListener("checked", sendValue(Light1ID, light1))

let light2 = document.getElementById("light2");
light2.addEventListener("checked", sendValue(Light2ID, light2))

let light3 = document.getElementById("light3");
light3.addEventListener("checked", sendValue(Light3ID, light3))

let light4 = document.getElementById("light4");
light4.addEventListener("checked", sendValue(Light4ID, light4))

let light5 = document.getElementById("light5");
light5.addEventListener("checked", sendValue(Light5ID, light5))

let light6 = document.getElementById("light6");
light6.addEventListener("checked", sendValue(Light6ID, light6))
console.log("ranw")





// sends the current value of the light switch
function sendValue(variableName_, checkName) {
  ArduinoIoTCloud.connect(options).then(() => {
    console.log("Connected to Arduino IoT Cloud broker");
    ArduinoCloud.sendProperty(thingId, variableName_, isChecked(checkName)).then(() => {
        console.log("Property value correctly sent");
    });    
});
}
// can only be a checkable object
function isChecked(thing) {
  return thing.checked
}