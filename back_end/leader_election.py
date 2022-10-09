from kazoo.client import KazooClient, KazooState
from kazoo.protocol.states import EventType


ZNODE_PREFIX = '/a_'


class LeaderElection():
    def __init__(self, zookeeper_addresses, node_name, election_namespace):
        self.zookeeper_addresses = zookeeper_addresses
        self.node_name: str = node_name
        self.election_namespace = election_namespace
        self.zookeeper: KazooClient = None
        self._connect_zookeeper()
        self._leader = False

    @staticmethod
    def connection_status_listener(state):
        if state == KazooState.LOST:
            print('The session to zookeeper was lost.')

        elif state == KazooState.SUSPENDED:
            print('Disconnected from zookeeper.')

        else:
            print('Connected to zookeeper.')

    def _connect_zookeeper(self):
        self.zookeeper = KazooClient(hosts=self.zookeeper_addresses)
        self.zookeeper.start()
        self.zookeeper.add_listener(self.connection_status_listener)  # notify about connection change

    def register(self):
        path = self.election_namespace + ZNODE_PREFIX

        # create ephemeral Znode to represent the node (will create election_namespace if not exists)
        new_node_path = self.zookeeper.create(
            path=path,
            value=self.node_name.encode(),
            ephemeral=True,
            sequence=True,
            makepath=True
        )

        self.znode_name = new_node_path.split('/')[-1]
        self.elect_leader()

    def elect_leader(self):
        print('leader_election: start')
        children = self.zookeeper.get_children(path=self.election_namespace)
        sorted_children = sorted(children)

        if sorted_children[0] == self.znode_name:
            self._leader = True
            print(f'LEADER: {self.node_name} (znode: {self.znode_name})')

        else:
            print(f'Follower: (znode: {self.znode_name})')
            predecessor_index = sorted_children.index(self.znode_name) - 1
            print('Watching znode: ' + str(sorted_children[predecessor_index]))

            @self.zookeeper.DataWatch(f'{self.election_namespace}/{sorted_children[predecessor_index]}')
            def register_next(data, stat, event):
                # race condition: it could be that the DataWatch failed as the predecessor node died during the time
                # between the get_children() and the DataWatch registration
                # to identify a failed watch registration: check that all the function params are None
                if data is None and stat is None:
                    # watch registration failed
                    self.elect_leader()
                    return

                if event is not None:
                    if event.type == EventType.DELETED:
                        print(f'Event is {event}')
                        self.elect_leader()

    def clean_zookeeper(self):
        self.zookeeper.delete(self.election_namespace, recursive=True)

    def is_leader(self) -> bool:
        return self._leader

    def __repr__(self):
        return 'Leader ' if self._leader else f'{self.node_name}({self.znode_name})'
