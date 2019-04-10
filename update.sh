git pull https://github.com/nendonerd/Blipay--.git --force --no-edit
sudo kill $(pgrep node)
NODE_ENV=production sudo node index.js &