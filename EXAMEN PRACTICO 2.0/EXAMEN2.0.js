var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0xDDDDDD, 1);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT);
    camera.position.z = 20;
    camera.position.y = 5;
    scene.add(camera);
    const light = new THREE.AmbientLight(0x404040, 5);
    scene.add(light);

    // Definir los parámetros para crear las pirámides
    var numPiramides = 4; // Cantidad de pirámides
    var ladosBase = 6; // Lados de la base poligonal
    var radioBase = 2; // Radio de la base poligonal
    var alturaPiramides = 3; // Altura de cada pirámide

    // Arreglo para almacenar las pirámides
    var piramides = [];

   // Función para crear y retornar una pirámide recortada de base poligonal
function crearPiramide(lados, radio, altura) {
  // Crear la geometría de la base poligonal
  var baseGeometry = new THREE.CircleBufferGeometry(radio, lados);
  baseGeometry.rotateX(Math.PI / 2); // Rotar la base poligonal 90 grados en el eje X
  baseGeometry.rotateY(Math.PI / 2);

  // Calcular el radio de la parte superior de la pirámide truncada
  var radioSuperior = radio * 0.5;

  // Calcular el radio de la parte inferior de la pirámide truncada
  var radioInferior = radio;

  // Crear la geometría de la pirámide truncada
  var truncGeometry = new THREE.CylinderBufferGeometry(radioSuperior, radioInferior, altura, lados, 1, true);
  truncGeometry.translate(0, altura / 2, 0);

   // Crear el Mesh de la pirámide truncada
   var truncMesh = new THREE.Mesh(truncGeometry, new THREE.MeshMatcapMaterial({ color: 0xff0000 }));

// Crear el Mesh de la base poligonal
var baseMesh = new THREE.Mesh(baseGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));

// Crear la geometría de la tapa de la pirámide (disco)
var tapaGeometry = new THREE.CircleBufferGeometry(radioSuperior, ladosBase);

// Rotar la tapa para que esté orientada correctamente
tapaGeometry.rotateX(-Math.PI / 2);
tapaGeometry.rotateY(-Math.PI / 2);

// Mover la geometría de la tapa de la pirámide hacia arriba
tapaGeometry.translate(0, altura, 0);

// Crear el Mesh de la tapa de la pirámide
var tapaMesh = new THREE.Mesh(tapaGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));

  // Crear un grupo para contener la base, la pirámide truncada y la tapa
  var group = new THREE.Group();
  group.add(truncMesh);
  group.add(baseMesh);
  group.add(tapaMesh);

  return group;
}


    // Crear las pirámides y agregarlas al arreglo
    for (var i = 0; i < numPiramides; i++) {
      var piramide = crearPiramide(ladosBase, radioBase, alturaPiramides);
      piramide.position.set(i * 5, 0, 0); // Ubicar las pirámides en línea recta
      piramides.push(piramide);
      scene.add(piramide);
    }
    
    // Crear las pirámides y agregarlas al arreglo
    for (var i = 0; i < numPiramides; i++) {
      var piramide = crearPiramide(ladosBase, radioBase, alturaPiramides);
      piramide.position.set(i * 5, 5, 0); // Ubicar las pirámides en línea recta
      piramides.push(piramide);
      scene.add(piramide);
    }

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    const axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);

    const size = 1000;
    const divisions = 1000;
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

