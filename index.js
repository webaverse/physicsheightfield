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
  for (let i = 0; i < numVerts; i++) {
    heights[i] = 1;
  }
  physics.addHeightFieldGeometry(numRows, numColumns, heights, heightScale, rowScale, columnScale);
  
  return app;
};