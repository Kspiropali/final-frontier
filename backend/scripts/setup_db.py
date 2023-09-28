import subprocess


def setup_database():
    # Run the Docker commands
    commands = [
        "docker volume create --name=postgres-data",
        "docker run -d -p 5432:5432 -e TZ=Europe/London -e POSTGRES_PASSWORD=password -e POSTGRES_USER=user -e POSTGRES_DB=frontier -v "
        "postgres-data:/var/lib/postgresql/data --name final_frontier postgres",
    ]

    for command in commands:
        subprocess.run(command, shell=True)


if __name__ == "__main__":
    setup_database()
