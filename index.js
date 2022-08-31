import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useFrame, useCleanup, usePhysics, useApp, useLocalPlayer} = metaversefile;

export default () => {
  const app = useApp();
  const physics = usePhysics();

  const numRows = 10; // int, x axis
  const numColumns = 5; // int, z axis
  const heightScale = 1; // float
  const rowScale = 1; // float, x axis
  const columnScale = 1; // float, z axis
  const heights = []; // int16
  const numVerts = numRows * numColumns;
  // for (let i = 0; i < numVerts; i++) {
  //   heights[i] = 1;
  // }
  for (let x = 0; x < numRows; x++) {
    for (let z = 0; z < numColumns; z++) {
      const i = z + x * numColumns;
      const height = x % 2;

      heights.push(height);
    }
  }
  console.log(heights)

  //
  
  const sizeX = numRows - 1;
  const sizeZ = numColumns - 1;
  const geometry = new THREE.PlaneGeometry( sizeX, sizeZ );
  geometry.rotateX(-Math.PI / 2);
  // for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
  for (let z = 0; z < sizeZ; z++) {
    for (let x = 0; x < sizeX; x++) {
      const i = x + z * sizeX;
      geometry.attributes.position.array[i * 3 + 0] += sizeX / 2;
      geometry.attributes.position.array[i * 3 + 1] = x % 2;
      geometry.attributes.position.array[i * 3 + 2] += sizeZ / 2;

      // heights.push(geometry.attributes.position.array[i * 3 + 1]);
    }
  }
  // }
  const material = new THREE.MeshStandardMaterial( {color: 'gray'} );
  const mesh = new THREE.Mesh( geometry, material );
  app.add( mesh );

  //

  physics.addHeightFieldGeometry(numRows, numColumns, heights, heightScale, rowScale, columnScale);
  // physics.addHeightFieldGeometry(2, 2, [0, 0, 1, 1], 1, 1, 1);
  
  return app;
};