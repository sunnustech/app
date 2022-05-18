FORCE:

all:
	make clean
	yarn
	make check

check:
	yarn list | rg "react@17"
	yarn list | rg "react@18"

clean:
	rm -rf node_modules

ios:
	rm -rf build
	cp $$HOME/dots/personal/.secrets/sunnus/build:ios turtler
	./turtler
	rm turtler
	tar -xvf build/*
	open build

i:
	@make ios

android:
	cp $$HOME/dots/personal/.secrets/sunnus/build:android turtler
	./turtler
	rm turtler

a:
	@make android
