DOCKER_USERNAME := magicq6265
APP_NAME := hanbok-client
GIT_SHA := $(shell git rev-parse --short HEAD)
IMAGE := ${DOCKER_USERNAME}/${APP_NAME}:${GIT_SHA}

build-and-test : build test

build:
	@echo "Building image.."
	docker build --tag ${IMAGE} .

test:
	@echo "Testing the app.."
	docker run --rm ${IMAGE} npm start

push:
	@echo "Publishing image to repository"
	docker push ${IMAGE}

.PHONY: build-and-test build test push