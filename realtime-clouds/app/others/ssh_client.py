import threading
import uuid

import paramiko


class ScriptThread(threading.Thread):
    def __init__(self, name, hostname, command):
        threading.Thread.__init__(self, name=name)
        self.hostname = hostname
        self.command = command

    def run_command(self):
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname=self.hostname)
        print 'execute in %s: %s' % (self.hostname, self.command)
        stdin, stdout, stderr = ssh.exec_command(command=self.command)
        print(stdout.read())
        ssh.close()

    def run(self):
        print 'Current %s is running...' % threading.current_thread().name
        self.run_command()


class SSHClient:
    def __init__(self):
        pass

    def run_scripts(self, servers, scripts):
        if servers is None:
            return
        for server in servers:
            hostname = server.get("public_ip")
            instance_name = server.get("name")
            command = scripts.get(instance_name)
            if command is not None:
                _script_thread = ScriptThread(name="Thread_{}".format(uuid.uuid4().hex), hostname=hostname,
                                              command=command)
                _script_thread.start()
                _script_thread.join()
                print("%s ended. " % threading.current_thread().name)


if __name__ == '__main__':
    hostname = "35.185.184.76"
    hostname2 = "35.185.176.184"
    command = "sudo -u mxxiao -H sh -c 'cd ~/projects/realtime/realtime-automation; ./start_app.sh'"
    command2 = "sudo -u mxxiao -H sh -c \"cd ~/projects/realtime/realtime-automation; ./start_kafka_related.sh\""
    t1 = ScriptThread(name="Thread_1", hostname=hostname, command=command)
    t2 = ScriptThread(name="Thread_2", hostname=hostname2, command=command2)

    t1.start()
    t2.start()

    t1.join()
    t2.join()
