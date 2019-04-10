curl -sL https://deb.nodesource.com/setup_11.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt install git -y
git config --global user.email "nobody@example.com"
git config --global user.name "nobody"

sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

git clone https://github.com/nendonerd/Blipay--.git
cd Blipay--/
NODE_ENV=production sudo node index.js &
