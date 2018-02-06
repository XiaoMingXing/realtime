import fnmatch
import json
import os
import urllib2

ignore_list = [".*", "node_modules", "target", "bower_components"]
config_file_pattern = "*config.properties"


def get_remote_config():
    res = urllib2.urlopen("http://127.0.0.1:9999/config/local").read()
    return json.loads(res)


def change_config(config_remote, config_file, fn):
    from jproperties import Properties
    read_props = Properties()
    write_props = Properties()

    with open(config_file, "r") as file:
        read_props.load(file)
    write_props = copy_exist(write_props, read_props)
    write_props = fn(write_props, read_props, config_remote)
    with open(config_file, "w") as wfile:
        write_props.reset()
        write_props.store(wfile)


def copy_exist(write_props, read_props):
    keys = read_props.iterkeys()
    for key in keys:
        write_props[key] = read_props[key]
    return write_props


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
    if will_ignore(file_name) or level > 3:
        return match_files
    if os.path.isfile(file_path) and fnmatch.fnmatch(file_name, pattern):
        match_files.append(file_path)
    elif os.path.isdir(file_path):
        children = os.listdir(file_path)
        for child in children:
            match_files += search_config_files(file_path + "/" + child, child, pattern, level + 1)
    return match_files


def config_kafka_rest(write_props, read_props, config_reamote):
    write_props["bootstrap.servers"] = config_reamote["kafka_broker_url"]
    write_props["access.control.allow.origin"] = read_props["access.control.allow.origin"]
    write_props["access.control.allow.methods"] = read_props["access.control.allow.methods"]
    return write_props


def config_connect(write_props, read_props, config_reamote):
    write_props["topics"] = config_reamote["kafka_sink_topic"]
    write_props["mongodb.connection.uri"] = "{}?w=1&journal=true".format(config_reamote["mongo_url"])

    return write_props


def config_worker(write_props, read_props, config_reamote):
    write_props["bootstrap.servers"] = config_reamote["kafka_broker_url"]
    return write_props


if __name__ == '__main__':
    config_fn = {
        "kafka-rest": config_kafka_rest,
        "connect": config_connect,
        "worker": config_worker,
    }

    config_remote = get_remote_config()
    for key in config_fn.keys():
        config_file = find_config_files(key)
        change_config(config_remote, config_file, config_fn[key])
