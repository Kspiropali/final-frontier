import subprocess


def cleanup_database():
    # Run the Docker commands
    commands = [
        "docker stop final_frontier",
        "docker rm final_frontier",
        "docker volume rm postgres-data",
    ]

    for command in commands:
        subprocess.run(command, shell=True)


if __name__ == "__main__":
    cleanup_database()
