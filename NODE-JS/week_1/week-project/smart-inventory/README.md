# Smart Inventory System - Week 1

A minimal HTTP server built with native Node.js to serve static product and order data from JSON files.

## Features

- **Static Data API**: Read-only endpoints for products and orders
- **Query Filtering**: Filter by category, price range, status, dates, etc.
- **Pagination**: Built-in pagination support
- **Health Check**: System status endpoint
- **Structured Architecture**: Clean separation of concerns (router, controllers, services, utils)
- **Event Logging**: Custom EventEmitter-based logger

## Quick Start

```bash
# Install dependencies
npm install

# Start server (default port: 3000)
npm start

# Development
npm run dev