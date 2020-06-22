class EntinyManager {
  constructor(context, level, entitiesConfig, Entity) {
    this.entities = entitiesConfig.map(
      (entityConfig) => new Entity(context, level, entityConfig)
    );

    this.loadingHandler = new Promise((resolve) => {
      const npcLodingHandler = this.entities.map(
        ({ loadingHandler }) => loadingHandler
      );

      Promise.all(npcLodingHandler).then(() => resolve());
    });
  }

  resetPosition(tileSize) {
    this.entities.map((entity) => {
      entity.resetPosition(tileSize);
    });
  }

  draw(tileSize) {
    this.entities.map((entity) => {
      entity.draw(tileSize);
    });
  }
}

export default EntinyManager;
