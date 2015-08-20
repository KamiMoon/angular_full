window.onload = init;

function init() {
    console.log('Main.js - init');

    Engine.Loader.init().then(function() {
        Engine.Renderer.init();

        loop();
    });

}

// main event loop
function loop() {
    requestAnimationFrame(loop);

    Engine.Renderer.render();

}
