import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useFrame, useCleanup, usePhysics, useApp, useLocalPlayer} = metaversefile;

export default () => {
  const app = useApp();
  const physics = usePhysics();
  
  const numRows = 10; // x axis
  const numColumns = 5; // z axis
  const heightScale = 1;
  const rowScale = 1; // x axis
  const columnScale = 1; // z axis
  physics.addHeightFieldGeometry(numRows, numColumns, heightScale, rowScale, columnScale);
  
  return app;
};