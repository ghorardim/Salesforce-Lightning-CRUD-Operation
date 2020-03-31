({
    init: function (component, event, helper) {
        localStorage.clear();
        var gameDataJs = [];
        if (localStorage.getItem("exData") === null) {
            console.log('init call..');
            var i, j, x;
            x = 100;
            for (i = 0; i < 3; i++) {
                var singleRowGameData = [];
                for (j = 0; j < 3; j++) {
                    singleRowGameData[j] = x++;
                }
                gameDataJs.push(singleRowGameData);
            }
        } else {
            console.log("Ex-Data", JSON.parse(localStorage.getItem("exData")));
            gameDataJs = JSON.parse(localStorage.getItem("exData"));
            helper.setGameBoard(component, gameDataJs);
        }
        component.set('v.gameData', gameDataJs);

    },
    handleClick: function (component, event, helper) {
        var button = event.getSource();
        var buttonState = button.get('v.disabled');
        if (buttonState == false) {
            helper.gameStep(component,button);
        }
    },
    resetButton: function () {
        localStorage.clear();
        document.location.reload();
    },
    handleStartGame: function (component, event, helper) {
        var isGameBoardVisiable = component.get('v.isGameBoardVisiable');
        isGameBoardVisiable = true;
        component.set('v.isGameBoardVisiable', isGameBoardVisiable);
        helper.startTimeCounting(component);  
    }
})