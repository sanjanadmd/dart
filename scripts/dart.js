(function () {
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

    isAfter(ordinate) {
      return this.#position.left < ordinate;
    }

    get position() {
      return { top: this.#position.top, left: this.#position.left };
    }

    getInfo() {
      return {
        id: this.#id,
        position: { top: this.#position.top, left: this.#position.left },
        speed: { dx: this.#speed.dx }
      };
    }
  }

  class Board {
    #id;
    #position;
    #height;
    #width;

    constructor(id, position, height, width) {
      this.#id = id;
      this.#position = position;
      this.#height = height;
      this.#width = width;
    }

    #getExtremes() {
      return {
        start: this.#position.top + this.#width,
        end: this.#position.top + this.#height
      };
    }

    hasCollision({ top, left }) {
      const { start, end } = this.#getExtremes();
      return top >= start && top <= end && left === this.#position.left;
    }

    getInfo() {
      return {
        id: this.#id,
        position: { top: this.#position.top, left: this.#position.left },
        height: this.#height,
        width: this.#width
      };
    }
  }

  const px = (value) => value + 'px';

  const createBoard = (view, board) => {
    const boardElement = document.createElement('div');
    boardElement.id = board.id;
    boardElement.className = 'board';
    boardElement.style.top = px(board.position.top);
    boardElement.style.left = px(board.position.left);
    boardElement.style.width = px(board.width);
    boardElement.style.height = px(board.height);

    view.appendChild(boardElement);
  };

  const createArrow = (view, { id }) => {
    const arrow = document.createElement('div');
    arrow.id = id;
    arrow.className = 'arrow';
    view.appendChild(arrow);
  };

  const drawArrow = (arrow) => {
    const arrowElement = document.getElementById(arrow.id);
    const { top, left } = arrow.position;

    arrowElement.style.left = px(left);
    arrowElement.style.top = px(top);
    arrowElement.style.boxSizing = 'border-box';
  };

  const didArrowHitBoard = (arrow, board) =>
    board.hasCollision(arrow.position);

  const didArrowCrossExtreme = (arrow, extreme = 1) =>
    arrow.isAfter(extreme);

  const isGameRunning = (arrow, board) =>
    !(didArrowHitBoard(arrow, board) || didArrowCrossExtreme(arrow));

  const getGameResult = (arrow, board) =>
    didArrowHitBoard(arrow, board) ? 'won' : 'lost';

  const shootArrow = (arrow, board) => {
    const intervalId = setInterval(() => {
      if (isGameRunning(arrow, board)) {
        arrow.moveLeft();
        drawArrow(arrow.getInfo());
        return;
      }

      const gameResult = getGameResult(arrow, board);
      displayResult(gameResult);
      clearInterval(intervalId);
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
    const view = document.getElementById('view');

    const board = new Board('board', { top: 100, left: 100 }, 200, 0);
    const arrow = new Arrow('arrow', { top: 100, left: 400 }, { dx: 4 });

    createBoard(view, board.getInfo());
    createArrow(view, arrow.getInfo());

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

  window.onload = main;
})();
