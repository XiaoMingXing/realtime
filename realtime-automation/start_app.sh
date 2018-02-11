#!/bin/bash

# start business system
export PROJECT_HOME=~/projects/realtime

prepare(){
    #install git
    sudo apt-get install git
    mkdir projects
    cd projects
    git clone git@github.com:XiaoMingXing/realtime.git

    #install node
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    sudo apt-get install -y nodejs
}

update_repo(){
   cd ${PROJECT_HOME}
   git pull
}

run_buz_sys(){
     echo "Run Business System ..."
     cd ${PROJECT_HOME}/realtime-business-system
     npm install
     bower install
     npm start &
}

# Run NodeJS app consume data from MongoDB
run_node_app(){
    echo "Run Node App ..."
    cd ${PROJECT_HOME}/realtime-service
    npm install
    npm start &
    return
}

# Run Dashboard app
run_dashboard(){
    echo "Run Dashboard ..."
    cd ${PROJECT_HOME}/realtime-dashboard
    npm run build
    npm run start
}


update_repo
run_buz_sys
run_node_app
run_dashboard
exit 0