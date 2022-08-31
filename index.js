import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useFrame, useCleanup, usePhysics, useApp, useLocalPlayer} = metaversefile;

export default () => {
  const app = useApp();
  const physics = usePhysics();

  //

  const getHeight = (x, z, numRows, numColumns) => { // result must be int16.
    return x % 2 + (numColumns - z);
  }

  //

  const numRows = 10; // int, x axis
  const numColumns = 5; // int, z axis
  const heightScale = 0.7; // float
  const rowScale = 2; // float, x axis
  const columnScale = 1; // float, z axis
  const heights = []; // int16
  const numVerts = numRows * numColumns;
  // for (let i = 0; i < numVerts; i++) {
  //   heights[i] = 1;
  // }
  for (let x = 0; x < numRows; x++) {
    for (let z = 0; z < numColumns; z++) {
      // const i = z + x * numColumns;
      const height = getHeight(x, z, numRows, numColumns);

      heights.push(height);
    }
  }
  console.log(heights)

  //
  
  const sizeX = numRows - 1;
  const sizeZ = numColumns - 1;
  const geometry = new THREE.PlaneGeometry(sizeX, sizeZ, sizeX, sizeZ);
  geometry.rotateX(-Math.PI / 2);
  // for (let i = 0; i < geometry.attributes.position.array.length; i += 3) {
  for (let z = 0; z < numColumns; z++) {
    for (let x = 0; x < numRows; x++) {
      const i = x + z * numRows;
      geometry.attributes.position.array[i * 3 + 0] += sizeX / 2;
      geometry.attributes.position.array[i * 3 + 1] = getHeight(x, z, numRows, numColumns);
      geometry.attributes.position.array[i * 3 + 2] += sizeZ / 2;
      
      geometry.attributes.position.array[i * 3 + 0] *= rowScale;
      geometry.attributes.position.array[i * 3 + 1] *= heightScale;
      geometry.attributes.position.array[i * 3 + 2] *= columnScale;
    }
  }
  // }
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial( {color: 'gray'} );
  material.flatShading = true;
  const mesh = new THREE.Mesh( geometry, material );
  app.add( mesh );

  //

  physics.addHeightFieldGeometry(mesh, numRows, numColumns, heights, heightScale, rowScale, columnScale);
  // physics.addHeightFieldGeometry(2, 2, [0, 0, 1, 1], 1, 1, 1);
  
  return app;
};