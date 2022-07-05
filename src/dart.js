const onload = () => {
  const px = (value) => value + 'px';

  const didArrowHitBoard = (arrow, board) => {
    const { top: arrowY, left: arrowX } = arrow.position;
    const { top: boardStart, left: boardX } = board.position;
    const boardEnd = boardStart + board.height;

    if (arrowX > boardX) {
      return false;
    }
    if (arrowY < boardStart || arrowY > boardEnd) {
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
    boardElement.style.height = board.height;
    boardElement.style.border = '1px solid red';
    boardElement.style.boxSizing = 'border-box';
    boardElement.style.position = 'relative';

    const parent = document.getElementById(parentId);
    parent.appendChild(boardElement);
  };

  const drawArrow = (arrow) => {
    const arrowElement = document.getElementById(arrow.id);
    const { top, left } = arrow.position;

    arrowElement.style.left = px(left);
    arrowElement.style.top = px(top);
    arrowElement.style.boxSizing = 'border-box';
  };

  const moveArrowHorizontally = (arrow) => {
    arrow.position.left -= arrow.speed.dx;
  };

  const moveArrowVertically = (event, arrow) => {
    if (event.keyCode === 38) {
      arrow.position.top -= 2;
    }
    if (event.keyCode === 40) {
      arrow.position.top += 2;
    }
    drawArrow(arrow);
  };

  const shootArrow = (arrow, board, result) => {
    const intervalId = setInterval(() => {
      moveArrowHorizontally(arrow);
      drawArrow(arrow);

      if (didArrowHitBoard(arrow, board)) {
        clearInterval(intervalId);
        result.innerText = 'won';
      }

      if (arrow.position.left <= 0) {
        clearInterval(intervalId);
        result.innerText = 'lost';
      }
    }, 3);
  };

  const main = () => {
    const board = {
      id: 'board',
      position: {
        top: 100,
        left: 100
      },
      height: 200,
      width: 0
    };

    const arrow = {
      id: 'arrow',
      position: {
        top: 305,
        left: 400
      },
      speed: {
        dx: 5
      }
    };

    drawBoard(board, 'view');
    drawArrow(arrow);

    document.onkeydown = (event) => moveArrowVertically(event, arrow);

    const shoot = document.getElementById('shoot');
    shoot.onclick = () => {
      document.onkeydown = null;

      const container = document.getElementById('container');
      const result = document.createElement('div');
      result.id = 'result';
      container.appendChild(result);

      shootArrow(arrow, board, result);
    };
  };

  main();
};
window.onload = onload;
