(function () {
  const px = (value) => value + 'px';

  const didArrowHitBoard = (arrow, board) => {
    const { top: boardStart, left: boardX } = board.position;

    const boardEnd = boardStart + board.height;

    return !(
      arrow.isBefore(boardX)
      || arrow.isBelow(boardStart)
      || arrow.isAbove(boardEnd)
    );
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

  const didArrowCrossExtreme = (arrow, extreme = 1) =>
    !arrow.isBefore(extreme);

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

      arrow.moveLeft();
      drawArrow(arrow.getInfo());
    }, 3);
  };

  const displayResult = (message) => {
    const container = document.getElementById('container');
    const result = document.createElement('div');
    result.id = 'result';
    container.appendChild(result);

    result.innerText = message;
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

    const arrow = new Arrow('arrow', { top: 100, left: 400 }, { dx: 4 });

    drawBoard(board, 'view');
    drawArrow(arrow.getInfo());

    document.onkeydown = (event) => {
      const keys = {
        ArrowUp: () => arrow.moveUp(),
        ArrowDown: () => arrow.moveDown()
      };

      const move = keys[event.key];
      if (move) {
        move();
        drawArrow(arrow.getInfo());
      }
    };

    const shoot = document.getElementById('shoot');
    shoot.onclick = () => {
      document.onkeydown = null;
      shootArrow(arrow, board);
    };
  };

  class Arrow {
    #id;
    #position;
    #speed;
    constructor(id, position, speed) {
      this.#id = id;
      this.#position = position;
      this.#speed = speed;
    }

    moveLeft() {
      this.#position.left -= this.#speed.dx;
    }

    moveUp() {
      this.#position.top -= 2;
    }

    moveDown() {
      this.#position.top += 2;
    }

    isBefore(ordinate) {
      return this.#position.left > ordinate;
    }

    isAbove(abscissa) {
      return this.#position.top > abscissa;
    }

    isBelow(abscissa) {
      return this.#position.top < abscissa;
    }

    getInfo() {
      return {
        id: this.#id,
        position: { top: this.#position.top, left: this.#position.left },
        speed: { dx: this.#speed.dx }
      };
    }
  }

  window.onload = main;
})();
