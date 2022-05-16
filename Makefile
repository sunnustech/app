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
