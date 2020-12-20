.PHONY: run
run:
	@echo "Initializing NodeJS backend..."
	@cd server && docker-compose up
