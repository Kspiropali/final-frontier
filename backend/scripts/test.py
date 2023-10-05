import subprocess


def setup_email():
    # Run the Docker commands
    commands = [
        "pytest --cov-report term-missing --cov=. tests/ && ./scripts/test",

    ]

    for command in commands:
        subprocess.run(command, shell=True)


if __name__ == "__main__":
    setup_email()
