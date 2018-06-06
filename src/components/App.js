import React from 'react';
import FeatureDetection from '../utils/FeatureDetection';

console.log(`canvas is supported? ${FeatureDetection.canvas}`);
console.log(`cookies is supported? ${FeatureDetection.cookies}`);
console.log(`dart is supported? ${FeatureDetection.dart}`);

export default () => <div>Hello, WP</div>;
