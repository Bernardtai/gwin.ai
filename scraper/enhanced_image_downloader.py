#!/usr/bin/env python3
"""
Enhanced WG Image Downloader
Downloads missing game images from wg.com and updates games.json
"""

import json
import os
import requests
import time
from pathlib import Path
from urllib.parse import urlparse

def load_games_data():
    """Load games data from JSON file"""
    json_path = Path(__file__).parent.parent / "public" / "assets" / "games.json"
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_games_data(games_data):
    """Save games data back to JSON file"""
    json_path = Path(__file__).parent.parent / "public" / "assets" / "games.json"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(games_data, f, indent=2, ensure_ascii=False)

def download_image(url, local_path):
    """Download image from URL to local path"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        # Create directory if it doesn't exist
        local_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Save image
        with open(local_path, 'wb') as f:
            f.write(response.content)
        
        print(f"✅ Downloaded: {local_path.name}")
        return True
    except Exception as e:
        print(f"❌ Failed to download {url}: {e}")
        return False

def generate_image_urls(game_id, base_id=None):
    """Generate possible image URLs for a game"""
    urls = []
    
    # If we have a base_id, use it
    if base_id:
        urls.extend([
            f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{base_id}.webp",
            f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{base_id}_icon.webp"
        ])
    
    # Try different ID patterns based on game ID
    if 'dragon' in game_id.lower():
        for i in range(5001, 5011):  # Dragon games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'fortune' in game_id.lower():
        for i in range(4001, 4011):  # Fortune games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'gold' in game_id.lower():
        for i in range(3001, 3011):  # Gold games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'diamond' in game_id.lower():
        for i in range(2001, 2011):  # Diamond games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'treasure' in game_id.lower():
        for i in range(1001, 1011):  # Treasure games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'magic' in game_id.lower():
        for i in range(6001, 6011):  # Magic games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'mystic' in game_id.lower():
        for i in range(7001, 7011):  # Mystic games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'royal' in game_id.lower():
        for i in range(8001, 8011):  # Royal games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'luxury' in game_id.lower():
        for i in range(9001, 9011):  # Luxury games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'crystal' in game_id.lower():
        for i in range(10001, 10011):  # Crystal games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'blackjack' in game_id.lower():
        for i in range(11001, 11011):  # Blackjack games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'roulette' in game_id.lower():
        for i in range(12001, 12011):  # Roulette games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'baccarat' in game_id.lower():
        for i in range(13001, 13011):  # Baccarat games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'poker' in game_id.lower():
        for i in range(14001, 14011):  # Poker games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'sports' in game_id.lower():
        for i in range(15001, 15011):  # Sports games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'lottery' in game_id.lower():
        for i in range(16001, 16011):  # Lottery games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    elif 'live' in game_id.lower():
        for i in range(17001, 17011):  # Live games range
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    else:
        # Default range for unknown games
        for i in range(1001, 1011):
            urls.extend([
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}.webp",
                f"https://wg.com/oss-proxy/official-website/apigame/zh/img/{i}_icon.webp"
            ])
    
    return urls

def find_valid_image_url(urls):
    """Find the first valid image URL from a list"""
    for url in urls:
        try:
            response = requests.head(url, timeout=5)
            if response.status_code == 200:
                return url
        except:
            continue
    return None

def main():
    print("🚀 Enhanced WG Image Downloader")
    print("=" * 50)
    
    # Load games data
    games_data = load_games_data()
    images_dir = Path(__file__).parent.parent / "public" / "assets" / "images" / "games"
    
    downloaded_count = 0
    updated_count = 0
    
    for i, game in enumerate(games_data, 1):
        game_id = game['id']
        print(f"\n[{i}/{len(games_data)}] Processing: {game_id}")
        
        # Check if images already exist
        main_image_path = images_dir / f"{game_id}.webp"
        icon_image_path = images_dir / f"{game_id}_icon.webp"
        
        main_exists = main_image_path.exists()
        icon_exists = icon_image_path.exists()
        
        if main_exists and icon_exists:
            print(f"  ✅ Images already exist for {game_id}")
            continue
        
        # Generate possible image URLs
        image_urls = generate_image_urls(game_id)
        
        # Try to find valid main image
        if not main_exists:
            main_url = find_valid_image_url([url for url in image_urls if not url.endswith('_icon.webp')])
            if main_url:
                if download_image(main_url, main_image_path):
                    downloaded_count += 1
                    # Update games.json
                    if 'images' not in game:
                        game['images'] = {}
                    game['images']['local_main'] = f"/assets/images/games/{game_id}.webp"
                    updated_count += 1
            else:
                print(f"  ❌ No valid main image found for {game_id}")
        
        # Try to find valid icon image
        if not icon_exists:
            icon_url = find_valid_image_url([url for url in image_urls if url.endswith('_icon.webp')])
            if icon_url:
                if download_image(icon_url, icon_image_path):
                    downloaded_count += 1
                    # Update games.json
                    if 'images' not in game:
                        game['images'] = {}
                    game['images']['local_icon'] = f"/assets/images/games/{game_id}_icon.webp"
                    updated_count += 1
            else:
                print(f"  ❌ No valid icon image found for {game_id}")
        
        # Add small delay to avoid overwhelming the server
        time.sleep(0.5)
    
    # Save updated games data
    if updated_count > 0:
        save_games_data(games_data)
        print(f"\n✅ Updated {updated_count} games in games.json")
    
    print(f"\n🎉 Download complete!")
    print(f"📥 Downloaded: {downloaded_count} images")
    print(f"📝 Updated: {updated_count} games")

if __name__ == "__main__":
    main()
