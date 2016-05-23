HOMEDIR = $(shell pwd)
SMUSER = noderunner
PRIVUSER = root
SERVER = sprigot-droplet
SSHCMD = ssh $(SMUSER)@$(SERVER)
PRIVSSHCMD = ssh $(PRIVUSER)@$(SERVER)
PROJECTNAME = namedlevels-api
APPDIR = /var/www/$(PROJECTNAME)

pushall: update-remote
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(SMUSER)@$(SERVER):/var/www/ --exclude node_modules/ --exclude data/
	$(SSHCMD) "cd /var/www/$(PROJECTNAME) && npm install"

restart-remote:
	$(PRIVSSHCMD) "service $(PROJECTNAME) restart"

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
