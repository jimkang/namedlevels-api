LEVELCACHEDIR = '../level-cache-server'
PM2 = pm2
HOMEDIR = $(shell pwd)
GITDIR = /var/repos/namedlevels-api.git

start-level-cache:
	$(PM2) start $(LEVELCACHEDIR)/start-cache-server.js --name level-cache || \
	echo "level-cache has already been started."

test:
	node tests/named-levels-class-tests.js

start:
	psy start -n namedlevels-api -l $(HOMEDIR)/logs/namedlevels-api.log -- \
		node server.js

stop:
	psy stop namedlevels-api  || echo "Non-zero return code is OK."

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install stop start

pushall:
	git push origin master && git push server master
