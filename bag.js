const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');
let dragged = null;
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (event) => {
      draggable.classList.add('dragging');
      dragged = event.target;
    })
    
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  })
})
containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault();
  })
})
const target = document.getElementById('drop-target');
target.addEventListener("drop", (event) => {
  event.preventDefault();
  if (event.target.id == 'drop-target'){
    event.target.appendChild(dragged);
  }
})