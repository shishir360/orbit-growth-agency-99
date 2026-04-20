import json

package_json_path = 'package.json'

with open(package_json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

if 'reactSnap' not in data:
    data['reactSnap'] = {}

data['reactSnap']['concurrency'] = 1
data['reactSnap']['puppeteerArgs'] = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage"
]

with open(package_json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print("Updated package.json to fix react-snap timeout.")
