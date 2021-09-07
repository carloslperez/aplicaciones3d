function start() {

    var pos, $id = function (d) { return document.getElementById(d); };


    var tierra = new PhiloGL.O3D.Sphere(
        {

            nlat: 30,
            nlong: 30,
            radius: 3,
            // textures: 'https://lizgar.github.io/A3D/js/earth.jpg'
        }
    );


    PhiloGL('glcanvas',
        {
            events: {
                onDragStart: function (e) {
                    cameraControl.onDragStart(e);
                },
                onDragMove: function (e) {
                    cameraControl.onDragMove(e);
                },
                onKeyDown: function (e) {
                    objectControl.onKeyDown(e);
                }
            },
            onLoad: function (app) {
                var camera = app.camera;
                camera.fov = 37;
                camera.update();
                cameraControl = new CameraControl(app.camera);
            },

            camera: {
                position: {
                    x: 0, y: 0, z: -13
                }
            },

            events: {
                onKeyDown: function (e) {
                    switch (e.key) {
                        case 'up':
                            tierra.position.y += 2;
                            break;
                        case 'down':
                            tierra.position.y -= 2;
                            break;
                        case 'left':
                            tierra.position.x += 2;
                            break;
                        case 'right':
                            tierra.position.x -= 2;
                            break;
                    }
                    tierra.update();
                },

                onTouchStart: function (e) {
                    e.stop();
                    this.pos = {
                        x: e.x,
                        y: e.y
                    };
                    this.dragging = true;
                },
                onTouchCancel: function () {
                    this.dragging = false;
                },
                onTouchEnd: function () {
                    this.dragging = false;
                    theta = this.scene.models[0].rotation.y;
                },
                onTouchMove: function (e) {
                    e.stop();
                    var z = this.camera.position.z,
                        sign = Math.abs(z) / z,
                        pos = this.pos;

                    this.scene.models.forEach(function (m) {
                        m.rotation.y += -(pos.x - e.x) / 100;
                        m.update();
                    });

                    pos.x = e.x;
                    pos.y = e.y;
                },
                onDragStart: function (e) {
                    this.pos = {
                        x: e.x,
                        y: e.y
                    };
                    this.dragging = true;
                },
                onDragCancel: function () {
                    this.dragging = false;
                },
                onDragEnd: function () {
                    this.dragging = false;
                    theta = this.scene.models[0].rotation.y;
                },
                onDragMove: function (e) {
                    var z = this.camera.position.z,
                        sign = Math.abs(z) / z,
                        pos = this.pos;

                    this.scene.models.forEach(function (m) {
                        m.rotation.y += -(pos.x - e.x) / 100;
                        m.update();
                    });

                    pos.x = e.x;
                    pos.y = e.y;
                },
                onMouseWheel: function (e) {
                    e.stop();
                    var camera = this.camera;
                    camera.position.z += e.wheel;
                    camera.update();
                }

            },


            /*textures: {

                  src: ['https://lizgar.github.io/A3D/js/earth.jpg'],
                  parameters: [{
                       name: 'TEXTURE_MAG_FILTER',
                    value: 'LINEAR'
                    }, {

                     name: 'TEXTURE_MIN_FILTER',
                   value: 'LINEAR_MIPMAP_NEAREST',
                  generateMipmap: true
                   }
 
                ]
               },*/




            onLoad: function (app) {

                var gl = app.gl,
                    program = app.program,
                    scene = app.scene,
                    canvas = app.canvas,
                    camera = app.camera;


                gl.clearColor(1.0, 1.0, 1.0, 1.0);
                gl.clearDepth(1.0);
                gl.enable(gl.DEPTH_TEST);
                gl.depthFunc(gl.LEQUAL);
                gl.viewport(0, 0, +canvas.width, +canvas.height);


                tierra.update();
                scene.add(tierra);
                draw();

                function draw() {

                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPHT_BUFFER_BIT);


                    scene.render();

                    PhiloGL.Fx.requestAnimationFrame(draw);
                }


            }


        });

}
