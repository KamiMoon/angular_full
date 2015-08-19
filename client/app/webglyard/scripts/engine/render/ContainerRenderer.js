Engine.ContainerRenderer = {

    init: function(scene) {
        this.scene = scene;
        this.totalEquipmentCountEl = document.getElementById('totalEquipmentCount');

        // precache possible geometries
        var x = 20;
        var y = 8;
        var z = 9.5;

        // for now just one
        this.containerGeometry = new THREE.BoxGeometry(x, y, z);

        // precache possible materials
        this.possibleMaterials = [];

        var colors = ['#70974F', '#693E05', '#6A92BF', '#8A2E2E', '#BE8A00', '#194678', '#32302A', '#30461E', '#BD6F09'];

        for (var i = 0; i < colors.length; i++) {

            var material = new THREE.MeshBasicMaterial({
                color: colors[i]
            });

            this.possibleMaterials.push(material);
        }

        this.addContainers();
    },
    addContainers: function() {

        this.totalGeometry = new THREE.Geometry();
        this.equipmentMeshes = [];

        var startX = -1000;
        var startZ = -450;

        var xStep = 320;
        var zStep = 80;

        // x direction
        for (var i = 0; i < 10; i++) {

            // z direction
            for (var j = 0; j < 12; j++) {
                this.addArea(i * xStep + startX, j * zStep + startZ);
            }

        }

        this.totalEquipmentCountEl.innerHTML = this.equipmentMeshes.length;

        this.totalMesh = new THREE.Mesh(this.totalGeometry, new THREE.MeshFaceMaterial(this.possibleMaterials));
        this.totalMesh.castShadow = false;
        this.totalMesh.name = "ContainersTotalMesh";

        // only add merged mesh to scene for performance
        this.scene.add(this.totalMesh);

    },
    addArea: function(startingX, startingZ) {

        // x direction
        for (var i = 0; i < 12; i++) {

            // z direction
            for (var j = 0; j < 4; j++) {

                // y direction
                for (var k = 0; k < 5; k++) {
                    var random = Math.random();

                    this.addContainer(startingX, startingZ, i, j, k, random);

                    if (random > 0.5) {
                        break;
                    }
                }

            }

        }

    },
    addContainer: function(startingX, startingZ, i, j, k, random) {
        var x = 20;
        var y = 8;
        var z = 9.5;
        var spacingX = 1;
        var spacingZ = 5;
        var floorY = 4.75;

        // pick from one of the cached materials
        var randomMaterialIndex = Math.floor(Math.random() * (this.possibleMaterials.length - 1)) + 1;

        var geometry = this.containerGeometry.clone();

        // apply the material index to each of the faces
        for (var l = 0; l < geometry.faces.length; l++) {
            geometry.faces[l].materialIndex = randomMaterialIndex;
        }

        var mesh = new THREE.Mesh(geometry);
        mesh.position.x = i * (x + spacingX) + startingX;
        mesh.position.z = j * (z + spacingZ) + startingZ;
        mesh.position.y = k * y + floorY;

        mesh.castShadow = false;
        mesh.name = "ContainersChildMesh_" + (this.equipmentMeshes.length - 1);

        // add to total geometry
        mesh.updateMatrix();
        mesh.updateMatrixWorld();
        mesh.geometry.computeBoundingSphere();
        mesh.geometry.computeBoundingBox();

        this.totalGeometry.merge(mesh.geometry, mesh.matrix);
        // maintain a reference for picking
        this.equipmentMeshes.push(mesh);
    }
};