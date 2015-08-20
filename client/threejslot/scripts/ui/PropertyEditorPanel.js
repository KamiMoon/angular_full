/**
 * Editor panel to edit the properties of a given mesh. Right now it just uses dat.GUI to be generic and quick to build https://code.google.com/p/dat-gui/
 * http://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage TODO: Replace UI with custom look/feel.
 */

// can make many instances of this panel unlike Renderer, Loader, etc
// Requires passing in an THREE.js mesh for the UI to edit
UI.PropertyEditorPanel = function(hostMesh) {
    this.hostMesh = hostMesh;

    this.id = 'PropertyEditorPanel_' + this.hostMesh.id;

    var that = this;

    this.gui = new dat.GUI({
        autoPlace: false,
        width: 400
    });

    var customContainer = document.getElementById('propertyPanelContainer');
    while (customContainer.firstChild) {
        customContainer.removeChild(customContainer.firstChild);
    }
    customContainer.appendChild(this.gui.domElement);

    this.parameters = {
        name: this.hostMesh.name,
        x: this.hostMesh.position.x,
        y: this.hostMesh.position.y,
        z: this.hostMesh.position.z,
        // color: this.hostMesh.material.color.getHex(), // color (change "#" to "0x")
        // opacity: this.hostMesh.material.opacity,
        visible: this.hostMesh.visible
    // material: "Phong",
    // reset: function() {
    // resetCube()
    // }
    };
    
    var bounds = 500;

    var folder1 = this.gui.addFolder('Position');
    var controlX = folder1.add(this.parameters, 'x').min(this.hostMesh.position.x - bounds).max(this.hostMesh.position.x + bounds).step(1).listen();
    controlX.onChange(function(value) {
        that.hostMesh.position.x = value;
    });

    var controlY = folder1.add(this.parameters, 'y').min(this.hostMesh.position.y - bounds).max(this.hostMesh.position.y + bounds).step(1).listen();
    controlY.onChange(function(value) {
        that.hostMesh.position.y = value;
    });

    var controlZ = folder1.add(this.parameters, 'z').min(this.hostMesh.position.z - bounds).max(this.hostMesh.position.z + bounds).step(1).listen();
    controlZ.onChange(function(value) {
        that.hostMesh.position.z = value;
    });
    folder1.open();

    // var controlColor = this.gui.addColor(this.parameters, 'color').name('Color').listen();
    // controlColor.onChange(function(value) // onFinishChange
    // {
    // that.hostMesh.material.color.setHex(value.replace("#", "0x"));
    // });

    // var controlOpacity = this.gui.add(this.parameters, 'opacity').min(0).max(1).step(0.01).name('Opacity').listen();
    // controlOpacity.onChange(function(value) {
    // that.hostMesh.material.opacity = value;
    // });

    // var cubeMaterial = this.gui.add(parameters, 'material', ["Basic", "Lambert", "Phong", "Wireframe"]).name('Material Type').listen();
    // cubeMaterial.onChange(function(value) {
    // updateCube();
    // });

    var controlVisible = this.gui.add(this.parameters, 'visible').name('Visible?').listen();
    controlVisible.onChange(function(value) {
        that.hostMesh.visible = value;
    });

    var nameControl = this.gui.add(this.parameters, 'name');
    
    // this.gui.add(parameters, 'reset').name("Reset Cube Parameters");

    this.gui.open();

    UI.currentPropertyEditorPanel = that;
};

UI.PropertyEditorPanel.prototype = {
    constructor: UI.PropertyEditorPanel,
    destroy: function() {
        this.gui.close();
        this.gui.destroy();
        this.hostMesh = null;
        UI.currentPropertyEditorPanel = null;
    }
};
