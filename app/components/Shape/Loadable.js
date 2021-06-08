/**
 *
 * Asynchronously loads the component for Shape
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
