from multiprocessing import Process

import paramiko


class ScriptRunner():
    def __init__(self, ):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    def run_command(self, hostname, command):
        self.ssh.connect(hostname=hostname)
        print 'execute in %s: %s' % (hostname, command)
        self.send_command(command=command)
        self.ssh.close()

    def send_command(self, command):
        # Check if connection is made previously
        if (self.ssh):
            stdin, stdout, stderr = self.ssh.exec_command(command)
            while not stdout.channel.exit_status_ready():
                # Print stdout data when available
                if stdout.channel.recv_ready():
                    # Retrieve the first 1024 bytes
                    alldata = stdout.channel.recv(1024)
                    while stdout.channel.recv_ready():
                        # Retrieve the next 1024 bytes
                        alldata += stdout.channel.recv(1024)

                    # Print as string with utf8 encoding
                    print(str(alldata))
            # Cleanup
            stdin.close()
            stdout.close()
            stderr.close()
        else:
            print("Connection not opened.")


class SSHClient:
    def __init__(self):
        pass

    def run_scripts(self, servers, scripts):
        if servers is None:
            return
        script_runner = ScriptRunner()
        for server in servers:
            hostname = server.get("public_ip")
            instance_name = server.get("name")
            command = scripts.get(instance_name)
            if command is None:
                continue
            process = Process(target=script_runner.run_command, args=(hostname, command))
            process.start()
            process.join(timeout=60)


if __name__ == '__main__':
    hostname = "35.197.153.3"
    hostname2 = "35.198.250.50"
    # command = "cd ~/projects/realtime/realtime-automation; ./start_app.sh"
    # command2 = "cd ~/projects/realtime/realtime-automation; ./start_kafka_related.sh"

    command = "sudo -u root -H sh -c 'cd ~/projects/realtime/realtime-automation; ./start_app.sh'"
    command2 = "sudo -u root -H sh -c \"cd ~/projects/realtime/realtime-automation; ./start_kafka_related.sh\""


    script_runner = ScriptRunner()
    script_runner.run_command(hostname, command)
    script_runner.run_command(hostname2, command2)
