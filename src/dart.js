const updateArrowPosition = (arrow) => {
  const arrowElement = document.getElementById(arrow.id);

  arrowElement.style.left = arrow.position.left + 'px';
  arrowElement.style.top = arrow.position.top + 'px';
};

const moveArrow = (arrow) => {
  if (arrow.position.left < 100) {
    arrow.speed.dx = 0;
  }
  arrow.position.left -= arrow.speed.dx;
};

const main = () => {
  const arrow = {
    id: 'arrow',
    position: {
      top: 250,
      left: 400
    },
    speed: {
      dx: 2
    }
  };

  setInterval(() => {
    moveArrow(arrow);
    updateArrowPosition(arrow);
  }, 33);
}

window.onload = main;
