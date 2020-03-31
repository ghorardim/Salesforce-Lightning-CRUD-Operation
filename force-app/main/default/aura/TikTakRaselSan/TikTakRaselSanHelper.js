({
    checkWining: function (gameDataJs) {
        var i, j;
        /* horizontal check */
        for (i = 0; i < 3; i++) {
            if (gameDataJs[i][0] == gameDataJs[i][1] && gameDataJs[i][1] == gameDataJs[i][2]) {
                console.log('hozizontal: ' + gameDataJs[i][1]);
                return true;
            }
        }
        /* vertical check */
        for (i = 0; i < 3; i++) {
            if (gameDataJs[0][i] == gameDataJs[1][i] && gameDataJs[1][i] == gameDataJs[2][i]) {
                console.log('vertical: ' + gameDataJs[i][1]);
                return true;
            }
        }
        /* diagonal check */
        if ((gameDataJs[1][1] == gameDataJs[0][0] && gameDataJs[1][1] == gameDataJs[2][2]) ||
            (gameDataJs[1][1] == gameDataJs[0][2] && gameDataJs[1][1] == gameDataJs[2][0])) {
            console.log('diagoanl: ' + gameDataJs[0][0] + ' ' + gameDataJs[2][2]);
            console.log('diagoanl: ' + gameDataJs[0][1] + ' ' + gameDataJs[2][0]);
            return true;
        }
        return false;
    },
    checkWiningHelper: function (count, component, button) {
        var gameDataJs = component.get('v.gameData');
        var buttonId = button.getLocalId();
        console.log('1st: ' + buttonId[0] + '  2nd: ' + buttonId[1]);
        var row = buttonId[0];
        var colum = buttonId[1];
        if (count % 2 == 0) {
            gameDataJs[row][colum] = '0';
        } else {
            gameDataJs[row][colum] = '1';
        }
        component.set('v.gamedata', gameDataJs);
        localStorage.setItem("exData", JSON.stringify(gameDataJs));
        var isWainng = this.checkWining(gameDataJs);
        this.resetTimeCounting(component);
        return isWainng;
    },
    setGameBoard: function (component, gameDataJs) {
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                var buttonID = '' + i + j;
                var button = component.find(buttonID);
                if (gameDataJs[i][j] == 0) {
                    button.set("v.label", "O");
                    button.set('v.disabled', true);
                } else if (gameDataJs[i][j] == 1) {
                    button.set("v.label", "X");
                    button.set('v.disabled', true);
                }

            }
        }
    },
    waitingTime: null,
    startTimeCounting: function (component) {
        var runTime = component.get('v.runTime');
        if (runTime === '10') {
            alert('Sorry Time Up');
            this.autoStep(component);
            this.resetTimeCounting(component);
            return;
        }
        var dt = new Date();
        dt.setHours('00');
        dt.setMinutes('00');
        dt.setSeconds(runTime);
        var dt2 = new Date(dt.valueOf() + 1000);
        var temp = dt2.toTimeString().split(" ");
        temp = temp[0].split(":");
        component.set('v.runTime', '' + temp[2]);
        this.waitingTime = setTimeout($A.getCallback(() => this.startTimeCounting(component)), 1000);
    },
    resetTimeCounting: function (component) {
        component.set("v.runTime", "00");
        window.clearTimeout(this.waitingTimeId);
    },
    autoStep: function (component) {
        var gameDataJs = component.get('v.gameData');
        var btnID = 999;
        var i, j;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (gameDataJs[i][j] != 0 && gameDataJs[i][j] != 1) {
                    btnID = '' + i + j;
                    break;
                }
            }
            if (btnID != 999) break;
        }
        var button = component.find(btnID);
        this.gameStep(component,button);
        this.startTimeCounting(component);
    },
    gameStep: function (component, button) {
        var count = component.get('v.count');
        var player;
        if (count % 2 == 0) {
            button.set("v.label", "O");
            player = 'One';
        } else {
            button.set("v.label", "X");
            player = 'Two';
        }
        button.set('v.disabled', true);
        var winPlayer = this.checkWiningHelper(count, component, button);
        count++;
        component.set('v.count', count);
        setTimeout(function () {
            if (winPlayer == false && count == 9) {
                alert('Match Draw');
                localStorage.clear();
                document.location.reload();
            } else if (winPlayer == true) {
                alert('Win Player ' + player);
                localStorage.clear();
                document.location.reload();
            }
        }, 300);
    }
})