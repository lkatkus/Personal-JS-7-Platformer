import { EVENT_CONFIG } from './constants'

class EventManager {
    constructor() {
        this.events = EVENT_CONFIG;
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
