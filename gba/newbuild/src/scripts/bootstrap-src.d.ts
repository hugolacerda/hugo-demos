// Bootstrap 5 ships no types for its ES module sources (src/scripts/bootstrap.ts
// imports them directly); only the members the site calls are declared.
declare module 'bootstrap/js/src/*' {
  export default class Component {
    static getOrCreateInstance(element: Element): { show(): void; hide(): void };
  }
}
