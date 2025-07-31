// AMQ Player Answer Times Utility
// version 1.5
// this script is fetched automatically, do not attempt to add it to tampermonkey

const amqAnswerTimesUtility = new function () {
    "use strict"
    this.playerTimes = []
    if (typeof Listener === "undefined") {
        return
    }
    
    new Listener("play next song", () => {
        this.playerTimes = []
    }).bindListener()

    new Listener("player answered", (data) => {
        for (const item of data) {
            for (const id of item.gamePlayerIds) {
                this.playerTimes[id] = item.answerTime * 1000
            }
        }
    }).bindListener()
}()
