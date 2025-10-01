import "./style.css"
import * as  THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";


console.log(THREE, OrbitControls);

function renderSphere() {
const scene = new THREE.Scene();
console.log(scene);

const geometry = new THREE.SphereGeometry(10,64,64);  // radius, widthSegments, heightSegments
const material = new THREE.MeshStandardMaterial({color: "aqua"}); // material color
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

//Light 
const light = new THREE.PointLight("white",100, 100); // color, density, range
light.position.set(0,10,20);  // x,y,z
scene.add(light);

//Camera 
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 100);  // pov, aspect, near, far
camera.position.z = 50;
scene.add(camera);



//Render
const canvas = document.querySelector(".webgl");
const render = new THREE.WebGLRenderer({canvas});
render.setSize(sizes.width,sizes.height);
render.setPixelRatio(4);
render.render(scene,camera)

//Controls
const controls = new OrbitControls(camera,canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 5

//Resize 
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  console.log(sizes.width, sizes.height);
  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.projectionMatrix();
  render.setSize(sizes.width, sizes.height);
})

function loop() {
  controls.update();
  render.render(scene,camera);
  window.requestAnimationFrame(loop);
}
loop();

}

renderSphere();


