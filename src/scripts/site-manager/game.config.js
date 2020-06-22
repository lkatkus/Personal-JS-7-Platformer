import NpcCatTexture from './../../assets/textures/npc-cat-tileSheet.png';
import PlayerTexture from './../../assets/textures/player-tile-sheet.png';

const PLAYER_CONFIG = {
  name: 'player',
  movement: {
    speedX: 8,
    speedY: 8,
  },
  texture: {
    source: PlayerTexture,
    height: 200,
    width: 100,
    tileCols: 8,
    drawOffset: 1,
    drawHeightOffset: 2,
  },
};

const NPC_CONFIG = [
  {
    name: 'cat',
    movement: {
      speedX: 10,
      speedY: 8,
    },
    texture: {
      source: NpcCatTexture,
      height: 64,
      width: 64,
      tileCols: 3,
      drawOffset: 0,
      drawHeightOffset: 1,
    },
    min: {
      row: 33,
      col: 12,
    },
    max: {
      row: 33,
      col: 24,
    },
  },
];

export const GAME_CONFIG = {
  player: PLAYER_CONFIG,
  npc: NPC_CONFIG,
};
