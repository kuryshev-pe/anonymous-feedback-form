# Makefile for building frontend and backend Docker images

# Version variables - can be set via environment variables or Makefile
AFF_BACKEND_VER ?= latest
AFF_FRONTEND_VER ?= latest

# Registry URL
REGISTRY_URL = gitlab.cleverbots.ru:4567/edu/aaf

# Image names
BACKEND_IMAGE = $(REGISTRY_URL)/backend
FRONTEND_IMAGE = $(REGISTRY_URL)/frontend

.PHONY: build-backend build-frontend build-all push-backend push-frontend push-all clean

# Build backend image with version tag
build-backend:
	docker build -t $(BACKEND_IMAGE):$(AFF_BACKEND_VER) ./backend

# Build frontend image with version tag
build-frontend:
	docker build -t $(FRONTEND_IMAGE):$(AFF_FRONTEND_VER) ./frontend

# Build both images
build-all: build-backend build-frontend

# Push backend image to registry
push-backend:
	docker push $(BACKEND_IMAGE):$(AFF_BACKEND_VER)

# Push frontend image to registry
push-frontend:
	docker push $(FRONTEND_IMAGE):$(AFF_FRONTEND_VER)

# Push both images
push-all: push-backend push-frontend

# Clean build artifacts (optional)
clean:
	docker rmi -f $(BACKEND_IMAGE):$(AFF_BACKEND_VER) 2>/dev/null || true
	docker rmi -f $(FRONTEND_IMAGE):$(AFF_FRONTEND_VER) 2>/dev/null || true

# Default target
all: build-all

# Help target
help:
	@echo "Available targets:"
	@echo "  build-backend     - Build backend Docker image"
	@echo "  build-frontend    - Build frontend Docker image"
	@echo "  build-all         - Build both images"
	@echo "  push-backend      - Push backend image to registry"
	@echo "  push-frontend     - Push frontend image to registry"
	@echo "  push-all          - Push both images to registry"
	@echo "  clean             - Remove built images"
	@echo "  help              - Show this help message"
	@echo ""
	@echo "Version variables:"
	@echo "  AFF_BACKEND_VER   - Backend version (default: latest)"
	@echo "  AFF_FRONTEND_VER  - Frontend version (default: latest)"
	@echo ""
	@echo "Usage examples:"
	@echo "  make build-all AFF_BACKEND_VER=1.0.0 AFF_FRONTEND_VER=2.0.0"
	@echo "  make push-all AFF_BACKEND_VER=1.0.0 AFF_FRONTEND_VER=2.0.0"

# Show current versions
show-versions:
	@echo "Backend version: $(AFF_BACKEND_VER)"
	@echo "Frontend version: $(AFF_FRONTEND_VER)"
