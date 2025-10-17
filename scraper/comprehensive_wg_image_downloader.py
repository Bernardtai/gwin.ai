#!/usr/bin/env python3
"""
Comprehensive WG Image Downloader
Analyzes and downloads all available images from wg.com with different languages and IDs
"""

import json
import os
import requests
import time
from pathlib import Path
from urllib.parse import urlparse
import concurrent.futures
from threading import Lock

class WGImageDownloader:
    def __init__(self):
        self.base_url = "https://wg.com/oss-proxy/official-website/apigame"
        self.languages = ['zh', 'en', 'th', 'vi', 'ja', 'ko', 'es', 'fr', 'de', 'pt', 'ru', 'ar']
        self.images_dir = Path(__file__).parent.parent / "public" / "assets" / "images" / "games"
        self.json_path = Path(__file__).parent.parent / "public" / "assets" / "games.json"
        self.downloaded_count = 0
        self.failed_count = 0
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
    
    def check_image_exists(self, url):
        """Check if image exists at URL"""
        try:
            response = requests.head(url, timeout=5)
            return response.status_code == 200
        except:
            return False
    
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
            with self.lock:
                self.failed_count += 1
            return False
    
    def generate_image_urls(self, game_id, base_id=None):
        """Generate all possible image URLs for a game"""
        urls = []
        
        # If we have a base_id from imageMetadata, use it
        if base_id:
            for lang in self.languages:
                urls.extend([
                    f"{self.base_url}/{lang}/img/{base_id}.webp",
                    f"{self.base_url}/{lang}/img/{base_id}_icon.webp"
                ])
        
        # Try different ID patterns based on game ID and category
        id_ranges = self.get_id_ranges_for_game(game_id)
        
        for start_id, end_id in id_ranges:
            for img_id in range(start_id, end_id + 1):
                for lang in self.languages:
                    urls.extend([
                        f"{self.base_url}/{lang}/img/{img_id}.webp",
                        f"{self.base_url}/{lang}/img/{img_id}_icon.webp"
                    ])
        
        return urls
    
    def get_id_ranges_for_game(self, game_id):
        """Get ID ranges to try for a specific game"""
        ranges = []
        
        # Base ranges to try
        base_ranges = [
            (1001, 1010), (2001, 2010), (3001, 3010), (4001, 4010), (5001, 5010),
            (6001, 6010), (7001, 7010), (8001, 8010), (9001, 9010), (10001, 10010),
            (11001, 11010), (12001, 12010), (13001, 13010), (14001, 14010),
            (15001, 15010), (16001, 16010), (17001, 17010)
        ]
        
        # Category-specific ranges
        if 'dragon' in game_id.lower():
            ranges.extend([(5001, 5010), (5001, 5020)])
        elif 'fortune' in game_id.lower():
            ranges.extend([(4001, 4010), (4001, 4020)])
        elif 'gold' in game_id.lower():
            ranges.extend([(3001, 3010), (3001, 3020)])
        elif 'diamond' in game_id.lower():
            ranges.extend([(2001, 2010), (2001, 2020)])
        elif 'treasure' in game_id.lower():
            ranges.extend([(1001, 1010), (1001, 1020)])
        elif 'blackjack' in game_id.lower():
            ranges.extend([(11001, 11010), (11001, 11020)])
        elif 'roulette' in game_id.lower():
            ranges.extend([(12001, 12010), (12001, 12020)])
        elif 'baccarat' in game_id.lower():
            ranges.extend([(13001, 13010), (13001, 13020)])
        elif 'poker' in game_id.lower():
            ranges.extend([(14001, 14010), (14001, 14020)])
        elif 'sports' in game_id.lower():
            ranges.extend([(15001, 15010), (15001, 15020)])
        elif 'lottery' in game_id.lower():
            ranges.extend([(16001, 16010), (16001, 16020)])
        elif 'live' in game_id.lower():
            ranges.extend([(17001, 17010), (17001, 17020)])
        
        # Always include base ranges
        ranges.extend(base_ranges)
        
        return ranges
    
    def find_best_image_for_game(self, game_id, base_id=None):
        """Find the best available image for a game"""
        urls = self.generate_image_urls(game_id, base_id)
        
        # Check URLs in parallel
        with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
            future_to_url = {executor.submit(self.check_image_exists, url): url for url in urls}
            
            for future in concurrent.futures.as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    if future.result():
                        return url
                except Exception:
                    continue
        
        return None
    
    def download_game_images(self, game, max_workers=5):
        """Download images for a single game"""
        game_id = game['id']
        base_id = game.get('imageMetadata', {}).get('id') if game.get('imageMetadata') else None
        
        print(f"🎮 Processing: {game_id}")
        
        # Find best main image
        main_url = self.find_best_image_for_game(game_id, base_id)
        main_path = None
        icon_path = None
        
        if main_url:
            # Determine local filename
            url_parts = main_url.split('/')
            filename = url_parts[-1]
            local_path = self.images_dir / filename
            
            if self.download_image(main_url, local_path):
                main_path = f"/assets/images/games/{filename}"
                print(f"  ✅ Downloaded main: {filename}")
                
                # Try to find corresponding icon
                icon_url = main_url.replace('.webp', '_icon.webp')
                icon_filename = filename.replace('.webp', '_icon.webp')
                icon_local_path = self.images_dir / icon_filename
                
                if self.check_image_exists(icon_url):
                    if self.download_image(icon_url, icon_local_path):
                        icon_path = f"/assets/images/games/{icon_filename}"
                        print(f"  ✅ Downloaded icon: {icon_filename}")
                else:
                    # Use main image as icon if no specific icon
                    icon_path = main_path
            else:
                print(f"  ❌ Failed to download: {filename}")
        else:
            print(f"  ❌ No valid image found for {game_id}")
        
        # Update game data
        if 'images' not in game:
            game['images'] = {}
        
        if main_path:
            game['images']['local_main'] = main_path
        if icon_path:
            game['images']['local_icon'] = icon_path
        
        return main_path is not None
    
    def download_all_images(self):
        """Download all images for all games"""
        print("🚀 Comprehensive WG Image Downloader")
        print("=" * 60)
        
        # Load games data
        games_data = self.load_games_data()
        
        print(f"📁 Images directory: {self.images_dir}")
        print(f"🌐 Languages: {', '.join(self.languages)}")
        print(f"🎮 Processing {len(games_data)} games")
        print()
        
        successful_downloads = 0
        
        for i, game in enumerate(games_data, 1):
            print(f"[{i}/{len(games_data)}] ", end="")
            
            if self.download_game_images(game):
                successful_downloads += 1
            
            # Add small delay to avoid overwhelming the server
            time.sleep(0.2)
        
        # Save updated games data
        self.save_games_data(games_data)
        
        print()
        print("🎉 Download complete!")
        print(f"📥 Downloaded: {self.downloaded_count} images")
        print(f"❌ Failed: {self.failed_count} images")
        print(f"✅ Games with images: {successful_downloads}/{len(games_data)}")
        print(f"📊 Success rate: {(successful_downloads/len(games_data)*100):.1f}%")
    
    def analyze_wg_structure(self):
        """Analyze the structure of wg.com images"""
        print("🔍 Analyzing WG.com image structure...")
        print("=" * 50)
        
        # Test different ID ranges and languages
        test_ids = [1001, 2001, 3001, 4001, 5001, 3035, 4001]
        found_images = []
        
        for img_id in test_ids:
            for lang in self.languages:
                url = f"{self.base_url}/{lang}/img/{img_id}.webp"
                if self.check_image_exists(url):
                    found_images.append((img_id, lang, url))
                    print(f"✅ Found: ID {img_id}, Lang {lang}")
        
        print(f"\n📊 Found {len(found_images)} valid images in test")
        return found_images

def main():
    downloader = WGImageDownloader()
    
    # First analyze the structure
    downloader.analyze_wg_structure()
    
    print("\n" + "="*60)
    
    # Then download all images
    downloader.download_all_images()

if __name__ == "__main__":
    main()
