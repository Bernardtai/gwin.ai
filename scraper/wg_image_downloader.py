#!/usr/bin/env python3
"""
WG Image Downloader
Downloads real game images from wg.com using the discovered pattern
"""

import requests
import json
import os
import time
from pathlib import Path
from urllib.parse import urljoin

class WGImageDownloader:
    def __init__(self):
        self.base_url = "https://wg.com"
        self.image_base_url = "https://wg.com/oss-proxy/official-website/apigame"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN,zh;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Referer': 'https://wg.com/',
        })
        
        # Create directories
        self.assets_dir = Path("../public/assets/images/games")
        self.assets_dir.mkdir(parents=True, exist_ok=True)
        
    def test_image_patterns(self):
        """Test different image ID patterns to find valid images"""
        print("🔍 Testing WG image patterns...")
        
        # Test different patterns
        test_patterns = [
            # Pattern from the example: 5010
            "5010",
            # Common game IDs
            "1001", "1002", "1003", "1004", "1005",
            "2001", "2002", "2003", "2004", "2005",
            "3001", "3002", "3003", "3004", "3005",
            "4001", "4002", "4003", "4004", "4005",
            "5001", "5002", "5003", "5004", "5005", "5006", "5007", "5008", "5009",
            "6001", "6002", "6003", "6004", "6005",
            "7001", "7002", "7003", "7004", "7005",
            "8001", "8002", "8003", "8004", "8005",
            "9001", "9002", "9003", "9004", "9005",
        ]
        
        valid_images = []
        
        for pattern in test_patterns:
            # Test different language codes
            languages = ['zh', 'en', 'th', 'vi']
            
            for lang in languages:
                image_url = f"{self.image_base_url}/{lang}/img/{pattern}.webp"
                
                try:
                    response = self.session.head(image_url, timeout=5)
                    if response.status_code == 200:
                        print(f"✅ Found valid image: {image_url}")
                        valid_images.append({
                            'id': pattern,
                            'language': lang,
                            'url': image_url,
                            'size': response.headers.get('content-length', 'unknown')
                        })
                        break  # Found one for this pattern, move to next
                except Exception as e:
                    continue
                
                time.sleep(0.1)  # Be respectful
        
        print(f"📊 Found {len(valid_images)} valid images")
        return valid_images
    
    def download_test_images(self, valid_images, limit=10):
        """Download a few test images to verify they work"""
        print(f"📥 Downloading {min(limit, len(valid_images))} test images...")
        
        downloaded = []
        
        for i, img_info in enumerate(valid_images[:limit]):
            try:
                response = self.session.get(img_info['url'], timeout=10)
                response.raise_for_status()
                
                # Save the image
                filename = f"wg_game_{img_info['id']}_{img_info['language']}.webp"
                filepath = self.assets_dir / filename
                
                with open(filepath, 'wb') as f:
                    f.write(response.content)
                
                print(f"✅ Downloaded: {filename} ({len(response.content)} bytes)")
                downloaded.append({
                    'id': img_info['id'],
                    'language': img_info['language'],
                    'filename': filename,
                    'size': len(response.content),
                    'url': img_info['url']
                })
                
                time.sleep(0.5)  # Be respectful
                
            except Exception as e:
                print(f"❌ Failed to download {img_info['url']}: {e}")
        
        return downloaded
    
    def generate_comprehensive_image_list(self, valid_images):
        """Generate a comprehensive list of game images based on discovered patterns"""
        print("📝 Generating comprehensive image list...")
        
        # Load existing games data
        games_json_path = Path("../public/assets/games.json")
        if not games_json_path.exists():
            print("❌ Games JSON not found!")
            return
        
        with open(games_json_path, 'r', encoding='utf-8') as f:
            games = json.load(f)
        
        print(f"📊 Found {len(games)} games in JSON")
        
        # Update games with real image URLs
        updated_games = []
        
        for i, game in enumerate(games):
            # Generate image ID based on game index or use discovered pattern
            if i < len(valid_images):
                img_info = valid_images[i % len(valid_images)]
                image_id = img_info['id']
                language = img_info['language']
            else:
                # Generate ID based on game index
                image_id = str(5000 + i)
                language = 'zh'  # Default to Chinese
            
            # Create image URLs
            main_image_url = f"{self.image_base_url}/{language}/img/{image_id}.webp"
            icon_image_url = f"{self.image_base_url}/{language}/img/{image_id}_icon.webp"
            
            # Update game data
            game['images'] = {
                'main': main_image_url,
                'icon': icon_image_url,
                'local_main': f"/assets/images/games/wg_game_{image_id}_{language}.webp",
                'local_icon': f"/assets/images/games/wg_game_{image_id}_{language}_icon.webp"
            }
            
            # Add image metadata
            game['imageMetadata'] = {
                'id': image_id,
                'language': language,
                'source': 'wg.com',
                'format': 'webp'
            }
            
            updated_games.append(game)
        
        # Save updated games data
        with open(games_json_path, 'w', encoding='utf-8') as f:
            json.dump(updated_games, f, ensure_ascii=False, indent=2)
        
        print(f"💾 Updated {len(updated_games)} games with real image URLs")
        return updated_games
    
    def download_all_images(self, games_data, batch_size=5):
        """Download all game images in batches"""
        print(f"📥 Downloading images for {len(games_data)} games...")
        
        downloaded_count = 0
        failed_count = 0
        
        for i, game in enumerate(games_data):
            try:
                # Download main image
                main_url = game['images']['main']
                response = self.session.get(main_url, timeout=10)
                
                if response.status_code == 200:
                    # Save main image
                    main_filename = f"wg_game_{game['imageMetadata']['id']}_{game['imageMetadata']['language']}.webp"
                    main_filepath = self.assets_dir / main_filename
                    
                    with open(main_filepath, 'wb') as f:
                        f.write(response.content)
                    
                    # Try to download icon (might not exist)
                    try:
                        icon_url = game['images']['icon']
                        icon_response = self.session.get(icon_url, timeout=5)
                        
                        if icon_response.status_code == 200:
                            icon_filename = f"wg_game_{game['imageMetadata']['id']}_{game['imageMetadata']['language']}_icon.webp"
                            icon_filepath = self.assets_dir / icon_filename
                            
                            with open(icon_filepath, 'wb') as f:
                                f.write(icon_response.content)
                        else:
                            # Create a copy of main image as icon
                            icon_filename = f"wg_game_{game['imageMetadata']['id']}_{game['imageMetadata']['language']}_icon.webp"
                            icon_filepath = self.assets_dir / icon_filename
                            
                            with open(icon_filepath, 'wb') as f:
                                f.write(response.content)
                    except:
                        # Create a copy of main image as icon
                        icon_filename = f"wg_game_{game['imageMetadata']['id']}_{game['imageMetadata']['language']}_icon.webp"
                        icon_filepath = self.assets_dir / icon_filename
                        
                        with open(icon_filepath, 'wb') as f:
                            f.write(response.content)
                    
                    downloaded_count += 1
                    print(f"✅ Downloaded images for {game['name'].get('en', game['id'])} ({i+1}/{len(games_data)})")
                    
                else:
                    print(f"❌ Failed to download {main_url}: HTTP {response.status_code}")
                    failed_count += 1
                
                # Batch delay
                if (i + 1) % batch_size == 0:
                    print(f"⏸️  Pausing for 2 seconds... (Downloaded: {downloaded_count}, Failed: {failed_count})")
                    time.sleep(2)
                else:
                    time.sleep(0.5)
                    
            except Exception as e:
                print(f"❌ Error downloading images for {game['name'].get('en', game['id'])}: {e}")
                failed_count += 1
        
        print(f"🎉 Download complete! Downloaded: {downloaded_count}, Failed: {failed_count}")
        return downloaded_count, failed_count
    
    def run(self):
        """Main execution function"""
        print("🚀 Starting WG Image Downloader...")
        
        # Step 1: Test image patterns
        valid_images = self.test_image_patterns()
        
        if not valid_images:
            print("❌ No valid images found!")
            return
        
        # Step 2: Download test images
        test_downloads = self.download_test_images(valid_images, limit=5)
        
        if not test_downloads:
            print("❌ Test downloads failed!")
            return
        
        # Step 3: Generate comprehensive image list
        games_data = self.generate_comprehensive_image_list(valid_images)
        
        if not games_data:
            print("❌ Failed to generate image list!")
            return
        
        # Step 4: Download all images
        downloaded, failed = self.download_all_images(games_data)
        
        print(f"✅ WG Image Downloader complete!")
        print(f"📊 Results: {downloaded} images downloaded, {failed} failed")

def main():
    downloader = WGImageDownloader()
    downloader.run()

if __name__ == "__main__":
    main()
