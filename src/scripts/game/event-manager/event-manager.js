import playerImage from './../../../assets/textures/animation-player.gif';
import catImage from './../../../assets/textures/animation-cat.gif';
import workerImage from './../../../assets/textures/animation-worker.gif';
import { getEventConfig } from './constants';

class EventManager {
  constructor(siteActions) {
    this.events = getEventConfig(siteActions, {
      player: playerImage,
      cat: catImage,
      worker: workerImage
    });
    this.currentEvent = null;
  }

  checkEvent(playerRow, playerCol) {
    const nextEvent = this.events.find(
      event =>
        playerRow >= event.row[0] &&
        playerRow <= event.row[1] &&
        playerCol >= event.col[0] &&
        playerCol <= event.col[1]
    );

    if (!this.currentEvent && nextEvent) {
      this.currentEvent = nextEvent;
      this.currentEvent.eventHandler();
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
