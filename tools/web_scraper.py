import requests
from bs4 import BeautifulSoup
import re

input_url = ('Enter the Url of the website you want to scrape: ')
url = input_url
res = requests.get(url)
soup = BeautifulSoup(res.content, 'html.parser')
for link in soup.find_all('a', href=True):
    print(link.get('href'))

