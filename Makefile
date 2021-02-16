# Makefile for building the project

app_name=smb_test
project_dir=$(CURDIR)/../$(app_name)
build_dir=$(project_dir)/build
appstore_dir=$(build_dir)/appstore
package_name=$(app_name)
cert_dir=$(HOME)/.nextcloud/certificates
webpack=node_modules/.bin/webpack

jssources=$(wildcard js/*) $(wildcard js/*/*) $(wildcard css/*/*)  $(wildcard css/*)
othersources=$(wildcard appinfo/*) $(wildcard css/*/*) $(wildcard controller/*/*) $(wildcard templates/*/*) $(wildcard log/*/*)

all: build/main.js

clean:
	rm -rf $(build_dir)
	rm -rf node_modules

node_modules: package.json
	npm install --deps

CHANGELOG.md: node_modules
	node_modules/.bin/changelog

build/main.js: node_modules $(jssources) webpack.prod.config.js
	$(webpack) --config webpack.prod.config.js

.PHONY: watch
watch: node_modules
	node node_modules/.bin/webpack-dev-server --public localcloud.icewind.me:444 --inline --hot --port 3000 --config webpack.dev.config.js

