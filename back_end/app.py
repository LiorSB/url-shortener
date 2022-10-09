import pymongo
from flask import Flask
from flask_cors import CORS
from flask_caching import Cache
from .leader_election import LeaderElection


# MONGODB_HOST = 'mongodb://localhost:27017/'
MONGODB_HOST = 'mongodb://localhost:27117/'
DB_NAME = 'url_shortener'
URL_COLLECTION_NAME = 'url'
USER_COLLECTION_NAME = 'user'
ZOOKEEPER_ADDRESS = 'localhost:2181'
ZNODE_NAME = 'views'
ELECTION_PATH = '/election'


leader_election = LeaderElection(ZOOKEEPER_ADDRESS, ZNODE_NAME, ELECTION_PATH)
leader_election.register()

app = Flask(__name__)
CORS(app)

cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})

# Start MongoDB and enable sharding by hash.
# mongo_client: pymongo.MongoClient = pymongo.MongoClient(MONGODB_HOST)
# mongo_client.admin.command('enableSharding', DB_NAME)
# mongo_client.admin.command({
#     'shardCollection': f'{DB_NAME}.{URL_COLLECTION_NAME}',
#     'key': {
#         '_id': 'hashed'
#     }
# })
# mongo_client.admin.command({
#     'shardCollection': f'{DB_NAME}.{USER_COLLECTION_NAME}',
#     'key': {
#         '_id': 'hashed'
#     }
# })
# url_shortener_db = mongo_client[DB_NAME]
# url_collection = url_shortener_db[URL_COLLECTION_NAME]
# user_collection = url_shortener_db[USER_COLLECTION_NAME]
