const onload = () => {
  const px = (value) => value + 'px';

  const isInBoard = (arrow, board) => {
    const { top } = arrow.position;
    const start = board.position.top;
    const end = board.position.top + board.height;

    if (top < start || top > end) {
      alert('lost!');
      return;
    }
    alert('Won');
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

  const updateArrowPosition = (arrow) => {
    const arrowElement = document.getElementById(arrow.id);
    const { left, top } = arrow.position;

    arrowElement.style.boxSizing = 'border-box';
    arrowElement.style.left = px(left);
    arrowElement.style.top = px(top);
  };

  const moveArrow = (arrow) => {
    if (arrow.position.left <= 100) {
      arrow.speed.dx = 0;
      return;
    }
    arrow.position.left -= arrow.speed.dx;
  };

  const main = () => {
    const arrow = {
      id: 'arrow',
      position: {
        top: 301,
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

    const intervalId = setInterval(() => {
      moveArrow(arrow);
      updateArrowPosition(arrow);

      if (arrow.speed.dx === 0) {
        clearInterval(intervalId);
        isInBoard(arrow, board);
      }
    }, 3);

    drawBoard(board, 'container');
  }
  main();
}
window.onload = onload;
