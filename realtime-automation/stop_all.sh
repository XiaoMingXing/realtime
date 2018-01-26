#!/bin/bash

check_ports_status(){
    PORTS=(8088)
    for port in $PORTS
    do
        check_port_status $port
    done
}

check_port_status(){
   PORT=$1
   echo "$PORT"
   lsof -P | grep ':$PORT' | awk '{print $2}' | xargs kill -9
   echo "$process"
}

check_ports_status