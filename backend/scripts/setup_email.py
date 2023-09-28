import subprocess


def setup_email():
    # Run the Docker commands
    commands = [
        "docker run -d --name mail -p 1080:1080 -p 1025:1025 maildev/maildev"
    ]

    for command in commands:
        subprocess.run(command, shell=True)


if __name__ == "__main__":
    setup_email()
