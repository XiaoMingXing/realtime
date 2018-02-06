import fnmatch
import json
import os
import urllib2

ignore_list = [".*", "node_modules", "target", "bower_components"]
config_file_pattern = "*config.properties"


def get_servers():
    res = urllib2.urlopen("http://127.0.0.1:9999/config/local").read()
    return json.loads(res)


def get_config(name):
    return get_servers()


def change_config(config_reamote, config_file):
    from jproperties import Properties
    read_props = Properties()
    write_props = Properties()

    with open(config_file, "r") as file:
        read_props.load(file)

    write_props["bootstrap.servers"] = config_reamote["kafka_broker_url"]
    write_props["access.control.allow.origin"] = read_props["access.control.allow.origin"]
    write_props["access.control.allow.methods"] = read_props["access.control.allow.methods"]
    with open(config_file, "w") as wfile:
        write_props.store(wfile)


def find_config_files(key):
    configs = search_config_files(os.environ['PROJECT_HOME'], "realtime", config_file_pattern, 0)

    for config in configs:
        file_name = config[config.rfind("/") + 1:len(config) - 1]
        if file_name.startswith(key):
            return config


def will_ignore(file_path):
    if file_path in ignore_list:
        return True
    for pattern in ignore_list:
        if fnmatch.fnmatch(file_path, pattern):
            return True
    return False


def search_config_files(file_path, file_name, pattern, level):
    match_files = []
    if will_ignore(file_name) or level > 2:
        return match_files
    if os.path.isfile(file_path) and fnmatch.fnmatch(file_name, pattern):
        match_files.append(file_path)
    elif os.path.isdir(file_path):
        children = os.listdir(file_path)
        for child in children:
            match_files += search_config_files(file_path + "/" + child, child, pattern, level + 1)
    return match_files


if __name__ == '__main__':
    server_key = "kafka-rest"
    config_remote = get_config(server_key)
    config_file = find_config_files(server_key)
    change_config(config_remote, config_file)
    # print(app_server)
    print(config_file)
