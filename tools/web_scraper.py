import sys
import requests
from bs4 import BeautifulSoup

url = input('Enter the URL of the website you want to scrape: ').strip()
if not url.startswith(('http://', 'https://')):
    url = 'https://' + url

try:
    res = requests.get(url, timeout=10, headers={'User-Agent': 'portfolio-scraper/1.0'})
    res.raise_for_status()
except requests.RequestException as e:
    print(f'[!] Request failed: {e}')
    sys.exit(1)

soup = BeautifulSoup(res.content, 'html.parser')
for link in soup.find_all('a', href=True):
    print(link['href'])
