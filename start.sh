#!/bin/bash
# Intended for local development only

cd frontend
npm run build
cd ..
python app.py
