/**
 * getDisplayName
 * @param {ReactElement} WrappedComponent
 * @return {string}
 */
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
