/**
 * THREE.js wrapper
 */

// There is only one instance of this ever
Engine.Renderer = {
    init: function() {
        console.log('Renderer.js - init');

        var that = this;

        this.container = document.getElementById('RendererCanvas');

        this.clock = new THREE.Clock();
        this.rayVector = new THREE.Vector3(0, 0, 1);
        this.projector = new THREE.Projector();
        this.raycaster = new THREE.Raycaster();
        this.center = new THREE.Vector3();
        this.mouse = new THREE.Vector2();
        this.INTERSECTED = null;

        this.scene = new THREE.Scene();

        // camera
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.set(-128, 80, 77);
        this.scene.add(this.camera);

        // camera controls
        this.controls = new THREE.OrbitControls(this.camera);
        this.controls.damping = 0.2;

        this.addLight();

        // renderer
        this.renderer = new THREE.WebGLRenderer({
            precision: "mediump",
            antialias: false
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = false;

        this.container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', function(e) {
            that.resize(e);
        }, false);

        window.addEventListener('click', function(e) {
            that.click(e);
        }, false);

        // stats
        this.stats = new Stats();
        this.container.appendChild(this.stats.domElement);

        this.addAxisHelper();
        this.addFloor();

        //this.addLoaderMeshes();

        // delegate rendering of containers

        Engine.ContainerRenderer.init(this.scene);
    },
    resize: function(event) {
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    },
    click: function(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 1);
        this.projector.unprojectVector(vector, this.camera);

        this.raycaster.set(this.camera.position, vector.sub(this.camera.position).normalize());

        // var intersects = this.raycaster.intersectObjects(this.scene.children);
        var intersects = this.raycaster.intersectObjects(Engine.ContainerRenderer.equipmentMeshes);

        var onDeslect = function() {
            this.INTERSECTED.material.wireframe = false;
        };

        var onSelect = function() {
            this.INTERSECTED = intersects[0].object;
            // this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
            // this.INTERSECTED.material.emissive.setHex(0xff0000);
            this.INTERSECTED.material.wireframe = true;

            // only make one for now
            if (UI.currentPropertyEditorPanel) {
                UI.currentPropertyEditorPanel.destroy();
            }

            var editorPanel = new UI.PropertyEditorPanel(this.INTERSECTED);
        };

        if (intersects.length > 0) {

            if (this.INTERSECTED != intersects[0].object) {

                if (this.INTERSECTED) {
                    onDeslect();
                }

                onSelect();

            }

        }
        else {

            if (this.INTERSECTED) {
                onDeslect();

            }

            this.INTERSECTED = null;

        }
    },
    render: function() {
        var delta = this.clock.getDelta();

        // animate Collada model
        THREE.AnimationHandler.update(delta);

        this.renderer.render(this.scene, this.camera);

        this.stats.update();

    },
    addLight: function() {
        // this.pointLight = new THREE.PointLight(0xff4400, 5, 30);
        // this.pointLight.position.set(-100, 200, 100);
        // this.scene.add(this.pointLight);
        var light = new THREE.DirectionalLight(0xffffff, 2);
        light.position.set(1, 1, 1).normalize();

        // no shadows - performance
        light.castShadow = false;

        this.scene.add(light);
    },
    addFloor: function() {
        var floorMaterial = new THREE.MeshBasicMaterial({
            color: 'grey',
            side: THREE.DoubleSide
        });

        var floorGeometry = new THREE.PlaneGeometry(4000, 1000, 1, 1);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -1;
        floor.rotation.x = Math.PI / 2;
        this.scene.add(floor);
    },
    addAxisHelper: function() {
        /*
         * RGB is like XYZ (R)ed - X-axis (G)reen - Y-axis (B)lue - Z-axis
         */

        var axes = new THREE.AxisHelper(1000);
        axes.position = this.center;
        this.scene.add(axes);
    },
    addLoaderMeshes: function() {
        var object3Ds = Engine.Loader.object3Ds;
        var object3D = null;

        for ( var property in object3Ds) {
            object3D = object3Ds[property];

            object3D.updateMatrix();

            if (property === 'TRAIN') {
                object3D.position.x = -1100;
                object3D.position.z = -450;

            }
            else if (property === 'TRACK') {
                object3D.position.x = -1100;
                object3D.position.z = -600;
            }

            this.scene.add(object3D);
        }

    }
};