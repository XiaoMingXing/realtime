#!/usr/bin/env bash

set -e 

brew tap caskroom/cask
brew cask install google-cloud-sdk

brew install terraform

# login to gcloud. this will open up a browser. follow instructions on browser 
gcloud auth application-default login
