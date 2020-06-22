class EventManager {
  constructor(events, gameObjects) {
    this.events = events(gameObjects);
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
