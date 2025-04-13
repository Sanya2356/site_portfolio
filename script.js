const scrollContainer = document.getElementById('scroll-container');
const items = scrollContainer.querySelectorAll('.service-item');

// Горизонтальный скролл мышью
scrollContainer.addEventListener('wheel', (e) => {
  e.preventDefault();
  scrollContainer.scrollLeft += e.deltaY;
}, { passive: false });

// Выделение активного элемента по центру
function updateActiveItem() {
  const containerRect = scrollContainer.getBoundingClientRect();
  const center = containerRect.left + containerRect.width / 2;

  let closestItem = null;
  let closestDistance = Infinity;

  items.forEach(item => {
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.left + itemRect.width / 2;
    const distance = Math.abs(center - itemCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestItem = item;
    }
  });

  items.forEach(item => item.classList.remove('active'));
  if (closestItem) closestItem.classList.add('active');
}

scrollContainer.addEventListener('scroll', () => {
  requestAnimationFrame(updateActiveItem);
});

window.addEventListener('load', updateActiveItem);
window.addEventListener('resize', updateActiveItem);
