function GameMode() {
    //game mode
    var gameMode = {
        current: 0,
        getReady: 0,
        strategyMode: 1,
        resourceMode: 2,
        duelMode: 3,
    }

    var that = this;
    var mainWrapper = document.getElementsByClassName('main-wrapper')[0];
    var startScreen;
    var playBtn;
    var modeSelection, strategy, resource, duel, back;

    this.init = function() {
        //start screen
        startScreen = document.createElement('div');
        playBtn = document.createElement('button');

        mainWrapper.appendChild(startScreen);
        startScreen.appendChild(playBtn);

        startScreen.className = 'start-screen';
        playBtn.className = 'play-btn';

        //mode selection
        modeSelection = document.createElement('div');
        strategy = document.createElement('button');
        resource = document.createElement('button');
        duel = document.createElement('button');
        back = document.createElement('button');

        mainWrapper.appendChild(modeSelection);
        modeSelection.appendChild(strategy);
        modeSelection.appendChild(resource);
        modeSelection.appendChild(duel);
        modeSelection.appendChild(back);

        modeSelection.className = 'mode-selection';
        strategy.className = 'strategy-btn';
        resource.className = 'resource-btn';
        duel.className = 'duel-btn';
        back.className = 'back-btn';

        that.btnClickAction();

    }

    this.btnClickAction = function() {
        playBtn.onclick = that.selectMode;
        strategy.onclick = that.strategyGame;
        resource.onclick = that.resourceGame;
        duel.onclick = that.duelGame;
        back.onclick = function() {
            modeSelection.style.display = 'none';
            startScreen.style.display = 'block';
        };
    }
    this.selectMode = function() {
        startScreen.style.display = 'none';
        modeSelection.style.display = 'block';
    }
    this.strategyGame = function() {
        modeSelection.style.display = 'none';
        gameMode.current = gameMode.strategyMode;
        if (gameMode.current == gameMode.strategyMode) {
            var game = new SheepGame(gameMode);
            game.init();
        }
    }
    this.resourceGame = function() {
        modeSelection.style.display = 'none';
        gameMode.current = gameMode.resourceMode;
        if (gameMode.current == gameMode.resourceMode) {
            var game = new SheepGame(gameMode);
            game.init();
        }
    }
    this.duelGame = function() {
        modeSelection.style.display = 'none';
        gameMode.current = gameMode.duelMode;
        if (gameMode.current == gameMode.duelMode) {
            var game = new DuelMode(gameMode);
            game.init();
        }
    }
}
new GameMode().init();