import playerImage from './../../../assets/textures/animation-player.gif';
import catImage from './../../../assets/textures/animation-cat.gif';
import workerImage from './../../../assets/textures/animation-worker.gif';
import roboImage from './../../../assets/textures/animation-robo.gif';
import { getEventConfig } from './constants';

class EventManager {
  constructor(gameActions, siteActions) {
    this.events = getEventConfig(
      { gameActions, siteActions },
      {
        player: playerImage,
        cat: catImage,
        worker: workerImage,
        robo: roboImage,
      }
    );
    this.currentEvent = null;
  }

  checkEvent(player) {
    const nextEvent = this.events.find(
      (event) =>
        player.row >= event.row[0] &&
        player.row <= event.row[1] &&
        player.col >= event.col[0] &&
        player.col <= event.col[1]
    );

    if (!this.currentEvent && nextEvent) {
      this.currentEvent = nextEvent;
      this.currentEvent.eventHandler(player);
    } else if (this.currentEvent && nextEvent) {
      if (nextEvent.id !== this.currentEvent.id) {
        this.currentEvent.onLeave();
        this.currentEvent = nextEvent;
        this.currentEvent.eventHandler();
      }
    } else if (this.currentEvent && !nextEvent) {
      this.currentEvent.onLeave();
      this.currentEvent = null;
    }
  }
}

export default EventManager;
