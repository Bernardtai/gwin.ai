# Game Assets and Data

This directory contains the game data and assets for the WG Gaming Platform integration.

## Files

- `games.json` - Complete game data including 12 games from the WG Gaming platform
- `images/games/` - Directory for game images and icons (placeholder images can be generated)

## Game Data Structure

Each game in the JSON file contains the following fields:

```json
{
  "id": "unique-game-identifier",
  "name": "Game Display Name",
  "category": "Game Category (Slot Games, Table Games, Poker, etc.)",
  "platform": ["Web", "Mobile", "Desktop"],
  "size": "File size in MB",
  "provider": "Game Provider",
  "rating": 4.8,
  "players": "Player count (e.g., '50K+')",
  "status": "Live or Beta",
  "image": "/assets/images/games/game-image.jpg",
  "icon": "/assets/images/games/game-icon.png",
  "description": "Game description",
  "features": ["Feature 1", "Feature 2", "Feature 3"],
  "launchUrl": "https://wg.com/games/game-url"
}
```

## Games Included

1. **Dragon Treasure** - Slot Games
2. **Blackjack Pro** - Table Games
3. **Roulette Royal** - Table Games
4. **Poker Tournament** - Poker
5. **Baccarat Luxury** - Table Games
6. **Mega Fortune** - Slot Games
7. **Sports Betting Pro** - Sports
8. **Lottery Gold** - Lottery
9. **Live Casino** - Live Games
10. **Fruit Burst** - Slot Games
11. **Texas Hold'em Pro** - Poker
12. **Mystic Reels** - Slot Games

## Integration

The games data is automatically loaded into the services page and displays:
- Game cards with images and descriptions
- Platform compatibility badges
- Player counts and ratings
- Launch buttons that open games in new tabs
- Dynamic statistics based on the actual game data

## Image Generation

To generate placeholder images for the games, open `generate-placeholder-images.html` in a browser and save the generated images to the `images/games/` directory.

## Data Source

This data is based on the WG Gaming platform (wg.com) which provides:
- Super Pack Network (超级包网) system
- Game API integration
- Built-in wallet system
- Multi-language support (20+ languages)
- Global coverage (95% of world population)

## Updates

To add new games or update existing ones, modify the `games.json` file and ensure corresponding images are added to the `images/games/` directory.
