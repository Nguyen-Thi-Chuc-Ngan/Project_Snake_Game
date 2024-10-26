/**
 * Nguyễn Thị Chúc Ngân
 * 21130451
 * Khóa 47
 * 0869769142
 * Lớp DH21DTC
 */
$(document).ready(function () {
    const board = $('#game-board');
    const StartButton = $('#start-button');
    const ResetButton = $('#reset-btn');
    const PauseButton = $('#pause-button');
    const SkipButton = $('#skip-button');
    const instructionText = $('#instruction-text');
    const gridRow = 30; // Số hàng trên bảng trò chơi
    const gridColumn = 20; // Số cột trên bảng trò chơi
    const WINNING_SCORE = 100; // Điểm số cần đạt để chiến thắng
    const defaultMaze = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];//ma trận cho level 3
    let movingFoodPosition; //vị trí của thức ăn di chuyển (rắn bot)
    let poisonousMushroom; //nấm độc
    let score = 0;
    let snakeBody = [{x: gridRow / 2, y: gridColumn / 2}]; //vị trí lúc đầu của con rắn là giữa màn hình
    let SNAKE_SPEED = 7; // Tốc độ di chuyển của con rắn
    let isPaused = false;
    let isResetting = false;
    let isGameOver = false;
    let obstacleInterval;
    let lastRenderTime = 0; // Thời gian cuối cùng vẽ frame trò chơi
    let inputDirection = {x: 0, y: 0}; // Hướng di chuyển của con rắn từ input người chơi
    let lastInputDirection = {x: 0, y: 0}; // Hướng di chuyển của con rắn từ input trước đó của người chơi
    let obstacles = []; // mảng chứ chướng ngại vật
    let food = generateFood(); // Vị trí của thức ăn trên bảng

    let isReversedDirection = false;
    let currentLevel = 1;


    //*****************************Phần này là xử lý giao diện****************************************//
    const optionsLevel = $('.options_level');
    const option = $('.option');
    const levelButton = $('#level');
    levelButton.click(() => {
        optionsLevel.show();
        option.hide();
    })

    function startGameAtLevel(level) {
        currentLevel = level;
        resetGame();
        StartButton.click();
        $('.container').hide();
        $('.container-2').show();
    }

    function updateCurrentLevel() {
        $('#high-score').text(currentLevel);
    }


    $('#level1').click(() => startGameAtLevel(1));
    $('#level2').click(() => startGameAtLevel(2));
    $('#level3').click(() => startGameAtLevel(3));
    $('#level4').click(() => startGameAtLevel(4));
    $('#level5').click(() => startGameAtLevel(5));
    $('#level6').click(() => startGameAtLevel(6));
    $('.container-2').hide();
    $('#play-game').click(() => {
        $('.container').hide();
        $('.container-2').show();
    });

    $('#back-button').click(() => {
        $('.container').show();
        $('.container-2').hide();
        optionsLevel.hide();
        option.show();
    })

    PauseButton.hide();

    PauseButton.click(function () {
        isPaused = true;
        $(this).hide();
        StartButton.show();
    });

    $("#info-game").click(function () {
        $("#info-popup").css("display", "block");
    });

    $("#close-popup").click(function () {
        $("#info-popup").css("display", "none");
    });

    $("#info-actor").click(function () {
        $("#info-actor-popup").css("display", "block");
    });

    $("#close-actor-popup").click(function () {
        $("#info-actor-popup").css("display", "none");
    });

    var closeImage = document.getElementById("close-program");

    // Thêm sự kiện click
    closeImage.addEventListener("click", function() {
        // Tắt chương trình
        window.close();
    });
    //*****************************Phần này là xử lý logic trò chơi snake ****************************************//

    /**
     * main(currentTime): Đây là hàm chính của trò chơi
     * Ở đây nó chịu trách nhiệm cập nhật trò chơi và vẽ frame mới cho trò chơi
     * @param currentTime Thời gian hiện tại
     */
    function main(currentTime) {
        if (!isPaused) {
            window.requestAnimationFrame(main)
            const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
            if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
            lastRenderTime = currentTime;
            update();
            draw();
        }
    }

    /**
     * Bắt đầu trò chơi
     */
    StartButton.click(function () {
        instructionText.hide();
        hideWinGameMessage();
        isResetting = false;
        isPaused = false;
        isGameOver = false;
        window.requestAnimationFrame(main);
        $(this).hide().siblings('#pause-button').show();
        if (currentLevel === 4) {
            obstacleInterval = setInterval(addObstacle, 4000);
        }
        updateCurrentLevel();
        if (!poisonousMushroom) {
            poisonousMushroom = generatePoisonousMushroom();
        }
        drawPoisonousMushroom(board);
        if (currentLevel === 6) {
            createMovingFood();
        }

    });


    /**
     * Vẽ các khối trong trò chơi
     */
    function draw() {
        board.empty();
        drawSnake(board);
        drawFood(board);
        obstacles.forEach((obstacle) => {
            const obstacleElement = createGameElement('div', 'obstacle');
            setPosition(obstacleElement, obstacle);
            board.append(obstacleElement);
        });
        if (currentLevel === 3) {
            SNAKE_SPEED = 7;
            createDefaultMaze();
        }
        if (currentLevel === 4) {
            drawPoisonousMushroom(board);
        }
        if (currentLevel === 6) { // Di chuyển lệnh hiển thị mồi di chuyển vào đây
            updateMovingFood();
            displayMovingFood();
        }

    }

    /**
     * Cập nhật lại
     */
    function update() {
        updateSnake();
        updateFood();
        if (score >= WINNING_SCORE && currentLevel < 6) {
            winGame();
        }
        if (currentLevel === 4) {
            updatePoisonousMushroom();
        }
    }

    /**
     * Hàm này vẽ con rắn
     * @param board
     */
    function drawSnake(board) {
        snakeBody.forEach((segment, index) => {
            const snakeElement = createGameElement('div', 'snake');
            setPosition(snakeElement, segment);
            if (index === 0) {
                snakeElement.classList.add('snake-head'); // Thêm class cho đầu con rắn
            }
            board.append(snakeElement);
        });
    }

    /**
     * Hàm này vẽ nấm độc
     * @param board
     */
    function drawPoisonousMushroom(board) {
        const mushroomElement = createGameElement('div', 'poisonous-mushroom');
        setPosition(mushroomElement, poisonousMushroom);
        board.append(mushroomElement);
    }

    /**
     * tạo nấm độc ở vị trí ngẫu nhiên
     * @returns {{x: number, y: number}}
     */
    function generatePoisonousMushroom() {
        let mushroomPosition;
        do {
            const x = Math.floor(Math.random() * gridRow) + 1;
            const y = Math.floor(Math.random() * gridColumn) + 1;
            mushroomPosition = {x, y};
        } while (isMushroomOnSnake(mushroomPosition) || isMushroomOnFood(mushroomPosition) || isMushroomOnObstacle(mushroomPosition));
        return mushroomPosition;
    }

    /**
     * kiểm tra nấm độc có nằm trên chướng ngại vật hay không
     * @param position
     * @returns {boolean}
     */
    function isMushroomOnObstacle(position) {
        if (!obstacles || obstacles.length === 0) {
            return false;
        }

        for (const obstacle of obstacles) {
            if (position.x === obstacle.x && position.y === obstacle.y) {
                return true;
            }
        }
        return false;
    }

    /**
     * isMushroomOnSnake(): đảm bảo nấm độc không hiển thị lên trên con rắn.
     * @param position
     * @returns {boolean}
     */
    function isMushroomOnSnake(position) {
        for (const segment of snakeBody) {
            if (position.x === segment.x && position.y === segment.y) {
                return true;
            }
        }
        return false;
    }

    // Hàm này kiểm tra xem nấm độc có trùng với thức ăn không
    function isMushroomOnFood(position) {
        if (position.x === food.x && position.y === food.y) {
            return true;
        }
        return false;
    }

    //cập nhật lại nấm độc nếu bị rắn ăn thì tạo mới
    function updatePoisonousMushroom() {
        if (!poisonousMushroom) {
            poisonousMushroom = generatePoisonousMushroom();
        }
    }


    /**
     *
     * @param tag
     * @param className
     * @returns {HTMLAnchorElement | HTMLElement | HTMLAreaElement | HTMLAudioElement | HTMLBaseElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLButtonElement | HTMLCanvasElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLEmbedElement | HTMLFieldSetElement | HTMLFormElement | HTMLHeadingElement | HTMLHeadElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLImageElement | HTMLInputElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLLinkElement | HTMLMapElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLObjectElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLProgressElement | HTMLScriptElement | HTMLSelectElement | HTMLSlotElement | HTMLSourceElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTimeElement | HTMLTitleElement | HTMLTableRowElement | HTMLTrackElement | HTMLUListElement | HTMLVideoElement}
     */
    function createGameElement(tag, className) {
        const element = document.createElement(tag);
        element.className = className;
        return element;
    }

    /**
     * tạo ma trận mặc định
     */
    function createDefaultMaze() {
        for (let i = 0; i < defaultMaze.length; i++) {
            for (let j = 0; j < defaultMaze[i].length; j++) {
                if (defaultMaze[i][j] === 1) {
                    // Tạo chướng ngại vật tại vị trí (i, j)
                    const obstacle = {x: j + 1, y: i + 1};
                    obstacles.push(obstacle);
                    const obstacleElement = createGameElement('div', 'obstacle');
                    setPosition(obstacleElement, obstacle);
                    board.append(obstacleElement);
                }
            }
        }
    }

    let movingFoodDirection = null;

    /**
     * hàm này tạo rắn bot
     */
    function createMovingFood() {
        // Tạo ngẫu nhiên hướng di chuyển ban đầu
        randomizeDirection();

        // Vị trí ban đầu của thức ăn di chuyển
        movingFoodPosition = {
            x: 15,
            y: 13
        };
    }

    // random hướng đi
    function randomizeDirection() {
        const directions = [
            {x: 0, y: -1}, // Up
            {x: 0, y: 1},  // Down
            {x: -1, y: 0}, // Left
            {x: 1, y: 0}   // Right
        ];

        // Tạo một số ngẫu nhiên từ 0 đến 1
        const randomValue = Math.random();

        // Tùy thuộc vào giá trị ngẫu nhiên, chọn phần tử tương ứng
        if (randomValue < 0.25) {
            movingFoodDirection = directions[0]; // Chọn Up
        } else if (randomValue < 0.5) {
            movingFoodDirection = directions[1]; // Chọn Down
        } else if (randomValue < 0.75) {
            movingFoodDirection = directions[2]; // Chọn Left
        } else {
            movingFoodDirection = directions[3]; // Chọn Right
        }
    }

    // cập nhật lại vị trí rắn bot di chuyển
    function updateMovingFood() {
        // Di chuyển thức ăn theo hướng hiện tại
        movingFoodPosition.x += movingFoodDirection.x;
        movingFoodPosition.y += movingFoodDirection.y;

        // Nếu thức ăn ra khỏi biên, chọn lại hướng ngẫu nhiên
        if (movingFoodPosition.x <= 0 || movingFoodPosition.x > gridRow || movingFoodPosition.y <= 0 || movingFoodPosition.y > gridColumn) {
            randomizeDirection();
        }
    }


    // hiển thị rắn bot
    function displayMovingFood() {
        const movingFoodElement = createGameElement('div', 'moving-food');
        setPosition(movingFoodElement, movingFoodPosition);
        board.append(movingFoodElement);
        movingFoodElement.style.animation = 'movingAnimation 1s infinite alternate';
    }

    function checkMovingFoodCollision() {
        if (!movingFoodPosition) {
            return false; // Trả về false nếu movingFoodPosition chưa được định nghĩa
        }

        let head = snakeBody[0];
        return movingFoodPosition.x === head.x && movingFoodPosition.y === head.y;
    }

    /**
     *
     * @param elememt
     * @param position
     */
    function setPosition(elememt, position) {
        elememt.style.gridRowStart = position.y;
        elememt.style.gridColumnStart = position.x;
    }

    /**
     * cập nhật con rắn
     */
    function updateSnake() {
        const input = getInputDirection();
        const newHead = {x: snakeBody[0].x + input.x, y: snakeBody[0].y + input.y};
        if (checkCollision() || checkObstacleCollision() || checkMovingFoodCollision()) {
            isPaused = true;
            gameOver();
            return;
        }
        if (newHead.x <= 0 || newHead.x > gridRow || newHead.y <= 0 || newHead.y > gridColumn) {
            switch (currentLevel) {
                case 1:
                    updateSnakeThroughWalls(newHead);//đi xuyên tường
                    break;
                case 2:
                    updateSnakeWithinBounds();//không xuyên qua tường
                    break;
                case 3:
                    updateSnakeDefaultMaze()
                    break;
                case 4:
                    updateSnakeObstacle();
                    break;
                case 5:
                    addObstacle();
                    updateSnakeThroughWalls(newHead);//đi xuyên tường
                    break;
                case 6:
                    updateSnakeWithinBounds();//không xuyên qua tường
                    break;
            }
        }
        const ateFood = newHead.x === food.x && newHead.y === food.y;
        snakeBody.unshift(newHead);
        if (!ateFood) {
            snakeBody.pop(); // Cắt đuôi của con rắn đi để duy trì kích thước
        } else {
            $('.food').removeClass('blink'); // Loại bỏ class blink khi thức ăn được tạo mới
        }
        if (!ateFood && currentLevel === 6) {
            updateMovingFood();
        }

        lastInputDirection = {...input};

        if (currentLevel === 4) {
            const ateMushroom = snakeBody[0].x === poisonousMushroom.x && snakeBody[0].y === poisonousMushroom.y;
            if (ateMushroom) {
                isReversedDirection = true;
                // Xóa nấm độc khỏi màn hình
                poisonousMushroom = null;

                inputDirection = {x: -lastInputDirection.y, y: -lastInputDirection.x};

            }
        }
    }

    // Cập nhật lại giá trị của currentLevel khi người chơi hoàn thành một cấp độ hoặc bấm skip
    function levelUp() {
        score = 0;
        currentLevel++;
        updateCurrentLevel();
    }

    function updateSnakeThroughWalls(newHead) {
        // Xử lý việc con rắn xuyên tường
        if (newHead.x <= 0) newHead.x = gridRow;
        if (newHead.x > gridRow) newHead.x = 1;
        if (newHead.y <= 0) newHead.y = gridColumn;
        if (newHead.y > gridColumn) newHead.y = 1;
    }

    function updateSnakeWithinBounds() {
        gameOver();
        isPaused = true;
        return;
    }

    function updateSnakeDefaultMaze() {
        updateSnakeWithinBounds()

    }

    function updateSnakeObstacle() {
        if (checkObstacleCollision() || updateSnakeWithinBounds()) {
            isPaused = true;
            gameOver();
        }
    }


    /**
     * Hàm này tạo chướng ngại vật
     * @returns {{x: number, y: number}}
     */
    function generateObstacle() {
        let obstaclePosition;
        do {
            const x = Math.floor(Math.random() * gridRow) + 1;
            const y = Math.floor(Math.random() * gridColumn) + 1;
            obstaclePosition = {x, y}
        } while (isObstacleOnSnake(obstaclePosition) || isObstacleOnFood(obstaclePosition));
        return obstaclePosition;
    }

    function generateObstacleAtSnakePosition() {
        let obstaclePosition;
        do {
            const randomIndex = snakeBody.length - 1;
            obstaclePosition = {...snakeBody[randomIndex]};
        } while (isObstacleOnFood(obstaclePosition));

        // Thêm vào vị trí cuối cùng của đuôi của con rắn
        snakeBody.push(obstaclePosition);
        return obstaclePosition;
    }


    function isObstacleOnSnake(position) {
        for (const segment of snakeBody) {
            if (position.x === segment.x && position.y === segment.y) {
                return true;
            }
        }
        return false;
    }

    // Hàm này kiểm tra xem chướng ngại vật có trùng với thức ăn không
    function isObstacleOnFood(position) {
        if (position.x === food.x && position.y === food.y) {
            return true;
        }
        return false;
    }

    // Logic xử lý va chạm với chướng ngại vật
    function checkObstacleCollision() {
        let head = snakeBody[0];
        for (const obstacle of obstacles) {
            if (head.x === obstacle.x && head.y === obstacle.y) {
                return true;
            }
        }
        return false;
    }

    function gameOver() {
        isGameOver = true;
        score = 0;
        clearInterval(obstacleInterval);
        instructionText.text("Game Over!")
        instructionText.css("font-size", "45px");
        instructionText.show();
    }

    // Thêm chướng ngại vật vào trò chơi
    function addObstacle() {
        if (currentLevel === 4) {
            if ((!isResetting && !isGameOver) || !isPaused) {
                const obstacle = generateObstacle();
                obstacles.push(obstacle);
                const obstacleElement = createGameElement('div', 'obstacle');
                setPosition(obstacleElement, obstacle);
                board.append(obstacleElement);
            }
        }

        if (currentLevel === 5) {
            // Thêm chướng ngại vật ở các điểm con rắn đã đi qua
            const obstacleAtSnakePosition = generateObstacleAtSnakePosition();
            obstacles.push(obstacleAtSnakePosition);
            const obstacleAtSnakeElement = createGameElement('div', 'obstacle');
            setPosition(obstacleAtSnakeElement, obstacleAtSnakePosition);
            board.append(obstacleAtSnakeElement);
            score -= 10;
        }
    }

    function checkCollision() {
        let head = snakeBody[0];
        console.log(head);
        let body = snakeBody.slice(1, snakeBody.length);
        for (let part of body) {
            if (part.x === head.x && part.y === head.y) {
                return true;
            }
        }
        return false;
    }


    function resetGame() {
        isResetting = true;
        isPaused = true;

        clearInterval(obstacleInterval);
        snakeBody = [{x: gridRow / 2, y: gridColumn / 2}];
        food = generateFood();
        obstacles = [];

        board.find('.snake').remove();
        board.find('.food').remove();
        board.find('.obstacle').remove();
        board.find('.poisonous-mushroom').remove();
        board.find('.moving-food').remove();
        StartButton.show();

        PauseButton.hide();
        // Hiển thị lại phần tử instructionText
        instructionText.text("Press play to start the game").show();
        score = 0;
        updateScore();
    }

    function winGame() {
        isPaused = true;
        instructionText.text("Congratulations! You won the game!");
        instructionText.css("font-size", "45px");
        instructionText.show();
    }

    /**
     *
     * @returns {{x: number, y: number}}
     */
    function getInputDirection() {
        lastInputDirection = inputDirection;

        return inputDirection;
    }

    /**
     *
     */
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (lastInputDirection.y !== 0) break;
                inputDirection = {x: 0, y: -1}
                break;
            case 'ArrowDown':
                if (lastInputDirection.y !== 0) break;
                inputDirection = {x: 0, y: 1}
                break;
            case 'ArrowLeft':
                if (lastInputDirection.x !== 0) break;
                inputDirection = {x: -1, y: 0};
                break;
            case 'ArrowRight':
                if (lastInputDirection.x !== 0) break;
                inputDirection = {x: 1, y: 0};
                break;
        }
    });

    /**
     * drawFood(board): hàm này sẽ chiun trách nhiệm vẽ thức lên khung trò chơi
     * @param board
     */
    function drawFood(board) {
        const foodElement = createGameElement('div', 'food blink');
        setPosition(foodElement, food);
        board.append(foodElement);
    }

    function updateScore() {
        if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
            score += 10; // Tăng điểm số lên 10 mỗi khi ăn thức ăn

        }
        $('#score').text(pad(score, 3)); // Hiển thị điểm số trên giao diện
    }

    function pad(num, size) {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    /**
     *
     */
    function updateFood() {
        updateScore();
        if (snakeBody[0].x === food.x && snakeBody[0].y === food.y) {
            food = generateFood();

        } else {
            $('.food').addClass('blink'); // Thêm class blink khi thức ăn vẫn tồn tại
        }
    }

    /**
     *
     * @returns {{x: number, y: number}}
     */
    function generateFood() {
        let foodPosition;
        do {
            const x = Math.floor(Math.random() * gridRow) + 1;
            const y = Math.floor(Math.random() * gridColumn) + 1;
            foodPosition = {x, y}
        }
        while (isFoodOnSnake(foodPosition) || isFoodOnObstacle(foodPosition) || isFoodOnMaze(foodPosition));
        return foodPosition;
    }

    /*
     * isFoodOnSnake(): đảm bảo thức ăn sẽ không hiển thị lên trên con rắn.
     * @param position
     * @returns {boolean}
     */
    function isFoodOnSnake(position) {
        for (const segment of snakeBody) {
            if (position.x === segment.x && position.y === segment.y) {
                return true;
            }
        }
        return false;
    }

    function isFoodOnObstacle(position) {
        if (!obstacles || obstacles.length === 0) {
            return false;
        }

        for (const obstacle of obstacles) {
            if (position.x === obstacle.x && position.y === obstacle.y) {
                return true;
            }
        }
        return false;
    }

    function isFoodOnMaze(position) {
        for (const row of defaultMaze) {
            for (const cell of row) {
                if (cell === 1 && position.x === cell.x && position.y === cell.y) {
                    return true;
                }
            }
        }
        return false;
    }

    function hideWinGameMessage() {
        instructionText.hide();
    }

    function showSkipMessage() {
        instructionText.text("Level " + currentLevel).show();
    }

    ResetButton.click(() => {
        isResetting = true;
        resetGame();
    });
    SkipButton.click(() => {
        if (currentLevel < 6) {
            levelUp();
            resetGame();
        }
        isPaused = true;
        StartButton.show();

        PauseButton.hide();
        updateCurrentLevel();
        // Hiển thị lại phần tử instructionText
        hideWinGameMessage(); // Ẩn thông báo chiến thắng
        showSkipMessage(); // Hiển thị thông báo skip
    });
});
