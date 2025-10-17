#!/usr/bin/env python3
"""
Smart WG Image Downloader
Efficiently downloads images based on known patterns and existing data
"""

import json
import os
import requests
import time
from pathlib import Path
import concurrent.futures
from threading import Lock

class SmartWGDownloader:
    def __init__(self):
        self.base_url = "https://wg.com/oss-proxy/official-website/apigame"
        self.languages = ['zh', 'en', 'th', 'vi']  # Focus on main languages
        self.images_dir = Path(__file__).parent.parent / "public" / "assets" / "images" / "games"
        self.json_path = Path(__file__).parent.parent / "public" / "assets" / "games.json"
        self.downloaded_count = 0
        self.lock = Lock()
        
        # Create images directory
        self.images_dir.mkdir(parents=True, exist_ok=True)
    
    def load_games_data(self):
        """Load games data from JSON file"""
        with open(self.json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def save_games_data(self, games_data):
        """Save games data back to JSON file"""
        with open(self.json_path, 'w', encoding='utf-8') as f:
            json.dump(games_data, f, indent=2, ensure_ascii=False)
    
    def download_image(self, url, local_path):
        """Download image from URL to local path"""
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            
            # Create directory if it doesn't exist
            local_path.parent.mkdir(parents=True, exist_ok=True)
            
            # Save image
            with open(local_path, 'wb') as f:
                f.write(response.content)
            
            with self.lock:
                self.downloaded_count += 1
            return True
        except Exception as e:
            return False
    
    def get_known_image_ids(self):
        """Get known image IDs from existing data and patterns"""
        # From the web search and existing files, we know these IDs exist
        known_ids = [
            # From web search results
            4001, 3035,
            # From existing files
            1001, 1002, 1003, 1004, 1005,
            2001, 2002, 2003, 2004, 2005,
            3001, 3002, 3003, 3004, 3005,
            4001, 4002, 4004,  # 4003 might not exist
            5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010
        ]
        
        # Add some common ranges
        for start in range(1000, 20000, 1000):
            for i in range(1, 11):
                known_ids.append(start + i)
        
        return sorted(set(known_ids))
    
    def download_images_for_id(self, img_id, languages=None):
        """Download images for a specific ID across languages"""
        if languages is None:
            languages = self.languages
        
        downloaded = []
        
        for lang in languages:
            # Main image
            main_url = f"{self.base_url}/{lang}/img/{img_id}.webp"
            main_filename = f"wg_game_{img_id}_{lang}.webp"
            main_path = self.images_dir / main_filename
            
            if not main_path.exists():  # Only download if not exists
                if self.download_image(main_url, main_path):
                    downloaded.append(('main', lang, img_id, main_filename))
                    print(f"  ✅ Downloaded: {main_filename}")
            
            # Icon image
            icon_url = f"{self.base_url}/{lang}/img/{img_id}_icon.webp"
            icon_filename = f"wg_game_{img_id}_{lang}_icon.webp"
            icon_path = self.images_dir / icon_filename
            
            if not icon_path.exists():  # Only download if not exists
                if self.download_image(icon_url, icon_path):
                    downloaded.append(('icon', lang, img_id, icon_filename))
                    print(f"  ✅ Downloaded: {icon_filename}")
        
        return downloaded
    
    def update_games_with_new_images(self, games_data):
        """Update games data with newly downloaded images"""
        updated_count = 0
        
        for game in games_data:
            game_id = game['id']
            base_id = game.get('imageMetadata', {}).get('id') if game.get('imageMetadata') else None
            
            if not base_id:
                continue
            
            # Check if we have new images for this ID
            best_main = None
            best_icon = None
            
            for lang in self.languages:
                main_filename = f"wg_game_{base_id}_{lang}.webp"
                icon_filename = f"wg_game_{base_id}_{lang}_icon.webp"
                
                main_path = self.images_dir / main_filename
                icon_path = self.images_dir / icon_filename
                
                if main_path.exists() and not best_main:
                    best_main = f"/assets/images/games/{main_filename}"
                if icon_path.exists() and not best_icon:
                    best_icon = f"/assets/images/games/{icon_filename}"
            
            # Update game data if we found better images
            if best_main or best_icon:
                if 'images' not in game:
                    game['images'] = {}
                
                if best_main:
                    game['images']['local_main'] = best_main
                if best_icon:
                    game['images']['local_icon'] = best_icon
                
                updated_count += 1
        
        return updated_count
    
    def download_all_available_images(self):
        """Download all available images efficiently"""
        print("🚀 Smart WG Image Downloader")
        print("=" * 50)
        
        # Get known image IDs
        known_ids = self.get_known_image_ids()
        print(f"📋 Testing {len(known_ids)} known image IDs")
        print(f"🌐 Languages: {', '.join(self.languages)}")
        print()
        
        # Download images in batches
        batch_size = 10
        total_downloaded = 0
        
        for i in range(0, len(known_ids), batch_size):
            batch = known_ids[i:i + batch_size]
            print(f"📦 Processing batch {i//batch_size + 1}: IDs {batch[0]}-{batch[-1]}")
            
            for img_id in batch:
                downloaded = self.download_images_for_id(img_id)
                total_downloaded += len(downloaded)
                
                # Small delay to be respectful
                time.sleep(0.1)
            
            print(f"  📊 Batch complete. Total downloaded: {total_downloaded}")
            print()
        
        print(f"🎉 Download complete! Total new images: {total_downloaded}")
        return total_downloaded
    
    def update_json_with_new_images(self):
        """Update JSON file with newly downloaded images"""
        print("🔄 Updating JSON with new images...")
        
        games_data = self.load_games_data()
        updated_count = self.update_games_with_new_images(games_data)
        
        if updated_count > 0:
            self.save_games_data(games_data)
            print(f"✅ Updated {updated_count} games in JSON")
        else:
            print("ℹ️  No games needed updating")
    
    def run(self):
        """Run the complete download and update process"""
        # Download all available images
        self.download_all_available_images()
        
        # Update JSON with new images
        self.update_json_with_new_images()
        
        print("\n🎉 Smart download complete!")

def main():
    downloader = SmartWGDownloader()
    downloader.run()

if __name__ == "__main__":
    main()
