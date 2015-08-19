// There is only one instance of this ever
Engine.Loader = {
    init: function() {
        console.log('Loader - init');
        var that = this;

        this.loader = new THREE.ColladaLoader();
        this.loader.options.convertUpAxis = true;

        this.object3Ds = {
            'TRAIN': null,
            'TRACK': null
        };

        var masterDef = new $.Deferred();

        //this.loadFile('models/train2/straight_rail.dae').then(function(collada) {
        //    console.log('Done loading train mesh');
        //    that.object3Ds['TRAIN'] = collada.scene;

         //   that.loadFile('models/train2/straight_rail.dae').then(function(collada) {
         //       console.log('Done loading track mesh');
         //       that.object3Ds['TRACK'] = collada.scene;

          //      masterDef.resolve();
          //  });

        //});

        masterDef.resolve();
        
        return masterDef.promise();

    },
    loadFile: function(fileName) {
        // wrap THREE.js library in promise
        // https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/ColladaLoader.js

        var def = new $.Deferred();

        this.loader.load(fileName, function(collada) {
            def.resolve(collada);
        });

        return def.promise();
    }
};