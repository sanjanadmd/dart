const onload = () => {
  const px = (value) => value + 'px';

  const didArrowHitBoard = (arrow, board) => {
    const { top } = arrow.position;
    const start = board.position.top;
    const end = board.position.top + board.height;

    if (top < start || top > end) {
      return false;
    }
    return true;
  };

  const drawBoard = (board, parentId) => {
    const boardElement = document.createElement('div');
    boardElement.id = board.id;
    boardElement.style.top = px(board.position.top);
    boardElement.style.left = px(board.position.left);
    boardElement.style.width = 0;
    boardElement.style.boxSizing = 'border-box';
    boardElement.style.height = board.height;
    boardElement.style.border = '1px solid red';
    boardElement.style.position = 'relative';

    const parent = document.getElementById(parentId);
    parent.appendChild(boardElement);
  };

  const drawArrow = (arrow) => {
    const arrowElement = document.getElementById(arrow.id);
    const { left, top } = arrow.position;

    arrowElement.style.boxSizing = 'border-box';
    arrowElement.style.left = px(left);
    arrowElement.style.top = px(top);
  };

  const moveArrowHorizontally = (arrow) => {
    if (arrow.position.left <= 100) {
      arrow.speed.dx = 0;
      return;
    }
    arrow.position.left -= arrow.speed.dx;
  };

  const moveArrowVertically = (event, arrow) => {
    if (event.keyCode == '38') {
      arrow.position.top -= 2;
    }
    if (event.keyCode == '40') {
      arrow.position.top += 2;
    }
    drawArrow(arrow);
  };

  const leaveArrow = (arrow, board) => {
    const intervalId = setInterval(() => {
      moveArrowHorizontally(arrow);
      drawArrow(arrow);

      if (arrow.speed.dx === 0) {
        clearInterval(intervalId);
        const message = didArrowHitBoard(arrow, board) ? 'You WON!' : 'You LOST!';
        alert(message);
      }
    }, 3);
  };

  const main = () => {
    const arrow = {
      id: 'arrow',
      position: {
        top: 200,
        left: 400
      },
      speed: {
        dx: 1
      }
    };

    const board = {
      id: 'board',
      position: {
        top: 100,
        left: 100
      },
      height: 200,
      width: 0
    };

    drawBoard(board, 'container');
    drawArrow(arrow);

    const setArrowPosition = (event) => {
      moveArrowVertically(event, arrow);
    };

    document.addEventListener('keydown', setArrowPosition);

    const start = document.getElementById('start');
    start.onclick = () => {
      document.removeEventListener('keydown', setArrowPosition);
      leaveArrow(arrow, board);
    };
  };

  main();
};
window.onload = onload;
