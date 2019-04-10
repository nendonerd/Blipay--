curl -sL https://deb.nodesource.com/setup_11.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt install git
git clone https://github.com/nendonerd/Blipay--.git
cd Blipay--/
NODE_ENV=production sudo node index.js &