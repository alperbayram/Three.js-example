let scene, camera, renderer, text_mesh
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(1, 1, 2);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#e5e5e5");

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const color = 0xffffff;
  const intensity = 0.2;
  const light = new THREE.PointLight(color, intensity, 500);
  light.position.set(10, 0, 25);
  scene.add(light);

  const light2 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(light2);

  var loader = new THREE.FontLoader();
  loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

	const text_geometry = new THREE.TextGeometry( 'Three.js!', {
		font: font,
		size: 0.2,
		height: 0.01,
		curveSegments: 2,

  } );
  text_geometry.center();
  var text_material = new THREE.MeshNormalMaterial();
  text_mesh = new THREE.Mesh( text_geometry, text_material );
  text_mesh.position.y = 0.25;
  text_mesh.position.z = 0.01;
  scene.add( text_mesh );
} );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
}

function getTextMesh (text, material) {
  
  var textgeometry = new THREE.TextBufferGeometry(
    text, 
    Object.assign(
      {},
      {
        font: helvatiker,
        bevelEnabled: false,
        curveSegments: 8,
        bevelThickness: 1,
        bevelSize: 0,
        height: 0.7,
        size: 5
      }
    )
  );
  let numberMesh = new THREE.Mesh(textgeometry, material);
  var geo = new THREE.EdgesGeometry(numberMesh.geometry); 
  var wireframe = new THREE.LineSegments(geo, wireFrameMaterial);
  numberMesh.add(wireframe);

  return numberMesh;
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};  

function Update_Text() {
  scene.remove(text_mesh);
  var user_input = document.getElementById('user_input').value

  var loader = new THREE.FontLoader();
  loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {

    const text_geometry = new THREE.TextGeometry( user_input, {
      font: font,
      size: 0.2,
      height: 0.01,
      curveSegments: 2, 
    } );
    text_geometry.center();
    var text_material = new THREE.MeshNormalMaterial();
    text_mesh = new THREE.Mesh( text_geometry, text_material );
    text_mesh.position.y = 0.25;
    text_mesh.position.z = 0.01;
    scene.add( text_mesh );
  } );
}
window.addEventListener('resize', onWindowResize, false);

init();
animate();
