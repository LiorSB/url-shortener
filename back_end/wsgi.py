from .app import app
from .leader_election import LeaderElection


def main() -> None:
    app.run()


if __name__ == "__main__":
    le = LeaderElection('localhost:2181', 'views', '/election')
    le.register()
    main()
