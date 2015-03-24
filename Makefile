LEVELCACHEDIR = '../level-cache-server'
PM2 = '$(LEVELCACHEDIR)/node_modules/.bin/pm2'
HOMEDIR = $(shell pwd)
GITDIR = /var/repos/namedlevels-api.git

start-level-cache:
	$(PM2) start $(LEVELCACHEDIR)/start-cache-server.js --name level-cache || \
	echo "level-cache has already been started."

test:
	node tests/named-levels-class-tests.js

start: start-level-cache
	$(PM2) start server.js --name namedlevels-api

stop:
	$(PM2) stop namedlevels-api || echo "Didn't need to stop process."

list:
	$(PM2) list

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install stop start
