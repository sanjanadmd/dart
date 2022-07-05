(function () {
  const px = (value) => value + 'px';

  const didArrowHitBoard = (arrow, board) => {
    const { top: arrowY, left: arrowX } = arrow.position;
    const { top: boardStart, left: boardX } = board.position;

    const boardEnd = boardStart + board.height;

    return !(arrowX > boardX || arrowY < boardStart || arrowY > boardEnd);
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

  const moveArrowLeft = (arrow) => {
    arrow.position.left -= arrow.speed.dx;
  };

  const moveUp = arrow => {
    arrow.position.top -= 2;
  };

  const moveDown = arrow => {
    arrow.position.top += 2;
  };

  const didArrowCrossExtreme = (arrow, extreme = 1) =>
    arrow.position.left < extreme;

  const shootArrow = (arrow, board) => {
    const intervalId = setInterval(() => {
      if (didArrowHitBoard(arrow, board)) {
        clearInterval(intervalId);
        displayResult('won');
        return;
      }

      if (didArrowCrossExtreme(arrow)) {
        clearInterval(intervalId);
        displayResult('lost');
        return;
      }

      moveArrowLeft(arrow);
      drawArrow(arrow);
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

    document.onkeydown = (event) => {
      const keys = {
        ArrowUp: moveUp,
        ArrowDown: moveDown
      };

      const move = keys[event.key];
      if (move) {
        move(arrow);
        drawArrow(arrow);
      }
    };

    const shoot = document.getElementById('shoot');
    shoot.onclick = () => {
      document.onkeydown = null;
      shootArrow(arrow, board);
    };
  };

  const displayResult = (message) => {
    const container = document.getElementById('container');
    const result = document.createElement('div');
    result.id = 'result';
    container.appendChild(result);

    result.innerText = message;
  }

  window.onload = main;
})();
