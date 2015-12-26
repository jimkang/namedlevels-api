HOMEDIR = $(shell pwd)

# connect-to-docker-machine:
	# eval "$(docker-machine env dev)"

stop-docker-machine:
	docker-machine stop dev

start-docker-machine:
	docker-machine start dev

create-docker-machine:
	docker-machine create --driver virtualbox dev

build-docker-image:
	docker build -t jkang/namedlevels-api .

push-docker-image: build-docker-image
	docker push jkang/namedlevels-api

# /tmp mapping is only for development.
run-namedlevels-api:
	docker rm -f namedlevels-api || \
		echo "namedlevels-api did not need removal."
	docker run \
		-d \
		--restart=always \
		--name namedlevels-api \
		-v $(HOMEDIR)/config:/usr/src/app/config \
		-v /tmp:/usr/src/app/data \
		-p 49160:8080 \
		jkang/namedlevels-api \
		node namedlevels-api.js

test:
	node tests/named-levels-class-tests.js
	node tests/cache-tests.js

pushall:
	git push origin master && git push server master
