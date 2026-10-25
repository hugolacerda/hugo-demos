// The three Bootstrap components the site uses (map ticket 09), imported from
// Bootstrap's own ES module sources so Astro bundles only these and not the
// whole bundle with Popper. Importing a component registers its data-api, so
// the markup's data-bs-toggle attributes work as they do live: Offcanvas for
// the desktop menu, Collapse for its sub-menus (and the FAQ accordion), Modal
// for the readiness and newsletter modals.
import Collapse from 'bootstrap/js/src/collapse';
import Modal from 'bootstrap/js/src/modal';
import Offcanvas from 'bootstrap/js/src/offcanvas';

export { Collapse, Modal, Offcanvas };

/**
 * Open the modal `id` when an element matching `selector` is clicked, anywhere
 * on the page and in content rendered later. Replaces the live jQuery
 * one-liners, which also built a new Modal on every click.
 */
export function openModalOn(selector: string, id: string): void {
  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element | null)?.closest(selector);
    const el = document.getElementById(id);
    if (!trigger || !el) return;
    e.preventDefault();
    Modal.getOrCreateInstance(el).show();
  });
}
