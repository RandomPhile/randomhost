open pdf
```bash
xdg-open file.pdf
```

download repository (clone)
```bash
git clone https://github.com/user/repo
unzip repo-master.zip
```

make executable accessible from anywhere
```bash
if [ -d "$HOME/bin" ]; then
  PATH="$HOME/bin:$PATH"
fi
```
# Github

generate new key for ssh, save it in the `~/.ssh/` folder, add it to the list and print it out to be copied to the github ssh setting
```bash
ssh-keygen -t ed25519 -C "user@mail.com"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
```
# Jekyll

```bash
jekyll new sitename
cd sitename/
bundle exec jekyll serve
```
