curl -sL https://deb.nodesource.com/setup_11.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt install git -y
git config --global user.email "nobody@example.com"
git config --global user.name "nobody"

git clone https://github.com/nendonerd/Blipay--.git
cd Blipay--/
NODE_ENV=production sudo node index.js &
