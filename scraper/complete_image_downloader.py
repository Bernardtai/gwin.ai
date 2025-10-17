#!/usr/bin/env python3
"""
Complete WG Image Downloader
Downloads all images with all languages and ensures complete coverage
"""

import json
import requests
import time
from pathlib import Path
import os

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

def download_image_safe(url, local_path):
    """Safely download an image with timeout and error handling"""
    try:
        # Check if file already exists
        if local_path.exists():
            return True
            
        response = requests.get(url, timeout=8)
        if response.status_code == 200:
            local_path.parent.mkdir(parents=True, exist_ok=True)
            with open(local_path, 'wb') as f:
                f.write(response.content)
            return True
        return False
    except Exception as e:
        return False

def get_all_image_ids():
    """Get comprehensive list of all possible image IDs"""
    # From web search results and existing files
    base_ids = [
        # Known working IDs
        1001, 1002, 1003, 1004, 1005,
        2001, 2002, 2003, 2004, 2005,
        3001, 3002, 3003, 3004, 3005,
        4001, 4002, 4004,  # 4003 might not exist
        5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010,
        3035,  # From web search
    ]
    
    # Add more ranges systematically
    for start in range(1000, 6000, 1000):
        for i in range(1, 11):
            base_ids.append(start + i)
    
    # Add some specific ranges that might exist
    for start in range(6000, 20000, 1000):
        for i in range(1, 6):  # Only first 5 to avoid too many
            base_ids.append(start + i)
    
    return sorted(set(base_ids))

def download_all_images():
    """Download all images with all languages"""
    print("🚀 Complete WG Image Downloader")
    print("=" * 50)
    
    images_dir = Path(__file__).parent.parent / "public" / "assets" / "images" / "games"
    images_dir.mkdir(parents=True, exist_ok=True)
    
    # All languages to try
    languages = ['zh', 'en', 'th', 'vi', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar']
    
    # Get all image IDs
    all_ids = get_all_image_ids()
    
    print(f"📋 Processing {len(all_ids)} image IDs")
    print(f"🌐 Languages: {', '.join(languages)}")
    print(f"📁 Target directory: {images_dir}")
    print()
    
    downloaded_count = 0
    failed_count = 0
    skipped_count = 0
    
    for i, img_id in enumerate(all_ids, 1):
        print(f"[{i:3d}/{len(all_ids)}] ID: {img_id:5d} - ", end="")
        
        id_downloaded = 0
        id_failed = 0
        id_skipped = 0
        
        for lang in languages:
            # Main image
            main_url = f"https://wg.com/oss-proxy/official-website/apigame/{lang}/img/{img_id}.webp"
            main_filename = f"wg_game_{img_id}_{lang}.webp"
            main_path = images_dir / main_filename
            
            if main_path.exists():
                id_skipped += 1
            elif download_image_safe(main_url, main_path):
                id_downloaded += 1
                downloaded_count += 1
            else:
                id_failed += 1
                failed_count += 1
            
            # Icon image
            icon_url = f"https://wg.com/oss-proxy/official-website/apigame/{lang}/img/{img_id}_icon.webp"
            icon_filename = f"wg_game_{img_id}_{lang}_icon.webp"
            icon_path = images_dir / icon_filename
            
            if icon_path.exists():
                id_skipped += 1
            elif download_image_safe(icon_url, icon_path):
                id_downloaded += 1
                downloaded_count += 1
            else:
                id_failed += 1
                failed_count += 1
        
        skipped_count += id_skipped
        
        # Show progress for this ID
        if id_downloaded > 0:
            print(f"✅ Downloaded: {id_downloaded}, Skipped: {id_skipped}, Failed: {id_failed}")
        elif id_skipped > 0:
            print(f"⏭️  Skipped: {id_skipped}, Failed: {id_failed}")
        else:
            print(f"❌ Failed: {id_failed}")
        
        # Small delay to be respectful
        time.sleep(0.1)
        
        # Progress update every 50 IDs
        if i % 50 == 0:
            print(f"\n📊 Progress: Downloaded: {downloaded_count}, Skipped: {skipped_count}, Failed: {failed_count}")
            print()
    
    print()
    print("🎉 Download phase complete!")
    print(f"📥 Downloaded: {downloaded_count} new images")
    print(f"⏭️  Skipped: {skipped_count} existing images")
    print(f"❌ Failed: {failed_count} images")
    
    return downloaded_count

def update_json_with_all_images():
    """Update JSON with all available images, prioritizing by language preference"""
    print("\n🔄 Updating JSON with all available images...")
    
    games_data = load_games_data()
    images_dir = Path(__file__).parent.parent / "public" / "assets" / "images" / "games"
    
    # Language preference order
    language_preference = ['zh', 'en', 'th', 'vi', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar']
    
    updated_count = 0
    
    for game in games_data:
        game_id = game['id']
        base_id = game.get('imageMetadata', {}).get('id') if game.get('imageMetadata') else None
        
        if not base_id:
            continue
        
        # Find best available images by language preference
        best_main = None
        best_icon = None
        
        for lang in language_preference:
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
            
            updated_count += 1
    
    # Save updated data
    save_games_data(games_data)
    
    print(f"✅ Updated {updated_count} games in JSON")
    return updated_count

def verify_completeness():
    """Verify that all games have images"""
    print("\n🔍 Verifying completeness...")
    
    games_data = load_games_data()
    images_dir = Path(__file__).parent.parent / "public" / "assets" / "images" / "games"
    
    games_with_images = 0
    games_without_images = 0
    
    for game in games_data:
        has_main = False
        has_icon = False
        
        if 'images' in game:
            main_path = game['images'].get('local_main', '')
            icon_path = game['images'].get('local_icon', '')
            
            if main_path:
                main_file = images_dir / main_path.replace('/assets/images/games/', '')
                has_main = main_file.exists()
            
            if icon_path:
                icon_file = images_dir / icon_path.replace('/assets/images/games/', '')
                has_icon = icon_file.exists()
        
        if has_main or has_icon:
            games_with_images += 1
        else:
            games_without_images += 1
            print(f"❌ {game['id']}: No images found")
    
    print(f"\n📊 Verification Results:")
    print(f"✅ Games with images: {games_with_images}")
    print(f"❌ Games without images: {games_without_images}")
    print(f"📈 Coverage: {(games_with_images/len(games_data)*100):.1f}%")
    
    return games_without_images == 0

def main():
    """Main execution function"""
    print("🎯 Complete WG Image Download and Update")
    print("=" * 60)
    
    # Step 1: Download all images
    downloaded = download_all_images()
    
    # Step 2: Update JSON with new images
    updated = update_json_with_all_images()
    
    # Step 3: Verify completeness
    is_complete = verify_completeness()
    
    print("\n" + "=" * 60)
    print("🎉 COMPLETE!")
    print(f"📥 Downloaded: {downloaded} new images")
    print(f"📝 Updated: {updated} games in JSON")
    print(f"✅ Complete: {'Yes' if is_complete else 'No'}")
    
    if is_complete:
        print("\n🎊 All games now have images! The JSON is fully updated.")
    else:
        print("\n⚠️  Some games still need images. Check the verification results above.")

if __name__ == "__main__":
    main()
