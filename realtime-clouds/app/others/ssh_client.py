import threading

import paramiko


class SSHClient:
    def __init__(self):
        pass

    def run_command(self, hostname, command):
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(hostname=hostname)
        stdin, stdout, stderr = ssh.exec_command(command=command)
        print(stdout.read())
        ssh.close()

    def run_scripts(self, servers, scripts):
        if servers is None:
            return
        for server in servers:
            hostname = server.get("public_ip")
            instance_name = server.get("name")
            command = scripts.get(instance_name)
            thread = threading.Thread(target=self.run_command, name="[Thread new] run: ".format(instance_name),
                                      args=(hostname, command))
            thread.start()
            thread.join()
            print("%s ended. " % threading.current_thread().name)


if __name__ == '__main__':
    hostname = "35.197.154.212"
    command = "sudo -u mxxiao -H sh -c 'cd ~/projects/realtime/realtime-automation; git pull; ./start_app.sh'"
    print("Command to send: {}".format(command))
    ssh_client = SSHClient()
    ssh_client.run_command(hostname, command)
