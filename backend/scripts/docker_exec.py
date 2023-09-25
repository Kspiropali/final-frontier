import subprocess


def docker_exec():
    # Run the Docker commands
    commands = [
        "clear && docker exec -it final_frontier psql -U user -d frontier"
    ]

    for command in commands:
        subprocess.run(command, shell=True)


if __name__ == "__main__":
    docker_exec()
