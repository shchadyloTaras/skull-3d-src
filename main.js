import './style.css'
import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const planeGeometry = new THREE.PlaneGeometry(20, 20);

// Materials
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xD3D3D3,
});

// Mesh
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

//Label renderers
let labelRenderer;

// Position plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, -1.1, 0);
plane.receiveShadow = true;
scene.add(plane);


// Lights
const light = new THREE.DirectionalLight(0xffffff, 1, 100);

light.position.set(1, 1, 1);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
scene.add(light);

//---------------------------------------------------
//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//------------------------------------------------------------------------------
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 2
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// const axes = new THREE.AxesHelper(20);
// scene.add(axes);

//---------------------------------------------------------------------------------
//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setClearColor(0x000000)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//---------------------------------------------------------
// Popups

const btn1 = document.querySelector('.btn-1');
const btn2 = document.querySelector('.btn-2');
const btn3 = document.querySelector('.btn-3');

function addPopups() {
  const informationAboutPartsOfTheSkull = {
    parietalBones: 'The parietal bones are two bones in the skull which, when joined together at a fibrous joint, form the sides and roof of the cranium.',
    nose: 'The human nose is the most protruding part of face. It bears the nostrils and is the first organ of the respiratory system.',
    jaw: 'The jaw is any opposable articulated structure at the entrance of the mouth, typically used for grasping and manipulating food.',
  }

  const popup = document.createElement('div');
  popup.style.width = 300 + 'px';
  popup.style.borderRadius = 5 + 'px';
  popup.style.backgroundColor = '#3ca7fb';
  popup.style.position = 'absolute';
  popup.style.bottom = 10 + 'px';
  popup.style.left = 50 + '%';
  popup.style.transform = 'translateX(-50%)';
  popup.style.display = 'none';
  popup.style.padding = 20 + 'px';



  const btnClose = document.createElement('button');
  btnClose.innerHTML = '<img src="./assets/UI/Close icon@3x.png"/>';
  btnClose.style.cursor = 'pointer';
  btnClose.style.background = 'none';
  btnClose.style.border = 'none';
  btnClose.style.position = 'relative';
  btnClose.style.right = -240 + 'px';


  btnClose.onclick = () => {
    popup.style.display = 'none';
  };

  const textPopup = document.createElement("p");

  const container = document.querySelector('.container');

  container.append(popup);
  popup.append(btnClose)
  popup.append(textPopup);




  const { parietalBones, nose, jaw } = informationAboutPartsOfTheSkull;

  btn1.addEventListener('click', () => {
    popup.style.display = 'block';
    textPopup.textContent = parietalBones;
  })

  btn2.addEventListener('click', () => {
    popup.style.display = 'block';
    textPopup.textContent = nose;

  })

  btn3.addEventListener('click', () => {
    popup.style.display = 'block';
    textPopup.textContent = jaw;
  })

  btn1.style.left = 800 + 'px';
  btn1.style.top = 276 + 'px';

  btn2.style.left = 600 + 'px';
  btn2.style.top = 349 + 'px';

  btn3.style.left = 755 + 'px';
  btn3.style.top = 429 + 'px';


}

addPopups();

//----------------------------------------------------------------
// Skull
const loader = new GLTFLoader();
let model;

loader.load(
  './assets/skull_GLTF/scene.gltf',

  function (gltf) {
    gltf.scene.traverse(function (node) {
      if (node.isMesh) {
        node.castShadow = true;
      }
    });

    model = gltf.scene;


    scene.add(model);
  },

  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },

  function (error) {
    console.log('An error happened');
  }
);

//----------------------------------------------------------------
// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


//--------------------------------
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();

// function onMouseMove( event ) {

// 	// calculate mouse position in normalized device coordinates
// 	// (-1 to +1) for both components

// 	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

//   console.log(mouse.x);
// }

//----------------------------------------------------------------
//Animate


function animate() {
  controls.update();

  // raycaster.setFromCamera( mouse, camera );


  // if (model) {
  //   model.rotation.y += 0.01;
  // }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// window.addEventListener( 'mousemove', onMouseMove, false );



