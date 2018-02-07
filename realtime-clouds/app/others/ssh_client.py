import paramiko


class SSHClient:
    def __init__(self):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    def run_command(self, hostname, command):
        self.ssh.connect(hostname=hostname)
        stdin, stdout, stderr = self.ssh.exec_command(command=command)
        print(stdout.read())
        self.ssh.close()

    def run_scripts(self, servers, scripts):
        if servers is None:
            return
        for server in servers:
            hostname = server.get("public_ip")
            instance_name = server.get("name")
            command = scripts.get(instance_name)
            self.run_command(hostname, command)


if __name__ == '__main__':
    hostname = "35.197.154.212"
    command = "sudo -u mxxiao -H sh -c 'cd ~/projects/realtime/realtime-automation; git pull; ./start_app.sh'"
    print("Command to send: {}".format(command))
    ssh_client = SSHClient()
    ssh_client.run_command(hostname, command)
