#!/usr/bin/env python3
"""
Quick WG Image Downloader
Fast and efficient image downloader that doesn't hang
"""

import json
import requests
import time
from pathlib import Path

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
    """Download a single image"""
    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        
        local_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(local_path, 'wb') as f:
            f.write(response.content)
        
        return True
    except:
        return False

def main():
    print("🚀 Quick WG Image Downloader")
    print("=" * 40)
    
    # Load games data
    games_data = load_games_data()
    images_dir = Path(__file__).parent.parent / "public" / "assets" / "images" / "games"
    
    # Known working IDs from web search and existing files
    known_ids = [1001, 1002, 1003, 1004, 1005, 2001, 2002, 2003, 2004, 2005, 
                 3001, 3002, 3003, 3004, 3005, 4001, 4002, 4004, 5001, 5002, 
                 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010, 3035]
    
    languages = ['zh', 'en', 'th', 'vi']
    
    downloaded_count = 0
    updated_games = 0
    
    print(f"📋 Processing {len(known_ids)} known IDs")
    print(f"🌐 Languages: {', '.join(languages)}")
    print()
    
    for i, img_id in enumerate(known_ids, 1):
        print(f"[{i}/{len(known_ids)}] Processing ID: {img_id}")
        
        for lang in languages:
            # Main image
            main_url = f"https://wg.com/oss-proxy/official-website/apigame/{lang}/img/{img_id}.webp"
            main_filename = f"wg_game_{img_id}_{lang}.webp"
            main_path = images_dir / main_filename
            
            if not main_path.exists():
                if download_image(main_url, main_path):
                    downloaded_count += 1
                    print(f"  ✅ Downloaded: {main_filename}")
                else:
                    print(f"  ❌ Failed: {main_filename}")
            
            # Icon image
            icon_url = f"https://wg.com/oss-proxy/official-website/apigame/{lang}/img/{img_id}_icon.webp"
            icon_filename = f"wg_game_{img_id}_{lang}_icon.webp"
            icon_path = images_dir / icon_filename
            
            if not icon_path.exists():
                if download_image(icon_url, icon_path):
                    downloaded_count += 1
                    print(f"  ✅ Downloaded: {icon_filename}")
                else:
                    print(f"  ❌ Failed: {icon_filename}")
        
        # Small delay
        time.sleep(0.2)
    
    print()
    print("🔄 Updating JSON with new images...")
    
    # Update games data with new images
    for game in games_data:
        game_id = game['id']
        base_id = game.get('imageMetadata', {}).get('id') if game.get('imageMetadata') else None
        
        if not base_id:
            continue
        
        # Find best available image
        best_main = None
        best_icon = None
        
        for lang in languages:
            main_filename = f"wg_game_{base_id}_{lang}.webp"
            icon_filename = f"wg_game_{base_id}_{lang}_icon.webp"
            
            main_path = images_dir / main_filename
            icon_path = images_dir / icon_filename
            
            if main_path.exists() and not best_main:
                best_main = f"/assets/images/games/{main_filename}"
            if icon_path.exists() and not best_icon:
                best_icon = f"/assets/images/games/{icon_filename}"
        
        # Update game data
        if best_main or best_icon:
            if 'images' not in game:
                game['images'] = {}
            
            if best_main:
                game['images']['local_main'] = best_main
            if best_icon:
                game['images']['local_icon'] = best_icon
            
            updated_games += 1
    
    # Save updated data
    save_games_data(games_data)
    
    print()
    print("🎉 Quick download complete!")
    print(f"📥 Downloaded: {downloaded_count} new images")
    print(f"📝 Updated: {updated_games} games in JSON")

if __name__ == "__main__":
    main()
