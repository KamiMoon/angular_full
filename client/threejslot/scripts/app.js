if (!Detector.webgl) {
    Detector.addGetWebGLMessage();
}

var container;
var stats;

var camera;
var scene;
var renderer;
var objects;
var particleLight;
var pointLight;
var dae;
var straightRailMesh;
var controls;

var clock = new THREE.Clock();
// var morphs = [];

// Collada model

var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;

loader.load('models/train2/straight_rail.dae', function(collada) {

    straightRailMesh = collada.scene;

    // dae.traverse(function(child) {

    // if (child instanceof THREE.SkinnedMesh) {

    // var animation = new THREE.Animation(child, child.geometry.animation);
    // animation.play();

    // }

    // });

    // dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
    straightRailMesh.position.x = 50;
    straightRailMesh.updateMatrix();

});

loader.load('models/train2/TRAIN2.dae', function(collada) {

    dae = collada.scene;

    // dae.traverse(function(child) {

    // if (child instanceof THREE.SkinnedMesh) {

    // var animation = new THREE.Animation(child, child.geometry.animation);
    // animation.play();

    // }

    // });

    // dae.scale.x = dae.scale.y = dae.scale.z = 0.002;
    dae.position.x = -1;
    dae.updateMatrix();

    init();
    animate();

});

// init();
// animate();

function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(-128, 80, 77);

    controls = new THREE.OrbitControls(camera);
    controls.damping = 0.2;
    controls.addEventListener('change', render);

    scene = new THREE.Scene();
    // scene.fog = new THREE.FogExp2( 0x000000, 0.035 );

    // Add Blender exported Collada model

    // var loader = new THREE.JSONLoader();
    // loader.load( 'models/threejs/train/TRAIN.js', function ( geometry, materials ) {
    /*
     * // adjust color a bit var material = materials[ 0 ]; material.morphTargets = true; material.color.setHex( 0xffaaaa ); material.ambient.setHex( 0x222222 ); var faceMaterial = new
     * THREE.MeshFaceMaterial( materials ); //for ( var i = 0; i < 270; i ++ ) { // random placement in a grid //var x = ( ( i % 27 ) - 13.5 ) * 2 + THREE.Math.randFloatSpread( 1 ); //var z = (
     * Math.floor( i / 27 ) - 13.5 ) * 2 + THREE.Math.randFloatSpread( 1 ); // leave space for big monster //if ( Math.abs( x ) < 2 && Math.abs( z ) < 2 ) continue; morph = new THREE.MorphAnimMesh(
     * geometry, faceMaterial ); // one second duration morph.duration = 1000; // random animation offset morph.time = 1000 * Math.random(); var s = THREE.Math.randFloat( 0.00075, 0.001 );
     * morph.scale.set( s, s, s ); morph.position.set( 0, 0, 0 ); morph.rotation.y = THREE.Math.randFloat( -0.25, 0.25 ); morph.matrixAutoUpdate = false; morph.updateMatrix(); scene.add( morph );
     * morphs.push( morph ); //}
     */

    // var material = new THREE.MeshLambertMaterial({color: 0x55B663});
    // var skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)
    // var material = new THREE.MeshFaceMaterial(materials);
    // mesh = new THREE.SkinnedMesh(geometry, material);
    // scene.add(mesh);
    // } );
    // Add the COLLADA
    scene.add(dae);
    scene.add(straightRailMesh);

    // Lights

    // scene.add( new THREE.AmbientLight( 0xcccccc ) );

    pointLight = new THREE.PointLight(0xff4400, 5, 30);
    pointLight.position.set(-100, 200, 100);
    scene.add(pointLight);

    // Renderer

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    // Stats

    stats = new Stats();
    container.appendChild(stats.domElement);

    addFloor();

    // Events

    window.addEventListener('resize', onWindowResize, false);

}

function addFloor() {
    // var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
    // floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    // floorTexture.repeat.set(10, 10);
    // DoubleSide: render texture on both sides of mesh
    // var floorMaterial = new THREE.MeshBasicMaterial({
    // map: floorTexture,
    // side: THREE.DoubleSide
    // });

    var floorMaterial = new THREE.MeshBasicMaterial({
        color: 'grey',
        side: THREE.DoubleSide
    });

    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -2;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
}

//

function onWindowResize(event) {

    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

}

//

function animate() {

    requestAnimationFrame(animate);

    var delta = clock.getDelta();

    // animate Collada model

    THREE.AnimationHandler.update(delta);

    // if ( morphs.length ) {
    //
    // for ( var i = 0; i < morphs.length; i ++ )
    // morphs[ i ].updateAnimation( 1000 * delta );
    //
    // }

    render();
    stats.update();

}

function render() {

    // var timer = Date.now() * 0.0005;

    // camera.position.x = Math.cos( timer ) * 10;
    // camera.position.y = 4;
    // camera.position.z = Math.sin( timer ) * 10;

    // camera.lookAt( scene.position );

    renderer.render(scene, camera);

}
