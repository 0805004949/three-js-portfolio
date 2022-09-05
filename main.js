import './style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';



/**
 * to start thigs off, you always need 3 objs
 * 1. scene == container that holds cam and lights
 * 2. camera : there are multiple camera!
 * 3. rendere : make th magic happen
 */
const scene = new THREE.Scene();

// PerspectiveCamera mimic human eyeball
// 75 -> field of view
// window.innerWidth/window.innerHeight -> aspect ration
// 0.1, 1000 -> view frustum
const camera  = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000)

// render needs to know what DOM to use
// id of background
const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),

})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera); // draw



/**
 * adding obj 
 * 1. geometry : the xyz points that makesup a shape
 * 2. material(texture) : the wrapping paper for an obj, you can use custom via webgl
 *  MeshBasicMaterial does not require light source so we use it
 * 3. mesh : geometry + material
 */
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

// light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50);
scene.add(lightHelper,gridHelper)


const control = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)

}
Array(200).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load('orange.jpeg')
scene.background = spaceTexture


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  sushi.rotation.x+=0.05;
  sushi.rotation.y+=0.075;
  sushi.rotation.z+=0.05;
  
  punk.rotation.y += 0.01;
  punk.rotation.z += 0.01;

  camera.position.z = t* -0.01;
  camera.position.x = t* -0.0002;
  camera.position.y= t* -0.0002;
x
}
document.body.onscroll = moveCamera

function animate(){

  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera); // infinite loop
}

animate()


const punkTexture = new THREE.TextureLoader().load('punk.png')
const punk = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:punkTexture})
)
scene.add(punk)

// orange
const sushiTexture = new THREE.TextureLoader().load('sushi.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const sushi = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map:sushiTexture, normalMap:normalTexture})
  
)
scene.add(sushi)

sushi.position.z = 30;
sushi.position.setX(-10);