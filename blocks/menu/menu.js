import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];

  const list = document.createElement('ul');

  const items = rows.map((row, index) => {
    const item = document.createElement('li');
    item.className = 'menu-item';
    // the row is the editable menu-item component — carry its instrumentation
    moveInstrumentation(row, item);

    const nameEl = row.children[0];
    const detailsEl = row.children[1];

    if (row.children.length > 2) {
      const name = nameEl?.textContent.trim() || `row ${index + 1}`;
      // eslint-disable-next-line no-console
      console.warn(`menu block: "${name}" has ${row.children.length} cells, expected 2. Extra cells ignored.`);
    }

    if (nameEl) {
      const title = document.createElement('h3');
      moveInstrumentation(nameEl, title);
      const nameSource = nameEl.querySelector('p') || nameEl;
      title.append(...nameSource.childNodes);
      item.append(title);
    }

    if (detailsEl?.childNodes.length) {
      const description = document.createElement('p');
      moveInstrumentation(detailsEl, description);
      const detailsSource = detailsEl.querySelector('p') || detailsEl;
      description.append(...detailsSource.childNodes);
      item.append(description);
    }

    return item;
  });

  list.replaceChildren(...items);
  block.replaceChildren(list);
}
