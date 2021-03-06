HOMEDIR = $(shell pwd)
SMUSER = bot
PRIVUSER = root
SERVER = smallcatlabs
SSHCMD = ssh $(SMUSER)@$(SERVER)
PRIVSSHCMD = ssh $(PRIVUSER)@$(SERVER)
PROJECTNAME = namedlevels-api
APPDIR = /opt/$(PROJECTNAME)

pushall: update-remote
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(SMUSER)@$(SERVER):/opt/ --exclude node_modules/ --exclude data/
	$(SSHCMD) "cd /opt/$(PROJECTNAME) && npm install"

restart-remote:
	$(PRIVSSHCMD) "service $(PROJECTNAME) restart"

stop:
	$(PRIVSSHCMD) "service $(PROJECTNAME) stop"

set-permissions:
	$(PRIVSSHCMD) "chmod +x $(APPDIR)/$(PROJECTNAME).js && \
	chmod 777 -R $(APPDIR)/data/"

update-remote: sync set-permissions restart-remote

install-service:
	$(PRIVSSHCMD) "cp $(APPDIR)/$(PROJECTNAME).service /etc/systemd/system && \
	systemctl daemon-reload"

set-up-directories:
	$(PRIVSSHCMD) "mkdir -p $(APPDIR)/data"

initial-setup: set-up-directories sync set-permissions install-service

check-status:
	$(SSHCMD) "systemctl status $(PROJECTNAME)"

check-log:
	$(SSHCMD) "journalctl -r -u $(PROJECTNAME)"

test:
	node tests/named-levels-class-tests.js

prettier:
	prettier --single-quote --write "**/*.js"
